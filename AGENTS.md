# Project Instructions

## Core Rules

- Preserve existing functionality unless explicitly instructed otherwise.
- Make small, focused changes and inspect the relevant implementation first.
- Modify only files relevant to the task; do not refactor or clean up unrelated code.
- Do not introduce frameworks, dependencies, or breaking changes without explicit approval.
- Keep the application mobile-first, offline-capable, and PWA-compatible.
- Prefer simple, readable, maintainable solutions.
- Explain significant architectural changes.

## Documentation Routing

Do not read the entire `/docs` folder for every task. Consult only the documentation relevant to the work:

- Architecture or refactoring: `/docs/ARCHITECTURE.md`
- Existing or planned features: `/docs/FEATURES.md`
- Architectural or technical decisions: `/docs/DECISIONS.md`
- Coding conventions: `/docs/CODING_GUIDELINES.md`
- Roadmap or release planning: `/docs/ROADMAP.md`
- General project context: `/docs/PROJECT_OVERVIEW.md`
- Previous releases or changes: `/docs/CHANGELOG.md`

Read additional documentation only when necessary to complete the task safely.

## Documentation Maintenance

Do not update project documentation after every prompt or intermediate change. During development, focus on the requested implementation and track meaningful changes that may later require documentation updates.

When the user says the work is finished and ready to commit, such as “Prepare this for commit”:

1. Review all changes belonging to the current work.
2. Run relevant checks or tests where practical.
3. Determine whether existing documentation is now inaccurate or incomplete.
4. Update only the relevant documentation, describing stable resulting behavior rather than intermediate states.
5. Omit trivial implementation details and include documentation changes in the same commit when practical.
6. Give the user a concise summary before committing.

Do not create a commit or push changes unless explicitly requested.
