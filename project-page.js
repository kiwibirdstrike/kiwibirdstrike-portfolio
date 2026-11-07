const data = window.PORTFOLIO_DATA;
const target = document.querySelector("#project-detail-page");
const id = new URLSearchParams(window.location.search).get("id");
const project = data.projects.find((item) => item.id === id);

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function appendLinks(target, links) {
  links.forEach(({ label, href }) => {
    const link = element("a", "text-link", `${label} ↗`);
    link.href = href;
    link.target = "_blank";
    link.rel = "noreferrer";
    target.append(link);
  });
}

function prose(value) {
  const block = element("div", "case-prose");
  for (const text of Array.isArray(value) ? value : [value]) {
    const sentences = text.split(/(?<=[.!?])\s+(?=[가-힣A-Z“])/u);
    for (let i = 0; i < sentences.length; i += 2) {
      block.append(element("p", "", sentences.slice(i, i + 2).join(" ")));
    }
  }
  return block;
}

function technicalSection(number, title, items) {
  const section = element("section", "technical-section");
  const heading = element("div", "technical-section-heading");
  heading.append(
    element("span", "technical-section-number", number),
    element("h4", "", title)
  );
  const list = element("ol", "technical-list");
  items.forEach((item) => list.append(element("li", "", item)));
  section.append(heading, list);
  return section;
}

function workflowFigure(workflow) {
  const figure = element("figure", "workflow-figure");
  figure.append(element("h3", "", workflow.title));
  const steps = element("ol", `workflow-steps${workflow.parallel ? " workflow-parallel" : ""}`);
  for (const [index, step] of workflow.steps.entries()) {
    const item = element("li");
    item.append(element("span", "workflow-number", String(index + 1).padStart(2, "0")), element("h4", "", step.title), element("p", "", step.note));
    steps.append(item);
  }
  figure.append(steps, element("figcaption", "", workflow.caption));
  return figure;
}

function architectureFigure(project) {
  const figure = element("figure", "architecture-figure");
  const heading = element("div", "architecture-heading");
  heading.append(
    element("p", "eyebrow", "SYSTEM ARCHITECTURE"),
    element("h3", "architecture-title", project.architectureTitle)
  );

  const lanes = element("div", "architecture-lanes");
  project.architectureDiagram.forEach((stage) => {
    const lane = element("section", "architecture-stage");
    lane.append(element("h4", "architecture-stage-title", stage.title));
    const flow = element("div", "architecture-flow");
    stage.nodes.forEach((node) => {
      const card = element("div", "architecture-node");
      card.append(
        element("strong", "", node.label),
        element("span", "", node.note)
      );
      flow.append(card);
    });
    lane.append(flow);
    lanes.append(lane);
  });

  figure.append(heading, lanes, element("figcaption", "", project.architectureCaption));
  return figure;
}

function renderNotFound() {
  target.append(
    element("p", "eyebrow", "PROJECT NOT FOUND"),
    element("h1", "project-page-title", "프로젝트를 찾을 수 없습니다."),
    element("p", "project-page-lead", "메인 포트폴리오에서 프로젝트를 다시 선택해 주세요."),
    element("a", "text-link", "프로젝트 목록으로 돌아가기 ↗")
  );
  target.lastElementChild.href = "./index.html#projects";
}

function renderProject(project) {
  document.title = `${project.title} | 이주성 포트폴리오`;
  const header = element("header", "project-page-header");
  const back = element("a", "back-link", "← 프로젝트 목록");
  back.href = "./index.html#projects";
  header.append(
    back,
    element("p", "eyebrow", data.categories.find(category => category.id === project.category).title),
    element("p", "project-period", project.period),
    element("h1", "project-page-title", project.title),
    element("p", "project-page-subtitle", project.subtitle),
    element("span", `status status-${project.track}`, project.status)
  );

  const intro = element("p", "project-page-lead", project.summary);
  target.append(header, intro);

  const stages = [
    { id: "problem", label: "문제 정의", title: project.story.problem },
    { id: "approach", label: "판단과 실행", title: project.story.approach },
    ...(project.validation ? [{ id: "validation", label: "검증", title: project.story.validation }] : []),
    { id: "outcome", label: "결과와 배운 점", title: project.story.outcome },
  ];
  const map = element("nav", "case-map");
  map.setAttribute("aria-label", "프로젝트 흐름 — 각 단계의 설명으로 이동");
  const nodes = element("ol", "case-map-nodes");
  const sections = {};
  const mapLinks = [];
  stages.forEach(({ id, label, title }, index) => {
    const number = String(index + 1).padStart(2, "0");
    const node = element("li", "case-map-node");
    const link = element("a", "case-map-link");
    link.href = `#case-${id}`;
    link.append(element("span", "case-map-label", `${number} / ${label}`), element("strong", "", title));
    node.append(link);
    nodes.append(node);
    mapLinks.push({ link, id: `case-${id}` });
    const section = element("section", "case-section");
    section.id = `case-${id}`;
    section.setAttribute("tabindex", "-1");
    section.setAttribute("aria-labelledby", `${section.id}-title`);
    const heading = element("h2", "case-section-title", title);
    heading.id = `${section.id}-title`;
    section.append(element("p", "case-stage-label", `${number} / ${label}`), heading);
    sections[id] = section;
  });
  map.append(nodes);
  target.append(map);

  sections.problem.append(prose(project.problem), element("h3", "case-subheading", "내 역할과 목표"), prose(project.role));
  const decision = element("aside", "case-decision");
  decision.setAttribute("aria-label", "핵심 판단");
  decision.append(element("h3", "case-subheading", "핵심 판단"), prose(project.decision));
  sections.approach.append(decision);
  if (project.workflow) sections.approach.append(workflowFigure(project.workflow));
  if (project.architectureDiagram) sections.approach.append(architectureFigure(project));
  sections.approach.append(element("h3", "case-subheading", "수행 과정"), prose(project.process));
  if (project.technicalSections) {
    const technical = element("div", "technical-deep-dive");
    technical.append(
      element("p", "eyebrow", "TECHNICAL DEEP DIVE"),
      element("h3", "technical-deep-dive-title", "설계와 구현의 세부 내용")
    );
    project.technicalSections.forEach(({ title, items }, index) => {
      technical.append(technicalSection(String(index + 1).padStart(2, "0"), title, items));
    });
    sections.approach.append(technical);
  } else if (project.technicalDetails) {
    const technical = element("div", "technical-deep-dive");
    technical.append(
      element("p", "eyebrow", "TECHNICAL DEEP DIVE"),
      element("h3", "technical-deep-dive-title", "설계와 구현의 세부 내용"),
      technicalSection("01", "시스템 구조", project.technicalDetails.architecture),
      technicalSection("02", "데이터 흐름", project.technicalDetails.dataFlow),
      technicalSection("03", "구현 핵심", project.technicalDetails.implementation),
      technicalSection("04", "기술적 판단", project.technicalDetails.decisions),
      technicalSection("05", "실험과 검증", project.technicalDetails.experiments)
    );
    sections.approach.append(technical);
  }
  if (project.validation) sections.validation.append(prose(project.validation));
  sections.outcome.append(prose(project.result));
  if (project.media) {
    const figure = element("figure", "project-media");
    const image = element("img");
    image.src = project.media.src;
    image.alt = project.media.alt;
    image.loading = "lazy";
    figure.append(image, element("figcaption", "", project.media.alt));
    sections.outcome.append(figure);
  }
  if (project.limitation) sections.outcome.append(element("h3", "case-subheading", "한계와 다음 과제"), prose(project.limitation));
  for (const stage of stages) target.append(sections[stage.id]);
  const syncSelection = () => {
    for (const item of mapLinks) item.link.setAttribute("aria-current", window.location.hash === `#${item.id}` ? "step" : "false");
  };
  window.addEventListener("hashchange", syncSelection);
  syncSelection();
  if (project.links.length) {
    const links = element("div", "project-links project-page-links");
    appendLinks(links, project.links);
    target.append(links);
  }
}

(project ? renderProject(project) : renderNotFound());
