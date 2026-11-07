import { readFileSync, statSync } from "node:fs";
import vm from "node:vm";

const requiredFiles = ["index.html", "portfolio.css", "site.js", "portfolio-content.js", "project-visuals.js", ".nojekyll", "project.html", "project-page.js"];
const requiredKeys = [
  "profile",
  "tracks",
  "categories",
  "projects",
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

const projects = data.projects;
vm.runInNewContext(readFileSync(new URL('../project-visuals.js', import.meta.url), 'utf8'), context);
const visuals = context.window.PROJECT_VISUALS;
if (Object.keys(visuals).length !== projects.length) throw new Error('Visual project coverage mismatch');
for (const project of projects) {
  if (!visuals[project.id]?.length) throw new Error('Missing visual: ' + project.id);
  for (const visual of visuals[project.id]) {
    const fail = () => { throw new Error('Invalid visual: ' + project.id + ' / ' + visual.title); };
    if (!visual.title || !visual.caption || !['approach', 'validation', 'outcome'].includes(visual.placement) || (visual.placement === 'validation' && !project.validation) || !visual.sources?.length || visual.sources.some(key => !project[key])) fail();
    const source = visual.sources.map(key => JSON.stringify(project[key])).join(' ');
    if (visual.type === 'image') {
      if (!visual.alt || !visual.credit || !(visual.width > 0) || !(visual.height > 0) || !visual.src.startsWith('./assets/projects/') || !statSync(new URL('../' + visual.src, import.meta.url)).isFile()) fail();
    } else if (visual.type === 'architecture') {
      if (!visual.lanes.length || visual.lanes.some(lane => !lane.title || lane.stages.length < 2 || lane.stages.length > 4 || lane.stages.some(stage => !stage.label || !stage.nodes.length || stage.nodes.some(node => !node.title || !node.text)))) fail();
    } else if (visual.type === 'table') {
      if (!visual.columns.length || !visual.rows.length || visual.rows.some(row => row.length !== visual.columns.length || row.some(cell => !cell))) fail();
    } else if (visual.type === 'bars') {
      if (!(visual.max > 0) || !visual.rows.length || visual.rows.some(row => !row.label || !row.display || !Number.isFinite(row.value) || row.value < 0 || row.value > visual.max || (row.evidence && !source.includes(row.evidence)))) fail();
      if (visual.derivation) {
        const { baseline, increasePercent } = visual.derivation;
        if (!source.includes(`${increasePercent}%`) || visual.rows[0].value !== baseline || Math.abs(visual.rows[1].value - baseline * (1 + increasePercent / 100)) > 1e-9) fail();
      }
    } else if (visual.type === 'composition') {
      if (visual.total !== 2674 || visual.selected !== 1470 || (visual.selected / visual.total * 100).toFixed(1) !== '55.0' || visual.conditions.length !== 2) fail();
    } else fail();
  }
}
for (const skill of data.profile.skills) {
  if (!skill.category || !skill.question || !skill.items || !skill.example || !projects.some(p => p.id === skill.projectId)) {
    throw new Error('Incomplete capability stage or invalid project link');
  }
}
if (projects.length !== 20 || new Set(projects.map(p => p.id)).size !== 20) throw new Error('Expected 20 unique projects');
for (const p of projects) {
  for (const key of ['id', 'title', 'summary', 'roleSummary', 'decision', 'period', 'problem', 'role', 'process', 'result']) {
    if (!p[key] || (Array.isArray(p[key]) && !p[key].length)) throw new Error('Missing ' + key + ' on ' + p.id);
  }
  if (p.workflow && (p.workflow.steps.length !== 4 || !p.workflow.caption)) throw new Error('Invalid workflow: ' + p.id);
  for (const key of ['problem', 'approach', 'outcome', ...(p.validation ? ['validation'] : [])]) {
    if (!p.story?.[key]) throw new Error('Missing story stage ' + key + ' on ' + p.id);
  }
}
for (const id of ['quant-agent','imputation','digital-bio','fire-law-search']) {
  if (projects.some(p => p.id === id)) throw new Error('Removed project remains: ' + id);
}

const trackIds = new Set(data.tracks.map((track) => track.id));
for (const project of projects) {
  if (!trackIds.has(project.track)) throw new Error(`Unknown track on project: ${project.id}`);
  if (project.architectureDiagram && (!project.architectureTitle || !project.architectureCaption)) {
    throw new Error(`Architecture diagram needs a title and caption: ${project.id}`);
  }
}
const categoryIds = new Set(data.categories.map(c => c.id));
for (const p of projects) {
  if (!categoryIds.has(p.category)) throw new Error('Unknown category: ' + p.id);
}
if (projects.find(p => p.id === 'port-matching').category !== 'modeling') throw new Error('Ship matching must be modeling');
if (projects.find(p => p.id === 'gcer').category !== 'research') throw new Error('GCER must be research');
if (projects.find(p => p.id === 'worldquant').category !== 'other') throw new Error('WorldQuant must be other');

const gcer = data.projects.find((project) => project.id === "gcer");
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
if ("credentials" in data || html.includes('credentials-list') || html.includes('credentials-title')) {
  throw new Error("Removed credentials section remains");
}
if (html.includes('id="history"') || html.includes('id="featured-projects"') || !html.includes('id="project-archive"')) {
  throw new Error("Expected a single categorized archive without the history section");
}
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
