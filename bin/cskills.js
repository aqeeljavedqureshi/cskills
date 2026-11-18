#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const AGENTS = Object.freeze({
  universal: ['.agents/skills', '.agents/skills'],
  codex: ['.agents/skills', '.agents/skills'],
  'claude-code': ['.claude/skills', '.claude/skills'],
  cursor: ['.cursor/skills', '.cursor/skills'],
  'gemini-cli': ['.gemini/skills', '.gemini/skills'],
  'github-copilot': ['.github/skills', '.copilot/skills'],
  opencode: ['.opencode/skills', '.config/opencode/skills'],
  cline: ['.cline/skills', '.cline/skills'],
  roo: ['.roo/skills', '.roo/skills'],
  windsurf: ['.windsurf/skills', '.codeium/windsurf/skills'],
  kiro: ['.kiro/skills', '.kiro/skills'],
  continue: ['.continue/skills', '.continue/skills'],
  antigravity: ['.agent/skills', '.gemini/config/skills'],
  'openhands': ['.agents/skills', '.agents/skills']
});
const ALIASES = Object.freeze({claude:'claude-code',gemini:'gemini-cli',copilot:'github-copilot',roo-code:'roo'});
const SOURCE = path.resolve(__dirname, '..', 'skills');

function availableSkills() {
  return fs.readdirSync(SOURCE, {withFileTypes:true})
    .filter(d => d.isDirectory() && fs.existsSync(path.join(SOURCE,d.name,'SKILL.md')))
    .map(d => d.name).sort();
}
function usage() {
  return `cskills - independent AI agent skills

Usage:
  cskills list
  cskills agents
  cskills install <skill...> [--agent name[,name]] [--local] [--force]
  cskills install --all [--agent name[,name]] [--local] [--force]
  cskills --help

By default, installs to ~/.agents/skills (global).
--local installs in the current project.
--agent selects agent-specific paths; repeat or comma-separate agent names.
--force replaces existing skill folders (otherwise skipped).
Examples:
  cskills install checkstory
  cskills install askmore whatif --agent claude-code,cursor
  cskills install --all --agent opencode --local
`;
}
function parse(argv) {
  const result={command:argv[0],skills:[],agents:[],all:false,local:false,force:false};
  for(let i=1;i<argv.length;i++){
    const arg=argv[i];
    if(arg==='--all') result.all=true;
    else if(arg==='--local') result.local=true;
    else if(arg==='--force') result.force=true;
    else if(arg==='--agent' || arg==='-a'){
      const value=argv[++i];
      if(!value || value.startsWith('-')) throw Error('Expected an agent after --agent');
      result.agents.push(...value.split(',').filter(Boolean));
    }else if(arg.startsWith('--agent=')) result.agents.push(...arg.slice(8).split(',').filter(Boolean));
    else if(arg.startsWith('-')) throw Error('Unknown option: '+arg);
    else result.skills.push(arg);
  }
  return result;
}
function install(argv, options={}) {
  const out=options.out || console.log;
  const config=parse(argv);
  if(config.command==='list'){availableSkills().forEach(out);return;}
  if(config.command==='agents'){Object.keys(AGENTS).forEach(out);return;}
  if(!config.command || config.command==='help' || config.command==='--help' || config.command==='-h'){out(usage());return;}
  if(config.command!=='install') throw Error('Unknown command: '+config.command+'\n'+usage());
  const available=availableSkills();
  if(config.all && config.skills.length) throw Error('Choose skill names or --all, not both');
  const selected=config.all?available:config.skills;
  if(!selected.length) throw Error('Specify a skill name or --all');
  for(const name of selected) if(!available.includes(name)) throw Error('Unknown skill: '+name+'. Try cskills list');
  const targets=(config.agents.length?config.agents:['universal']).map(x=>ALIASES[x]||x);
  for(const target of targets) if(!Object.hasOwn(AGENTS,target)) throw Error('Unknown agent: '+target+'. Try cskills agents');
  const home=options.home || os.homedir();
  const cwd=options.cwd || process.cwd();
  const uniqueDirs=[...new Set(targets.map(agent=>path.resolve(config.local?cwd:home, AGENTS[agent][config.local?0:1])))];
  for(const dir of uniqueDirs){
    for(const name of new Set(selected)){
      const src=path.join(SOURCE,name);
      const dest=path.join(dir,name);
      if(fs.existsSync(dest) && !config.force){out('Skipped (exists): '+dest);continue;}
      fs.mkdirSync(dir,{recursive:true});
      // Copy into a sibling directory first to avoid partially installed skills.
      const tmp=fs.mkdtempSync(path.join(dir,'.cskills-'));
      const staged=path.join(tmp,name);
      try{
        fs.cpSync(src,staged,{recursive:true,errorOnExist:true,force:false});
        if(fs.existsSync(dest)){
          const stat=fs.lstatSync(dest);
          if(stat.isSymbolicLink() || !stat.isDirectory()) throw Error('Cannot replace non-directory target: '+dest);
          fs.rmSync(dest,{recursive:true,force:true});
        }
        fs.renameSync(staged,dest);
        out('Installed: '+dest);
      } finally {fs.rmSync(tmp,{recursive:true,force:true});}
    }
  }
}
if(require.main===module){
  try{install(process.argv.slice(2));}catch(error){console.error('cskills: '+error.message);process.exitCode=1;}
}
module.exports={AGENTS,availableSkills,parse,install};
