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

const trackIds = new Set(data.tracks.map((track) => track.id));
for (const project of data.featuredProjects) {
  if (!trackIds.has(project.track)) throw new Error(`Unknown track on project: ${project.id}`);
  if (project.architectureDiagram && (!project.architectureTitle || !project.architectureCaption)) {
    throw new Error(`Architecture diagram needs a title and caption: ${project.id}`);
  }
}
for (const item of data.timeline) {
  if (!trackIds.has(item.track)) throw new Error(`Unknown track on timeline item: ${item.title}`);
}

const gcer = data.featuredProjects.find((project) => project.id === "gcer");
if (!gcer) throw new Error("Missing GCER thesis project");
if (
  !Array.isArray(gcer.technicalSections) ||
  gcer.technicalSections.length === 0 ||
  gcer.technicalSections.some(({ title, items }) => !title || !Array.isArray(items) || items.length === 0)
) {
  throw new Error("GCER technical sections must each have a title and items");
}

const serialized = JSON.stringify(data);

// 비공개 저장소 링크는 방문자에게 404가 되므로 공개 포트폴리오에 넣지 않는다.
const privateRepos = ["jobis", "chungju", "lab-rooms-pwa", "finance-rag", "superjuseongs", "ssalmuk-lab"];
for (const repo of privateRepos) {
  if (serialized.includes(`github.com/kiwibirdstrike/${repo}"`)) {
    throw new Error(`Link to private repository: ${repo}`);
  }
}
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
if (html.indexOf('class="profile-summary"') > html.indexOf('id="hero-title"')) {
  throw new Error("Profile summary must appear before the hero introduction");
}

const app = readFileSync(new URL("../site.js", import.meta.url), "utf8");
if (/\.append\([^;]+\)\.append\(/s.test(app)) {
  throw new Error("Unsafe chained DOM append detected");
}

console.log("Portfolio structure and privacy checks passed");
