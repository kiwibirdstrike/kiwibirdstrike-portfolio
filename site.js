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
  document.querySelector("#hero-eyebrow").textContent = data.profile.eyebrow;
  document.querySelector("#hero-title").textContent = data.profile.title;
  document.querySelector("#hero-lead").textContent = data.profile.lead;

  const principles = document.querySelector("#hero-principles");
  data.profile.principles.forEach((item) => principles.append(element("li", "", item)));

  document.querySelector("#profile-name").textContent = data.profile.name;
  document.querySelector("#profile-education").textContent = data.profile.education;

  const links = document.querySelector("#hero-links");
  appendLinks(links, data.profile.links);
}

function renderTracks() {
  const target = document.querySelector("#track-grid");
  data.tracks.forEach((track) => {
    const article = element("article", `track track-${track.id}`);
    article.dataset.track = track.id;
    article.append(
      element("h3", "", track.title),
      element("p", "", track.summary),
      element("small", "", track.evidence)
    );
    target.append(article);
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

function projectArticle(project, index) {
  const article = element("article", "project");
  article.dataset.track = project.track;

  const header = element("div", "project-header");
  const identity = element("div", "project-identity");
  identity.append(
    element("span", "project-count", String(index + 1).padStart(2, "0")),
    element("p", "project-period", project.period),
    element("h4", "", project.title),
    element("p", "project-subtitle", project.subtitle)
  );
  const status = element("span", `status status-${project.track}`, project.status);
  const actions = element("div", "project-header-actions");
  const detailLink = element("a", "project-detail-link", "상세 보기 ↗");
  detailLink.href = `./project.html?id=${encodeURIComponent(project.id)}`;
  actions.append(status, detailLink);
  header.append(identity, actions);

  const body = element("div", "project-body");
  body.append(element("p", "project-summary", project.summary));
  if (project.media) {
    const figure = element("figure", "project-media");
    const image = element("img");
    image.src = project.media.src;
    image.alt = project.media.alt;
    image.loading = "eager";
    figure.append(image, element("figcaption", "", project.media.alt));
    body.append(figure);
  }
  const details = element("dl", "project-details");
  details.append(
    detailBlock("내 역할", project.roleSummary),
    detailBlock("핵심 판단", project.decision || project.summary)
  );
  body.append(details);

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
  const filters = [{ id: "all", title: "전체" }, ...data.categories];
  for (const { id, title } of filters) {
    const count = data.projects.filter(p => id === "all" || p.category === id).length;
    const button = element("button", id === "all" ? "filter active" : "filter", `${title} · ${count}`);
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
    data.projects.filter(p => p.category === category.id).forEach((project, index) => {
      section.append(projectArticle(project, index));
    });
    target.append(section);
  }
  bar.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    for (const item of bar.querySelectorAll(".filter")) {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    }
    for (const section of target.querySelectorAll(".archive-group")) {
      section.hidden = button.dataset.filter !== "all" && section.dataset.category !== button.dataset.filter;
    }
  });
}

function renderCredentials() {
  const target = document.querySelector("#credentials-list");
  data.credentials.forEach((item) => {
    const article = element("article", "credential");
    article.append(
      element("span", "", item.type),
      element("h3", "", item.title),
      element("p", "", item.meta)
    );
    target.append(article);
  });
}

renderProfile();
renderTracks();
renderProjects();
renderCredentials();

document.querySelector("#print-button").addEventListener("click", () => window.print());

function scrollToCurrentHash() {
  if (!window.location.hash) return;
  document.querySelector(window.location.hash)?.scrollIntoView();
}

if (window.location.hash) {
  requestAnimationFrame(() => requestAnimationFrame(scrollToCurrentHash));
  window.addEventListener("load", scrollToCurrentHash, { once: true });
  document.querySelectorAll("img").forEach((image) => {
    if (!image.complete) image.addEventListener("load", scrollToCurrentHash, { once: true });
  });
}
