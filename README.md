# cskills

**Seven independent, interactive AI agent skills for clarifying software user stories.**

Each skill is a standalone `SKILL.md` folder. The optional, dependency-free CLI can install skills into shared or agent-specific directories on Windows, macOS, and Linux.

## Available skills

| Skill | Method | Purpose |
| --- | --- | --- |
| [ask-more](skills/ask-more/SKILL.md) | 5W1H | Discover missing business context |
| [check-context](skills/check-context/SKILL.md) | Context analysis | Inspect existing project behavior |
| [what-if](skills/what-if/SKILL.md) | Example Mapping | Explore rules and edge cases |
| [ask-why](skills/ask-why/SKILL.md) | Socratic questioning | Challenge assumptions |
| [set-criteria](skills/set-criteria/SKILL.md) | BDD | Define testable acceptance criteria |
| [check-story](skills/check-story/SKILL.md) | INVEST | Review story quality |
| [set-priority](skills/set-priority/SKILL.md) | MoSCoW | Clarify release priorities |

## Installation with CLI

**Note:** The npm package is not published yet. Until then, clone this repository and use the CLI locally.

```bash
git clone https://github.com/aqeeljavedqureshi/cskills.git
cd cskills
node bin/cskills.js list
node bin/cskills.js install check-story
```

Once the package has been published to npm, equivalent commands can use `npx cskills`:

```bash
npx cskills list
npx cskills agents
npx cskills install check-story
npx cskills install --all
npx cskills install ask-more what-if
npx cskills install check-story --local
npx cskills install check-story --agent claude-code
npx cskills install --all --agent cursor,opencode --local
```

### Default install location

**Global by default:** `~/.agents/skills/<skill>/SKILL.md`

**Project-local with `--local`:** `./.agents/skills/<skill>/SKILL.md`

The shared location is agent-agnostic. Individual AI coding tools must support discovering this directory, or you should select a tool-specific directory with `--agent`.

### Agent-specific installation

Use `--agent <name>` to choose installation directories; use `--local` for the repository/project-level path.

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

### Safety and flags

- `--all` installs all bundled skills.
- `--agent name[,name]` targets one or multiple agents (repeatable).
- `--local` installs in the current working directory's project configuration.
- Existing skill folders are **skipped by default**.
- `--force` **replaces** existing skill directories; use only when you want to overwrite local changes.
- Unknown skill or agent names fail with an error.

## Using skills

Ask an agent to invoke an installed skill, for example:

> Use ask-more to clarify this Jira user story. Ask important questions and wait for my answers.

> Use check-story to review this story with INVEST and distinguish risks from unknowns.

Each skill is **independent**. No orchestration skill, other skill, or remote service is required. A skill name is not automatically a slash command; command support depends on your agent.

### Interactive approach

1. Analyze available story context and evidence.
2. Ask up to three important questions per round.
3. Wait for stakeholder answers rather than guessing.
4. Reassess and stop when the skill's goal is satisfied.

## Development

Requires Node.js 18.17 or newer.

```bash
npm test
npm pack --dry-run
```

CI validates tests and packaging on supported Node.js versions. npm registry publication is a separate operation that requires package-name availability and npm publishing credentials.

## License

[MIT](LICENSE).
