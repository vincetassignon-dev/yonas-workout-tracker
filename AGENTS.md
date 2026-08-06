# Project Instructions

## Core Rules

- Preserve existing functionality unless explicitly instructed otherwise.
- Make small, focused changes and inspect the relevant implementation first.
- Modify only files relevant to the task; do not refactor or clean up unrelated code.
- Do not introduce frameworks, dependencies, or breaking changes without explicit approval.
- Keep the application mobile-first, offline-capable, and PWA-compatible.
- Prefer simple, readable, maintainable solutions.
- Explain significant architectural changes.

## Public repository security rules

Treat every committed file, comment, test fixture, log, example, and documentation entry as publicly visible.

- Never include passwords, API keys, access or session tokens, private keys, certificates, authentication cookies, `.env` contents, local secret configuration, or other secrets.
- Never include personal information such as private email addresses, phone numbers, home addresses, birth dates, or other identifying information unless explicitly approved for public release.
- Never include private client, employer, user, or business information.
- Never include private URLs, IP addresses, usernames, machine names, account identifiers, or infrastructure details unless intentionally public and clearly safe.
- Never commit production data, real workout-user data, exported backups, LocalStorage contents, or real CSV/JSON exports. Use fictional placeholders in examples, documentation, and tests.
- Do not hardcode credentials or sensitive configuration in HTML, CSS, JavaScript, JSON, documentation, or GitHub workflow files. Assume all client-side code is inspectable.
- Do not rely on minification, hidden UI, or obscurity for security.
- Do not add analytics, third-party scripts, CDNs, external services, or new network calls without explicit approval and a security review.
- Avoid unsafe dynamic code execution. Avoid rendering untrusted content through `innerHTML`; prefer safe DOM APIs or proper escaping when data may be user-controlled.
- Validate imported data before using or rendering it.
- Do not commit debug files, logs, backups, crash reports, exported data, or temporary files.

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

1. Review all staged and unstaged changes for secrets or credentials; personal or private information; real user data; private URLs, hostnames, paths, or account details; debug output or temporary files; unsafe rendering of user-controlled data; accidental external network calls; unnecessary dependencies; security-sensitive configuration changes; and files that should remain local.
2. Run relevant checks or tests where practical.
3. Determine whether existing documentation is now inaccurate or incomplete.
4. Update only the relevant documentation, describing stable resulting behavior rather than intermediate states.
5. Omit trivial implementation details and include documentation changes in the same commit when practical.
6. Give the user a concise summary before committing.

If anything may be sensitive:

1. Stop before committing or pushing.
2. Identify the affected file and risk category without reproducing the full sensitive value.
3. Recommend removal and, where relevant, rotation or revocation.
4. Check whether the value may already exist in Git history.
5. Do not commit or push until the issue is resolved.

Do not create a commit or push changes unless explicitly requested.
