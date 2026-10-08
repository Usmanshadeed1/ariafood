/* Aria — Template 5 "Noche" interactions */
(function () {
  "use strict";

  const IMG = "../assets/images/";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => "$" + n.toFixed(2);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Products (real Despaña catalogue items) ---------- */
  const PRODUCTS = [
    { id: "jamon-bellota", cat: "charcuterie", brand: "Fermín", name: "Ibérico de Bellota, sliced", desc: "Acorn-fed, cured up to 48 months", price: 43.5, img: "products/jamon--fermin-bellota-ham-pre-sliced.png", top: true },
    { id: "anchovies", cat: "seafood", brand: "Don Bocarte", name: "Cantabrian anchovies", desc: "Hand-filleted, packed in olive oil", price: 17.5, img: "products/seafood--don-bocarte-anchovies.png", top: true },
    { id: "manchego", cat: "cheese", brand: "Adiano", name: "Manchego semicurado", desc: "Sheep's milk, D.O.P. La Mancha", price: 15.25, img: "products/cheese--adiano-queso-manchego-semicurado-d-o-p-wedge.jpg", top: true },
    { id: "chorizo", cat: "charcuterie", brand: "Despaña", name: "Traditional chorizo", desc: "Smoked pimentón, 4 links", price: 14, img: "products/charcuterie--despana-tradicional-chorizo.png", top: true },
    { id: "evoo", cat: "pantry", brand: "Aubocassa", name: "Arbequina olive oil", desc: "Single estate, 500 ml", price: 39, img: "products/olive-oil--aubocassa-premium-extra-virgin-olive-oil-100-arbeq.png", top: true },
    { id: "sardines", cat: "seafood", brand: "La Curiosa", name: "Sardines in truffle oil", desc: "Small sardines, black truffle", price: 15.75, img: "products/seafood--la-curiosa-small-sardines-in-truffle-olive-oil.jpg", top: true },
    { id: "tortas", cat: "pantry", brand: "Inés Rosales", name: "Olive oil tortas", desc: "Crisp, hand-pressed, 6 pack", price: 9, img: "products/pantry--ines-rosales-original-olive-oil-tortas.png", top: true },
    { id: "turron", cat: "pantry", brand: "1880", name: "Chocolate turrón", desc: "Almond and chocolate", price: 22, img: "products/sweets--1880-chocolate-bombon-rocher-turron.jpg", top: true },
    { id: "lomo", cat: "charcuterie", brand: "Fermín", name: "Lomo Ibérico de Bellota", desc: "Cured pork loin, sliced", price: 21.5, img: "products/charcuterie--fermin-lomo-iberico-de-bellota-pre-sliced.png" },
    { id: "picante", cat: "charcuterie", brand: "Palacios", name: "Chorizo picante", desc: "Dry-cured, hot paprika", price: 16, img: "products/charcuterie--palacio-chorizo-hot-dry-cured-spanish-chorizo.jpg" },
    { id: "octopus", cat: "seafood", brand: "Luliña", name: "Smoked octopus", desc: "Galician, in olive oil", price: 19, img: "products/seafood--lulina-smoked-octopus.jpg" },
    { id: "tuna", cat: "seafood", brand: "La Curiosa", name: "Smoked white tuna belly", desc: "Ventresca in olive oil", price: 27, img: "products/seafood--la-curiosa-white-tuna-belly-smoked-in-olive-oil.jpg" },
    { id: "atrio", cat: "cheese", brand: "El Atrio", name: "Manchego D.O.P.", desc: "Everyday wedge, 8 oz", price: 13.75, img: "products/cheese--queso-manchego-dop-wedge.jpg" },
    { id: "pesto", cat: "cheese", brand: "Campollano", name: "Sheep's cheese with pesto", desc: "Cured, layered with basil", price: 28, img: "products/cheese--campollano-queso-de-oveja-curado-con-pesto-pesto-c.jpg" },
    { id: "bomba", cat: "pantry", brand: "Antonio Tomás", name: "Bomba rice D.O.P.", desc: "For paella, 1 kg", price: 12, img: "products/paella--cebolla-bomba-rice.jpg" },
    { id: "piquillo", cat: "pantry", brand: "Dantza", name: "Piquillo peppers D.O.P.", desc: "Wood-roasted, whole", price: 11.5, img: "products/pantry--dantza-whole-piquillo-peppers-1.jpg" },
  ];
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  /* ---------- Cart state + controls ---------- */
  const cart = new Map();
  const FREE_AT = 75;
  const control = (id) => {
    const q = cart.get(id) || 0;
    return q
      ? `<div class="stepper"><button data-qty="-1" data-id="${id}" aria-label="Remove one"><svg><use href="#i-minus"/></svg></button><span>${q}</span><button data-qty="1" data-id="${id}" aria-label="Add one"><svg><use href="#i-plus"/></svg></button></div>`
      : `<button class="round-add" data-add="${id}" aria-label="Add ${byId[id].name} to basket"><svg><use href="#i-plus"/></svg></button>`;
  };

  /* ---------- Carousel ---------- */
  const car = $("#carousel");
  car.innerHTML = PRODUCTS.filter((p) => p.top).map((p) => `
    <li><article class="pcard">
      <a href="product.html" class="pcard__img"><img src="${IMG + p.img}" alt="${p.brand} ${p.name}" loading="lazy"></a>
      <span class="pcard__brand">${p.brand}</span>
      <a href="product.html" class="pcard__name">${p.name}</a>
      <span class="pcard__price">${money(p.price)}</span>
      <div data-ctl="${p.id}">${control(p.id)}</div>
    </article></li>`).join("");

  const dots = $("#dots");
  const pages = () => Math.max(1, Math.ceil((car.scrollWidth - 4) / car.clientWidth));
  const drawDots = () => {
    const n = pages();
    const cur = Math.round(car.scrollLeft / car.clientWidth);
    dots.innerHTML = Array.from({ length: n }, (_, k) => `<span class="${k === cur ? "is-on" : ""}"></span>`).join("");
  };
  car.addEventListener("scroll", () => requestAnimationFrame(drawDots), { passive: true });
  window.addEventListener("resize", drawDots);
  drawDots();
  $$("[data-car]").forEach((b) => b.addEventListener("click", () => {
    const max = car.scrollWidth - car.clientWidth;
    const dir = Number(b.dataset.car);
    let to = car.scrollLeft + dir * car.clientWidth;
    if (dir > 0 && car.scrollLeft >= max - 4) to = 0;          // loop to start
    if (dir < 0 && car.scrollLeft <= 4) to = max;              // loop to end
    car.scrollTo({ left: to, behavior: reduced ? "auto" : "smooth" });
  }));

  /* ---------- Menu list ---------- */
  const list = $("#menu-list");
  const renderList = (f) => {
    list.innerHTML = PRODUCTS.filter((p) => f === "all" || p.cat === f).slice(0, 6).map((p, i) => `
      <li style="animation-delay:${i * 40}ms">
        <img src="${IMG + p.img}" alt="" loading="lazy">
        <a href="product.html" class="menu__name">${p.name}<span class="menu__desc">${p.brand}. ${p.desc}</span></a>
        <span class="menu__price">${money(p.price)}</span>
        <div data-ctl="${p.id}">${control(p.id)}</div>
      </li>`).join("");
  };
  renderList("all");
  $$(".chips [role=tab]").forEach((t) => t.addEventListener("click", () => {
    $$(".chips [role=tab]").forEach((x) => x.setAttribute("aria-selected", x === t));
    renderList(t.dataset.filter);
  }));

  /* ---------- Reviews ---------- */
  const revs = $$("#reviews blockquote");
  let r = 0, rTimer;
  const showRev = (n) => {
    r = (n + revs.length) % revs.length;
    revs.forEach((b, k) => b.classList.toggle("is-active", k === r));
    clearTimeout(rTimer);
    if (!reduced) rTimer = setTimeout(() => showRev(r + 1), 7000);
  };
  $$("[data-rev]").forEach((b) => b.addEventListener("click", () => showRev(r + Number(b.dataset.rev))));
  showRev(0);

  /* ---------- Overlays ---------- */
  let lastFocus = null;
  function open(id) {
    const o = $("#" + id);
    lastFocus = document.activeElement;
    $$(".overlay.is-open").forEach((x) => x !== o && close(x, true));
    o.classList.add("is-open");
    o.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    setTimeout(() => { const f = id === "search" ? $("#q") : $("[data-close]", o); f && f.focus(); }, 60);
  }
  function close(o, keep) {
    o.classList.remove("is-open");
    o.setAttribute("aria-hidden", "true");
    if (!keep) { document.body.classList.remove("is-locked"); lastFocus && lastFocus.focus(); }
  }
  $$(".overlay").forEach((o) => o.addEventListener("click", (e) => {
    if (e.target === o || e.target.closest("[data-close]")) close(o);
  }));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") $$(".overlay.is-open").forEach((o) => close(o)); });
  $$(".mnav a").forEach((a) => a.addEventListener("click", () => close($("#nav"))));

  /* ---------- Search ---------- */
  const q = $("#q");
  const results = $("#results");
  const runSearch = () => {
    const t = q.value.trim().toLowerCase();
    if (!t) { results.innerHTML = ""; return; }
    const hits = PRODUCTS.filter((p) => (p.name + " " + p.brand + " " + p.desc + " " + p.cat).toLowerCase().includes(t));
    results.innerHTML = hits.length
      ? hits.map((p) => `<li><img src="${IMG + p.img}" alt=""><span><strong>${p.name}</strong><small>${p.brand}, ${money(p.price)}</small></span><div data-ctl="${p.id}">${control(p.id)}</div></li>`).join("")
      : `<li class="results__empty">No matches for “${q.value}”. Try jamón, cheese or anchovies.</li>`;
  };
  q.addEventListener("input", runSearch);

  /* ---------- Basket ---------- */
  function update(bump) {
    let total = 0, count = 0;
    $("[data-items]").innerHTML = [...cart.entries()].map(([id, n]) => {
      const p = byId[id];
      total += p.price * n; count += n;
      return `<li class="citem"><img src="${IMG + p.img}" alt=""><div><div class="citem__brand">${p.brand}</div><div class="citem__name">${p.name}</div>${control(id)}</div><span class="citem__price">${money(p.price * n)}</span></li>`;
    }).join("");
    $("#cart .panel").classList.toggle("is-empty", count === 0);
    $("[data-total]").textContent = money(total);
    const left = Math.max(0, FREE_AT - total);
    $("[data-ship]").textContent = left > 0 ? `Add ${money(left)} more for free local delivery` : "Free local delivery unlocked";
    $("[data-bar]").style.width = Math.min(100, (total / FREE_AT) * 100) + "%";
    const badge = $("[data-count]");
    badge.textContent = count;
    badge.hidden = count === 0;
    if (bump) { badge.classList.add("is-bump"); setTimeout(() => badge.classList.remove("is-bump"), 220); }
    $(".mbar").hidden = count === 0;
    document.body.classList.toggle("has-mbar", count > 0);
    $("[data-count-text]").textContent = `${count} item${count === 1 ? "" : "s"}`;
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
      const plus = add.isConnected ? null : $(`[data-ctl="${add.dataset.add}"] [data-qty="1"]`);
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

  /* ---------- Wholesale form ---------- */
  const trade = $("[data-trade]");
  trade.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = $(".trade__msg", trade);
    let ok = true;
    $$("input[required]", trade).forEach((i) => { const bad = !i.value.trim() || !i.checkValidity(); i.classList.toggle("is-invalid", bad); if (bad) ok = false; });
    msg.classList.toggle("is-ok", ok);
    msg.textContent = ok ? "Thank you. We'll send your price list within one business day." : "Please add your name, business name and a valid email.";
    if (ok) trade.reset();
  });

  /* ---------- Newsletter ---------- */
  const news = $("[data-news]");
  news.addEventListener("submit", (e) => {
    e.preventDefault();
    $(".news__msg", news).textContent = "Done. Your 10% code is on its way.";
    news.reset();
  });
})();
