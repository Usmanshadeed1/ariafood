/* Aria a la Española — Template 4 "Mesa" interactions */
(function () {
  "use strict";

  const IMG = "../assets/images/";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => "$" + n.toFixed(2);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Products (real Despaña catalogue items) ---------- */
  const PRODUCTS = [
    { id: "jamon-bellota", cat: "charcuterie", brand: "Fermín", name: "Ibérico de Bellota, hand-sliced", size: "3 oz pack", price: 43.5, img: "products/jamon--fermin-bellota-ham-pre-sliced.png", badge: "Most loved", desc: "From free-range Ibérico pigs that finish on acorns in the dehesa, cured for up to 48 months. Serve at room temperature so the fat turns glossy." },
    { id: "anchovies", cat: "seafood", brand: "Don Bocarte", name: "Cantabrian anchovies", size: "50 g tin", price: 17.5, img: "products/seafood--don-bocarte-anchovies.png", badge: "Chef's pick", desc: "Hand-filleted in Santoña and packed in olive oil. Meaty, mild and barely salty. The anchovy Spanish chefs keep for themselves." },
    { id: "manchego", cat: "cheese", brand: "Adiano", name: "Manchego semicurado D.O.P.", size: "7 oz wedge", price: 15.25, img: "products/cheese--adiano-queso-manchego-semicurado-d-o-p-wedge.jpg", desc: "Sheep's milk cheese from La Mancha, aged around four months. Buttery and nutty with a gentle tang." },
    { id: "evoo", cat: "pantry", brand: "Aubocassa", name: "Arbequina extra virgin olive oil", size: "500 ml", price: 39, img: "products/olive-oil--aubocassa-premium-extra-virgin-olive-oil-100-arbeq.png", desc: "Single-estate oil from Mallorca, pressed within hours of harvest. Green apple, almond and a peppery finish." },
    { id: "chorizo-bellota", cat: "charcuterie", brand: "Fermín", name: "Organic chorizo de bellota", size: "7 oz", price: 24.25, img: "products/charcuterie--fermin-organic-chorizo-bellota-acorn-7oz.png", desc: "Made from 100% acorn-fed Ibérico pork with smoked pimentón de la Vera. Slice thin and serve with bread." },
    { id: "tuna-belly", cat: "seafood", brand: "La Curiosa", name: "Smoked white tuna belly", size: "120 g tin", price: 27, img: "products/seafood--la-curiosa-white-tuna-belly-smoked-in-olive-oil.jpg", badge: "New", desc: "Ventresca of bonito del norte, lightly smoked and preserved in olive oil. Silky and rich." },
    { id: "saffron", cat: "pantry", brand: "Chiquilín", name: "La Mancha saffron", size: "1 oz tin", price: 165, img: "products/paella--chiquilin-saffron-azafran-1oz.jpg", desc: "Hand-picked saffron threads from La Mancha. A generous tin for a season of paellas." },
    { id: "chorizo-picante", cat: "charcuterie", brand: "Palacios", name: "Chorizo picante", size: "7.9 oz", price: 16, img: "products/charcuterie--palacio-chorizo-hot-dry-cured-spanish-chorizo.jpg", desc: "A classic dry-cured chorizo from La Rioja with a warm kick of hot paprika." },
    { id: "octopus", cat: "seafood", brand: "Luliña", name: "Smoked octopus", size: "115 g tin", price: 19, img: "products/seafood--lulina-smoked-octopus.jpg", desc: "Galician octopus, gently smoked and packed in olive oil. Open, add a pinch of pimentón and serve." },
    { id: "sardines", cat: "seafood", brand: "La Curiosa", name: "Sardines in truffle olive oil", size: "120 g tin", price: 15.75, img: "products/seafood--la-curiosa-small-sardines-in-truffle-olive-oil.jpg", desc: "Small, tender sardines in olive oil with black truffle." },
    { id: "manchego-atrio", cat: "cheese", brand: "El Atrio", name: "Manchego D.O.P.", size: "8 oz wedge", price: 13.75, img: "products/cheese--queso-manchego-dop-wedge.jpg", desc: "A dependable, everyday Manchego. Firm, savoury and great with membrillo." },
    { id: "pesto-cheese", cat: "cheese", brand: "Campollano", name: "Sheep's cheese with pesto", size: "7 oz", price: 28, img: "products/cheese--campollano-queso-de-oveja-curado-con-pesto-pesto-c.jpg", desc: "Cured sheep's milk cheese layered with basil pesto. A talking point on any board." },
    { id: "bomba", cat: "pantry", brand: "Antonio Tomás", name: "Bomba rice D.O.P.", size: "1 kg", price: 12, img: "products/paella--cebolla-bomba-rice.jpg", desc: "The short-grain rice Valencians use for paella. Absorbs three times its volume without going soft." },
    { id: "gift-lux", cat: "gift", brand: "Aria", name: "The luxury box", size: "12 pieces", price: 200, img: "products/gifts--luxury-spanish-gourmet-box.jpg", desc: "Jamón, cheese, conservas, oil and sweets, packed by hand with a handwritten card." },
    { id: "gift-fiesta", cat: "gift", brand: "Aria", name: "The fiesta box", size: "9 pieces", price: 165, img: "products/gifts--spanish-fiesta-gift-box-new.png", desc: "Everything for a tapas evening for six, ready to give." },
  ];
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  /* ---------- Cart state ---------- */
  const cart = new Map();
  const FREE_AT = 75;
  const control = (id) => {
    const q = cart.get(id) || 0;
    return q
      ? `<div class="stepper"><button data-qty="-1" data-id="${id}" aria-label="Remove one"><svg><use href="#i-minus"/></svg></button><span>${q}</span><button data-qty="1" data-id="${id}" aria-label="Add one"><svg><use href="#i-plus"/></svg></button></div>`
      : `<button class="add" data-add="${id}" aria-label="Add ${byId[id].name} to basket">Add to basket</button>`;
  };

  const card = (p) => `
    <li><article class="card">
      <div class="card__media">
        ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ""}
        <img src="${IMG + p.img}" alt="${p.brand} ${p.name}" loading="lazy">
        <button class="card__quick" data-quick="${p.id}" aria-label="Quick view ${p.name}"><svg><use href="#i-eye"/></svg>Quick view</button>
      </div>
      <div class="card__body">
        <span class="card__brand">${p.brand}, ${p.size}</span>
        <a href="product.html" class="card__name">${p.name}</a>
        <div class="card__row"><span class="card__price">${money(p.price)}</span><div data-ctl="${p.id}">${control(p.id)}</div></div>
      </div>
    </article></li>`;

  const grid = $("#products");
  const render = (f) => {
    grid.innerHTML = PRODUCTS.filter((p) => p.cat !== "gift" && (f === "all" || p.cat === f)).slice(0, 8).map(card).join("");
  };
  render("all");
  $$(".tabs [role=tab]").forEach((t) => t.addEventListener("click", () => {
    $$(".tabs [role=tab]").forEach((x) => x.setAttribute("aria-selected", x === t));
    render(t.dataset.filter);
  }));

  const GIFT_NOTES = {
    "gift-lux": "Jamón ibérico, Manchego, conservas, olive oil and turrón",
    "gift-fiesta": "Chorizo, olives, anchovies and olive oil tortas",
  };
  $("#gifts-list").innerHTML = PRODUCTS.filter((p) => p.cat === "gift").map((p) => `
    <li class="gcard">
      <button class="gcard__media" data-quick="${p.id}" aria-label="Quick view ${p.name}"><img src="${IMG + p.img}" alt="" loading="lazy"></button>
      <div class="gcard__body">
        <h3 class="gcard__name">${p.name}</h3>
        <p class="gcard__note">${GIFT_NOTES[p.id] || p.desc}</p>
        <div class="gcard__row"><span class="gcard__price">${money(p.price)}</span><div data-ctl="${p.id}">${control(p.id)}</div></div>
      </div>
    </li>`).join("");

  /* ---------- Hero slider ---------- */
  const slider = $("[data-slider]");
  if (slider) {
    const slides = $$(".slide", slider);
    const bars = $$(".slider__bars button", slider);
    const MS = 6000;
    slider.style.setProperty("--slide-ms", MS + "ms");
    let i = 0, timer, paused = false;
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => {
        s.classList.toggle("is-active", k === i);
        s.setAttribute("aria-hidden", k !== i);
        const im = $("img", s);
        if (k === i && im.loading === "lazy") im.loading = "eager";
      });
      bars.forEach((b, k) => {
        b.setAttribute("aria-selected", k === i);
        const sp = b.firstElementChild; sp.style.display = "none"; void sp.offsetWidth; sp.style.display = "";
      });
      schedule();
    };
    const schedule = () => { clearTimeout(timer); if (!reduced && !paused) timer = setTimeout(() => go(i + 1), MS); };
    bars.forEach((b, k) => b.addEventListener("click", () => go(k)));
    $$(".slider__arrow", slider).forEach((a) => a.addEventListener("click", () => go(i + Number(a.dataset.dir))));
    slider.addEventListener("mouseenter", () => { paused = true; slider.classList.add("is-paused"); clearTimeout(timer); });
    slider.addEventListener("mouseleave", () => { paused = false; slider.classList.remove("is-paused"); go(i); });
    let x0 = null;
    slider.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    window.addEventListener("load", () => slides.forEach((s) => ($("img", s).loading = "eager")));
    go(0);
  }

  /* ---------- Category rail arrows ---------- */
  const rail = $("#rail");
  $$("[data-scroll]").forEach((b) => b.addEventListener("click", () => {
    const step = rail.querySelector("li").offsetWidth + 20;
    rail.scrollBy({ left: step * Number(b.dataset.scroll), behavior: reduced ? "auto" : "smooth" });
  }));

  /* ---------- Header state ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
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
    setTimeout(() => { const f = id === "search" ? $("#q") : $("[data-close]", o); f && f.focus(); }, 60);
  }
  function close(o, keepLock) {
    o.classList.remove("is-open");
    o.setAttribute("aria-hidden", "true");
    if (!keepLock) { document.body.classList.remove("is-locked"); lastFocus && lastFocus.focus(); }
  }
  $$(".overlay").forEach((o) => o.addEventListener("click", (e) => {
    if (e.target === o || e.target.closest("[data-close]")) close(o);
  }));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") $$(".overlay.is-open").forEach((o) => close(o)); });
  $$(".mnav a").forEach((a) => a.addEventListener("click", () => close($("#nav"))));

  /* ---------- Search ---------- */
  const q = $("#q");
  const list = $("#search-list");
  const runSearch = () => {
    const term = q.value.trim().toLowerCase();
    const hits = term ? PRODUCTS.filter((p) => (p.name + " " + p.brand + " " + p.cat + " " + p.desc).toLowerCase().includes(term)) : [];
    list.innerHTML = term && !hits.length
      ? `<li><p class="search__hint">No matches for “${q.value}”. Try jamón, cheese or olive oil.</p></li>`
      : hits.map((p) => `<li><button data-quick="${p.id}"><img src="${IMG + p.img}" alt=""><span><strong>${p.name}</strong><small>${p.brand}</small></span><em>${money(p.price)}</em></button></li>`).join("");
  };
  q.addEventListener("input", runSearch);
  $$("[data-q]").forEach((b) => b.addEventListener("click", () => { q.value = b.dataset.q; runSearch(); q.focus(); }));

  /* ---------- Quick view ---------- */
  let qvId = null, qvQty = 1;
  function quick(id) {
    const p = byId[id];
    qvId = id; qvQty = 1;
    $("#qv-img").src = IMG + p.img;
    $("#qv-img").alt = p.brand + " " + p.name;
    $("#qv-brand").textContent = p.brand;
    $("#qv-name").textContent = p.name;
    $("#qv-price").textContent = money(p.price);
    $("#qv-desc").textContent = p.desc;
    $("#qv-size").textContent = p.size;
    $("#qv-qty").textContent = qvQty;
    open("quick");
  }
  $$("[data-qv]").forEach((b) => b.addEventListener("click", () => {
    qvQty = Math.max(1, qvQty + Number(b.dataset.qv));
    $("#qv-qty").textContent = qvQty;
  }));
  $("#qv-add").addEventListener("click", () => {
    cart.set(qvId, (cart.get(qvId) || 0) + qvQty);
    update(true);
    open("cart");
  });

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
    const bar = $(".mbar");
    bar.hidden = count === 0;
    document.body.classList.toggle("has-mbar", count > 0);
    $("[data-count-text]").textContent = `${count} item${count === 1 ? "" : "s"}`;
    $("[data-total-text]").textContent = money(total);
    $$("[data-ctl]").forEach((el) => (el.innerHTML = control(el.dataset.ctl)));
  }

  document.addEventListener("click", (e) => {
    const op = e.target.closest("[data-open]");
    if (op) { open(op.dataset.open); return; }
    const qv = e.target.closest("[data-quick]");
    if (qv) { quick(qv.dataset.quick); return; }
    const add = e.target.closest("[data-add]");
    if (add) {
      cart.set(add.dataset.add, (cart.get(add.dataset.add) || 0) + 1);
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

  /* ---------- Wholesale form ---------- */
  const trade = $("[data-trade]");
  trade.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = $(".trade__msg", trade);
    let ok = true;
    $$("input", trade).forEach((i) => { const bad = !i.checkValidity() || !i.value.trim(); i.classList.toggle("is-invalid", bad); if (bad) ok = false; });
    if (!ok) { msg.classList.remove("is-ok"); msg.textContent = "Please fill in your name, business and a valid email."; return; }
    msg.classList.add("is-ok");
    msg.textContent = "Thank you. We'll send your price list within one business day.";
    trade.reset();
  });

  /* ---------- Newsletter ---------- */
  const news = $("[data-news]");
  news.addEventListener("submit", (e) => {
    e.preventDefault();
    $(".news__msg", news).textContent = "Welcome. Your 10% code is on its way.";
    news.reset();
  });
})();
