---
name: check-context
description: Use when a user story affects an existing application. Investigate relevant code, tests, APIs, and documentation, then clarify unresolved dependencies interactively.
---

# check-context

## Objective
Verify existing system behavior relevant to the story.

## Instructions
1. Identify potentially affected features and integrations.
2. Search available code, tests, APIs, and docs narrowly before widening the investigation.
3. Identify behavior, constraints, dependencies, and conflicts; cite file paths or document references.
4. Separate Verified findings, Unconfirmed assumptions, and Conflicts.
5. Ask up to 3 high-impact questions about unresolved behavior or dependencies and wait for answers.
6. Update findings; stop when evidence is sufficient or unavailable.

## Output
| Finding | Evidence | Status |
| --- | --- | --- |
Then list affected components and open questions.

## Boundaries
Never claim access to uninspected sources. Ask for essential missing access. Do not modify code or produce implementation plans.
