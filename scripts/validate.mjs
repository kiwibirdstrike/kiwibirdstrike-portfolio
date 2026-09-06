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

if (data.otherProjects.some((project) => project.title === "언론 통계 분석 경진대회")) {
  throw new Error("Removed project still appears in the project archive");
}

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

if (!Array.isArray(jobis.architectureDiagram) || jobis.architectureDiagram.length !== 3) {
  throw new Error("JOBIS architecture diagram must contain three stages");
}

for (const [index, stage] of jobis.architectureDiagram.entries()) {
  if (!stage.title || !Array.isArray(stage.nodes) || stage.nodes.length < 3) {
    throw new Error(`Invalid JOBIS architecture stage: ${index + 1}`);
  }
  for (const node of stage.nodes) {
    if (!node.label || !node.note) {
      throw new Error(`Invalid JOBIS architecture node in stage: ${stage.title}`);
    }
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
if (
  html.includes("profile-monogram") ||
  html.includes("PROFILE / 2026") ||
  html.includes("profile-panel")
) {
  throw new Error("Profile still contains photo-placeholder styling");
}

const app = readFileSync(new URL("../site.js", import.meta.url), "utf8");
if (/\.append\([^;]+\)\.append\(/s.test(app)) {
  throw new Error("Unsafe chained DOM append detected");
}

console.log("Portfolio structure and privacy checks passed");
