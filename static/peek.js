// Link previews. Every page like languages/x.html has a prerendered HTML fragment at _peek/languages/x.html;
// after a short hover we load it and show it next to the link. Nothing is rendered here.
(() => {
  if (matchMedia("(any-hover: none)").matches) return;  // no mouse at all (touch-only device)
  const DELAY = 1000, PAGE = /^(languages|tools|methods|vendors)\/[a-z0-9-]+\.html$/, cache = new Map();
  const ROOT = new URL("../", document.currentScript.src).href;  // this script is at static/peek.js
  const page = (a) => {  // site-relative path of a peekable page, else null (getAttribute: SVG links have no string .href)
    const url = new URL(a.getAttribute("href"), location.href).href;
    return url.startsWith(ROOT) && PAGE.test(url.slice(ROOT.length)) ? url.slice(ROOT.length) : null;
  };
  const card = document.createElement("div");
  card.className = "peek"; card.id = "peek"; card.setAttribute("role", "tooltip"); card.hidden = true;
  document.body.append(card);
  let timer, link;

  const hide = () => {
    clearTimeout(timer);
    if (link) link.removeAttribute("aria-describedby");
    card.hidden = true; link = null;
  };
  const show = async (a) => {
    const url = ROOT + "_peek/" + page(a);
    if (!cache.has(url)) cache.set(url, fetch(url).then(r => r.ok ? r.text() : null).catch(() => null));
    const html = await cache.get(url);
    if (!html || link !== a) return;
    card.innerHTML = html;  // our own prerendered, autoescaped fragment
    card.hidden = false;
    const r = a.getBoundingClientRect(), w = card.offsetWidth;
    card.style.left = Math.max(8, Math.min(r.left, innerWidth - w - 16)) + scrollX + "px";
    card.style.top = r.bottom + scrollY + 6 + "px";
    a.setAttribute("aria-describedby", "peek");
  };
  const enter = (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || !page(a) || a === link) return;
    hide(); link = a;
    timer = setTimeout(() => show(a), DELAY);
  };
  const leave = (e) => {
    if (!link || card.contains(e.relatedTarget) || link.contains(e.relatedTarget)) return;
    if (e.type === "mouseout" && !link.contains(e.target) && !card.contains(e.target)) return;
    hide();
  };
  document.addEventListener("mouseover", enter);
  document.addEventListener("focusin", enter);
  document.addEventListener("mouseout", leave);
  document.addEventListener("focusout", leave);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
})();
