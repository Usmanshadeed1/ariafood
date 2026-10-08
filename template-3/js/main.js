/* Aria — Template 2 "Olivar" interactions (light motion, shop-first) */
(function () {
  "use strict";

  const IMG = "../assets/images/";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => "$" + n.toFixed(2);

  /* ---------- Products (real Despaña catalogue items) ---------- */
  const PRODUCTS = [
    { id: "jamon-bellota", cat: "charcuterie", brand: "Fermín", name: "Ibérico de Bellota ham, sliced", size: "3 oz", price: 43.5, img: "products/jamon--fermin-bellota-ham-pre-sliced.png", badge: "Bestseller", hot: true },
    { id: "chorizo-trad", cat: "charcuterie", brand: "Despaña", name: "Traditional chorizo", size: "4 links", price: 14, img: "products/charcuterie--despana-tradicional-chorizo.png" },
    { id: "manchego", cat: "cheese", brand: "Adiano", name: "Manchego semicurado D.O.P.", size: "7 oz wedge", price: 15.25, img: "products/cheese--adiano-queso-manchego-semicurado-d-o-p-wedge.jpg" },
    { id: "anchovies", cat: "seafood", brand: "Don Bocarte", name: "Cantabrian anchovies", size: "50 g tin", price: 17.5, img: "products/seafood--don-bocarte-anchovies.png", badge: "Chef's pick" },
    { id: "evoo", cat: "pantry", brand: "Aubocassa", name: "Arbequina extra virgin olive oil", size: "500 ml", price: 39, img: "products/olive-oil--aubocassa-premium-extra-virgin-olive-oil-100-arbeq.png" },
    { id: "chorizo-picante", cat: "charcuterie", brand: "Palacios", name: "Chorizo picante", size: "7.9 oz", price: 16, img: "products/charcuterie--palacio-chorizo-hot-dry-cured-spanish-chorizo.jpg" },
    { id: "sardines", cat: "seafood", brand: "La Curiosa", name: "Sardines in truffle olive oil", size: "120 g tin", price: 15.75, img: "products/seafood--la-curiosa-small-sardines-in-truffle-olive-oil.jpg", badge: "New" },
    { id: "bomba", cat: "pantry", brand: "Antonio Tomás", name: "Bomba rice D.O.P.", size: "1 kg", price: 12, img: "products/paella--cebolla-bomba-rice.jpg" },
    { id: "lomo", cat: "charcuterie", brand: "Fermín", name: "Lomo Ibérico de Bellota, sliced", size: "2 oz", price: 21.5, img: "products/charcuterie--fermin-lomo-iberico-de-bellota-pre-sliced.png" },
    { id: "manchego-atrio", cat: "cheese", brand: "El Atrio", name: "Manchego D.O.P. wedge", size: "8 oz", price: 13.75, img: "products/cheese--queso-manchego-dop-wedge.jpg" },
    { id: "pesto-cheese", cat: "cheese", brand: "Campollano", name: "Cured sheep's cheese with pesto", size: "7 oz", price: 28, img: "products/cheese--campollano-queso-de-oveja-curado-con-pesto-pesto-c.jpg" },
    { id: "octopus", cat: "seafood", brand: "Luliña", name: "Smoked octopus", size: "115 g tin", price: 19, img: "products/seafood--lulina-smoked-octopus.jpg" },
    { id: "tuna-belly", cat: "seafood", brand: "La Curiosa", name: "Smoked white tuna belly", size: "120 g tin", price: 27, img: "products/seafood--la-curiosa-white-tuna-belly-smoked-in-olive-oil.jpg" },
    { id: "piquillo", cat: "pantry", brand: "Dantza", name: "Whole piquillo peppers D.O.P.", size: "8.5 oz", price: 11.5, img: "products/pantry--dantza-whole-piquillo-peppers-1.jpg" },
    { id: "tortas", cat: "pantry", brand: "Inés Rosales", name: "Olive oil tortas", size: "6 pack", price: 9, img: "products/pantry--ines-rosales-original-olive-oil-tortas.png" },
    { id: "olives", cat: "pantry", brand: "La Española", name: "Manzanilla olives with anchovy", size: "10 oz", price: 7.5, img: "products/pantry--la-espanola-manzanilla-olives-stuffed-with-anchovi.png" },
    { id: "membrillo", cat: "pantry", brand: "El Quijote", name: "Membrillo quince paste", size: "250 g", price: 16.5, img: "products/pantry--el-quijote-membrillo-cream-250g.jpg" },
  ];
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  /* ---------- Cart state ---------- */
  const cart = new Map();
  const FREE_AT = 75;

  const controlHTML = (id) => {
    const q = cart.get(id) || 0;
    return q
      ? `<div class="stepper"><button data-qty="-1" data-id="${id}" aria-label="Remove one"><svg><use href="#i-minus"/></svg></button><span>${q}</span><button data-qty="1" data-id="${id}" aria-label="Add one"><svg><use href="#i-plus"/></svg></button></div>`
      : `<button class="add" data-add="${id}" aria-label="Add ${byId[id].name} to basket"><svg><use href="#i-plus"/></svg>Add</button>`;
  };

  const cardHTML = (p) => `
    <li class="card">
      <a href="product.html" class="card__media">
        ${p.badge ? `<span class="card__badge${p.hot ? " card__badge--hot" : ""}">${p.badge}</span>` : ""}
        <img src="${IMG + p.img}" alt="${p.brand} ${p.name}" loading="lazy">
      </a>
      <div class="card__body">
        <span class="card__brand">${p.brand}</span>
        <a href="product.html" class="card__name">${p.name}</a>
        <span class="card__weight">${p.size}</span>
        <div class="card__row">
          <span class="card__price">${money(p.price)}</span>
          <div data-ctl="${p.id}">${controlHTML(p.id)}</div>
        </div>
      </div>
    </li>`;

  /* ---------- Bestsellers ---------- */
  const grid = $("#grid");
  const renderGrid = (f) => {
    grid.innerHTML = PRODUCTS.filter((p) => f === "all" || p.cat === f).slice(0, 8).map(cardHTML).join("");
  };
  renderGrid("all");
  $$(".chips [role=tab]").forEach((b) =>
    b.addEventListener("click", () => {
      $$(".chips [role=tab]").forEach((x) => x.setAttribute("aria-selected", x === b));
      renderGrid(b.dataset.filter);
    })
  );

  /* ---------- Tapas board bundle ---------- */
  const BOARD = ["chorizo-trad", "lomo", "manchego", "anchovies", "olives", "tortas"];
  const DISCOUNT = 0.1;
  const boardList = $("#board-list");
  boardList.innerHTML = BOARD.map((id) => {
    const p = byId[id];
    return `<li><label class="bitem">
      <input type="checkbox" value="${id}" checked>
      <span class="bitem__box"><svg><use href="#i-check"/></svg></span>
      <img src="${IMG + p.img}" alt="">
      <span class="bitem__name">${p.name}<span class="bitem__brand">${p.brand}, ${p.size}</span></span>
      <span class="bitem__price">${money(p.price)}</span>
    </label></li>`;
  }).join("");
  const boardTotal = () => {
    const picked = $$("input:checked", boardList).map((i) => byId[i.value]);
    const sum = picked.reduce((s, p) => s + p.price, 0);
    const full = picked.length === BOARD.length;
    $("#board-total").textContent = money(full ? sum * (1 - DISCOUNT) : sum);
    $("#board-was").textContent = full ? money(sum) : "";
    $("#board-count").textContent = `${picked.length} of ${BOARD.length} items${full ? ", 10% off" : ""}`;
    const btn = $("#board-add");
    btn.disabled = picked.length === 0;
    btn.textContent = picked.length ? `Add ${picked.length} item${picked.length > 1 ? "s" : ""} to basket` : "Pick at least one item";
  };
  boardList.addEventListener("change", boardTotal);
  boardTotal();
  $("#board-add").addEventListener("click", () => {
    const picked = $$("input:checked", boardList).map((i) => i.value);
    picked.forEach((id) => cart.set(id, (cart.get(id) || 0) + 1));
    update();
    toast(`Added ${picked.length} items from the tapas board`);
    setTimeout(() => open($("#cart")), 300);
  });

  /* ---------- Drawers ---------- */
  let lastFocus = null;
  function open(d) {
    lastFocus = document.activeElement;
    d.classList.add("is-open");
    d.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    setTimeout(() => { const c = $("[data-close]", d); c && c.focus(); }, 50);
  }
  function close(d) {
    d.classList.remove("is-open");
    d.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    lastFocus && lastFocus.focus();
  }
  $$(".drawer").forEach((d) => d.addEventListener("click", (e) => {
    if (e.target === d || e.target.closest("[data-close]")) close(d);
  }));
  $$("[data-open]").forEach((b) => b.addEventListener("click", () => open($("#" + b.dataset.open))));
  $$(".mnav a").forEach((a) => a.addEventListener("click", () => close($("#nav"))));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") $$(".drawer.is-open").forEach(close); });

  /* ---------- Toast ---------- */
  const toastEl = $(".toast");
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("is-on"), 2200);
  }

  /* ---------- Render cart + every add/stepper control ---------- */
  function update() {
    let total = 0, count = 0;
    $("[data-items]").innerHTML = [...cart.entries()].map(([id, q]) => {
      const p = byId[id];
      total += p.price * q;
      count += q;
      return `<li class="citem">
        <img src="${IMG + p.img}" alt="">
        <div><div class="citem__brand">${p.brand}</div><div class="citem__name">${p.name}</div>${controlHTML(id)}</div>
        <span class="citem__price">${money(p.price * q)}</span>
      </li>`;
    }).join("");
    $("#cart .drawer__panel").classList.toggle("is-empty", count === 0);
    $("[data-total]").textContent = money(total);
    $("[data-total-short]").textContent = money(total);
    const left = Math.max(0, FREE_AT - total);
    $("[data-ship-text]").textContent = left > 0 ? `Add ${money(left)} more for free local delivery` : "You've got free local delivery";
    $("[data-ship-bar]").style.width = Math.min(100, (total / FREE_AT) * 100) + "%";
    const c = $("[data-count]");
    c.textContent = count;
    c.classList.add("is-bump");
    setTimeout(() => c.classList.remove("is-bump"), 200);
    $$("[data-ctl]").forEach((el) => (el.innerHTML = controlHTML(el.dataset.ctl)));
  }

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      const id = add.dataset.add;
      cart.set(id, 1);
      update();
      toast(`${byId[id].name} added to your basket`);
      const step = $(`[data-ctl="${id}"] .stepper button[data-qty="1"]`);
      step && step.focus();
      return;
    }
    const q = e.target.closest("[data-qty]");
    if (q) {
      const id = q.dataset.id;
      const n = (cart.get(id) || 0) + Number(q.dataset.qty);
      n > 0 ? cart.set(id, n) : cart.delete(id);
      update();
    }
  });
  update();

  /* ---------- Newsletter ---------- */
  const news = $("[data-news]");
  news.addEventListener("submit", (e) => {
    e.preventDefault();
    $(".news__msg", news).textContent = "Check your inbox. Your code WELCOME10 is on its way.";
    news.reset();
  });
})();
