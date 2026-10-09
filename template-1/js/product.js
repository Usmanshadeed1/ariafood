/* Aria Spanish Products — single product page (static design, working basket) */
(function () {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => "$" + n.toFixed(2);
  const PRODUCT = { id: "fermin-bellota-sliced", price: 43.5 };
  const add = (id, n) => window.ariaCart && window.ariaCart.add(id, n);

  /* ---------- Gallery: thumbs, swipe, dots ---------- */
  const track = $(".gallery__track");
  const thumbs = $$(".gallery__thumb");
  const dots = $$(".gallery__dots span");
  const current = () => Math.round(track.scrollLeft / track.clientWidth);
  const mark = (i) => {
    thumbs.forEach((t, k) => t.setAttribute("aria-current", k === i ? "true" : "false"));
    dots.forEach((d, k) => d.classList.toggle("is-on", k === i));
  };
  thumbs.forEach((t) => t.addEventListener("click", () => {
    const i = Number(t.dataset.go);
    track.scrollTo({ left: i * track.clientWidth });
    mark(i);
  }));
  track.addEventListener("scroll", () => requestAnimationFrame(() => mark(current())), { passive: true });
  track.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = Math.max(0, Math.min(thumbs.length - 1, current() + (e.key === "ArrowRight" ? 1 : -1)));
    track.scrollTo({ left: i * track.clientWidth });
  });

  /* ---------- Quantity + add to basket ---------- */
  const input = $("[data-qty-input]");
  const totalEl = $("[data-buy-total]");
  const qty = () => Math.max(1, Math.min(99, parseInt(input.value, 10) || 1));
  const paint = () => { input.value = qty(); totalEl.textContent = money(qty() * PRODUCT.price); };
  $$("[data-step]").forEach((b) => b.addEventListener("click", () => { input.value = qty() + Number(b.dataset.step); paint(); }));
  input.addEventListener("change", paint);
  const addBtn = $("[data-buy-add]");
  $("[data-buy]").addEventListener("submit", () => {
    add(PRODUCT.id, qty());
    addBtn.classList.add("is-added");
    setTimeout(() => addBtn.classList.remove("is-added"), 1200);
  });

  /* ---------- Wishlist toggle (visual) ---------- */
  const wish = $("[data-wish]");
  wish.addEventListener("click", () => wish.setAttribute("aria-pressed", wish.getAttribute("aria-pressed") !== "true"));

  /* ---------- Pairs well with ---------- */
  const pair = $("[data-pair]");
  const pairTotal = () => {
    const picked = $$("input:checked", pair);
    $("[data-pair-total]").textContent = money(PRODUCT.price + picked.reduce((s, i) => s + Number(i.dataset.price), 0));
    $("[data-pair-count]").textContent = picked.length + 1;
  };
  pair.addEventListener("change", pairTotal);
  $("[data-pair-add]").addEventListener("click", () => {
    window.ariaCart && window.ariaCart.add(PRODUCT.id, 1, false);
    const picked = $$("input:checked", pair);
    picked.forEach((i, k) => window.ariaCart && window.ariaCart.add(i.value, 1, k === picked.length - 1));
    if (!picked.length) add(PRODUCT.id, 0);
  });
  pairTotal();

  /* ---------- Sticky add bar once the main button scrolls away (mobile) ---------- */
  const bar = $("[data-sticky-buy]");
  $("[data-sticky-add]").addEventListener("click", () => add(PRODUCT.id, 1));
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => {
      const show = !e.isIntersecting && e.boundingClientRect.top < 0;
      bar.classList.toggle("is-on", show);
      bar.setAttribute("aria-hidden", !show);
      $("[data-sticky-add]").tabIndex = show ? 0 : -1;
      document.body.classList.toggle("has-sticky", show);
    }).observe(addBtn);
  }
})();
