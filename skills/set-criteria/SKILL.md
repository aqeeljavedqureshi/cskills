---
name: set-criteria
description: Use when a software user story needs observable, testable acceptance criteria. Clarify missing behavior interactively and write BDD Given/When/Then scenarios from confirmed requirements.
---

# set-criteria

## Objective
Express confirmed expected behavior as testable acceptance criteria.

## Instructions
1. Extract confirmed outcomes, preconditions, and rules.
2. Identify missing behavior that changes test results.
3. Ask up to 3 essential clarification questions per round and wait for answers.
4. Write independent Given/When/Then scenarios for confirmed happy paths and relevant failure cases.
5. Separate unresolved questions; mark affected criteria Blocked instead of guessing.

## Output
### Acceptance criteria
**Scenario: [observable behavior]**
- Given [precondition]
- When [action]
- Then [observable result]

### Open questions
Only unresolved decisions; omit if none.

## Boundaries
Never invent business rules, expected outcomes, or implementation details. Keep scenarios objectively verifiable.
