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

function visualFigure(visual, index) {
  const figure = element("figure", `project-visual visual-${visual.type}`);
  figure.id = `visual-${index + 1}`;
  const heading = element("h3", "visual-title", visual.title);
  heading.id = `${figure.id}-title`;
  figure.setAttribute("aria-labelledby", heading.id);
  figure.append(heading);

  if (visual.type === "image") {
    const link = element("a", "paper-figure-link");
    link.href = visual.src;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `${visual.title} — 큰 이미지 열기`);
    const img = element("img");
    img.src = visual.src;
    img.alt = visual.alt;
    img.loading = "lazy";
    img.width = visual.width;
    img.height = visual.height;
    link.append(img);
    figure.append(link, element("p", "paper-figure-source", `${visual.credit} · 그림을 누르면 크게 볼 수 있습니다.`));
  } else if (visual.type === "architecture") {
    for (const lane of visual.lanes) {
      const section = element("section", "system-lane");
      section.append(element("h4", "system-lane-title", lane.title));
      const stages = element("ol", `system-stages system-stages-${lane.stages.length}`);
      for (const stage of lane.stages) {
        const step = element("li", "system-stage");
        step.append(element("p", "system-stage-label", stage.label));
        for (const node of stage.nodes) {
          const box = element("div", "system-node");
          box.append(element("strong", "", node.title), element("p", "", node.text));
          step.append(box);
        }
        stages.append(step);
      }
      section.append(stages);
      figure.append(section);
    }
    if (visual.loop) figure.append(element("p", "system-loop", `↶ ${visual.loop}`));
  } else if (visual.type === "table") {
    const table = element("table", "evidence-table");
    table.setAttribute("aria-labelledby", heading.id);
    const head = element("thead");
    const header = element("tr");
    for (const label of visual.columns) {
      const cell = element("th", "", label);
      cell.setAttribute("scope", "col");
      header.append(cell);
    }
    head.append(header);
    const body = element("tbody");
    for (const values of visual.rows) {
      const row = element("tr");
      values.forEach((value, column) => {
        const cell = element(column === 0 ? "th" : "td", "", value);
        if (column === 0) cell.setAttribute("scope", "row");
        row.append(cell);
      });
      body.append(row);
    }
    table.append(head, body);
    figure.append(table);
  } else if (visual.type === "bars") {
    const axis = element("div", "bar-axis");
    axis.setAttribute("aria-hidden", "true");
    [0, visual.max / 2, visual.max].forEach(value => axis.append(element("span", "", `${value}${visual.unit === "%" ? "%" : ""}`)));
    figure.append(element("p", "visual-unit", `단위: ${visual.unit}`), axis);
    const rows = element("ul", "bar-rows");
    for (const row of visual.rows) {
      const item = element("li", "bar-row");
      const label = element("div", "bar-label");
      label.append(element("span", "", row.label), element("strong", "", row.display));
      const track = element("div", "bar-track");
      track.setAttribute("aria-hidden", "true");
      const fill = element("div", `bar-fill${row.reference ? " bar-reference" : ""}`);
      fill.style.width = `${row.value / visual.max * 100}%`;
      track.append(fill);
      item.append(label, track);
      rows.append(item);
    }
    figure.append(rows);
  } else if (visual.type === "composition") {
    figure.append(element("p", "visual-unit", `전체 응답자 ${visual.total.toLocaleString("ko-KR")}명 · 다음 두 조건에 모두 해당`));
    const conditions = element("ul", "cohort-conditions");
    visual.conditions.forEach(condition => conditions.append(element("li", "", condition)));
    const track = element("div", "composition-track");
    track.setAttribute("aria-hidden", "true");
    const legend = element("ul", "composition-legend");
    [[visual.selectedLabel, visual.selected], [visual.otherLabel, visual.total - visual.selected]].forEach(([label, count], group) => {
      const percentage = count / visual.total * 100;
      const segment = element("div", `composition-segment composition-${group}`);
      segment.style.width = `${percentage}%`;
      track.append(segment);
      const item = element("li", `composition-key composition-${group}`);
      item.append(element("span", "", label), element("strong", "", `${count.toLocaleString("ko-KR")}명 · ${percentage.toFixed(1)}%`));
      legend.append(item);
    });
    figure.append(conditions, track, legend);
  }
  figure.append(element("figcaption", "", visual.caption));
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
  const visuals = window.PROJECT_VISUALS[project.id];
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
    { id: "outcome", label: "결과", title: project.story.outcome },
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
  if (project.workflow && !visuals.some(visual => visual.replacesWorkflow)) sections.approach.append(workflowFigure(project.workflow));
  if (project.architectureDiagram) sections.approach.append(architectureFigure(project));
  visuals.forEach((visual, index) => {
    if (visual.placement === "approach") sections.approach.append(visualFigure(visual, index));
  });
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
  visuals.forEach((visual, index) => {
    if (visual.placement === "outcome") sections.outcome.append(visualFigure(visual, index));
  });
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
