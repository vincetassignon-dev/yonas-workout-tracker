YONAS WORKOUT TRACKER — ALPHA 0.3.2

PROJECT STRUCTURE

/
├── index.html
├── manifest.json
├── service-worker.js
├── version.json
├── README.md
├── assets/
│   ├── css/
│   │   └── app.css
│   └── js/
│       └── app.js
└── data/
    └── config.json

WHAT LIVES WHERE

- index.html: page structure only
- assets/css/app.css: layout, colours and responsive styling
- assets/js/app.js: application logic and local storage
- data/config.json: Yonas's splits and exercises
- service-worker.js: offline caching and application updates
- version.json: deployed application version
- manifest.json: home-screen/PWA metadata

PUBLISHING TO GITHUB

1. Open the repository.
2. Use Add file > Upload files.
3. Drag the complete contents of this package into the repository.
4. Make sure the folders assets and data are preserved.
5. Commit directly to main.
6. Wait for the GitHub Pages action to finish.

IMPORTANT

The folder structure is now part of the application. Do not upload all files flat into
the repository root. GitHub must show assets/css/app.css, assets/js/app.js and
data/config.json in their folders.
