# Workout Tracker — Alpha 0.3.3

Workout Tracker is a mobile-first strength-training Progressive Web App. It provides fast workout logging, local progress tracking, and offline access without a server-side account.

## Project Structure

```text
/
├── AGENTS.md                    # Permanent Codex project instructions
├── README.md                    # Project setup and workflow
├── README.txt                   # Legacy quick-use notes
├── index.html                   # Page structure and fallback workout config
├── manifest.json                # PWA metadata
├── service-worker.js            # Offline cache and update behavior
├── version.json                 # Primary human-readable app version
├── assets/
│   ├── css/app.css              # Mobile-first layout and styling
│   └── js/app.js                # UI, workout logic, and local storage
├── data/
│   └── config.json              # Authoritative workout configuration
└── docs/                        # Routed project documentation
    ├── ARCHITECTURE.md
    ├── CHANGELOG.md
    ├── CODING_GUIDELINES.md
    ├── DECISIONS.md
    ├── FEATURES.md
    ├── PROJECT_OVERVIEW.md
    └── ROADMAP.md
```

`data/config.json` is the authoritative runtime source for splits and exercises. If it cannot be fetched, `index.html` contains an embedded fallback copy so the app can still start. Keep the two representations synchronized when changing the workout program.

## Local Data

The app stores data in browser LocalStorage:

- `workoutLog`: saved workout history
- `workoutSplit`: the currently selected split
- `workoutUnits`: the user's `kg` or `lb` display preference

This data stays in the current browser and device. Use **Settings → Export backup** to create a portable JSON backup. Historical workout values are stored as entered and are not converted when the display unit changes.

## PWA and Offline Setup

`manifest.json` provides standalone PWA metadata. `service-worker.js` caches the application shell, supports offline loading after the initial successful visit, removes old caches, and handles application updates. PWA installation and service workers require HTTPS or localhost; GitHub Pages provides HTTPS for the deployed app.

`version.json` is the primary human-readable application version. The Settings screen fetches it at runtime and falls back to the version embedded in the application when unavailable.

## GitHub Pages Deployment

The project is a static site and is deployed through GitHub Pages:

1. Review and test the complete change locally.
2. Commit the intended files to Git.
3. Push the deployment branch to GitHub.
4. Wait for the GitHub Pages workflow/deployment to finish.
5. Verify the hosted app, version display, offline behavior, and update flow.

Preserve the repository folder structure when publishing. Asset and data paths are relative and must remain unchanged.

## Development Workflow

- Development is performed in Visual Studio Code.
- Git and GitHub are used for source control and deployment.
- The human developer is the final decision maker and tests and approves changes.
- ChatGPT supports architecture, product design, technical decisions, code review, and implementation instructions.
- Codex inspects the relevant implementation, makes approved focused changes, and runs practical checks.
- Significant features and refactors should use a Git branch.
- Documentation is reviewed when work is finalized for commit, not after every intermediate prompt.

See `AGENTS.md` for permanent working rules and task-specific documentation routing.
