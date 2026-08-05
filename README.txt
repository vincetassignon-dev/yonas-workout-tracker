YONAS WORKOUT TRACKER V2

QUICK USE
- Open index.html.
- The app works as a normal offline webpage.
- Workout data is stored only in that browser/device.
- Use Settings > Export backup regularly.

PHONE LIMITATION
- Android can usually open the HTML file from a file manager, though browser behavior differs.
- iPhone/iOS does not reliably run or install a PWA directly from a local ZIP/file.
- “Add to Home Screen” and full PWA installation normally require the files to be served over HTTPS or localhost.
- No hosting is required to use the HTML on a computer. For a true home-screen app on iPhone, some form of serving is unavoidable.

FILES
- index.html: app
- config.json: exercises and client name
- manifest.json + service-worker.js: PWA files for future hosted/local-server use
