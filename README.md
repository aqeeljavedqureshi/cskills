# cskills

**Small, composable AI agent skills for clarifying ambiguous software user stories.**

Seven independent skills. One `SKILL.md` per skill. No scripts or dependencies.

## Skills

| Skill | Purpose | Output |
| --- | --- | --- |
| [discover-story](skills/discover-story/SKILL.md) | 5W1H discovery | Context and missing information |
| [inspect-context](skills/inspect-context/SKILL.md) | Codebase and documentation investigation | Verified behavior and gaps |
| [map-scenarios](skills/map-scenarios/SKILL.md) | Example Mapping | Rules, examples, edge cases |
| [challenge-assumptions](skills/challenge-assumptions/SKILL.md) | Socratic questioning | High-impact clarification questions |
| [define-acceptance](skills/define-acceptance/SKILL.md) | BDD | Testable Given/When/Then scenarios |
| [review-story](skills/review-story/SKILL.md) | INVEST | Story quality assessment |
| [prioritize-scope](skills/prioritize-scope/SKILL.md) | MoSCoW | Confirmed priorities and open decisions |

## Install

For **OpenCode**, copy any skill folder into `.opencode/skills/` in your project:

```bash
mkdir -p .opencode/skills
cp -R skills/discover-story .opencode/skills/
```

For user-wide use, copy folders into `~/.config/opencode/skills/`.

For other Agent Skills-compatible tools, copy each folder to that tool's supported skills directory.

## Use

Tell your agent:

> Use discover-story to analyze this Jira user story. Identify missing information; do not invent answers.

Use each skill independently, or combine them:

```text
discover-story → inspect-context → map-scenarios
       → challenge-assumptions → define-acceptance → review-story
```

Use `prioritize-scope` only when release scope needs a decision.

## Example

**Story:** "As a user, I want to export reports."

| Skill | Example result |
| --- | --- |
| discover-story | Which users? Which reports? What formats? |
| inspect-context | Existing report endpoints and permissions |
| map-scenarios | Filtered export, empty results, permission failure |
| challenge-assumptions | Should exports contain filtered or all records? |
| define-acceptance | Given an authorized user, when exporting a filtered report, then... (only after behavior is confirmed) |
| review-story | Testability and scope gaps |
| prioritize-scope | Must-have formats versus deferred formats, if approved |

## Ground rules

- Distinguish confirmed facts, assumptions, and open questions.
- Prefer existing story, code, tests, and documentation as evidence.
- Ask only questions that change decisions or acceptance criteria.
- Never silently turn assumptions into requirements.
- Keep output concise; critical unresolved decisions block readiness.

## License

[MIT](LICENSE).
