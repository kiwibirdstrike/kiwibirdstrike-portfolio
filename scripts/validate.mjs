import { readFileSync, statSync } from "node:fs";
import vm from "node:vm";

const requiredFiles = ["index.html", "portfolio.css", "site.js", "portfolio-content.js", ".nojekyll", "project.html", "project-page.js"];
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

const projects = [...data.featuredProjects, ...data.otherProjects];
if (projects.length !== 21 || new Set(projects.map(p => p.id)).size !== 21) throw new Error('Expected 21 unique projects');
for (const p of projects) {
  for (const key of ['id', 'title', 'summary', 'roleSummary', 'period', 'problem', 'role', 'process', 'result']) {
    if (!p[key] || (Array.isArray(p[key]) && !p[key].length)) throw new Error('Missing ' + key + ' on ' + p.id);
  }
  if (p.workflow && (p.workflow.steps.length !== 4 || !p.workflow.caption)) throw new Error('Invalid workflow: ' + p.id);
}
for (const id of ['quant-agent','imputation','digital-bio']) {
  if (projects.some(p => p.id === id)) throw new Error('Removed project remains: ' + id);
}

const trackIds = new Set(data.tracks.map((track) => track.id));
for (const project of projects) {
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
