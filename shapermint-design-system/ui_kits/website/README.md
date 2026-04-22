# Shapermint Website UI Kit

A high-fidelity recreation of shapermint.com's desktop surfaces, built against the design tokens in `../../colors_and_type.css`.

**Screens included (click-through):**
1. **Home** — promo strip, top nav, hero banner, "Shop By Category" grid, featured-in, product row.
2. **PLP** (Product Listing Page) — breadcrumb, filters rail, 4-col product grid.
3. **PDP** (Product Detail) — gallery, color/size selectors, price, QTY, Add-to-Cart, review snippet.
4. **Side cart** — slides over any screen when a product is added.
5. **Checkout** — 2-col: form + order summary.

**Components** (`components.jsx`):
- Nav + promo bar, Footer
- Button (primary/secondary/outline/text)
- Input, Radio, Checkbox, ColorPicker, QtyStepper
- Tag (discount/badge)
- ProductTile, ReviewCard, PriceRow
- SideCart, CartRow

All navigation between screens is wired through React state in `index.html`.
