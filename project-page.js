const data = window.PORTFOLIO_DATA;
const target = document.querySelector("#project-detail-page");
const id = new URLSearchParams(window.location.search).get("id");
const project = [...data.featuredProjects, ...data.otherProjects].find((item) => item.id === id);

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

function detailBlock(label, value) {
  const block = element("div", "project-detail");
  block.append(element("dt", "", label));
  if (Array.isArray(value)) {
    const list = element("ul");
    value.forEach((item) => list.append(element("li", "", item)));
    const description = element("dd");
    description.append(list);
    block.append(description);
  } else {
    block.append(element("dd", "", value));
  }
  return block;
}

function technicalSection(number, title, items) {
  const section = element("section", "technical-section");
  const heading = element("div", "technical-section-heading");
  heading.append(
    element("span", "technical-section-number", number),
    element("h2", "", title)
  );
  const list = element("ol", "technical-list");
  items.forEach((item) => list.append(element("li", "", item)));
  section.append(heading, list);
  return section;
}

function workflowFigure(workflow) {
  const figure = element("figure", "workflow-figure");
  figure.append(element("h2", "", workflow.title));
  const steps = element("ol", `workflow-steps${workflow.parallel ? " workflow-parallel" : ""}`);
  for (const [index, step] of workflow.steps.entries()) {
    const item = element("li");
    item.append(element("span", "workflow-number", String(index + 1).padStart(2, "0")), element("h3", "", step.title), element("p", "", step.note));
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
    element("h2", "architecture-title", project.architectureTitle)
  );

  const lanes = element("div", "architecture-lanes");
  project.architectureDiagram.forEach((stage) => {
    const lane = element("section", "architecture-stage");
    lane.append(element("h3", "architecture-stage-title", stage.title));
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
    element("p", "project-period", project.period),
    element("h1", "project-page-title", project.title),
    element("p", "project-page-subtitle", project.subtitle),
    element("span", `status status-${project.track}`, project.status)
  );

  const intro = element("p", "project-page-lead", project.summary);
  const details = element("dl", "project-details project-page-details");
  for (const [label, value] of [
    ["해결하려던 문제", project.problem],
    ["내 역할과 목표", project.role],
    ["핵심 판단", project.decision],
    ["수행 과정", project.process],
    ["검증", project.validation],
    ["결과와 배운 점", project.result],
    ["한계와 확장", project.limitation]
  ]) {
    if (value && (!Array.isArray(value) || value.length)) details.append(detailBlock(label, value));
  }

  target.append(header, intro);
  if (project.workflow) target.append(workflowFigure(project.workflow));
  if (project.architectureDiagram) {
    target.append(architectureFigure(project));
  }
  target.append(details);
  if (project.technicalSections) {
    const technical = element("div", "technical-deep-dive");
    technical.append(
      element("p", "eyebrow", "TECHNICAL DEEP DIVE"),
      element("h2", "technical-deep-dive-title", "어떻게 설계하고 검증했는가")
    );
    project.technicalSections.forEach(({ title, items }, index) => {
      technical.append(technicalSection(String(index + 1).padStart(2, "0"), title, items));
    });
    target.append(technical);
  } else if (project.technicalDetails) {
    const technical = element("div", "technical-deep-dive");
    technical.append(
      element("p", "eyebrow", "TECHNICAL DEEP DIVE"),
      element("h2", "technical-deep-dive-title", "어떻게 설계하고 검증했는가"),
      technicalSection("01", "시스템 구조", project.technicalDetails.architecture),
      technicalSection("02", "데이터 흐름", project.technicalDetails.dataFlow),
      technicalSection("03", "구현 핵심", project.technicalDetails.implementation),
      technicalSection("04", "기술적 판단", project.technicalDetails.decisions),
      technicalSection("05", "실험과 검증", project.technicalDetails.experiments)
    );
    target.append(technical);
  }
  if (project.links.length) {
    const links = element("div", "project-links project-page-links");
    appendLinks(links, project.links);
    target.append(links);
  }
}

(project ? renderProject(project) : renderNotFound());
