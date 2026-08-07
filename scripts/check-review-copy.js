const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const scannedFiles = [
  "index.html",
  "config.js",
  "privacy.html",
  "terms.html",
  "support.html",
  "APP_STORE_METADATA_DRAFT.md",
  "APP_STORE_CONNECT_FIELD_VALUES.md",
  "APP_REVIEW_NOTES_DRAFT.md",
];

const riskyPhrases = [
  "鼓励熬夜",
  "治疗失眠",
  "检测焦虑",
  "诊断压力",
  "心理诊断",
  "医疗级监测",
  "医疗级压力监测",
  "自动识别焦虑",
  "自动检测情绪",
];

const allowedContext = [
  "不鼓励熬夜",
  "不要鼓励熬夜",
  "不检测",
  "不会自动识别焦虑",
  "不提供诊断",
  "不提供医疗",
  "不做诊断",
  "不做检测",
  "不包含",
  "不构成",
  "不能替代",
  "不要",
  "避免",
  "避免写法",
  "避免使用",
  "Avoided framing",
  "does not detect",
  "does not automatically identify",
  "does not detect, diagnose, or treat",
];

const findings = [];

function hasAllowedContext(content, index) {
  const start = Math.max(0, index - 120);
  const end = Math.min(content.length, index + 80);
  const windowText = content.slice(start, end).toLowerCase();
  return allowedContext.some((phrase) => windowText.includes(phrase.toLowerCase()));
}

for (const file of scannedFiles) {
  const fullPath = path.join(root, file);
  const content = fs.readFileSync(fullPath, "utf8");
  for (const phrase of riskyPhrases) {
    let index = content.indexOf(phrase);
    while (index !== -1) {
      if (!hasAllowedContext(content, index)) {
        const line = content.slice(0, index).split(/\r?\n/).length;
        findings.push(`${file}:${line} contains risky phrase: ${phrase}`);
      }
      index = content.indexOf(phrase, index + phrase.length);
    }
  }
}

console.log("App Review copy risk check");
console.log("==========================");

if (findings.length === 0) {
  console.log("Risky phrases: none");
} else {
  console.log("Risky phrases:");
  for (const finding of findings) {
    console.log(`- ${finding}`);
  }
  process.exit(1);
}
