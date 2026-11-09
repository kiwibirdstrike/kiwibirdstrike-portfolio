const data = window.PORTFOLIO_DATA;

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

function renderProfile() {
  document.querySelector("#hero-title").textContent = data.profile.title;
  const lead = document.querySelector("#hero-lead");
  data.profile.lead.split("\n").forEach(paragraph => lead.append(element("p", "", paragraph)));

  const skills = document.querySelector("#skills-list");
  const processNodes = document.querySelector("#process-nodes");
  const stageViews = [];
  function selectStage(id) {
    for (const view of stageViews) {
      const selected = view.row.id === id;
      view.row.classList.toggle("is-selected", selected);
      view.button.setAttribute("aria-pressed", String(selected));
      view.link.setAttribute("aria-current", selected ? "step" : "false");
    }
  }
  function centerStage(row) {
    selectStage(row.id);
    row.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  data.profile.skills.forEach(({ category, question, items, example, projectId }, index) => {
    const node = element("li", "process-node");
    const link = element("a", "process-link");
    link.href = `#process-stage-${index + 1}`;
    link.append(element("span", "process-number", String(index + 1).padStart(2, "0")), element("span", "", category));
    node.append(link);
    processNodes.append(node);
    const row = element("li", "skill-row");
    row.id = `process-stage-${index + 1}`;
    row.setAttribute("tabindex", "-1");
    const stage = element("div", "skill-stage");
    const number = element("span", "skill-number", String(index + 1).padStart(2, "0"));
    number.setAttribute("aria-hidden", "true");
    const heading = element("h3");
    const button = element("button", "skill-select", category);
    button.type = "button";
    button.setAttribute("aria-label", `${category} 단계 선택`);
    button.setAttribute("aria-pressed", "false");
    heading.append(button);
    stage.append(number, heading);
    const reasoning = element("div", "skill-reasoning");
    reasoning.append(element("p", "skill-question", question), element("p", "skill-description", items));
    const evidence = element("a", "skill-example", example);
    evidence.href = `./project.html?id=${encodeURIComponent(projectId)}`;
    row.append(stage, reasoning, evidence);
    stageViews.push({ row, button, link });
    link.addEventListener("click", event => {
      event.preventDefault();
      window.history.pushState(null, "", link.href);
      centerStage(row);
      row.focus({ preventScroll: true });
    });
    row.addEventListener("click", event => {
      if (!event.target.closest("a")) centerStage(row);
    });
    skills.append(row);
  });
  const selectFromHash = () => selectStage(window.location.hash.slice(1));
  window.addEventListener("hashchange", selectFromHash);
  selectFromHash();
  let framePending = false;
  function selectCenteredStage() {
    framePending = false;
    const center = window.innerHeight / 2;
    const bounds = skills.getBoundingClientRect();
    if (bounds.top > center || bounds.bottom < center) return;
    const nearest = stageViews.reduce((best, view) => {
      const rect = view.row.getBoundingClientRect();
      const distance = Math.abs((rect.top + rect.bottom) / 2 - center);
      return !best || distance < best.distance ? { view, distance } : best;
    }, null);
    selectStage(nearest.view.row.id);
  }
  function scheduleStageSelection() {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(selectCenteredStage);
  }
  window.addEventListener("scroll", scheduleStageSelection, { passive: true });
  window.addEventListener("resize", scheduleStageSelection);
  scheduleStageSelection();

  document.querySelector("#profile-name").textContent = data.profile.name;
  document.querySelector("#profile-education").textContent = data.profile.education;

  const links = document.querySelector("#hero-links");
  appendLinks(links, data.profile.links);
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

function projectArticle(project) {
  const article = element("article", "project");
  article.dataset.track = project.track;

  const header = element("div", "project-header");
  const identity = element("div", "project-identity");
  const title = element("h4");
  const titleLink = element("a", "project-title-link", project.title);
  titleLink.href = `./project.html?id=${encodeURIComponent(project.id)}`;
  const arrow = element("span", "project-arrow", "↗");
  arrow.setAttribute("aria-hidden", "true");
  titleLink.append(arrow);
  title.append(titleLink);
  identity.append(title, element("p", "project-period", project.period));
  const status = element("span", `status status-${project.track}`, project.status);
  const actions = element("div", "project-header-actions");
  actions.append(status);
  header.append(identity, actions);

  const body = element("div", "project-body");
  body.append(element("p", "project-summary", project.summary));
  const expandable = element("details", "project-expand");
  const disclosure = element("summary", "", "역할과 판단");
  disclosure.setAttribute("aria-label", `${project.title} — 역할과 판단`);
  expandable.append(disclosure);
  const details = element("dl", "project-details");
  details.append(
    detailBlock("내 역할", project.roleSummary),
    detailBlock("핵심 판단", project.decision)
  );
  expandable.append(details);
  body.append(expandable);

  if (project.links.length) {
    const links = element("div", "project-links");
    appendLinks(links, project.links);
    body.append(links);
  }

  article.append(header, body);
  return article;
}

function renderProjects() {
  const bar = document.querySelector("#filter-bar");
  const target = document.querySelector("#project-archive");
  const result = document.querySelector("#filter-result");
  const more = document.querySelector("#load-more");
  const groups = [];
  let selectedCategory = "all";
  let visibleLimit = 5;
  const filters = [{ id: "all", title: "전체" }, ...data.categories];
  for (const { id, title } of filters) {
    const count = data.projects.filter(p => id === "all" || p.category === id).length;
    const button = element("button", id === "all" ? "filter active" : "filter");
    button.append(element("span", "filter-label", title), element("span", "filter-count", count));
    button.type = "button";
    button.dataset.filter = id;
    button.setAttribute("aria-pressed", String(id === "all"));
    bar.append(button);
  }
  for (const category of data.categories) {
    const section = element("section", "archive-group");
    section.dataset.category = category.id;
    const heading = element("h3", "archive-group-title", category.title);
    heading.id = `category-${category.id}`;
    section.setAttribute("aria-labelledby", heading.id);
    section.append(heading);
    const articles = data.projects.filter(p => p.category === category.id).map(projectArticle);
    articles.forEach(article => section.append(article));
    groups.push({ category: category.id, section, articles });
    target.append(section);
  }
  function updateVisibleProjects() {
    let visibleCount = 0;
    for (const group of groups) {
      let groupCount = 0;
      for (const article of group.articles) {
        const show = selectedCategory === "all"
          ? visibleCount < visibleLimit
          : group.category === selectedCategory;
        article.hidden = !show;
        if (show) { visibleCount += 1; groupCount += 1; }
      }
      group.section.hidden = groupCount === 0;
    }
    more.hidden = selectedCategory !== "all" || visibleCount === data.projects.length;
    return visibleCount;
  }
  updateVisibleProjects();
  more.addEventListener("click", () => {
    const firstNewArticle = groups.flatMap(group => group.articles).find(article => article.hidden);
    visibleLimit += 5;
    updateVisibleProjects();
    result.textContent = "프로젝트를 추가로 표시했습니다.";
    firstNewArticle.querySelector(".project-title-link").focus();
  });
  bar.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    for (const item of bar.querySelectorAll(".filter")) {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    }
    selectedCategory = button.dataset.filter;
    visibleLimit = 5;
    updateVisibleProjects();
    const selected = data.categories.find(category => category.id === button.dataset.filter);
    result.textContent = `${selected?.title || "전체"} 프로젝트를 표시했습니다.`;
  });
}

function renderTimeline() {
  const timeline = document.querySelector("#project-timeline");
  const projects = data.projects.map(project => {
    const [, year, month, day] = project.period.match(/^(\d{4})(?:년\s*|\.)(\d{1,2})(?:(?:월\s*|\.)(\d{1,2}))?/);
    return { project, year, start: Number(year) * 10000 + Number(month) * 100 + Number(day || 0) };
  }).sort((a, b) => a.start - b.start);
  let currentYear;
  let list;
  for (const { project, year } of projects) {
    if (year !== currentYear) {
      const group = element("section", "timeline-year");
      const heading = element("h3", "", year);
      heading.id = `timeline-year-${year}`;
      group.setAttribute("aria-labelledby", heading.id);
      list = element("ol", "timeline-list");
      group.append(heading, list);
      timeline.append(group);
      currentYear = year;
    }
    const item = element("li", "timeline-item");
    item.dataset.projectId = project.id;
    const link = element("a", "timeline-link", project.title);
    link.href = `./project.html?id=${encodeURIComponent(project.id)}`;
    const category = data.categories.find(category => category.id === project.category);
    item.append(
      element("p", "timeline-period", project.period),
      link,
      element("p", "timeline-category", category.title)
    );
    list.append(item);
  }
}

renderProfile();
renderProjects();
renderTimeline();

function scrollToCurrentHash() {
  if (!window.location.hash) return;
  document.querySelector(window.location.hash)?.scrollIntoView({ block: window.location.hash.startsWith("#process-stage-") ? "center" : "start" });
}

if (window.location.hash) {
  requestAnimationFrame(() => requestAnimationFrame(scrollToCurrentHash));
  window.addEventListener("load", scrollToCurrentHash, { once: true });
  document.querySelectorAll("img").forEach((image) => {
    if (!image.complete) image.addEventListener("load", scrollToCurrentHash, { once: true });
  });
}
