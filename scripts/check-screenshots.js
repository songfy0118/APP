const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const required = [
  "screenshots/iphone/iphone-01-tonight.png",
  "screenshots/iphone/iphone-02-note.png",
  "screenshots/iphone/iphone-03-weekly-report.png",
  "screenshots/iphone/iphone-04-charts.png",
  "screenshots/iphone/iphone-05-watch-summary.png",
  "screenshots/watch/watch-01-mood-picker.png",
  "screenshots/watch/watch-02-buffer.png",
  "screenshots/watch/watch-03-comfort.png",
];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

console.log("App Store screenshot check");
console.log("==========================");

const missing = required.filter((file) => !exists(file));

if (missing.length === 0) {
  console.log("Screenshots: complete");
} else {
  console.log("Missing screenshots:");
  for (const file of missing) {
    console.log(`- ${file}`);
  }
  console.log("");
  console.log("Generate these on Mac/Xcode using SCREENSHOT_CAPTURE_CHECKLIST.md.");
  process.exit(1);
}

