/* lata. by Aria — conservas category site */
(function () {
  "use strict";

  const IMG = "../assets/images/conservas/";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => "$" + n.toFixed(2);

  /* Real Despaña catalogue items and prices. bg = tint matched to the tin. */
  const P = [
    { id: "db-anchovies", cat: "anchovies", brand: "Don Bocarte", name: "Cantabrian anchovies", price: 17.5, img: "don-bocarte-anchovies-1.png", bg: "sky" },
    { id: "lc-sardines-lemon", cat: "sardines", brand: "La Curiosa", name: "Small sardines with lemon", price: 16.5, img: "la-curiosa-sardines-with-lemon-1.jpg", bg: "lemon" },
    { id: "lu-octopus", cat: "octopus", brand: "Luliña", name: "Smoked octopus", price: 19, img: "lulina-smoked-octopus-1.jpg", bg: "lilac" },
    { id: "lc-tuna-belly", cat: "tuna", brand: "La Curiosa", name: "Smoked white tuna belly", price: 27, img: "la-curiosa-white-tuna-belly-smoked-in-olive-oil-1.jpg", bg: "mint" },
    { id: "lc-mussels", cat: "shellfish", brand: "La Curiosa", name: "Marinated mussels", price: 19.5, img: "la-curiosa-marinated-mussels-1.png", bg: "peach" },
    { id: "lc-brava", cat: "sardines", brand: "La Curiosa", name: "Small sardines in brava sauce", price: 15.75, img: "la-curiosa-small-sardines-in-brava-sauce-1.jpg", bg: "peach" },
    { id: "lc-pulpo", cat: "octopus", brand: "La Curiosa", name: "Pulpo a la gallega", price: 24, img: "la-curiosa-pulpo-a-la-gallega-1.jpg", bg: "pink" },
    { id: "lu-tuna-belly", cat: "tuna", brand: "Luliña", name: "White tuna belly in olive oil", price: 16, img: "lulina-white-tuna-belly-in-olive-oil-1.png", bg: "peach" },
    { id: "db-matrimonio", cat: "anchovies", brand: "Don Bocarte", name: "Matrimonio, anchovies and boquerones", price: 31, img: "the-don-bocarte-matrimonio-1.jpg", bg: "sky" },
    { id: "lc-truffle", cat: "sardines", brand: "La Curiosa", name: "Sardines in truffle olive oil", price: 15.75, img: "la-curiosa-small-sardines-in-truffle-olive-oil-1.jpg", bg: "mint" },
    { id: "lu-cockles", cat: "shellfish", brand: "Luliña", name: "Cockles in brine", price: 18.75, img: "lulina-cockles-in-brine-1.jpg", bg: "mint" },
    { id: "lu-razor", cat: "shellfish", brand: "Luliña", name: "Razor shells in brine", price: 17.5, img: "lulina-razor-shells-in-brine-1.png", bg: "pink" },
    { id: "lu-spicy-sardines", cat: "sardines", brand: "Luliña", name: "Spicy sardines in olive oil", price: 9, img: "lulina-spicy-sardines-in-olive-oil-1.png", bg: "sky" },
    { id: "ada-sardines", cat: "sardines", brand: "Ar de Arte", name: "Small sardines in olive oil", price: 19, img: "ar-de-arte-small-sardines-in-olive-oil-1.png", bg: "sand" },
    { id: "lu-squid", cat: "octopus", brand: "Luliña", name: "Squid in ink", price: 12.5, img: "lulina-squid-in-ink-1.jpg", bg: "lilac" },
    { id: "db-red-tuna", cat: "tuna", brand: "Don Bocarte", name: "Wild red tuna belly", price: 42, img: "don-bocarte-wild-bluefin-belly-atun-rojo-ventresca-1.png", bg: "sky" },
    { id: "lc-crab-pate", cat: "pate", brand: "La Curiosa", name: "Crab pâté", price: 15.75, img: "la-curiosa-crab-pate-1.jpg", bg: "pink" },
    { id: "lc-sardine-pate", cat: "pate", brand: "La Curiosa", name: "Sardine pâté", price: 10.75, img: "la-curiosa-sardine-pate-1.webp", bg: "lilac" },
    { id: "lc-bonito-pate", cat: "pate", brand: "La Curiosa", name: "Bonito tuna pâté", price: 14.5, img: "la-curiosa-bonito-tuna-pate-tin-1.jpg", bg: "lemon" },
    { id: "lc-cod-pate", cat: "pate", brand: "La Curiosa", name: "Cod fish pâté", price: 13.5, img: "la-curiosa-cod-fish-pate-1.jpg", bg: "lemon" },
  ];
  const byId = Object.fromEntries(P.map((p) => [p.id, p]));
  const NIGHT = ["db-anchovies", "lc-sardines-lemon", "lu-octopus", "lc-mussels"];

  /* ---------- Basket + add control ---------- */
  const cart = new Map();
  const FREE_AT = 75;
  const control = (id) => {
    const q = cart.get(id) || 0;
    return q
      ? `<div class="stepper"><button data-qty="-1" data-id="${id}" aria-label="Remove one ${byId[id].name}"><svg><use href="#i-minus"/></svg></button><span>${q}</span><button data-qty="1" data-id="${id}" aria-label="Add another ${byId[id].name}"><svg><use href="#i-plus"/></svg></button></div>`
      : `<button class="add" data-add="${id}" aria-label="Add ${byId[id].name} to basket"><svg><use href="#i-plus"/></svg>Add</button>`;
  };

  /* ---------- Bestsellers with filters ---------- */
  const grid = $("#products");
  let filter = "all", brand = null;
  function renderProducts() {
    const list = P.filter((p) => (filter === "all" || p.cat === filter) && (!brand || p.brand === brand)).slice(0, brand ? 12 : 8);
    grid.innerHTML = list.length ? list.map((p) => `
      <li class="product">
        <div class="product__img" style="--bg:var(--${p.bg})"><img src="${IMG + p.img}" alt="${p.brand} ${p.name}" loading="lazy"></div>
        <div class="product__body">
          <span class="product__brand">${p.brand}</span>
          <span class="product__name">${p.name}</span>
          <div class="product__row"><span class="product__price">${money(p.price)}</span><div data-ctl="${p.id}">${control(p.id)}</div></div>
        </div>
      </li>`).join("") : `<li class="products__empty">No tins here yet.</li>`;
    $$(".chips [role=tab]").forEach((b) => b.setAttribute("aria-selected", !brand && b.dataset.filter === filter));
    $$(".catch__tile").forEach((t) => t.classList.toggle("is-active", !brand && t.dataset.cat === filter));
  }
  $$(".chips [role=tab]").forEach((b) => b.addEventListener("click", () => { filter = b.dataset.filter; brand = null; renderProducts(); }));
  $$("[data-cat]").forEach((a) => a.addEventListener("click", () => { filter = a.dataset.cat; brand = null; renderProducts(); }));
  $$("[data-brand]").forEach((a) => a.addEventListener("click", () => { brand = a.dataset.brand; filter = "all"; renderProducts(); }));
  renderProducts();

  /* ---------- Tin night set ---------- */
  $("#night-list").innerHTML = NIGHT.map((id) => {
    const p = byId[id];
    return `<li class="nitem"><span class="nitem__img" style="--bg:var(--${p.bg})"><img src="${IMG + p.img}" alt=""></span><span class="nitem__name">${p.name}<small>${p.brand}</small></span><span class="nitem__price">${money(p.price)}</span></li>`;
  }).join("");
  $("#night-total").textContent = money(NIGHT.reduce((s, id) => s + byId[id].price, 0));
  $("#night-add").addEventListener("click", () => {
    NIGHT.forEach((id) => cart.set(id, (cart.get(id) || 0) + 1));
    update(true);
    open("cart");
  });

  /* ---------- Header shadow once sticky ---------- */
  const header = $(".header");
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Overlays ---------- */
  let lastFocus = null;
  function open(id) {
    const o = $("#" + id);
    lastFocus = document.activeElement;
    $$(".overlay.is-open").forEach((x) => x !== o && close(x, true));
    o.classList.add("is-open");
    o.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    setTimeout(() => { const f = $("[data-close]", o); f && f.focus(); }, 60);
  }
  function close(o, keep) {
    o.classList.remove("is-open");
    o.setAttribute("aria-hidden", "true");
    if (!keep) { document.body.classList.remove("is-locked"); lastFocus && lastFocus.focus(); }
  }
  $$(".overlay").forEach((o) => o.addEventListener("click", (e) => { if (e.target === o || e.target.closest("[data-close]")) close(o); }));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") $$(".overlay.is-open").forEach((o) => close(o)); });
  $$(".mnav a").forEach((a) => a.addEventListener("click", () => close($("#nav"))));

  /* ---------- Basket ---------- */
  function update(bump) {
    let total = 0, count = 0;
    $("[data-items]").innerHTML = [...cart.entries()].map(([id, n]) => {
      const p = byId[id];
      total += p.price * n; count += n;
      return `<li class="citem"><span class="citem__img" style="--bg:var(--${p.bg})"><img src="${IMG + p.img}" alt=""></span><div><div class="citem__name">${p.name}</div><div class="citem__meta">${p.brand}</div>${control(id)}</div><span class="citem__price">${money(p.price * n)}</span></li>`;
    }).join("");
    $("#cart .panel").classList.toggle("is-empty", count === 0);
    $("[data-total]").textContent = money(total);
    const left = Math.max(0, FREE_AT - total);
    $("[data-ship]").textContent = left > 0 ? `Add ${money(left)} more for free local delivery` : "Free local delivery unlocked";
    $("[data-bar]").style.width = Math.min(100, (total / FREE_AT) * 100) + "%";
    const badge = $("[data-count]");
    badge.textContent = count;
    if (bump) { badge.classList.add("is-bump"); setTimeout(() => badge.classList.remove("is-bump"), 220); }
    $(".mbar").hidden = count === 0;
    document.body.classList.toggle("has-mbar", count > 0);
    $("[data-count-text]").textContent = `${count} tin${count === 1 ? "" : "s"}`;
    $("[data-total-text]").textContent = money(total);
    $$("[data-ctl]").forEach((el) => (el.innerHTML = control(el.dataset.ctl)));
  }

  document.addEventListener("click", (e) => {
    const op = e.target.closest("[data-open]");
    if (op) { open(op.dataset.open); return; }
    const add = e.target.closest("[data-add]");
    if (add) {
      cart.set(add.dataset.add, 1);
      update(true);
      const plus = $(`[data-ctl="${add.dataset.add}"] [data-qty="1"]`);
      plus && plus.focus();
      return;
    }
    const st = e.target.closest("[data-qty]");
    if (st) {
      const n = (cart.get(st.dataset.id) || 0) + Number(st.dataset.qty);
      n > 0 ? cart.set(st.dataset.id, n) : cart.delete(st.dataset.id);
      update(true);
    }
  });
  update(false);
})();
