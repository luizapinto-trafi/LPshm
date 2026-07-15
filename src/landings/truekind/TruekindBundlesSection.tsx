/**
 * Truekind — bundles section (save-20% duo/set cards).
 * NOTE: bundle names, prices and swatch combos are placeholders — replace with
 * real catalog data. Flatlays live in public/truekind/bundles.
 */
import React from "react";
import { TruekindStarIcon } from "./TruekindStars";

const IMG = "/truekind/bundles";

const COLORS = {
  black: "#1c1b1a",
  chai: "#d8c4a8",
  white: "#f1ede6",
};

type ComboGroup = {
  colors: [string, string];
  images: [string, string];
};

type Bundle = {
  name: string;
  compareAt: string;
  price: string;
  rating: number;
  /** Selectable color combos; each carries its own product images. */
  groups: ComboGroup[];
  more: number;
};

const BRA = { black: `${IMG}/shaper-bra-black.png`, chai: `${IMG}/shaper-bra-chai.png` };
const PANTY = { black: `${IMG}/shaper-panty-black.png`, chai: `${IMG}/shaper-panty-chai.png` };
const BANDEAU = { black: `${IMG}/bandeau-black.png`, chai: `${IMG}/bandeau-chai.png` };

const bundles: Bundle[] = [
  {
    name: "Shaper Bra Duo Bundle",
    compareAt: "$88.00",
    price: "$70.40",
    rating: 4.5,
    groups: [
      { colors: [COLORS.chai, COLORS.black], images: [BRA.chai, BRA.black] },
      { colors: [COLORS.black, COLORS.black], images: [BRA.black, BRA.black] },
      { colors: [COLORS.chai, COLORS.chai], images: [BRA.chai, BRA.chai] },
    ],
    more: 3,
  },
  {
    name: "Mid-Waist Brief Duo Bundle",
    compareAt: "$52.00",
    price: "$41.60",
    rating: 4.5,
    groups: [
      { colors: [COLORS.chai, COLORS.black], images: [PANTY.chai, PANTY.black] },
      { colors: [COLORS.chai, COLORS.chai], images: [PANTY.chai, PANTY.chai] },
      { colors: [COLORS.black, COLORS.black], images: [PANTY.black, PANTY.black] },
    ],
    more: 4,
  },
  {
    name: "Bandeau Bra Duo Bundle",
    compareAt: "$100.00",
    price: "$80.00",
    rating: 4.5,
    groups: [
      { colors: [COLORS.chai, COLORS.black], images: [BANDEAU.chai, BANDEAU.black] },
      { colors: [COLORS.chai, COLORS.chai], images: [BANDEAU.chai, BANDEAU.chai] },
      { colors: [COLORS.black, COLORS.black], images: [BANDEAU.black, BANDEAU.black] },
    ],
    more: 2,
  },
  {
    name: "Everyday Comfort Set",
    compareAt: "$70.00",
    price: "$56.00",
    rating: 4.5,
    groups: [
      { colors: [COLORS.black, COLORS.black], images: [BRA.black, PANTY.black] },
      { colors: [COLORS.chai, COLORS.chai], images: [BRA.chai, PANTY.chai] },
      { colors: [COLORS.chai, COLORS.black], images: [BRA.chai, PANTY.black] },
    ],
    more: 3,
  },
];

const BundleCard = ({ bundle: b }: { bundle: Bundle }) => {
  const [selected, setSelected] = React.useState(0);
  const active = b.groups[selected];

  return (
    <article className="tkb-card">
      <div className="tkb-imgarea">
        <span className="tkb-save">Save 20%</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={active.images[0]} alt="" aria-hidden className="tkb-img tkb-img--a" loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={active.images[1]} alt={b.name} className="tkb-img tkb-img--b" loading="lazy" />
      </div>

      <div className="tkb-meta">
        <div className="tkb-swatchrow" role="radiogroup" aria-label={`${b.name} color combos`}>
          {b.groups.map((g, gi) => (
            <button
              key={gi}
              type="button"
              role="radio"
              aria-checked={selected === gi}
              aria-label={`Color combo ${gi + 1}`}
              className={`tkb-group${selected === gi ? " tkb-group--active" : ""}`}
              onClick={() => setSelected(gi)}
            >
              {g.colors.map((c, ci) => (
                <span key={ci} className="tkb-dot" style={{ background: c }} aria-hidden />
              ))}
            </button>
          ))}
          <span className="tkb-more">{b.more}+</span>
        </div>
        <div className="tkb-rating" aria-label={`Rated ${b.rating} out of 5`}>
          <TruekindStarIcon size={14} />
          <span className="tkb-score">{b.rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="tkb-name">{b.name}</p>

      <div className="tkb-prices">
        <span className="tkb-compare">{b.compareAt}</span>
        <span className="tkb-price">{b.price}</span>
      </div>

      <style jsx>{`
        .tkb-card {
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .tkb-imgarea {
          position: relative;
          aspect-ratio: 4 / 5;
          background: #f0efec;
        }
        .tkb-save {
          position: absolute;
          top: -12px;
          left: 12px;
          z-index: 2;
          background: #fadfa9;
          color: var(--ink-900, #292929);
          font-family: var(--font-body, "Avenir Next", sans-serif);
          font-weight: 700;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 8px 14px;
          border-radius: 9999px;
        }
        .tkb-img {
          position: absolute;
          width: 58%;
          height: auto;
        }
        .tkb-img--a {
          top: 6%;
          left: 8%;
        }
        .tkb-img--b {
          bottom: 6%;
          right: 8%;
        }
        .tkb-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 12px;
        }
        .tkb-swatchrow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
        }
        .tkb-rating {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          font-family: var(--font-body, "Avenir Next", sans-serif);
          line-height: 1;
        }
        .tkb-score {
          font-weight: 700;
          font-size: 13px;
          color: var(--ink-900, #292929);
        }
        .tkb-group {
          display: inline-flex;
          align-items: center;
          padding: 3px;
          border-radius: 9999px;
          border: 1.5px solid transparent;
          background: none;
          cursor: pointer;
        }
        .tkb-group:hover {
          border-color: var(--ink-300, #bbbbbb);
        }
        .tkb-group:focus-visible {
          outline: 2px solid var(--ink-900, #292929);
          outline-offset: 2px;
        }
        .tkb-group--active,
        .tkb-group--active:hover {
          border-color: var(--ink-900, #292929);
        }
        .tkb-dot {
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
        }
        .tkb-dot + .tkb-dot {
          margin-left: -6px;
        }
        .tkb-more {
          font-family: var(--font-body, "Avenir Next", sans-serif);
          font-weight: 600;
          font-size: 13px;
          color: var(--ink-600, #5a5a5a);
        }
        .tkb-name {
          margin: 10px 0 0;
          font-family: var(--font-body, "Avenir Next", sans-serif);
          font-weight: 700;
          font-size: 15px;
          line-height: 1.3;
        }
        .tkb-prices {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-top: 6px;
          font-family: var(--font-body, "Avenir Next", sans-serif);
        }
        .tkb-compare {
          font-weight: 400;
          font-size: 14px;
          color: var(--ink-500, #808080);
          text-decoration: line-through;
        }
        .tkb-price {
          font-weight: 700;
          font-size: 16px;
          color: var(--ink-1000, #000);
        }
      `}</style>
    </article>
  );
};

export const TruekindBundlesSection = () => {
  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(40px, 6vw, 80px) clamp(16px, 3vw, 32px)",
        color: "var(--ink-900, #292929)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h2
          style={{
            margin: "0 0 clamp(20px, 3vw, 36px)",
            fontFamily: "var(--font-display, 'Avenir Next LT Pro', sans-serif)",
            fontWeight: 600,
            fontSize: "clamp(1.375rem, 2.6vw, 1.875rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Bundle &amp; save
        </h2>

        <div className="tkb-grid">
          {bundles.map((b) => (
            <BundleCard key={b.name} bundle={b} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .tkb-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 2vw, 24px);
        }
        @media (max-width: 1100px) {
          .tkb-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px 12px;
          }
        }
        @media (max-width: 620px) {
          .tkb-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default TruekindBundlesSection;
