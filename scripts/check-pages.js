const https = require("https");

const urls = [
  "https://songfy0118.github.io/APP/support.html",
  "https://songfy0118.github.io/APP/privacy.html",
  "https://songfy0118.github.io/APP/terms.html",
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const request = https.request(url, { method: "HEAD", timeout: 15000 }, (response) => {
      response.resume();
      resolve({
        url,
        statusCode: response.statusCode,
        ok: response.statusCode >= 200 && response.statusCode < 400,
      });
    });

    request.on("timeout", () => {
      request.destroy(new Error("Request timed out"));
    });

    request.on("error", (error) => {
      resolve({
        url,
        statusCode: null,
        ok: false,
        error: error.message,
      });
    });

    request.end();
  });
}

async function main() {
  console.log("GitHub Pages URL check");
  console.log("======================");

  const results = await Promise.all(urls.map(checkUrl));
  let hasFailure = false;

  for (const result of results) {
    if (result.ok) {
      console.log(`OK   ${result.statusCode} ${result.url}`);
    } else {
      hasFailure = true;
      const detail = result.statusCode || result.error || "unknown";
      console.log(`FAIL ${detail} ${result.url}`);
    }
  }

  if (hasFailure) {
    console.log("");
    console.log("Fix Pages before using these URLs in App Store Connect.");
    console.log("See PAGES_PUBLICATION_STATUS.md for the Actions and master / root options.");
    process.exit(1);
  }
}

main();
