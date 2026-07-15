/**
 * Truekind — top announcement marquee + translucent (glass) navigation bar.
 * The nav overlays the hero with a light backdrop blur.
 */
import React from "react";

const announcements = [
  "Free shipping over $80 & free exchanges",
  "Black Friday in July — up to 60% off",
  "100-day fit guarantee",
  "Loved by 10,000,000+ customers",
];

const navLinks: { label: string; hasMenu?: boolean }[] = [
  { label: "Bras", hasMenu: true },
  { label: "Underwear", hasMenu: true },
  { label: "Packs & Bundles" },
  { label: "Accessories" },
  { label: "Best Sellers" },
];

const Caret = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden style={{ marginLeft: 4 }}>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4.5 20c1.2-3.7 4-5.5 7.5-5.5s6.3 1.8 7.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconBag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 8a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const TruekindHeader = () => {
  return (
    <header className="tk-header">
      <div className="tk-marquee" aria-label="Announcements">
        <div className="tk-marquee-track">
          {[...announcements, ...announcements].map((text, i) => (
            <span className="tk-marquee-item" key={i} aria-hidden={i >= announcements.length}>
              {text}
            </span>
          ))}
        </div>
      </div>

      <nav
        className="tk-nav"
        aria-label="Primary"
        style={{
          backdropFilter: "blur(14px) saturate(1.4)",
          WebkitBackdropFilter: "blur(14px) saturate(1.4)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" className="tk-logo" aria-label="Truekind home">
          <img src="/truekind/logo.svg" alt="Truekind" />
        </a>

        <ul className="tk-navlinks">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href="#" className="tk-navlink">
                {l.label}
                {l.hasMenu && <Caret />}
              </a>
            </li>
          ))}
          <li>
            <a href="#" className="tk-navlink tk-navlink--sale">
              Black Friday in July
            </a>
          </li>
        </ul>

        <div className="tk-actions">
          <span className="tk-locale">
            <span className="tk-flag" aria-hidden>🇺🇸</span>
            <span className="tk-divider" aria-hidden>|</span>
            USD
          </span>
          <button type="button" className="tk-iconbtn" aria-label="Search">
            <IconSearch />
          </button>
          <button type="button" className="tk-iconbtn" aria-label="Account">
            <IconUser />
          </button>
          <button type="button" className="tk-iconbtn tk-bag" aria-label="Cart, 3 items">
            <IconBag />
            <span className="tk-bag-count" aria-hidden>3</span>
          </button>
        </div>
      </nav>

      <style jsx>{`
        .tk-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          font-family: var(--font-body, "Avenir Next", sans-serif);
        }

        .tk-marquee {
          overflow: hidden;
          background: var(--ink-1000, #1c1b1a);
          color: #fff;
        }
        .tk-marquee-track {
          display: flex;
          width: max-content;
          animation: tk-scroll 40s linear infinite;
        }
        .tk-marquee-item {
          padding: 9px 40px;
          white-space: nowrap;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        @keyframes tk-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .tk-marquee-track {
            animation: none;
          }
        }

        .tk-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 14px clamp(16px, 3vw, 40px);
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(14px) saturate(1.4);
          -webkit-backdrop-filter: blur(14px) saturate(1.4);
          border-bottom: 1px solid rgba(0, 0, 0, 0.07);
          color: var(--ink-900, #292929);
        }

        .tk-logo {
          display: inline-flex;
          flex-shrink: 0;
        }
        .tk-logo img {
          height: 22px;
          width: auto;
          display: block;
        }

        .tk-navlinks {
          display: flex;
          align-items: center;
          gap: clamp(14px, 1.5vw, 30px);
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .tk-navlink {
          display: inline-flex;
          align-items: center;
          font-weight: 600;
          font-size: 14px;
          color: var(--ink-900, #292929);
          text-decoration: none;
          white-space: nowrap;
        }
        .tk-navlink:hover {
          color: var(--ink-1000, #000);
        }
        .tk-navlink--sale {
          color: var(--coral-500, #c64844);
          font-weight: 700;
        }

        .tk-actions {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
          color: var(--ink-900, #292929);
        }
        .tk-locale {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-right: 12px;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
        }
        .tk-flag {
          font-size: 16px;
          line-height: 1;
        }
        .tk-divider {
          color: rgba(0, 0, 0, 0.3);
        }
        .tk-iconbtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          padding: 4px;
          color: var(--ink-900, #292929);
          cursor: pointer;
        }
        .tk-iconbtn:hover {
          color: var(--ink-1000, #000);
        }
        .tk-bag {
          position: relative;
        }
        .tk-bag-count {
          position: absolute;
          top: -2px;
          right: -4px;
          min-width: 16px;
          height: 16px;
          padding: 0 4px;
          border-radius: 9999px;
          background: var(--coral-500, #c64844);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          line-height: 16px;
          text-align: center;
        }

        /* Tablet / mobile: drop the inline link list (would overflow). */
        @media (max-width: 1080px) {
          .tk-navlinks {
            display: none;
          }
        }
        @media (max-width: 560px) {
          .tk-locale {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default TruekindHeader;
