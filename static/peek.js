// Link previews. Every page X.html has a prerendered HTML fragment at peek/X.html;
// after a short hover we load it and show it next to the link. Nothing is rendered here.
(() => {
  if (matchMedia("(hover: none)").matches) return;
  const DELAY = 1000, PAGE = /^(vendor-)?Q\d+\.html$/, cache = new Map();
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
    const url = "peek/" + a.getAttribute("href");
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
    if (!a || !PAGE.test(a.getAttribute("href")) || a === link) return;
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
