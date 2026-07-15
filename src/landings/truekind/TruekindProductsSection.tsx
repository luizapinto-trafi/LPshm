/**
 * Truekind — product cards section.
 * Real catalog data & imagery (public/truekind/products).
 */
import React from "react";
import { TruekindStarIcon } from "./TruekindStars";

const IMG = "/truekind/products";

type Product = {
  image: string;
  hoverImage: string;
  name: string;
  compareAt: string;
  price: string;
  rating: number;
  badges: string[];
  /** Swatch hex colors — placeholder palette, replace with real catalog colors. */
  swatches: string[];
};

// Truekind tonal range (placeholder values — swap for real per-product colors).
const TONES = {
  black: "#1c1b1a",
  white: "#f1ede6",
  chai: "#d8c4a8",
  sand: "#e7d6bd",
  tan: "#c9a785",
  caramel: "#a67a54",
  cocoa: "#6f4e38",
  espresso: "#43301f",
};

const products: Product[] = [
  {
    image: `${IMG}/daily-comfort-wireless-shaper-bra.webp`,
    hoverImage: `${IMG}/daily-comfort-wireless-shaper-bra-hover.png`,
    name: "Daily Comfort Wireless Shaper Bra",
    compareAt: "$44.00",
    price: "$29.99",
    rating: 4.5,
    badges: ["Best Seller"],
    swatches: [TONES.black, TONES.chai, TONES.white, TONES.tan, TONES.cocoa],
  },
  {
    image: `${IMG}/seamless-stretch-mid-waist-brief.webp`,
    hoverImage: `${IMG}/seamless-stretch-mid-waist-brief-hover.png`,
    name: "Seamless Stretch Mid-Waist Brief",
    compareAt: "$26.00",
    price: "$15.99",
    rating: 4.5,
    badges: [],
    swatches: [TONES.sand, TONES.black, TONES.chai, TONES.caramel, TONES.espresso],
  },
  {
    image: `${IMG}/supportive-comfort-wireless-shaping-bra.webp`,
    hoverImage: `${IMG}/supportive-comfort-wireless-shaping-bra-hover.png`,
    name: "Supportive Comfort Wireless Shaping Bra",
    compareAt: "$55.00",
    price: "$37.99",
    rating: 4.5,
    badges: ["Selling Fast"],
    swatches: [TONES.chai, TONES.black, TONES.white, TONES.tan, TONES.caramel, TONES.cocoa],
  },
  {
    image: `${IMG}/convertible-strapless-bandeau-bra.webp`,
    hoverImage: `${IMG}/convertible-strapless-bandeau-bra-hover.png`,
    name: "Convertible Strapless Bandeau Bra",
    compareAt: "$50.00",
    price: "$34.99",
    rating: 4.5,
    badges: ["Best Seller"],
    swatches: [TONES.chai, TONES.white, TONES.black],
  },
];

export const TruekindProductsSection = () => {
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
            margin: "0 0 clamp(16px, 2.5vw, 28px)",
            fontFamily: "var(--font-display, 'Avenir Next LT Pro', sans-serif)",
            fontWeight: 600,
            fontSize: "clamp(1.375rem, 2.6vw, 1.875rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Shop the sale
        </h2>

        <div className="tk-grid">
          {products.map((p) => (
            <article key={p.name} className="tk-card">
              <div className="tk-imgwrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="tk-img" loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.hoverImage} alt="" aria-hidden className="tk-img tk-img-hover" loading="lazy" />
                {p.badges.length > 0 && (
                  <div className="tk-badges">
                    {p.badges.map((b) => (
                      <span key={b} className="tk-badge">
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="tk-meta">
                <div className="tk-swatches">
                  {p.swatches.map((c, i) => (
                    <span
                      key={c + i}
                      className={`tk-sw${i === 0 ? " tk-sw--active" : ""}`}
                      style={{ background: c }}
                      aria-hidden
                    />
                  ))}
                </div>
                <div className="tk-rating" aria-label={`Rated ${p.rating} out of 5`}>
                  <TruekindStarIcon size={14} />
                  <span className="tk-score">{p.rating.toFixed(1)}</span>
                </div>
              </div>

              <p className="tk-name">{p.name}</p>

              <div className="tk-prices">
                <span className="tk-compare">{p.compareAt}</span>
                <span className="tk-price">{p.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tk-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 2vw, 24px);
        }
        @media (max-width: 900px) {
          .tk-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 12px;
          }
        }
        .tk-card {
          display: flex;
          flex-direction: column;
        }
        .tk-imgwrap {
          position: relative;
          aspect-ratio: 3 / 4;
          background: #f4f4f4;
          overflow: hidden;
        }
        .tk-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .tk-img-hover {
          object-fit: contain;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .tk-card:hover .tk-img-hover {
          opacity: 1;
        }
        .tk-card:hover .tk-img:not(.tk-img-hover) {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .tk-badges {
          position: absolute;
          left: 12px;
          bottom: 12px;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }
        .tk-badge {
          background: var(--ink-1000, #000);
          color: #fff;
          font-family: var(--font-body, "Avenir Next", sans-serif);
          font-weight: 600;
          font-size: 12px;
          line-height: 1;
          padding: 6px 10px;
          border-radius: 4px;
        }
        .tk-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 12px;
        }
        .tk-swatches {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
        }
        .tk-sw {
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
        .tk-sw--active {
          box-shadow: 0 0 0 1.5px #fff, 0 0 0 3px var(--ink-900, #292929);
        }
        .tk-name {
          margin: 10px 0 0;
          font-family: var(--font-body, "Avenir Next", sans-serif);
          font-weight: 400;
          font-size: 15px;
          line-height: 1.3;
        }
        .tk-rating {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          font-family: var(--font-body, "Avenir Next", sans-serif);
          line-height: 1;
        }
        .tk-score {
          font-weight: 700;
          font-size: 13px;
          color: var(--ink-900, #292929);
        }
        .tk-prices {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-top: 6px;
          font-family: var(--font-body, "Avenir Next", sans-serif);
        }
        .tk-compare {
          font-weight: 400;
          font-size: 14px;
          color: var(--ink-500, #808080);
          text-decoration: line-through;
        }
        .tk-price {
          font-weight: 700;
          font-size: 16px;
          color: var(--ink-1000, #000);
        }
      `}</style>
    </section>
  );
};

export default TruekindProductsSection;
