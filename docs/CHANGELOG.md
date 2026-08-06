# Changelog

This changelog records only milestones supported by the repository and its Git history. It does not assign versions or dates that cannot be verified.

## 2026-08-07

### Alpha 0.3.3 stabilization

- Reformatted the application JavaScript for readability without redesigning the architecture.
- Confirmed `data/config.json` as the authoritative runtime workout configuration.
- Updated the README with the current structure, storage, PWA, deployment, and development workflow.
- Aligned displayed, fallback, manifest, version, build, and cache identifiers for Alpha 0.3.3.
- Persisted the `kg` or `lb` preference separately in LocalStorage and included it in backup restore behavior.
- Added confirmation before saving a completely empty workout while allowing partial workouts.
- Removed project-specific naming from application content, metadata, configuration, downloads, cache naming, and documentation.
- Renamed LocalStorage keys as a clean cutover. Data stored under the previous branded keys is intentionally not migrated.

## 2026-08-06

### Initial workout tracker

- Added the initial workout-tracker application with predefined workout configuration, workout logging, history, progress, backup, and settings views.
- Added LocalStorage-based workout persistence.

### PWA support and GitHub Pages deployment

- Added a web app manifest and service worker for standalone PWA behavior and offline caching.
- Documented publishing the static application through GitHub Pages.

### Bottom navigation improvements

- Improved the mobile bottom-navigation presentation.

### Alpha 0.3 structure work

- Moved styling, JavaScript, and configuration into `assets` and `data` directories.
- Added application version metadata and aligned displayed version strings.
- Restored the browser-tab title to “Workout Tracker.”

### Cache and update behavior

- Added application-shell caching and old-cache cleanup.
- Added network-first handling for navigation and selected frequently updated files, with stale-while-revalidate handling for other GET requests.
- Added service-worker update detection, an update banner, and activation through `SKIP_WAITING`.
- Performed follow-up cache-update testing and version alignment.
