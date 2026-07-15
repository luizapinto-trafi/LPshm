/**
 * Truekind — PDP for the Supportive Comfort Wireless Shaping Bra.
 * Layout inspired by Orbea's bike configurator: full-page product imagery
 * with a fixed details card on the right and a slim top bar.
 * NOTE: sizes, review count and copy are placeholders — swap for catalog data.
 */
import React from "react";
import { TruekindStarIcon } from "./TruekindStars";
import { TruekindFonts } from "./TruekindFonts";
import { TruekindHeader } from "./TruekindHeader";

const IMG = "/truekind/pdp";

type ColorOption = { name: string; hex: string };

const colors: ColorOption[] = [
  { name: "Chai", hex: "#d8c4a8" },
  { name: "Black", hex: "#1c1b1a" },
  { name: "White", hex: "#f1ede6" },
  { name: "Tan", hex: "#c9a785" },
  { name: "Caramel", hex: "#a67a54" },
  { name: "Cocoa", hex: "#6f4e38" },
];

// Pre-cut transparent cutouts supplied by the team — the page paints its own backdrop.
// `product` shots have no model, so they render smaller (zoomed out) than the body shots.
const shots = [
  { src: `${IMG}/shot-product-front.webp`, label: "Product front", product: true },
  { src: `${IMG}/shot-product-back.webp`, label: "Product back", product: true },
  { src: `${IMG}/shot-casual.webp`, label: "Casual" },
  { src: `${IMG}/shot-side.webp`, label: "Side view" },
  { src: `${IMG}/shot-lifestyle.webp`, label: "Lifestyle" },
  { src: `${IMG}/shot-flatlay.webp`, label: "Product flat lay", product: true },
];

const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

export const TruekindPdp = () => {
  const [color, setColor] = React.useState(0);
  const [size, setSize] = React.useState<number | null>(null);
  const [shot, setShot] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);

  const active = colors[color];

  return (
    <main className={`pdp${expanded ? " pdp--expanded" : ""}`}>
      <TruekindFonts />

      {/* Expand / collapse the image to full width, sliding the card off-screen */}
      <button
        type="button"
        className="pdp-expand"
        aria-label={expanded ? "Exit full-screen image" : "Expand image"}
        aria-pressed={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        )}
      </button>

      {/* Product cutout over the page's own backdrop */}
      <div className="pdp-stage" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shots[shot].src}
          alt=""
          className={`pdp-cutout${shots[shot].product ? " pdp-cutout--product" : ""}`}
        />
      </div>

      {/* Shot switcher */}
      <div className="pdp-thumbs" role="tablist" aria-label="Product photos">
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={shot === i}
            aria-label={s.label}
            className={`pdp-thumb${shot === i ? " pdp-thumb--active" : ""}`}
            onClick={() => setShot(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Full Truekind site header */}
      <TruekindHeader />

      {/* Details card */}
      <aside className="pdp-card">
        <div className="pdp-card-scroll">
          <span className="pdp-badge">Selling Fast</span>

          <h1 className="pdp-title">Supportive Comfort Wireless Shaping Bra</h1>

          <div className="pdp-rating" aria-label="Rated 4.5 out of 5">
            <TruekindStarIcon size={15} />
            <strong>4.5</strong>
            <span className="pdp-reviews">80,000+ five-star reviews</span>
          </div>

          <div className="pdp-prices">
            <span className="pdp-price">$37.99</span>
            <span className="pdp-compare">$55.00</span>
            <span className="pdp-off">Save 31%</span>
          </div>

          <div className="pdp-field">
            <div className="pdp-label">
              Color <span className="pdp-label-value">— {active.name}</span>
            </div>
            <div className="pdp-swatches" role="radiogroup" aria-label="Color">
              {colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  role="radio"
                  aria-checked={color === i}
                  aria-label={c.name}
                  className={`pdp-sw${color === i ? " pdp-sw--active" : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => setColor(i)}
                />
              ))}
            </div>
          </div>

          <div className="pdp-field">
            <div className="pdp-label">
              Size
              <a href="#size-guide" className="pdp-guide">
                View size guide
              </a>
            </div>
            <div className="pdp-sizes" role="radiogroup" aria-label="Size">
              {sizes.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={size === i}
                  className={`pdp-size${size === i ? " pdp-size--active" : ""}`}
                  onClick={() => setSize(i)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <details className="pdp-acc">
            <summary>Product details</summary>
            <p>
              Wirefree molded cups with a hidden shaping panel for all-day support. Smoothing
              double-layer band, convertible straps and a tag-free seamless finish.
            </p>
          </details>
          <details className="pdp-acc">
            <summary>Fabric &amp; care</summary>
            <p>Nylon/spandex blend. Machine wash cold, gentle cycle. Lay flat to dry.</p>
          </details>
          <details className="pdp-acc">
            <summary>Shipping &amp; returns</summary>
            <p>Free shipping over $80. 100-day fit guarantee with free exchanges.</p>
          </details>
        </div>

        <div className="pdp-cta-wrap">
          <button type="button" className="pdp-cta">
            Add to Cart — $37.99
          </button>
          <p className="pdp-reassure">Free shipping over $80 · 100-day fit guarantee · Free exchanges</p>
        </div>
      </aside>

      <style jsx>{`
        .pdp {
          position: relative;
          min-height: 100vh;
          /* Backdrop painted by the page itself — imagery ships as cutouts. */
          background:
            radial-gradient(120% 90% at 28% 42%, rgba(255, 252, 246, 0.9) 0%, rgba(255, 252, 246, 0) 55%),
            linear-gradient(180deg, #f6f0e7 0%, #eee5d8 55%, #e3d7c6 100%);
          color: var(--ink-900, #292929);
          font-family: var(--font-body, "Circular XX", system-ui, sans-serif);
          --font-body: "Circular XX", system-ui, sans-serif;
          --font-display: "Circular XX", system-ui, sans-serif;
          /* Height of the Truekind site header (marquee + nav); offsets everything below. */
          --pdp-header: 100px;
        }
        .pdp-stage {
          position: fixed;
          z-index: 0;
          top: var(--pdp-header);
          bottom: 0;
          left: 0;
          right: min(480px, 38vw);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          transition: right 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pdp-expand {
          position: fixed;
          z-index: 5;
          top: calc(var(--pdp-header) + 14px);
          right: calc(min(480px, 38vw) + 16px);
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ink-900, #292929);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          backdrop-filter: blur(6px);
          transition: right 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pdp-expand:hover {
          background: #fff;
        }
        .pdp-expand:focus-visible {
          outline: 2px solid var(--ink-900, #292929);
          outline-offset: 2px;
        }
        .pdp--expanded .pdp-stage {
          right: 0;
        }
        .pdp--expanded .pdp-card {
          transform: translateX(calc(100% + 48px));
        }
        .pdp--expanded .pdp-expand {
          right: 16px;
        }
        .pdp-cutout {
          max-height: calc(100vh - var(--pdp-header) - 24px);
          max-width: 92%;
          object-fit: contain;
          filter: drop-shadow(0 24px 48px rgba(67, 48, 31, 0.18));
        }
        /* Product-only shots have no model to fill the frame, so scale them down
           and center them vertically instead of standing on the base. */
        .pdp-cutout--product {
          max-height: min(62vh, 620px);
          max-width: 68%;
          align-self: center;
          filter: drop-shadow(0 20px 40px rgba(67, 48, 31, 0.16));
        }
        .pdp-thumbs {
          position: fixed;
          z-index: 2;
          left: clamp(16px, 2.5vw, 32px);
          bottom: 24px;
          display: flex;
          gap: 10px;
        }
        .pdp-thumb {
          width: 56px;
          height: 68px;
          padding: 6px;
          background: rgba(255, 255, 255, 0.85);
          border: 1.5px solid transparent;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
        }
        .pdp-thumb img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .pdp-thumb:hover {
          border-color: var(--ink-300, #bbbbbb);
        }
        .pdp-thumb--active,
        .pdp-thumb--active:hover {
          border-color: var(--ink-900, #292929);
        }
        .pdp-thumb:focus-visible {
          outline: 2px solid var(--ink-900, #292929);
          outline-offset: 2px;
        }
        .pdp-card {
          position: fixed;
          z-index: 2;
          top: calc(var(--pdp-header) + 14px);
          right: clamp(16px, 2.5vw, 32px);
          bottom: 24px;
          width: min(420px, calc(100vw - 32px));
          display: flex;
          flex-direction: column;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.14);
          overflow: hidden;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pdp-card-scroll {
          flex: 1;
          overflow-y: auto;
          padding: clamp(20px, 2.5vw, 28px);
          /* Keep scrolling but hide the scrollbar chrome. */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .pdp-card-scroll::-webkit-scrollbar {
          display: none;
        }
        .pdp-badge {
          display: inline-block;
          background: var(--ink-1000, #000);
          color: #fff;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1;
          padding: 6px 10px;
          border-radius: 4px;
          margin-bottom: 14px;
        }
        .pdp-title {
          margin: 0 0 10px;
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-weight: 700;
          font-size: clamp(1.375rem, 2vw, 1.625rem);
          line-height: 1.15;
          letter-spacing: -0.015em;
        }
        .pdp-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          margin-bottom: 14px;
        }
        .pdp-reviews {
          color: var(--ink-600, #5a5a5a);
        }
        .pdp-prices {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 22px;
        }
        .pdp-price {
          font-weight: 700;
          font-size: 24px;
        }
        .pdp-compare {
          font-size: 15px;
          color: var(--ink-500, #808080);
          text-decoration: line-through;
        }
        .pdp-off {
          background: #fadfa9;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 8px;
          border-radius: 9999px;
        }
        .pdp-field {
          margin-bottom: 20px;
        }
        .pdp-label {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.02em;
          margin-bottom: 10px;
        }
        .pdp-label-value {
          font-weight: 400;
          color: var(--ink-600, #5a5a5a);
        }
        .pdp-guide {
          font-weight: 400;
          font-size: 12px;
          color: var(--ink-600, #5a5a5a);
          text-decoration: underline;
        }
        .pdp-swatches {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pdp-sw {
          width: 26px;
          height: 26px;
          border-radius: 9999px;
          border: none;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
        .pdp-sw--active {
          box-shadow: 0 0 0 2px #fff, 0 0 0 3.5px var(--ink-900, #292929);
        }
        .pdp-sw:focus-visible {
          outline: 2px solid var(--ink-900, #292929);
          outline-offset: 3px;
        }
        .pdp-sizes {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
        }
        .pdp-size {
          min-height: 42px;
          background: #fff;
          border: 1px solid var(--ink-300, #cfcfcf);
          border-radius: 8px;
          font-family: inherit;
          font-weight: 600;
          font-size: 13px;
          color: var(--ink-900, #292929);
          cursor: pointer;
        }
        .pdp-size:hover {
          border-color: var(--ink-900, #292929);
        }
        .pdp-size--active {
          background: var(--ink-1000, #000);
          border-color: var(--ink-1000, #000);
          color: #fff;
        }
        .pdp-acc {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          padding: 14px 0;
        }
        .pdp-acc summary {
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pdp-acc summary::-webkit-details-marker {
          display: none;
        }
        .pdp-acc summary::after {
          content: "+";
          font-weight: 400;
          font-size: 18px;
          color: var(--ink-600, #5a5a5a);
        }
        .pdp-acc[open] summary::after {
          content: "–";
        }
        .pdp-acc p {
          margin: 10px 0 0;
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--ink-700, #454545);
        }
        .pdp-cta-wrap {
          padding: 16px clamp(20px, 2.5vw, 28px) 18px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          background: #fff;
        }
        .pdp-cta {
          width: 100%;
          min-height: 52px;
          background: var(--ink-1000, #000);
          color: #fff;
          border: none;
          border-radius: 9999px;
          font-family: inherit;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
        }
        .pdp-cta:hover {
          background: #222;
        }
        .pdp-reassure {
          margin: 10px 0 0;
          text-align: center;
          font-size: 11.5px;
          color: var(--ink-600, #5a5a5a);
        }

        @media (max-width: 860px) {
          .pdp {
            display: block;
            /* Slimmer header on mobile buys more room for the first fold. */
            --pdp-header: 84px;
          }
          /* Compact the shared Truekind header — scoped to the PDP only. */
          .pdp :global(.tk-marquee-item) {
            padding-top: 6px;
            padding-bottom: 6px;
          }
          .pdp :global(.tk-nav) {
            padding-top: 9px;
            padding-bottom: 9px;
          }
          /* The expand affordance is desktop-only; the drawer owns mobile. */
          .pdp-expand {
            display: none;
          }
          /* Tighten the price → color gap so Color/Size sit higher. */
          .pdp-prices {
            margin-bottom: 12px;
          }
          .pdp--expanded .pdp-card {
            transform: none;
          }
          /* Image occupies a shorter band at the top so the drawer sits higher. */
          .pdp-stage {
            position: fixed;
            top: var(--pdp-header);
            left: 0;
            right: 0;
            bottom: auto;
            height: 42vh;
            align-items: flex-end;
          }
          .pdp-cutout {
            max-height: 100%;
            max-width: 80%;
          }
          .pdp-cutout--product {
            max-height: 88%;
            max-width: 64%;
          }
          /* Smaller thumbnails, centered just above the drawer. */
          .pdp-thumbs {
            position: fixed;
            top: auto;
            bottom: calc(100vh - var(--pdp-header) - 42vh + 8px);
            left: 50%;
            transform: translateX(-50%);
            gap: 6px;
            z-index: 4;
          }
          .pdp-thumb {
            width: 30px;
            height: 38px;
            padding: 3px;
            border-radius: 7px;
          }
          /* Fixed, full-width bottom drawer. */
          .pdp-card {
            position: fixed;
            top: auto;
            left: 0;
            right: 0;
            bottom: 0;
            width: auto;
            height: calc(100vh - var(--pdp-header) - 42vh);
            margin: 0;
            border-radius: 20px 20px 0 0;
            box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.18);
          }
          .pdp-card::before {
            content: "";
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 4px;
            border-radius: 2px;
            background: rgba(0, 0, 0, 0.14);
            z-index: 2;
          }
          .pdp-card-scroll {
            overflow-y: auto;
            padding-top: 22px;
          }
        }
      `}</style>
    </main>
  );
};

export default TruekindPdp;
