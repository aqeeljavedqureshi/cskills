'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {AGENTS,availableSkills,parse,install}=require('../bin/cskills.js');

test('all seven skills are bundled',()=>{
  assert.deepEqual(availableSkills(),['ask-more','ask-why','check-context','check-story','set-criteria','set-priority','what-if']);
});
test('all agent mappings provide local and global targets',()=>{
  for(const dirs of Object.values(AGENTS)) assert.equal(dirs.length,2);
});
test('defaults to global universal directory',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cskills-test-'));
  try{
    install(['install','check-story'],{home:root,cwd:root,out:()=>{}});
    assert.ok(fs.existsSync(path.join(root,'.agents/skills/check-story/SKILL.md')));
  }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('supports multi-agent project installs',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cskills-test-'));
  try{
    install(['install','ask-more','--agent','claude-code,cursor','--local'],{home:root,cwd:root,out:()=>{}});
    for(const dir of ['.claude/skills','.cursor/skills']) assert.ok(fs.existsSync(path.join(root,dir,'ask-more/SKILL.md')));
  }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('existing destination is skipped without force and replaced with force',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cskills-test-'));
  try{
    const dest=path.join(root,'.agents/skills/ask-more');
    fs.mkdirSync(dest,{recursive:true});
    fs.writeFileSync(path.join(dest,'keep.txt'),'local changes');
    const messages=[];
    install(['install','ask-more'],{home:root,out:m=>messages.push(m)});
    assert.ok(messages[0].startsWith('Skipped'));
    assert.ok(fs.existsSync(path.join(dest,'keep.txt')));
    install(['install','ask-more','--force'],{home:root,out:()=>{}});
    assert.ok(fs.existsSync(path.join(dest,'SKILL.md')));
    assert.equal(fs.existsSync(path.join(dest,'keep.txt')),false);
  }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('bad skills and agents fail before writing',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cskills-test-'));
  try{
    assert.throws(()=>install(['install','not-a-skill'],{home:root}),/Unknown skill/);
    assert.throws(()=>install(['install','ask-more','--agent','not-an-agent'],{home:root}),/Unknown agent/);
    assert.equal(fs.existsSync(path.join(root,'.agents')),false);
  }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('shared targets only install once',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'cskills-test-'));
  try{
    const messages=[];
    install(['install','what-if','--agent','codex,universal'],{home:root,out:m=>messages.push(m)});
    assert.equal(messages.filter(x=>x.startsWith('Installed')).length,1);
  }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('CLI argument parser handles agent aliases and equals syntax',()=>{
  assert.deepEqual(parse(['install','check-story','--agent=codex,cline']).agents,['codex','cline']);
});
