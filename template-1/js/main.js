/* Aria Spanish Products — Template 1 interactions */
(function () {
  "use strict";

  const IMG = "../assets/images/";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => "$" + n.toFixed(2);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Product data (real Despaña catalogue items) ---------- */
  const PRODUCTS = [
    { id: "jamon-bellota", cat: "charcuterie", brand: "Fermín", name: "Ibérico de Bellota ham, sliced", price: 43.5, img: "products/jamon--fermin-bellota-ham-pre-sliced.png", badge: "Acorn-fed" },
    { id: "chorizo-trad", cat: "charcuterie", brand: "Despaña", name: "Traditional chorizo", price: 14, img: "products/charcuterie--despana-tradicional-chorizo.png", badge: "Bestseller" },
    { id: "manchego-adiano", cat: "cheese", brand: "Adiano", name: "Manchego semicurado D.O.P.", price: 15.25, img: "products/cheese--adiano-queso-manchego-semicurado-d-o-p-wedge.jpg" },
    { id: "anchovies", cat: "seafood", brand: "Don Bocarte", name: "Cantabrian anchovies", price: 17.5, img: "products/seafood--don-bocarte-anchovies.png", badge: "Chef's pick" },
    { id: "evoo-aubocassa", cat: "pantry", brand: "Aubocassa", name: "Arbequina extra virgin olive oil", price: 39, img: "products/olive-oil--aubocassa-premium-extra-virgin-olive-oil-100-arbeq.png" },
    { id: "chorizo-picante", cat: "charcuterie", brand: "Palacios", name: "Chorizo picante", price: 16, img: "products/charcuterie--palacio-chorizo-hot-dry-cured-spanish-chorizo.jpg" },
    { id: "sardines-truffle", cat: "seafood", brand: "La Curiosa", name: "Sardines in truffle olive oil", price: 15.75, img: "products/seafood--la-curiosa-small-sardines-in-truffle-olive-oil.jpg" },
    { id: "bomba", cat: "pantry", brand: "Antonio Tomás", name: "Bomba rice D.O.P.", price: 12, img: "products/paella--cebolla-bomba-rice.jpg" },
    { id: "lomo-bellota", cat: "charcuterie", brand: "Fermín", name: "Lomo Ibérico de Bellota, sliced", price: 21.5, img: "products/charcuterie--fermin-lomo-iberico-de-bellota-pre-sliced.png" },
    { id: "manchego-atrio", cat: "cheese", brand: "El Atrio", name: "Manchego D.O.P. wedge", price: 13.75, img: "products/cheese--queso-manchego-dop-wedge.jpg" },
    { id: "cheese-pesto", cat: "cheese", brand: "Campollano", name: "Cured sheep's cheese with pesto", price: 28, img: "products/cheese--campollano-queso-de-oveja-curado-con-pesto-pesto-c.jpg", badge: "New" },
    { id: "octopus", cat: "seafood", brand: "Luliña", name: "Smoked octopus", price: 19, img: "products/seafood--lulina-smoked-octopus.jpg" },
    { id: "tuna-belly", cat: "seafood", brand: "La Curiosa", name: "Smoked white tuna belly", price: 27, img: "products/seafood--la-curiosa-white-tuna-belly-smoked-in-olive-oil.jpg" },
    { id: "piquillo", cat: "pantry", brand: "Dantza", name: "Whole piquillo peppers D.O.P.", price: 11.5, img: "products/pantry--dantza-whole-piquillo-peppers-1.jpg" },
    { id: "tortas", cat: "pantry", brand: "Inés Rosales", name: "Olive oil tortas", price: 9, img: "products/pantry--ines-rosales-original-olive-oil-tortas.png" },
    { id: "chorizo-bellota", cat: "charcuterie", brand: "Fermín", name: "Organic chorizo de bellota", price: 24.25, img: "products/charcuterie--fermin-organic-chorizo-bellota-acorn-7oz.png" },
    { id: "gift-lux", cat: "gift", brand: "Aria", name: "The luxury gourmet box", price: 200, img: "products/gifts--luxury-spanish-gourmet-box.jpg" },
    { id: "gift-fiesta", cat: "gift", brand: "Aria", name: "The fiesta box", price: 165, img: "products/gifts--spanish-fiesta-gift-box-new.png" },
  ];
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  const cardHTML = (p, i = 0) => `
    <li class="card" style="animation-delay:${i * 60}ms">
      <div class="card__media">
        <a href="product.html" tabindex="-1" aria-hidden="true">
          ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ""}
          <img src="${IMG + p.img}" alt="" loading="lazy">
        </a>
        <button class="card__quick" data-add="${p.id}" aria-label="Add ${p.brand} ${p.name} to basket">
          <svg><use href="#i-plus"/></svg>Add to basket
        </button>
      </div>
      <div class="card__body">
        <span class="card__brand">${p.brand}</span>
        <a href="product.html" class="card__name">${p.name}</a>
        <span class="card__price">${money(p.price)}</span>
      </div>
    </li>`;

  const miniHTML = (p) => `
    <li class="mini">
      <img src="${IMG + p.img}" alt="">
      <div><a href="product.html" class="mini__name">${p.name}</a><span class="mini__price">${money(p.price)}</span></div>
      <button class="mini__add" data-add="${p.id}" aria-label="Add ${p.name} to basket"><svg><use href="#i-plus"/></svg></button>
    </li>`;

  /* ---------- Bestsellers with filter tabs ---------- */
  const grid = $("#product-grid");
  function renderGrid(filter) {
    if (!grid) return;
    const list = PRODUCTS.filter((p) => p.cat !== "gift" && (filter === "all" || p.cat === filter)).slice(0, 8);
    grid.innerHTML = list.map(cardHTML).join("");
  }
  renderGrid("all");
  $$(".tabs [role=tab]").forEach((tab) =>
    tab.addEventListener("click", () => {
      $$(".tabs [role=tab]").forEach((t) => t.setAttribute("aria-selected", t === tab));
      renderGrid(tab.dataset.filter);
    })
  );

  const giftGrid = $("#gift-grid");
  if (giftGrid) giftGrid.innerHTML = PRODUCTS.filter((p) => p.cat === "gift").map(miniHTML).join("");

  /* ---------- Hero: load sequence + slideshow ---------- */
  const startHero = () => requestAnimationFrame(() => document.body.classList.add("is-loaded"));
  const heroImg = $(".hero__slide img");
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener("load", startHero, { once: true });
    setTimeout(startHero, 1200);
  } else startHero();

  const slider = $("[data-slider]");
  if (slider) {
    const slides = $$(".hero__slide", slider);
    const bars = $$(".hero__bars button", slider);
    const MS = 6000;
    slider.style.setProperty("--slide-ms", MS + "ms");
    let i = 0, timer;
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      bars.forEach((b, k) => {
        b.setAttribute("aria-selected", k === i);
        // restart the progress animation
        const span = b.firstElementChild;
        span.style.display = "none"; void span.offsetWidth; span.style.display = "";
      });
      clearTimeout(timer);
      if (!reduced) timer = setTimeout(() => go(i + 1), MS);
    };
    bars.forEach((b, k) => b.addEventListener("click", () => go(k)));
    // preload the remaining slides after first paint
    window.addEventListener("load", () => slides.forEach((s) => { const im = $("img", s); im.loading = "eager"; }));
    go(0);
  }

  /* ---------- Sticky header state ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Jamón grade switcher ---------- */
  const GRADE_IMG = {
    serrano: { src: "lifestyle/chorizo-charcuterie.png", alt: "Sliced jamón serrano with chorizo and lomo" },
    cebo: { src: "lifestyle/iberico-hams.jpg", alt: "Jamón ibérico being carved by hand" },
    bellota: { src: "lifestyle/gifts-for-the-entertainer.jpg", alt: "A plate of hand-carved jamón ibérico de bellota" },
  };
  const gradeImg = $("#grade-img");
  $$(".grade").forEach((g) =>
    g.addEventListener("click", () => {
      if (g.getAttribute("aria-selected") === "true") return;
      $$(".grade").forEach((x) => x.setAttribute("aria-selected", x === g));
      const next = GRADE_IMG[g.dataset.grade];
      gradeImg.classList.add("is-swapping");
      setTimeout(() => {
        gradeImg.src = IMG + next.src;
        gradeImg.alt = next.alt;
        const show = () => gradeImg.classList.remove("is-swapping");
        gradeImg.complete ? show() : gradeImg.addEventListener("load", show, { once: true });
      }, 300);
    })
  );

  /* ---------- Drawers (menu + cart) ---------- */
  let lastFocus = null;
  function openDrawer(d) {
    lastFocus = document.activeElement;
    d.classList.add("is-open");
    d.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    const btn = $("[data-drawer-close]", d);
    btn && setTimeout(() => btn.focus(), 60);
  }
  function closeDrawer(d) {
    d.classList.remove("is-open");
    d.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    lastFocus && lastFocus.focus();
  }
  $$(".drawer").forEach((d) =>
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-drawer-close]")) closeDrawer(d);
    })
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $$(".drawer.is-open").forEach(closeDrawer);
  });
  const navDrawer = $("#drawer-nav");
  $(".header__burger").addEventListener("click", () => openDrawer(navDrawer));
  $$(".mnav a").forEach((a) => a.addEventListener("click", () => closeDrawer(navDrawer)));

  /* ---------- Cart ---------- */
  const cartEl = $("#cart");
  const FREE_AT = 75;
  const cart = new Map();

  function renderCart(bump) {
    const panel = $(".drawer__panel", cartEl);
    let total = 0, count = 0;
    $("[data-cart-items]").innerHTML = [...cart.entries()]
      .map(([id, qty]) => {
        const p = byId[id];
        total += p.price * qty;
        count += qty;
        return `<li class="cart__item">
          <img src="${IMG + p.img}" alt="">
          <div>
            <div class="cart__item-brand">${p.brand}</div>
            <div class="cart__item-name">${p.name}</div>
            <div class="qty">
              <button data-qty="-1" data-id="${id}" aria-label="Remove one"><svg><use href="#i-minus"/></svg></button>
              <span>${qty}</span>
              <button data-qty="1" data-id="${id}" aria-label="Add one"><svg><use href="#i-plus"/></svg></button>
            </div>
          </div>
          <span class="cart__item-price">${money(p.price * qty)}</span>
        </li>`;
      })
      .join("");
    panel.classList.toggle("is-empty", count === 0);
    $("[data-cart-total]").textContent = money(total);
    const left = Math.max(0, FREE_AT - total);
    $("[data-cart-progress-text]").textContent = left > 0 ? `Add ${money(left)} more for free local delivery` : "You've unlocked free local delivery";
    $("[data-cart-bar]").style.width = Math.min(100, (total / FREE_AT) * 100) + "%";
    const badge = $("[data-cart-count]");
    badge.textContent = count;
    count ? badge.removeAttribute("data-empty") : badge.setAttribute("data-empty", "");
    if (bump) {
      badge.classList.add("is-bump");
      setTimeout(() => badge.classList.remove("is-bump"), 250);
    }
  }

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      const id = add.dataset.add;
      cart.set(id, (cart.get(id) || 0) + 1);
      renderCart(true);
      if (add.classList.contains("card__quick")) {
        add.classList.add("is-added");
        add.innerHTML = '<svg><use href="#i-check"/></svg>Added';
        setTimeout(() => { add.classList.remove("is-added"); add.innerHTML = '<svg><use href="#i-plus"/></svg>Add to basket'; }, 1600);
      }
      setTimeout(() => openDrawer(cartEl), 280);
      return;
    }
    const q = e.target.closest("[data-qty]");
    if (q) {
      const id = q.dataset.id;
      const n = (cart.get(id) || 0) + Number(q.dataset.qty);
      n > 0 ? cart.set(id, n) : cart.delete(id);
      renderCart(true);
      return;
    }
    if (e.target.closest("[data-cart-open]")) openDrawer(cartEl);
  });
  renderCart(false);

  /* ---------- Newsletter ---------- */
  const news = $("[data-news]");
  news && news.addEventListener("submit", (e) => {
    e.preventDefault();
    $(".news__msg", news).textContent = "You're subscribed. Look out for our next letter.";
    news.reset();
  });
})();
