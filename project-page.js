const data = window.PORTFOLIO_DATA;
const target = document.querySelector("#project-detail-page");
const id = new URLSearchParams(window.location.search).get("id");
const project = data.featuredProjects.find((item) => item.id === id);

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
  details.append(
    detailBlock("문제", project.problem),
    detailBlock("역할", project.role),
    detailBlock("프로세스", project.process),
    detailBlock("검증", project.validation),
    detailBlock("결과", project.result),
    detailBlock("한계와 확장", project.limitation)
  );

  target.append(header, intro, details);
  if (project.technicalDetails) {
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
