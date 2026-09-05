import { readFileSync, statSync } from "node:fs";
import vm from "node:vm";

const requiredFiles = ["index.html", "portfolio.css", "site.js", "portfolio-content.js", ".nojekyll"];
const requiredKeys = [
  "profile",
  "tracks",
  "timeline",
  "featuredProjects",
  "otherProjects",
  "credentials"
];
const forbiddenKeys = new Set([
  "birthDate",
  "address",
  "phone",
  "studentNumber",
  "residentNumber",
  "apiKey",
  "applicationStatus"
]);

for (const file of requiredFiles) {
  if (!statSync(new URL(`../${file}`, import.meta.url)).isFile()) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const context = { window: {} };
vm.runInNewContext(
  readFileSync(new URL("../portfolio-content.js", import.meta.url), "utf8"),
  context
);

const data = context.window.PORTFOLIO_DATA;
for (const key of requiredKeys) {
  if (!(key in data)) throw new Error(`Missing data key: ${key}`);
}

function inspect(value, path = "portfolio") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspect(item, `${path}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.has(key)) throw new Error(`Forbidden key at ${path}.${key}`);
    inspect(child, `${path}.${key}`);
  }
}

inspect(data);

const jobis = data.featuredProjects.find((project) => project.id === "jobis");
if (!jobis) throw new Error("Missing JOBIS project");

const requiredTechnicalKeys = [
  "architecture",
  "dataFlow",
  "implementation",
  "decisions",
  "experiments"
];

for (const key of requiredTechnicalKeys) {
  if (!Array.isArray(jobis.technicalDetails?.[key]) || jobis.technicalDetails[key].length === 0) {
    throw new Error(`Missing JOBIS technical detail: ${key}`);
  }
}

const serialized = JSON.stringify(data);
const privatePatterns = [
  /01[016789][-\s]?\d{3,4}[-\s]?\d{4}/,
  /\d{6}[-\s]?[1-4]\d{6}/
];

for (const pattern of privatePatterns) {
  if (pattern.test(serialized)) throw new Error(`Private data pattern detected: ${pattern}`);
}

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
if (!html.includes('name="robots" content="noindex, nofollow"')) {
  throw new Error("Missing noindex metadata");
}

const app = readFileSync(new URL("../site.js", import.meta.url), "utf8");
if (/\.append\([^;]+\)\.append\(/s.test(app)) {
  throw new Error("Unsafe chained DOM append detected");
}

console.log("Portfolio structure and privacy checks passed");
