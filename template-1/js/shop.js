/* Aria Spanish Products — shop + category page UI (design only, no real filtering) */
(function () {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const root = document.documentElement;
  const panel = $("#filters");
  let lastFocus = null;

  /* Filters panel (slide-in on tablet and mobile) */
  const open = () => {
    lastFocus = document.activeElement;
    root.classList.add("filters-open");
    document.body.classList.add("is-locked");
    setTimeout(() => { const c = $(".filters__close", panel); c && c.focus(); }, 60);
  };
  const close = () => {
    if (!root.classList.contains("filters-open")) return;
    root.classList.remove("filters-open");
    document.body.classList.remove("is-locked");
    lastFocus && lastFocus.focus();
  };
  $$("[data-filters-open]").forEach((b) => b.addEventListener("click", open));
  $$("[data-filters-close]").forEach((b) => b.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  /* Active filter chips: remove on click (visual only) */
  $$(".active-filters").forEach((bar) =>
    bar.addEventListener("click", (e) => {
      if (e.target.closest(".chip")) e.target.closest(".chip").remove();
      if (e.target.closest(".active-filters__clear")) $$(".chip", bar).forEach((c) => c.remove());
      if (!$(".chip", bar)) bar.hidden = true;
    })
  );

  /* Sub-category pills */
  $$(".subcats").forEach((nav) =>
    nav.addEventListener("click", (e) => {
      const a = e.target.closest(".subcat");
      if (!a) return;
      e.preventDefault();
      $$(".subcat", nav).forEach((x) => x.classList.toggle("is-active", x === a));
    })
  );
})();

/* Category rail: arrows appear only when there is more to scroll */
(function () {
  "use strict";
  document.querySelectorAll("[data-rail]").forEach((rail) => {
    const list = rail.querySelector(".shortcuts");
    const update = () => {
      const max = list.scrollWidth - list.clientWidth;
      rail.classList.toggle("can-left", list.scrollLeft > 4);
      rail.classList.toggle("can-right", list.scrollLeft < max - 4);
    };
    rail.querySelectorAll("[data-rail-dir]").forEach((b) =>
      b.addEventListener("click", () => list.scrollBy({ left: Number(b.dataset.railDir) * list.clientWidth * 0.7 }))
    );
    list.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    update();
  });
})();
