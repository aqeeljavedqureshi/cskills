---
name: checkstory
description: Use when assessing a Jira or other software user story for quality and readiness. Review INVEST criteria, ask clarification questions, and recommend concise improvements.
---

# checkstory

## Objective
Evaluate story quality using INVEST without treating unknowns as defects.

## Instructions
1. Assess Independent, Negotiable, Valuable, Estimable, Small, and Testable.
2. Check independence from unnecessary coupling; room to negotiate; identifiable value; evidence for estimation; size relative to the team's delivery unit; and objective testability.
3. Mark each Pass, Risk, or Unknown, with a concrete reason:
   - Pass: evidence supports the criterion.
   - Risk: evidence indicates a specific quality problem.
   - Unknown: insufficient evidence to decide.
4. Ask up to 3 questions addressing material Unknown or Risk findings; wait for answers.
5. Reassess and suggest up to 3 actionable improvements.

## Output
| INVEST criterion | Status | Reason |
| --- | --- | --- |
Then list up to 3 improvements and any remaining questions.

## Boundaries
Do not invent estimates, architecture, or acceptance criteria. Do not mark a criterion Risk solely because evidence is missing.
