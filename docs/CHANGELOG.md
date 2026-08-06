# Changelog

This changelog records only milestones supported by the repository and its Git history. It does not assign versions or dates that cannot be verified.

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
- Restored the browser-tab title to “Yonas Workout Tracker.”

### Cache and update behavior

- Added application-shell caching and old-cache cleanup.
- Added network-first handling for navigation and selected frequently updated files, with stale-while-revalidate handling for other GET requests.
- Added service-worker update detection, an update banner, and activation through `SKIP_WAITING`.
- Performed follow-up cache-update testing and version alignment.

