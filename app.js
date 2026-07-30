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

  const links = document.querySelector("#hero-links");
  links.append(
    element("strong", "profile-name", data.profile.name),
    element("span", "education", data.profile.education)
  );
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
    element("h3", "", project.title),
    element("p", "project-subtitle", project.subtitle)
  );
  const status = element("span", `status status-${project.track}`, project.status);
  header.append(identity, status);

  const body = element("div", "project-body");
  body.append(element("p", "project-summary", project.summary));
  if (project.media) {
    const figure = element("figure", "project-media");
    const image = element("img");
    image.src = project.media.src;
    image.alt = project.media.alt;
    image.loading = "lazy";
    figure.append(image, element("figcaption", "", project.media.alt));
    body.append(figure);
  }
  const details = element("dl", "project-details");
  details.append(
    detailBlock("문제", project.problem),
    detailBlock("역할", project.role),
    detailBlock("프로세스", project.process),
    detailBlock("검증", project.validation),
    detailBlock("결과", project.result),
    detailBlock("한계와 확장", project.limitation)
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
  const filters = [
    { id: "all", label: "전체" },
    ...data.tracks.map(({ id, title }) => ({ id, label: title }))
  ];
  const bar = document.querySelector("#filter-bar");
  const target = document.querySelector("#featured-projects");

  filters.forEach(({ id, label }, index) => {
    const button = element("button", index === 0 ? "filter active" : "filter", label);
    button.type = "button";
    button.dataset.filter = id;
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    bar.append(button);
  });

  data.featuredProjects.forEach((project, index) => target.append(projectArticle(project, index)));

  bar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    const selected = button.dataset.filter;

    bar.querySelectorAll(".filter").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    target.querySelectorAll(".project").forEach((project) => {
      project.hidden = selected !== "all" && project.dataset.track !== selected;
    });
  });
}

function renderTimeline() {
  const target = document.querySelector("#timeline");
  data.timeline.forEach((item) => {
    const row = element("article", `timeline-item timeline-${item.track}`);
    row.append(
      element("time", "", item.date),
      element("span", "timeline-marker"),
      element("h3", "", item.title),
      element("p", "", item.note)
    );
    target.append(row);
  });
}

function renderArchive() {
  const target = document.querySelector("#archive-grid");
  data.otherProjects.forEach((project) => {
    const article = element("article", "archive-item");
    article.append(
      element("span", "archive-category", project.category),
      element("h3", "", project.title),
      element("time", "", project.period),
      element("p", "", project.result)
    );
    target.append(article);
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
renderTimeline();
renderArchive();
renderCredentials();

document.querySelector("#print-button").addEventListener("click", () => window.print());

if (window.location.hash) {
  setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView(), 100);
}
