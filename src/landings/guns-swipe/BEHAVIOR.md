# Guns Swipe — Behavior & Responsive Spec

Source of truth for interaction and responsive rules on `/pages/guns-swipe`.
Swipe of [gruns.co/pages/gwp-gut-health](https://gruns.co/pages/gwp-gut-health), adapted to Shapermint DS.
Owning components mirror these rules in JSDoc / `data-behavior` attributes.

## Breakpoints

| Token | Width | Use |
|---|---|---|
| Mobile | `< 992px` | Stacked layouts, bottom sticky CTA |
| Desktop | `≥ 992px` | Split layouts, top floating CTA |

Implementation uses Tailwind `max-[991px]:` / `min-[992px]:` to match the reference `tb` breakpoint.

---

## 1. First fold + page-level gallery

**Owner:** `GunsSwipeHero.tsx`  
**Anchor:** `#hero` (`data-behavior="first-fold"`)

### Content budget

- Trust strip (stars + review/member counts)
- Headline (max ~2 lines desktop)
- Short supporting sentence
- Primary CTA → `#offers`
- Page-owned image gallery (carousel)

### Gallery rules

- Gallery is **page-owned**: assets from `gunsSwipeCdn.ts` / `@shapermint/assets`.
- **Not** the Shopify PDP media gallery and **not** the `#offers` buybox gallery.
- Controls: previous / next buttons + dot indicators.
- Keyboard: arrow keys when gallery is focused; dots are buttons with `aria-label`.
- `prefers-reduced-motion: reduce` → no auto-advance (none shipped by default; manual only).

### Responsive layout

| | Mobile | Desktop (`≥992px`) |
|---|---|---|
| Structure | Column, gallery **above** copy (DOM order) | Row: copy **left** (`order-1`), gallery **right** (`order-2`), ~50/50 |
| Gallery | Full width, square aspect (`object-cover` crop) | Half width, square aspect |

---

## 2. Scroll CTA (desktop float / mobile sticky)

**Owner:** `GunsSwipeScrollCta.tsx`  
**Element:** `data-behavior="scroll-cta"`

### Placement

| Breakpoint | Placement | Hidden | Shown (`.stuck`) |
|---|---|---|---|
| Mobile `<992px` | Fixed **bottom**, full width | `translateY(100%)` | `translateY(0)` |
| Desktop `≥992px` | Fixed **top**, full width | `translateY(-100%)` | `translateY(0)` |

Transition: `250ms cubic-bezier(0.4, 0, 0.2, 1)`.

### Show / hide logic

1. **Show** (add `.stuck`) after the first fold has mostly left the upper half of the viewport (`#hero` IntersectionObserver with `rootMargin: 0 0 -45% 0`) — mid-scroll, not only when the whole hero is gone.
2. **Hide** (remove `.stuck`) when `#offers` intersects the viewport (avoid competing with PDP Add to Cart).
3. CTA href is always `#offers` (smooth scroll via native hash).
4. No countdown timers. No emoji in labels.

### Content (mobile stack matches Grüns)

1. Yellow pill badge overlapping the CTA top edge
2. Full-width pill primary button (savings + free gift)
3. Stars + social proof line underneath (`X stars | Y reviews | Z members`)

---

## 3. Persuasion blocks (reasons)

**Owner:** `GunsSwipeReasons.tsx`  
**Blocks:** `data-behavior="persuasion-reason"`

### Mobile `<992px` — slider (Grüns `brry-reasons-slider`)

- Hint header: “Swipe For Benefits” + arrow (`data-behavior="persuasion-slider"`)
- Horizontal snap track: one reason per full-width slide (title → image → body)
- Controls: prev / pill dots / next (next arrow uses gold border accent)

### Desktop `≥992px` — stacked listicle

| | Desktop |
|---|---|
| Container | `flex-row`, image + text ~50/50 |
| Order | Text column (title + body) beside image |
| Image | Half column, `object-cover`, `rounded-2xl` |

Six numbered reasons (01–06). Copy adapted for Shapermint DS (no emoji, no em dash).

---

## 4. Offer section — PDP offer standard + GWP

**Owner:** `GunsSwipeOffers.tsx`  
**Anchor:** `#offers` (`data-behavior="pdp-offer"`)

Placed **immediately after** persuasion reasons (Grüns: buybox after listicle reasons).

Follows Shapermint PDP offer anatomy (DS website kit + Strapless buybox pattern). **No** olipop-style subscribe-only card pair as the primary offer.

### Anatomy (required)

1. **Offer gallery** — desktop: 2-up sticky grid; **mobile**: single-image snap slider (chevron, dots, sale + selling-fast badges) + “See In Your Size”
2. **Buybox** (sticky on desktop ≥1024px, stacked on mobile): title, rating, price + SAVE badge
3. **Pack cards** (“Choose your savings”) — selected = mint border + mint wash; Most Popular pill on 2-pack; Save chip coral when selected; compare strike + unit price on both
4. Product selectors (color rows per unit when 2-pack, sizes) + qty via pack
5. **GWP free-gift row** inside the buybox
6. Primary **Add to Cart** (coral)
7. Perks row (shipping / returns / guarantee)

### GWP messaging

- Visible whenever the offer is shown (not only after ATC).
- Label example: “Free gift included with this order” + gift name/description from i18n.
- Side cart must still show the free-gift callout / $0 line when GWP applies.

---

## 5. Add to Cart → side cart

**Owners:** `useGunsSwipeCart.ts`, `GunsSwipeSideCart.tsx`, ATC in `GunsSwipeOffers.tsx`

### Rules

1. **Add to Cart** merges a line item keyed by `id-flavor-sugar` (qty increments if same key).
2. On successful add, **side cart opens immediately** (`open = true`).
3. Side cart: fixed right drawer (~440px, max 100vw) + scrim `rgba(0,0,0,0.4)`.
4. Close: scrim click, header X, or `Escape`.
5. Qty stepper min 1; remove line via X on row.
6. Checkout CTA is a lab stub (navigates to shapermint.com) — no Shopify Storefront API in this deliverable.
7. When cart has product lines and GWP applies, cart footer/header shows free-gift reminder; optional $0 gift line item.

### Header bag

- Site chrome is non-functional Grüns-style: centered Shapermint logo only (no category nav / utility icons).
- Side cart still opens from PDP **Add to Cart**.

---

## 6. Reviews, trust, FAQ

**Owner:** `GunsSwipeReviews.tsx` — after `#offers` (Grüns order).

Two review blocks:

1. **Quote rectangles** (`data-behavior="reviews-quotes"`): soft bg, rating summary + title, white `rounded-2xl` quote cards. Mobile horizontal snap carousel; desktop 3-col grid.
2. **Normal feed** (`data-behavior="reviews-feed"`): score + distribution bars, filter/sort chrome, list of verified buyer reviews (avatar, stars, title, body).

- Trust: guarantee / clinical / eligibility lines — static, no fake urgency.
- FAQ: native `<details>` / `<summary>` accordion.

---

## Out of scope (explicit)

- Real Shopify cart / checkout API
- Fake countdown timers
- Grüns green pixel-perfect brand skin (Shapermint DS tokens only)
