# cskills

**Seven small, independent AI agent skills for interactive clarification of software user stories.**

Each skill uses a single `SKILL.md` file. No runtime dependencies, scripts, or mandatory orchestration.

## Skills

| Skill | Method | When to use |
| --- | --- | --- |
| [askmore](skills/askmore/SKILL.md) | 5W1H | Discover missing business context |
| [checkcontext](skills/checkcontext/SKILL.md) | Context analysis | Investigate existing code and system behavior |
| [whatif](skills/whatif/SKILL.md) | Example Mapping | Explore business rules and edge cases |
| [askwhy](skills/askwhy/SKILL.md) | Socratic questioning | Challenge assumptions and ambiguity |
| [setcriteria](skills/setcriteria/SKILL.md) | BDD | Define confirmed, testable acceptance criteria |
| [checkstory](skills/checkstory/SKILL.md) | INVEST | Review story quality and readiness |
| [setpriority](skills/setpriority/SKILL.md) | MoSCoW | Clarify release scope and priorities |

## Install

Clone the repository, then copy only the skills you want.

```bash
git clone https://github.com/aqeeljavedqureshi/cskills.git
cd cskills

# OpenCode: project-level installation
mkdir -p /path/to/your-project/.opencode/skills
cp -R skills/askmore /path/to/your-project/.opencode/skills/
```

For user-wide OpenCode skills, use `~/.config/opencode/skills/`. Other Agent Skills-compatible clients use their own supported skills directories.

## Use

Ask your agent to use a skill by name, for example:

> Use askmore to clarify this Jira story. Ask up to three important questions at a time and wait for my answers.

> Use checkstory to assess this story against INVEST. Distinguish proven risks from unknowns.

**Each skill works independently.** You can use one skill without running any others. A slash-command alias such as `/askmore` is available only if your agent client configures one; skill names alone do not guarantee slash commands.

## Interactive behavior

1. Analyze the story and any available evidence.
2. Ask up to three high-impact questions per round if important decisions are unresolved.
3. Wait for the user to answer; never fabricate business decisions.
4. Update the result and stop once the skill's objective is sufficiently clear.

Skills produce their own focused outputs rather than automatically invoking other skills.

## Example

**Story:** "As a registered user, I want to sign in using my email and password."

| Skill | Example question or result |
| --- | --- |
| askmore | What happens when sign-in fails? |
| checkcontext | Is there an existing authentication API or login flow? |
| whatif | Explore valid credentials, invalid credentials, and disabled accounts |
| askwhy | What does “securely” mean for this product? |
| setcriteria | Given/When/Then for confirmed login outcomes |
| checkstory | INVEST assessment, with evidence-based Pass / Risk / Unknown |
| setpriority | Must/Should/Could/Won't only after release priorities are agreed |

## Design principles

- **Independent:** no skill requires another skill.
- **Interactive:** ask, wait, and reassess instead of guessing.
- **Evidence-based:** distinguish verified facts from unknowns.
- **Focused:** minimize redundant questions and unnecessary output.
- **Safe boundaries:** no automatic code changes or fabricated requirements.

## License

[MIT](LICENSE).
