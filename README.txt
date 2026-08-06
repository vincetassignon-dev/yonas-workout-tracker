WORKOUT TRACKER — ALPHA 0.3.3

QUICK USE
- Open index.html (or visit the hosted GitHub Pages URL).
- Workout data is stored only in that browser/device.
- Use Settings > Export backup regularly.

PROJECT STRUCTURE

/
├── index.html
├── manifest.json
├── service-worker.js
├── version.json
├── assets/
│   ├── css/app.css
│   └── js/app.js
└── data/
    └── config.json

WHAT LIVES WHERE
- index.html: page structure and embedded fallback config
- assets/css/app.css: layout, colours and responsive styling
- assets/js/app.js: application logic and local storage
- data/config.json: splits and exercises (single source of truth)
- service-worker.js: offline caching and application updates
- version.json: deployed application version
- manifest.json: home-screen/PWA metadata

PHONE / PWA
- Full PWA install and "Add to Home Screen" require HTTPS or localhost.
- Opening index.html directly on a computer works without hosting.
- iPhone/iOS does not reliably install a PWA from a local file.
