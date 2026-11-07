import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

class Element {
  constructor(tag) {
    this.tag = tag;
    this.children = [];
    this.dataset = {};
    this.attributes = {};
    this.handlers = {};
    this.className = '';
    this.classList = { toggle() {} };
  }
  append(...children) { this.children.push(...children); }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, handler) { this.handlers[name] = handler; }
  closest() { return this; }
  focus() { this.focused = true; }
  querySelectorAll(selector) {
    return this.children.flatMap(child => [
      ...(child.className.split(' ').includes(selector.slice(1)) ? [child] : []),
      ...child.querySelectorAll(selector),
    ]);
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0]; }
  get lastElementChild() { return this.children.at(-1); }
}

const roots = {};
const document = {
  createElement: tag => new Element(tag),
  querySelector: selector => roots[selector] ??= new Element('div'),
  querySelectorAll: () => [],
};
const windowHandlers = {};
const context = { document, window: { location: { hash: '' }, addEventListener: (name, handler) => { windowHandlers[name] = handler; } } };
vm.createContext(context);
for (const file of ['portfolio-content.js', 'site.js']) {
  vm.runInContext(readFileSync(new URL(`../${file}`, import.meta.url), 'utf8'), context);
}
const archive = roots['#project-archive'];
const filters = roots['#filter-bar'];
const more = roots['#load-more'];
const articles = archive.querySelectorAll('.project');
const visible = () => articles.filter(article => !article.hidden);
const select = id => filters.handlers.click({ target: filters.children.find(button => button.dataset.filter === id) });

assert.equal(visible().length, 5);
assert.equal(more.hidden, false);
for (const expected of [10, 15, 20]) {
  const firstNew = articles.find(article => article.hidden);
  more.handlers.click();
  assert.equal(visible().length, expected);
  assert.equal(firstNew.querySelector('.project-title-link').focused, true);
  assert.equal(more.hidden, expected === 20);
}
for (const category of context.window.PORTFOLIO_DATA.categories) {
  select(category.id);
  assert.equal(visible().length, context.window.PORTFOLIO_DATA.projects.filter(p => p.category === category.id).length);
  assert.equal(more.hidden, true);
  for (const section of archive.children) assert.equal(section.hidden, section.dataset.category !== category.id);
}
select('all');
assert.equal(visible().length, 5);
assert.equal(more.hidden, false);
for (const section of archive.children) {
  assert.equal(section.hidden, section.querySelectorAll('.project').every(article => article.hidden));
}
const nodes = roots['#process-nodes'].children;
const stages = roots['#skills-list'].children;
assert.equal(nodes.length, 6);
nodes.forEach((node, index) => assert.equal(node.children[0].href, `#${stages[index].id}`));
nodes[0].children[0].handlers.click();
assert.equal(stages[0].querySelector('.skill-select').attributes['aria-pressed'], 'true');
stages[2].handlers.click({ target: { closest: () => null } });
assert.equal(stages[2].querySelector('.skill-select').attributes['aria-pressed'], 'true');
assert.equal(stages[0].querySelector('.skill-select').attributes['aria-pressed'], 'false');
assert.equal(nodes[2].children[0].attributes['aria-current'], 'step');
stages[4].handlers.click({ target: { closest: () => ({ tag: 'a' }) } });
assert.equal(stages[2].querySelector('.skill-select').attributes['aria-pressed'], 'true');
context.window.location.hash = '#process-stage-2';
windowHandlers.hashchange();
assert.equal(stages[1].querySelector('.skill-select').attributes['aria-pressed'], 'true');
assert.equal(stages[2].querySelector('.skill-select').attributes['aria-pressed'], 'false');
assert.equal(roots['#hero-lead'].children.length, 3);
for (const article of articles) {
  const disclosure = article.querySelector('.project-expand');
  assert.equal(disclosure.querySelectorAll('.project-detail').length, 2);
  assert.equal(disclosure.querySelectorAll('.project-media').length, 0);
}
console.log('PASS: pagination to 20; categories; focus; diagram/row selection; hash changes; concise disclosures; 3 intro paragraphs');
const detailScript = readFileSync(new URL('../project-page.js', import.meta.url), 'utf8');
for (const project of context.window.PORTFOLIO_DATA.projects) {
  const target = new Element('main');
  const detailHandlers = {};
  const location = { search: `?id=${project.id}`, hash: '' };
  vm.runInNewContext(detailScript, {
    window: { PORTFOLIO_DATA: context.window.PORTFOLIO_DATA, location, addEventListener: (name, handler) => { detailHandlers[name] = handler; } },
    document: { ...document, querySelector: () => target },
    URLSearchParams,
  });
  assert(target.children.length > 2, project.id);
  const sections = target.querySelectorAll('.case-section');
  const links = target.querySelectorAll('.case-map-link');
  assert.equal(sections.length, project.validation ? 4 : 3);
  assert.equal(links.length, sections.length);
  links.forEach((link, index) => assert.equal(link.href, `#${sections[index].id}`));
  location.hash = '#case-approach';
  detailHandlers.hashchange();
  assert.equal(links[1].attributes['aria-current'], 'step');
  assert.equal(links[0].attributes['aria-current'], 'false');
  assert.equal(target.querySelectorAll('.workflow-figure').length, project.workflow ? 1 : 0);
  assert.equal(target.querySelectorAll('.architecture-figure').length, project.architectureDiagram ? 1 : 0);
  assert.equal(target.querySelectorAll('.project-media').length, project.media ? 1 : 0);
  const textOf = node => [node.textContent || '', ...node.children.map(textOf)].join(' ');
  const normalized = textOf(target).replace(/\s+/g, '');
  for (const field of ['problem', 'role', 'decision', 'process', 'validation', 'result', 'limitation']) {
    for (const text of [project[field]].flat().filter(Boolean)) {
      assert(normalized.includes(text.replace(/\s+/g, '')), `${project.id}: missing ${field}`);
    }
  }
}
const missing = new Element('main');
vm.runInNewContext(detailScript, {
  window: { PORTFOLIO_DATA: context.window.PORTFOLIO_DATA, location: { search: '?id=fire-law-search' } },
  document: { ...document, querySelector: () => missing }, URLSearchParams,
});
assert.equal(missing.lastElementChild.href, './index.html#projects');
console.log('PASS: 20 detail flows, links, figures, full source text and removed-project fallback');
