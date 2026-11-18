# cskills

Generate concise React application documentation with [frontend-docs-generator](skills/frontend-docs-generator/SKILL.md).

## Included skill

**frontend-docs-generator** delegates 12 documentation areas to separate specialist agents. It writes Markdown under the target project's `docs/` folder and adds a navigation index at the top of `AGENTS.md`, preserving existing instructions.

- Cover purpose, domain rules, users and access, features, routes, architecture, conventions, state, APIs, UI, runtime, and verification.
- Keep documents high-level and actionable, targeting 200–400 words or fewer with a 400-word limit on generated content.
- Collect clarification questions and resume affected specialists after user answers.
- Repeat clarification until all specialists explicitly report no remaining questions.
- Use native sub-agent support and queue work within the host's available capacity.

Running the skill requires an agent host with sub-agent support and access to the target React repository. Installation targets below configure file placement. The selected host must also support running sub-agents.

## Install

Requires Node.js 18.17 or newer for the dependency-free installer.

```bash
git clone https://github.com/aqeeljavedqureshi/cskills.git
cd cskills
node bin/cskills.js list
node bin/cskills.js install frontend-docs-generator
```

The default installation goes to `~/.agents/skills/frontend-docs-generator/`.

```bash
node bin/cskills.js install frontend-docs-generator --local
node bin/cskills.js install frontend-docs-generator --agent claude-code
node bin/cskills.js install --all --agent cursor,opencode --local
node bin/cskills.js agents
```

`--local` installs under the current working directory. Run project-local installation from your target React repository using the absolute path to `bin/cskills.js`. Existing destination folders are skipped. Use `--force` to replace a destination folder and its local changes. `--all` installs the single bundled skill.

These commands use the repository directly. npm registry publication is a separate operation.

## Agent installation targets

| Agent target | Project-local directory | User-wide directory |
| --- | --- | --- |
| `universal` (default) | `.agents/skills` | `~/.agents/skills` |
| `codex` | `.agents/skills` | `~/.agents/skills` |
| `claude-code` | `.claude/skills` | `~/.claude/skills` |
| `cursor` | `.cursor/skills` | `~/.cursor/skills` |
| `gemini-cli` | `.gemini/skills` | `~/.gemini/skills` |
| `github-copilot` | `.github/skills` | `~/.copilot/skills` |
| `opencode` | `.opencode/skills` | `~/.config/opencode/skills` |
| `cline` | `.cline/skills` | `~/.cline/skills` |
| `roo` | `.roo/skills` | `~/.roo/skills` |
| `windsurf` | `.windsurf/skills` | `~/.codeium/windsurf/skills` |
| `kiro` | `.kiro/skills` | `~/.kiro/skills` |
| `continue` | `.continue/skills` | `~/.continue/skills` |
| `antigravity` | `.agent/skills` | `~/.gemini/config/skills` |
| `openhands` | `.agents/skills` | `~/.agents/skills` |

Aliases: `claude`, `gemini`, `copilot`, `roo-code`.

These paths are CLI installation targets, not a guarantee that every version of every agent automatically discovers all of them. Agent support changes: check your agent's documentation and configure discovery if needed.

## Use

Ask your agent to run the installed skill against your React application.

> Use frontend-docs-generator to explore this React application, generate concise documentation, and ask me about anything unclear.

Answer the consolidated clarification questions. The main agent resumes the relevant specialists, updates their documents, and asks any newly discovered questions. Partial answers keep unresolved questions open.

The skill's [area map](skills/frontend-docs-generator/references/areas.md) defines all 12 assignments and proposed filenames. The index describes when to read each document and what it governs, so agents can load the documents relevant to their task.

## Development

```bash
npm test
npm pack --dry-run
```

CI runs the existing test and packaging checks.

## License

[MIT](LICENSE).
