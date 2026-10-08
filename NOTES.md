# Aria Spanish Products — design notes

Client: Aria Spanish Products (Aria à la Española), family-run Spanish food importer/distributor, Bucks County, PA.
Audiences: home cooks (online shop, local delivery + nationwide shipping) and restaurants/retailers (wholesale).
Supplier: Despaña Brand Foods (NYC). Product data + images in `assets/images/catalog.json`.

Stack for proposals: plain HTML, CSS, JS. Each template in its own folder, shared `assets/`.

## Template 1 — Azulejo logo (`template-1/`) — approved
- Uses the original tile logo (`assets/images/brand/logo-tile.png`), centred in a white header.
- Colours: Spanish flag palette, as client asked (navy and then espresso were rejected). Deep red #7E0F14 (dark surfaces), rojo #AA151B (buttons), gualda #F1BF00 (highlights on dark only), pale gold #FCF0CC (sections), ink #2B1B15. CSS variable names still say --navy/--red/--gold for the same roles.
- Type: Fraunces (display), Figtree (body). 4px radius, no arches/circles (client found them cheap).
- Hero: 50/50, navy copy panel + crossfading photo slideshow.

## Template 2 — "Olivar" (`template-2/`)
Shop-first modern e-commerce, light motion only (client rejected a heavy scroll-animation version).
- Colours: olive #2E3A23, saffron #F2B53A, tomato #D2452B, pale olive #E3E8D2, base #FBFAF6.
- Type: Bricolage Grotesque (display), DM Sans (body). Rounded 16–24px cards.
- Logo: simple "aria" wordmark with olive mark.
- UX: search bar in header, category nav, Add button that turns into a stepper, tapas-board bundle with 10% off, toast on add.

## Template 3 — "Bandera" (`template-3/`)
Exact clone of Template 2's layout and UX, with the real tile logo and a Spanish flag palette.
- Colours: rojo #AD1519 (primary, official), deep red #7E0F14 (top bar, footer, hovers), gualda #FABD00 (highlights, official), dark orange #D9531E (small accents), pale gold #FCF0CC (tints), base #FFFCF6, ink #2B1B15.
- CSS variable names are kept from Template 2 (e.g. --olive now holds red) so the two stay in sync; changes to T2 layout can be copied across.

## Template 4 — "Mesa" (`template-4/`) — flagship
New layout, real tile logo, official flag colours (rojo #AD1519, gualda #FABD00), stone #F6F0E6, wine footer #4E0A0E, warm white #FFFDF8.
- Type: Gilda Display (display), Instrument Sans (body).
- Hero: full-width 3-slide slider (crossfade + slow zoom, autoplay 6s, pause on hover, swipe, arrows, progress bars). Client rejected the split hero.
- UX: category rail with arrows, product cards with Quick view modal + Add→stepper, search overlay with live results, jamón comparison with cure-time bars, wholesale panel with inline price-list form, gifts list, sticky basket bar on mobile.
- Thin rojigualda stripe only at the very top and footer (client found heavier use "funky").

## Template 5 — "Noche" (`template-5/`)
Dark and white, based on the client's EatFlow reference (eatflow-template.webflow.io).
- Colours: black #0F0D0B, pimentón orange #F2542D, saffron yellow #FFC531, olive green #1E9E57, cream #FFF3D6, white.
- Type: Outfit (headings), Manrope (body). Text logo "aria." with orange dot.
- Sections: dark hero (round zooming jamón image + price sticker), feature strip, bestsellers carousel, story + producers, promo bento, dark "why", menu-style product list, wholesale form, reviews (sample text, replace with real), recipes, green newsletter, black footer.
- Reviews are clearly labelled "Sample"; replace with real reviews before launch.

## Open items
- Family photo for About/story (placeholder for now).
- Real contact details (placeholders used).
- Product photo rights: confirm with Despaña before launch.
