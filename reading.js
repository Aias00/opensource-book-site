'use strict';
const root = document.documentElement;
const themeButton = document.querySelector('#theme');
const stored = (() => { try { return localStorage.getItem('apache-book-theme'); } catch { return null; } })();
root.dataset.theme = stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
function updateThemeButton() {
  themeButton.textContent = root.dataset.theme === 'dark' ? '浅色模式' : '深色模式';
}
updateThemeButton();
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  updateThemeButton();
  try { localStorage.setItem('apache-book-theme', root.dataset.theme); } catch { /* Storage may be disabled. */ }
});
const chapters = document.querySelector('#chapters');
const mobile = matchMedia('(max-width: 680px)');
if (mobile.matches) chapters.open = false;
const search = document.querySelector('#chapter-search');
search.hidden = false;
const status = document.querySelector('#search-status');
const topItems = [...document.querySelectorAll('nav > ul > li')];
search.addEventListener('input', () => {
  const query = search.value.trim().toLocaleLowerCase();
  let count = 0;
  topItems.forEach(item => {
    const matches = item.textContent.toLocaleLowerCase().includes(query);
    item.hidden = !matches;
    if (matches) count++;
  });
  status.hidden = !query;
  status.textContent = count ? `找到 ${count} 个章节或附录` : '没有找到匹配的标题';
});
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => { if (mobile.matches) chapters.open = false; });
});
const links = [...document.querySelectorAll('nav a')];
function markCurrent() {
  links.forEach(link => {
    if (link.hash === location.hash) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
addEventListener('hashchange', markCurrent);
markCurrent();
