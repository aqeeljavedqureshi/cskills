---
name: frontend-docs-generator
description: Generate or refresh concise AI-agent documentation for an existing React frontend. Use when documenting application context, architecture, workflows, and engineering conventions for AI agents. Delegate 12 areas to separate specialist agents, write Markdown under project-root docs/, prepend a contextual index to AGENTS.md, and repeat user clarification until every specialist has no unresolved questions. Requires a host with sub-agent support.
---

# Frontend Docs Generator

## Coordinate exploration

1. Identify the target React application and project root. Read existing repository instructions and inspect the package manifest, source structure, and current documentation. Ask the user to select an application if multiple candidates make the scope unclear.
2. Use the host's native sub-agent tools. Create one distinct specialist per area in [areas.md](references/areas.md). Run independent specialists concurrently within available capacity, queueing the remainder. Keep their identities and ownership through clarification rounds. If delegation is unavailable, explain the missing capability and pause.
3. Give each specialist the project root, its area row, the complete specialist contract below, relevant repository instructions, and any known user answers. Give it exclusive ownership of one output file directly in `<project-root>/docs/`. Resolve existing matching documents before assigning paths. Reuse matching files where practical and preserve unrelated material. Flag conflicting or inseparable existing content for clarification. Avoid duplicate documents. Never overwrite another specialist's file.
4. Let specialists inspect relevant source, configuration, tests, and existing docs themselves. Share a small initial code map to reduce repeated discovery. Keep application code unchanged. Only the coordinator edits the root agent instructions file.

## Specialist contract

- Explore every sub-aspect in the assigned area. Describe the implemented application and distinguish confirmed user direction from current implementation when they differ. Ground claims in repository evidence or explicit user answers. Ask about uncertain intent, conflicting evidence, missing business context, or unclear behavior. Treat an unobserved feature as unverified until evidence or clarification establishes its status.
- Write the assigned Markdown document during exploration, using supported facts. Keep unresolved claims out of instructional prose. Return questions separately.
- Target 200–400 words per document and use fewer whenever sufficient. Keep newly authored generated content at most 400 words, including headings and link labels. Preserve unrelated existing content and report it separately if it makes a reused file longer. Minimize first. Never pad to reach a word count.
- Use short, high-level instructions that help the next agent decide where and how to work. Include compact factual context where necessary, such as purpose and domain definitions. Refer to actual files only when they materially guide work. Avoid copied code, exhaustive inventories, generic React tutorials, repeated explanations, secrets, and duplicated content across documents. Refer to another area for overlapping responsibilities.
- Return the output path, word count, brief evidence locations, scope coverage, and a numbered list of unresolved questions with the reason each answer matters. Evidence and coverage belong in the return message unless essential to future use of the document.
- Before returning, explicitly ask yourself, “Do I have more questions about ambiguous, missing, conflicting, or unclear content in this area?” Return either the remaining questions or `No remaining questions after explicit self-check`. Never infer that silence means clarity.

## Resolve questions repeatedly

1. Collect all 12 specialist results. Check coverage, unsupported claims, and conflicting descriptions. Route conflicts to the relevant specialists.
2. Present a consolidated, deduplicated question list to the user, identifying the responsible areas. Ask only what source inspection cannot resolve. Retain question IDs and owning agents across turns. If the user answers only some questions, keep the rest pending and continue independent work.
3. After answers arrive, resume each affected specialist with its questions, the exact answers, and relevant cross-area decisions. Have it revise its document and repeat the explicit self-check. If the host cannot resume a specialist, create a replacement with its original assignment, current file, evidence summary, and unresolved questions.
4. Repeat with no fixed round limit until all questions are answered or explicitly resolved by the user and every specialist reports no remaining questions. A user deferral keeps the question open. Never answer on the user's behalf. Wait for the user when remaining work requires their answers.
5. Recheck all specialists after cross-area changes that affect their conclusions. Completion requires a current clear status for every area, no pending user questions, and no unresolved contradictions.

## Add the navigation index

After the initial documents exist, prepend a compact managed block to the root `AGENTS.md`. Prefer an already-existing root `Agents.md` or `agents.md` if it is the project's established file. If several case variants exist, ask which one to update. Create `AGENTS.md` if none exists.

Use `<!-- frontend-docs-generator:start -->` and `<!-- frontend-docs-generator:end -->` to delimit the block. On reruns replace only that block and keep it at the top. Preserve all existing instructions outside it verbatim. Preserve a UTF-8 BOM if present. Never delete instructions to make room.

Start the block with `## Frontend documentation` and a sentence directing agents to read only documents relevant to the task. Include one relative Markdown link per area. Give each entry one short sentence stating both when to consult it and what it governs. Use actual assigned paths. During clarification, identify documents with pending questions in their index entries. Remove those status notes only after resolution.

## Verify and finish

Check all 12 documents exist, every required sub-aspect was explored, generated prose meets the size guidance, all links resolve, no unsupported statements remain, and existing root instructions are intact. Confirm only intended docs and the root index changed. Update the index after clarification edits. Report the index location, document count, and completion status. If awaiting answers, state the pending questions and resume this workflow when answered.
