# Features

This document describes behavior verified in the current repository. Planned work is listed separately and is not presented as implemented.

## Mobile-First Application Shell and Navigation

**Purpose:** Provide a compact workout tracker organized for phone use.

**Current behavior:** The single-page interface has Home, Workout, History, Progress, and Settings views. A fixed bottom navigation switches between them without a page load.

**Relevant files/modules:** `index.html`, `assets/css/app.css`, navigation and `show()` logic in `assets/js/app.js`.

**Current limitations:** The interface is a single static page, and view state is not represented in the URL.

## Predefined Three-Split Workout Program

**Purpose:** Provide a ready-to-use strength program.

**Current behavior:** Split A, B, and C each contain six configured exercises grouped as a main lift, supersets, and a finisher. Configuration loads from `data/config.json`, with embedded fallback configuration in `index.html` if loading fails.

**Relevant files/modules:** `data/config.json`, fallback configuration in `index.html`, and configuration/rendering logic in `assets/js/app.js`.

**Current limitations:** Exercises and splits cannot be edited through the UI. The embedded fallback duplicates the external configuration and must be kept in sync manually.

## Workout Logging and Split Rotation

**Purpose:** Record weight and repetitions for each workout and guide the next session.

**Current behavior:** A user selects a split, enters one weight and repetitions for three sets per exercise, and saves the workout. A completely empty workout requires confirmation; partially completed workouts save normally. Saved workouts receive an ISO timestamp. After saving, the app advances to the next configured split. The Home view shows the next split, workout count, last split, and personal-record count.

**Relevant files/modules:** Workout, split-rotation, and Home sections of `assets/js/app.js`; workout markup in `index.html`.

**Current limitations:** Field values are not otherwise validated, and there is no interface to edit or delete an individual saved workout.

## Weekly Workout Goal

**Purpose:** Show progress toward a simple target of three workouts per week.

**Current behavior:** The Home view counts saved workouts dated from Monday 00:00 local time through the following Monday and displays the actual count against a fixed target of three. A three-step indicator, contextual message, and subtle completed state update whenever Home renders. The count is derived from workout history and is not stored separately.

**Relevant files/modules:** Weekly Goal markup in `index.html`, Home calculation and rendering logic in `assets/js/app.js`, and Weekly Goal styles in `assets/css/app.css`.

**Current limitations:** The target is fixed at three workouts. Goals are not configurable, and streaks or achievements are not implemented.

## Local Workout Storage

**Purpose:** Keep workout data on the device without requiring an account or server.

**Current behavior:** Workout logs, the selected split, and the unit preference are stored in browser LocalStorage under `workoutLog`, `workoutSplit`, and `workoutUnits`.

**Relevant files/modules:** State, storage, workout-saving, import, and clear-data logic in `assets/js/app.js`.

**Current limitations:** Data is local to the current browser and origin. There is no cloud synchronization, user account, storage schema version, or migration mechanism.

## Workout History

**Purpose:** Provide a simple review of previous sessions.

**Current behavior:** Saved workouts appear newest first with their split, localized date, and the number of exercises that contain a weight entry.

**Relevant files/modules:** History markup in `index.html` and `renderHistory()` in `assets/js/app.js`.

**Current limitations:** History shows summary rows only; it does not expose set-by-set detail or provide editing, deletion, filtering, or search.

## Progress and Personal Bests

**Purpose:** Show weight trends and the highest logged weight for each exercise.

**Current behavior:** The Progress view lets the user choose a configured exercise and draws its logged weights on a canvas line chart. Personal bests are calculated as the highest numeric weight logged for each exercise and displayed in a table. The Home view shows how many exercises have a personal best.

**Relevant files/modules:** Progress markup and canvas in `index.html`; `names()`, `getPRs()`, `renderProgress()`, and `draw()` in `assets/js/app.js`.

**Current limitations:** Calculations use weight only and do not consider repetitions, volume, or estimated one-repetition maximum. The chart has no date labels and does not provide advanced analytics.

## CSV Export

**Purpose:** Make raw workout entries usable outside the application.

**Current behavior:** The History view downloads a CSV containing date, split, exercise, weight, and three set values for every logged exercise.

**Relevant files/modules:** History export button in `index.html`; `exportCSV()` and `download()` in `assets/js/app.js`.

**Current limitations:** Importing CSV is not supported.

## JSON Backup and Restore

**Purpose:** Allow users to create and restore a portable local backup.

**Current behavior:** Settings can export a JSON file containing the workout log, current split, unit preference, and configuration. A selected JSON backup can restore the log, current split, and unit preference. Backups created before the separate unit field remain compatible through the configuration value.

**Relevant files/modules:** Backup controls in `index.html`; export/import and download logic in `assets/js/app.js`.

**Current limitations:** Import performs minimal validation and does not apply the full configuration included in the exported backup.

## Units Display Selection

**Purpose:** Let the user choose whether workout weight fields are labeled in kilograms or pounds.

**Current behavior:** Settings offers `kg` and `lb`; changing it persists the preference separately in LocalStorage, updates the in-memory configuration, and rerenders workout weight labels. The preference is restored on startup.

**Relevant files/modules:** Unit selector in `index.html`; unit-change handler in `assets/js/app.js`; default unit in `data/config.json`.

**Current limitations:** Existing or entered values are not converted, and other already-rendered views may continue to show the prior unit until rerendered.

## Local Data Clearing

**Purpose:** Let the user remove all saved workout records.

**Current behavior:** A confirmation prompt precedes clearing the workout log from LocalStorage.

**Relevant files/modules:** Clear-data control in `index.html` and its handler in `assets/js/app.js`.

**Current limitations:** Clearing is irreversible inside the application unless the user previously exported a backup.

## Offline and PWA Infrastructure

**Purpose:** Keep the static application available with limited or no network access and support a standalone app experience.

**Current behavior:** The web manifest declares standalone display metadata. The service worker precaches the application shell, removes old caches on activation, uses network-first behavior for navigation and selected update-sensitive resources, and stale-while-revalidate for other GET requests. When a new worker is waiting, the app displays an update banner and can activate it before reloading.

**Relevant files/modules:** `manifest.json`, `service-worker.js`, service-worker registration and update UI in `assets/js/app.js`, and update-banner markup in `index.html`.

**Current limitations:** The manifest currently has no icons. Offline behavior depends on a successful prior service-worker installation and cache population. The update message is partly in Dutch while most application text is English.

## Planned Features

The following are planned or possible directions and are not fully implemented today:

- A broader, user-facing exercise library.
- Reusable workout templates.
- Expanded statistics and analytics.
- More sophisticated personal-record tracking.
- Improved progress graphs.
- User profiles.
- Optional cloud synchronization.
