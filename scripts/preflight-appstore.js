const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "config.js",
  "manifest.json",
  "service-worker.js",
  "capacitor.config.json",
  "native/watchos/MoonWatchCompanion.swift",
  "assets/app-icon.svg",
  "assets/app-icon-192.png",
  "assets/app-icon-512.png",
  "assets/app-icon-1024.png",
  "privacy.html",
  "terms.html",
  "support.html",
  "APP_STORE_SUBMISSION.md",
  "APP_STORE_METADATA_DRAFT.md",
  "APP_STORE_CONNECT_FIELD_VALUES.md",
  "APP_STORE_CONNECT_SUBMISSION_RUNBOOK.md",
  "APP_REVIEW_NOTES_DRAFT.md",
  "APP_STORE_SCREENSHOT_PLAN.md",
  "SCREENSHOT_CAPTURE_CHECKLIST.md",
  "APP_STORE_ASSET_INVENTORY.md",
  "TESTFLIGHT_AND_PRIVACY_CHECKLIST.md",
  "MAC_XCODE_HANDOFF.md",
];

const warningChecks = [
  "GitHub Pages support URL must be publicly reachable.",
  "GitHub Pages privacy URL must be publicly reachable.",
  "Apple Developer Program account must be active.",
  "App Store Connect app record must be created.",
  "iPhone screenshots must be captured from simulator or real device.",
  "Apple Watch screenshots must be captured from simulator or real device.",
  "Xcode iOS + watchOS archive must be uploaded to TestFlight.",
  "Final developer email and privacy policy effective date must be filled in.",
];

const errors = [];
const warnings = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function readPngSize(relativePath) {
  const fullPath = path.join(root, relativePath);
  const buffer = fs.readFileSync(fullPath);
  const pngSignature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== pngSignature) {
    throw new Error(`${relativePath} is not a PNG file`);
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

for (const file of requiredFiles) {
  if (!exists(file)) {
    errors.push(`Missing required file: ${file}`);
  }
}

if (exists("assets/app-icon-1024.png")) {
  try {
    const size = readPngSize("assets/app-icon-1024.png");
    if (size.width !== 1024 || size.height !== 1024) {
      errors.push(
        `assets/app-icon-1024.png must be 1024x1024, got ${size.width}x${size.height}`,
      );
    }
  } catch (error) {
    errors.push(error.message);
  }
}

for (const item of warningChecks) {
  warnings.push(item);
}

console.log("App Store preflight");
console.log("===================");

if (errors.length === 0) {
  console.log("Errors: none");
} else {
  console.log("Errors:");
  for (const error of errors) {
    console.log(`- ${error}`);
  }
}

console.log("");
console.log("Manual checks still required:");
for (const warning of warnings) {
  console.log(`- ${warning}`);
}

if (errors.length > 0) {
  process.exit(1);
}

