# Shapermint Design System

**Brand**: Shapermint (a Trafilea brand — women's shapewear & intimates, direct-to-consumer).
**Source**: `SHM_Components.fig` (Figma, mounted as a virtual FS during build).
**Flagship product line**: Empetua® shapewear.

This system codifies the visual foundations, components and copy conventions used on **shapermint.com** and the **Shapermint mobile app**.

---

## Index

Root files:
- [`README.md`](README.md) — this file.
- [`SKILL.md`](SKILL.md) — agent skill manifest (drop into Claude Code as-is).
- [`colors_and_type.css`](colors_and_type.css) — CSS vars for colors, type, spacing, radii, shadows, motion. Import once.
- [`fonts/`](fonts/) — Avenir Next LT Pro (Regular / Italic / Demi / Demi Italic / Bold).
- [`assets/`](assets/) — logos, brand icons, product imagery, payment-method pngs.
- [`preview/`](preview/) — HTML specimen cards that populate the Design System tab.
- [`ui_kits/website/`](ui_kits/website/) — desktop web UI kit (nav, hero, PDP, cart, footer).
- [`ui_kits/mobile/`](ui_kits/mobile/) — mobile web / in-app UI kit.

---

## Brand at a glance

Shapermint sells shapewear, leggings, bras and tanks to women (primarily 35+) with an emphasis on comfort, confidence and inclusivity. The site reads *warm, accessible, promotional* — frequent discount strips, strong reviews/social-proof layouts, and a uniformly friendly tone. Design stays visually **quiet**: near-black text on white, hairline dividers, generous whitespace, and one warm peach accent on CTAs. Color gets **heat** only where it sells: promo ribbons, tags, badges.

Companion brand: the internal Figma cover refers to "Afrodita — trafilea designops goddess" (the design-ops team's mascot), not a consumer-facing brand.

---

## Content fundamentals

### Voice & tone
- **Warm, direct, helpful.** Think a confident friend, not a fashion editor. No aspirational purple prose.
- **"You" by default.** Copy addresses the shopper directly. First person ("we") is for company statements only.
- **Promo-forward without shouting.** Big savings get big treatment, but language stays conversational.

### Casing
- **Title Case** for: product-category navigation ("Shapewear", "Leggings", "Tanks & Camis", "Best Sellers", "Spring Sale"), page headings, section titles ("Shop By Category", "Featured In", "Cart Totals", "Shipping Address").
- **Sentence case** for: body paragraphs, placeholders, inline help, button labels that read like sentences ("Calculate your size", "Back to the results").
- **UPPERCASE** for: top-promo strips and navigational CTAs ("FREE SHIPPING OVER $50 & FREE EXCHANGES", "get the app").
- **Registered-trademark** on every hero/body mention of the flagship product: **Empetua®**.

### Numbers, discounts, urgency
- Discounts are **loud and specific**: `Get an Extra 10% OFF using LOVE10 at Checkout`, `%OFF` tags, `Only today $10.00 + Free Shipping`.
- Social proof is **quantified**: `Fit As Expected: 100%`, star ratings, review counts.
- Urgency uses stopwatch iconography and short phrases ("Only today", "Hurry up!"). Never use fake timers.

### Example copy lifted from the system
- Promo strip: *Get an Extra 10% OFF using LOVE10 at Checkout*
- Top nav: *FREE SHIPPING OVER $50 & FREE EXCHANGES*
- Cross-sell: *Add the Bra Strap Clip (3-Pack in Black)* — *Only today $10.00 + Free Shipping*
- Review header: *Review Header Title* — *Author Name* — body in sentence case
- Breadcrumb: `Back to the results | Shapewear | Empetua® all day every day high-waisted shaper panty`
- Size helper: *Calculate your size* / *fit predictor* (the latter intentionally lowercase as a micro-label)
- Checkout: *Fields marked as (*) are required.* / *All transactions are secure and encrypted.*

### Emoji & unicode
- **No emoji.** None appear anywhere in the Figma file. Don't introduce them.
- Unicode symbols appear only where typographically needed: `®`, `|` as breadcrumb separator, `★` in ratings (rendered as SVG, not unicode — see iconography).

### Do / Don't
- ✓ "Get an Extra 10% OFF using LOVE10 at Checkout" — specific, actionable.
- ✗ "Limited time offer — don't miss out!" — vague, hype-y.
- ✓ "Calculate your size" — direct verb, shopper outcome.
- ✗ "Discover your perfect fit journey" — editorial fluff.

---

## Visual foundations

### Color
- **Primary text is `--ink-900` (#292929)**, not pure black. Pure `#000` is reserved for page-headings in the spec sheet itself.
- **One brand accent**: coral/peach. `--coral-300` (#F7A08B, the Shapermint icon color) is the primary CTA fill; `--coral-500` (#C64844) is the darker coral used for sale tags, discount percentages and emphasis. The mint family (`--mint-500` / `--mint-100`) is a secondary accent for success, fresh/new badges and illustrated Background color blocks.
- **Full scales** — coral, toffee (warm editorial), mint/teal, blue (link), and gold (ratings) each ship as a full 7–11 step scale in `colors_and_type.css`, lifted from the Figma color-stack sheet. See `preview/colors-brand.html`.
- **Status palette** — dedicated `success-*`, `warning-*`, `error-*`, `info-*` stacks for system feedback, intentionally held distinct from the brand Coral family so a sale tag never reads the same as an error. See `preview/colors-semantic.html`.
- **Section backgrounds** cycle between five warm neutrals: creamy (`#FFF6EF`), rose (`#FDF1EF`), mint (`#DFEFEB`), sand (`#F5F5F5`), white. The Figma "Color usage" page explicitly demonstrates this palette rotation.
- No bluish-purple gradients. No neon. No dark mode.

### Typography
- Two families, both Avenir Next:
  - **Avenir Next LT Pro** — display, titles, promo strips, buttons. Weights used: 400 / 600 (Demi) / 700 (Bold).
  - **Avenir Next** — body copy, secondary labels. Weights: 400 / 500 / 600 / 700.
- Both are loaded from the **same OTF files** (`AvenirNextLTPro-*.otf`). See the caveat below — no separate "Avenir Next" OTFs were provided.
- Size scale (px): **10, 12, 14, 16, 18, 20, 24, 30, 40**. Body default is **14px**, hero is 40px. A single 68px Heavy weight appears in one hero — rare.
- Line-height pairs: 14→22, 16→24, 18→28, 20→28, 24→32, 40→100%.

### Spacing & layout
- **Spacing is a strict 17-token scale** — `--space-0` … `--space-2000` (0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160px). Token names are 100-indexed so scale reads at a glance (`space-100` = 0.5 rem). **Use only these values** for padding, gap, margin and vertical rhythm. See `preview/spacing-scale.html`.
- Legacy `--s-1` … `--s-12` aliases are mapped onto the canonical scale for backward compatibility — prefer `--space-*` in new code.
- Desktop content width caps around **1140–1200px** centered in a **1920px** canvas; full-bleed hero/banner sections run edge-to-edge.
- Section vertical rhythm: `--space-1000` (80px), `--space-1200` (96px), or `--space-1600` (128px) between major sections.
- Mobile page is **375px** wide with `--space-200` (16px) gutters.

### Corners & shape
Radii are a **strict 5-token system** — `--radius-none` (0), `--radius-md` (4px), `--radius-lg` (8px), `--radius-xl` (16px), `--radius-full` (9999px). No other values are allowed anywhere in the product. See `preview/spacing-radii.html`.
- **Buttons, inputs, cards, size chips** → `--radius-lg` (8px). This is the default for most surfaces.
- **Tags, small chips, product thumbnails, checkboxes** → `--radius-md` (4px).
- **Large cards, hero image wells, modals / bottom sheets** → `--radius-xl` (16px).
- **Pills, avatars, color dots, count badges** → `--radius-full` (9999px). Buttons are NOT pills — they are 8px rectangles. This is an Avenir/Shapermint signature.
- **Flush edges / section rows / full-bleed imagery** → `--radius-none` (0).
- Legacy aliases (`--r-0` … `--r-pill`) are mapped onto the canonical set for backward compatibility.

### Elevation & shadow
- **Single elevation** used system-wide: `0 2px 4px rgba(0,0,0,0.1)` — applied to the sticky header only. Everything else is flat.
- No inner shadows. No ambient "glow". Depth comes from borders and section-background rotation.

### Borders & dividers
- Hairline divider: `1px solid --ink-200` (#E5E5E5).
- Stronger input border: `1px solid --ink-300` (#BBBBBB).
- Selected/outline-dark: `1px solid --ink-900` (#292929).
- Quantity-selectors and color swatches use **1.5–2px** inset borders for selection state.

### Backgrounds & imagery
- Imagery is **photographic, warm, and candid** — real women in real lighting, not studio. Skin tones lean warm; backgrounds are soft cream or neutral.
- **No illustrations** beyond the logo mark. No hand-drawn motifs, no pattern fills, no grain.
- Hero banners are always 1/3 photo + 2/3 cream background (or full-bleed photo with a centered card).
- **No gradients** in the UI. The only gradient-adjacent thing is the `linear-gradient(#f7f6f4, #f7f6f4)` fallback beneath a cross-sell image — really a solid fill.
- Product photography is shot against soft neutral backgrounds — we preserve that by never tinting product thumbnails.

### Motion
- **Restrained.** Fades (200ms), color transitions (120–200ms), nothing bouncy.
- Easing: `cubic-bezier(.2,.8,.2,1)` ("ease-out") for enter, `cubic-bezier(.4,0,.2,1)` ("ease-in-out") for state changes.
- No parallax, no Lottie, no page-load animations. Reveals use simple opacity + 4px translate.

### Hover & press states
- **Text buttons**: underline on hover, coral on press. Disabled is `--ink-400` with no underline.
- **Primary (peach) button**: darkens to `--coral-200` (#F5BAB0) on hover — observed in `PrimaryMid40WideHover` — and goes flat gray (`--ink-150`) when disabled.
- **Secondary dark**: 1px `--ink-900` outline → filled `--ink-900` on hover.
- **Cards / product tiles**: subtle border swap (`--ink-200` → `--ink-900`), no lift, no scale.
- **Tap/press on mobile**: no scale transform; rely on color change only.

### Transparency & blur
- Effectively **unused**. No frosted glass. No translucent overlays. One exception: modal/side-cart scrim is `rgba(0,0,0,.4)` with no blur.

### Fixed elements
- Sticky top: promo strip + main nav. ~48 + 80px tall on desktop.
- Mobile sticky: 1-line nav (56px) + optional promo (40px).
- Add-to-cart CTA sticks to the viewport bottom in the PDP on mobile.

### Layout rules
- 12-column grid at 1920px; 8-col on tablet; stacked on mobile.
- Product grid: 4 columns desktop, 2 columns mobile, always.
- Forms: 1 column on mobile, 2 columns (48/48) on desktop where fields pair naturally (first/last name, city/zip).

### Card & tile anatomy
- **Product tile**: square image (4px radius) → title (`--t-md` / 600) → price row (strike-through original + coral sale price) → optional swatches (up to 6 + "N more").
- **Cross-sell card**: horizontal image + copy, 1px divider above/below, no shadow, left-aligned pricing.
- **Review card**: no border, 8px avatar + name + stars, header in 600, body in 400/14.
- **Side-cart row**: 96×96 image, qty stepper, price in coral, `×` remove.

---

## Iconography

**Approach**: Shapermint uses **bespoke flat SVG icons** at 3 sizes — Small (16px), Mid (24px) and Large (32–40px). Every icon in the Figma is drawn as a path (fill, occasionally stroke). There is **no icon font** and **no iconset dependency**; the file contains custom paths grouped by use case (navigation, PDP, actions, chevrons, messaging, custom product bundles).

Naming convention inside Figma: `{size} / {category} / {style} / {name}` — e.g. `Mid / Navigation / Regular / Search`, `Small / Chevron / Regular / Down`, `Large / Custom Icon / Bundles / Bra-3pack`.

- **Sizes**: 16 (small), 24 (mid), 32–40 (large), plus 80/240 for the brand mascot icon.
- **Stroke style**: filled **solid** icons dominate (`Small / PDP / Star-solid`). "Regular" variants are the outline style.
- **Color**: icons inherit `--fg-1` by default. Brand icons use `--coral-500` fill; success/shop-the-app icons use `--mint-500`.
- **No unicode characters as icons.** Stars, chevrons, close, cart, user, search — all SVGs.
- **No emoji anywhere.**

### Substitutions for this build
We mirrored the Figma icon system with a small curated set of **Lucide** icons (same flat stroke-weight feel) in `assets/icons-lucide.svg` and the UI kits reference them by name. **FLAG: substitution** — when working on production Shapermint surfaces, import the actual SVGs from the Figma file. We also copied the two hand-drawn brand marks used for the peach SHM coin and the word-mark letterform:
- `assets/shapermint-mark.svg` — the "S" glyph inside the peach coin.
- `assets/shapermint-icon-inner.svg` — the word-mark letter sequence.

### Payment-method marks
`assets/payment-icons/` contains the 34 payment-method logos accepted across Shapermint checkout and promo surfaces, extracted as flat SVGs from the Figma `Payment method icon` sheet. Every brand ships at three sizes — `<name>-sm.svg` (33×23), `<name>-md.svg` (45×31) and `<name>.svg` (57×39). Groups: card networks (visa, mastercard, discover, diners-club, jcb, unionpay, elo, card-generic), digital wallets (paypal, apple-pay, google-pay, amazon-pay, facebook-pay, alipay, wechat-pay, wallet), bank rails (sepa, ideal, giropay, bancontact, interac, citadele), processors (stripe, skrill, payoneer, webmoney, qiwi, verifone, paysafe, affirm) and crypto (bitcoin, bitcoin-cash, ethereum, litecoin, bitpay). See `preview/payment-methods.html`. **FLAG**: American Express was not present in the source sheet — provide the official mark if needed.

### Logo
The wordmark is a **custom cut Avenir-adjacent display** — it is **drawn as SVG paths** in the Figma and cannot be re-set in a font. Treat the SVG as the canonical mark; never re-type "SHAPERMINT" in a typeface.

- **Logo lockups** in use: ExtraSmall 24p / Small 28p / Normal 38p / Large 48p / ExtraLarge 54p. Heights are fixed; widths scale.
- The standalone "S" coin (peach background + white S glyph) is used in checkout, the mobile top-bar and favicon contexts.
- Logo color default: `--ink-900`. Inverse: white. **Never tint the logo any other color.**

---

## Images

Two photographs were provided with the Figma and are kept in `assets/`:
- `assets/lifestyle.jpg` — warm lifestyle crop used behind hero banners and PDP tabs.
- `assets/banner-hero.png` — full-width editorial shot used across 1440/1536/1920 hero banners.
- `assets/product-hero.png` — square product on neutral background — the archetype for every product tile in the Figma.
- `assets/hp-empetua.png`, `assets/grid-a.png`, `assets/grid-b.png` — homepage photo-grid fillers.
- `assets/cross-sell.png` — cross-sell card image.
- `assets/payment-paypal.png`, `assets/payment-card.png` — payment method tiles used on Checkout.

### Image treatment
- **Never** apply grain, duotone, or color overlays.
- Product shots are presented **as-shot** — preserve the warm neutral background.
- Lifestyle shots may be cropped but not desaturated.

---

## Caveats / flagged substitutions

1. **Fonts**: we received `AvenirNextLTPro-*.otf` but not separate `AvenirNext-*.otf` files. The CSS aliases *Avenir Next* to the LT Pro files. Metrics differ slightly between the two families — flag for design review.
2. **Icons**: the Figma has 250+ bespoke SVG icons. We copied the logo/brand marks and the shapermint coin SVG; the UI kits currently use a small Lucide-based substitute for generic icons (search, user, bag, chevron, star). Swap to the real Figma SVGs for production.
3. **Grain/gradient/noise approximations** that the pseudocode could not resolve are replaced with clean flat fills. None of these appear to be part of the brand anyway.
4. **JSX is pseudocode** — numeric-precise (colors, sizes, spacing) but not guaranteed to compile. We traced the canonical values into tokens; trust those.
