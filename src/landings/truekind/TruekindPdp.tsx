/**
 * Truekind — PDP for the Supportive Comfort Wireless Shaping Bra.
 * Layout inspired by Orbea's bike configurator: full-page product imagery
 * with a fixed details card on the right and a slim top bar.
 * NOTE: sizes, review count and copy are placeholders — swap for catalog data.
 */
import React from "react";
import { TruekindStarIcon, TruekindStars } from "./TruekindStars";
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

const UNIT_PRICE = 37.99;

// Reviews — placeholder copy; `fit` is 0 (runs small) → 1 (runs large).
type Review = {
  name: string;
  age: string;
  size: string;
  height: string;
  dress?: string;
  stars: number;
  title: string;
  body: string;
  fit: number;
  helpful: number;
  when: string;
};
const REVIEWS: Review[] = [
  {
    name: "Hayley S.",
    age: "25 - 34",
    size: "XXS",
    dress: "0",
    height: "5' 2\"",
    stars: 5,
    title: "So smoothing & comfy!",
    body: "The perfect undergarment for my wedding day to feel locked in and secure.",
    fit: 0.15,
    helpful: 0,
    when: "3 weeks ago",
  },
  {
    name: "Hannah W.",
    age: "25 - 34",
    size: "M",
    height: "5' 5\"",
    stars: 5,
    title: "Actually works!",
    body: "I'm 9 months postpartum and this item made me look like I had no belly flab. Amazing!",
    fit: 0.5,
    helpful: 1,
    when: "4 weeks ago",
  },
  {
    name: "Priya K.",
    age: "35 - 44",
    size: "L",
    height: "5' 7\"",
    stars: 5,
    title: "My new everyday bra",
    body: "No wires, no digging, all-day support. I bought three more in every shade.",
    fit: 0.5,
    helpful: 4,
    when: "1 month ago",
  },
  {
    name: "Denise R.",
    age: "45 - 54",
    size: "XL",
    height: "5' 4\"",
    stars: 4,
    title: "Great support, sizing tip",
    body: "Wonderfully comfortable and supportive. Runs a touch small — size up if you're between sizes.",
    fit: 0.1,
    helpful: 2,
    when: "1 month ago",
  },
  {
    name: "Marisol T.",
    age: "25 - 34",
    size: "S",
    height: "5' 6\"",
    stars: 5,
    title: "Soft & seamless",
    body: "Invisible under everything and the front closure makes it so easy to put on.",
    fit: 0.55,
    helpful: 3,
    when: "2 months ago",
  },
];
const REVIEW_AVG = 4.5;
const REVIEW_COUNT = "80,000+";

// "Why you'll love it" — product benefit bullets.
const WHY: { title: string; body: string }[] = [
  {
    title: "All-day wirefree support",
    body: "Molded cups with a hidden shaping panel hold you in — no wires, no digging.",
  },
  {
    title: "Front closure convenience",
    body: "A discreet hook-and-eye front makes it effortless to put on and take off.",
  },
  {
    title: "Smoothing double-layer band",
    body: "A wide ribbed underband stays put and lies flat under everything you wear.",
  },
  {
    title: "Breathable seamless knit",
    body: "Lightweight, tag-free fabric with mesh venting keeps you cool and unrestricted.",
  },
  {
    title: "Convertible straps",
    body: "Adjust or cross the straps to work with any neckline in your closet.",
  },
];

// UGC video slots — placeholders until the real clips land.
// Drop a `src` (and optional `poster`) on an item to turn it into a real video.
type UgcItem = { color: string; hex: string; size: string; src?: string; poster?: string };
const UGC: UgcItem[] = [
  { color: "Chai", hex: "#d8c4a8", size: "M" },
  { color: "Black", hex: "#1c1b1a", size: "XS" },
  { color: "Chai", hex: "#d8c4a8", size: "XL" },
  { color: "Black", hex: "#1c1b1a", size: "L" },
  { color: "White", hex: "#f1ede6", size: "S" },
  { color: "Cocoa", hex: "#6f4e38", size: "2XL" },
];

// Gallery beside the comparison table — auto-advances every 5s.
const VS_SHOTS: { src: string; alt: string }[] = [
  { src: "/truekind/vs/vs-1-front-closure.webp", alt: "Closing the front hook-and-eye closure" },
  { src: "/truekind/vs/vs-2-knit-detail.webp", alt: "Close-up of the seamless knit shaping panel" },
  { src: "/truekind/vs/vs-3-strap-adjust.webp", alt: "Adjusting the strap at the back" },
  { src: "/truekind/vs/vs-4-wearing.webp", alt: "Wearing the bra and fastening the front closure" },
  { src: "/truekind/vs/vs-5-flatlay.webp", alt: "Flat lay showing the front closure detail" },
];
const VS_INTERVAL = 5000;

// Truekind vs. a regular bra — comparison rows.
const COMPARE: string[] = [
  "Wirefree all-day support",
  "Posture-supporting back panel",
  "No digging straps or back bulge",
  "Front closure — easy on, easy off",
  "Smoothing double-layer band",
  "Breathable seamless knit",
  "Stays put — no riding up",
  "100-day fit guarantee",
];

// Related products — pulled from the Truekind landing catalog.
const RELATED: {
  name: string;
  image: string;
  price: string;
  compareAt: string;
  href: string;
}[] = [
  {
    name: "Daily Comfort Wireless Shaper Bra",
    image: "/truekind/products/daily-comfort-wireless-shaper-bra.webp",
    price: "$29.99",
    compareAt: "$44.00",
    href: "/pages/truekind",
  },
  {
    name: "Seamless Stretch Mid-Waist Brief",
    image: "/truekind/products/seamless-stretch-mid-waist-brief.webp",
    price: "$15.99",
    compareAt: "$26.00",
    href: "/pages/truekind",
  },
  {
    name: "Convertible Strapless Bandeau Bra",
    image: "/truekind/products/convertible-strapless-bandeau-bra.webp",
    price: "$34.99",
    compareAt: "$50.00",
    href: "/pages/truekind",
  },
  {
    name: "Shaper Bra Duo Bundle",
    image: "/truekind/bundles/shaper-bra-chai.png",
    price: "$70.40",
    compareAt: "$88.00",
    href: "/pages/truekind",
  },
];

// FAQ — question/answer pairs shown in an accordion.
const FAQ: { q: string; a: string }[] = [
  {
    q: "How do I choose my size?",
    a: "Use the size guide — enter your usual band and cup and we'll recommend a size. Between sizes? Size up for a relaxed fit or down for firmer support.",
  },
  {
    q: "Is it really wireless?",
    a: "Yes. Molded cups with a hidden shaping panel give lift and support with no underwire, so there's nothing to dig in — all day.",
  },
  {
    q: "How does the front closure work?",
    a: "A discreet hook-and-eye closure sits at the center front, making the bra easy to put on and take off without reaching behind your back.",
  },
  {
    q: "What is it made of and how do I wash it?",
    a: "A breathable nylon/spandex seamless knit. Machine wash cold on a gentle cycle and lay flat to dry to keep its shape.",
  },
  {
    q: "What are shipping and returns like?",
    a: "Free shipping on orders over $80 and a 100-day fit guarantee with free exchanges, so you can find your perfect fit risk-free.",
  },
];

// Size chart — bands across the top, cups down the side.
const SIZE_BANDS = [30, 32, 34, 36, 38, 40, 42, 44, 46, 48];
const SIZE_ROWS: { cup: string; cells: (string | null)[] }[] = [
  { cup: "A", cells: [null, "S", "S", "M", "L", null, null, null, null, null] },
  { cup: "B", cells: ["S", "S", "S", "M", "L", "L", "XL", "2XL", "2XL", "3XL"] },
  { cup: "C", cells: ["S", "S", "M", "M", "L", "XL", "2XL", "2XL", "3XL", "3XL"] },
  { cup: "D", cells: ["S", "M", "M", "L", "XL", "XL", "2XL", "3XL", "3XL", "4XL"] },
  { cup: "DD/E", cells: ["M", "M", "L", "L", "XL", "2XL", "2XL", "3XL", "4XL", "4XL"] },
  { cup: "DDD/F", cells: ["M", "L", "L", "XL", "XL", "2XL", "3XL", "3XL", "4XL", "4XL"] },
  { cup: "G", cells: [null, null, null, null, null, null, null, null, null, null] },
  { cup: "H/I", cells: [null, null, null, null, null, null, null, null, null, null] },
];
// Soft, low-saturation heat palette tuned to the Truekind cream/ink system.
const SIZE_COLORS: Record<string, string> = {
  S: "#ecb8ab",
  M: "#f4e2c4",
  L: "#efd5cd",
  XL: "#c3d8e8",
  "2XL": "#cfe0cb",
  "3XL": "#ddc9e8",
  "4XL": "#ecd7bd",
};

export const TruekindPdp = () => {
  const [color, setColor] = React.useState(0);
  const [size, setSize] = React.useState<number | null>(null);
  const [shot, setShot] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [sizeGuide, setSizeGuide] = React.useState(false);
  const [reviewsOpen, setReviewsOpen] = React.useState(false);
  const [sgBand, setSgBand] = React.useState<number | null>(null);
  const [sgCup, setSgCup] = React.useState<string | null>(null);
  const [qty, setQty] = React.useState(1);
  const ugcRef = React.useRef<HTMLDivElement>(null);
  const [vsShot, setVsShot] = React.useState(0);

  // Auto-advance the comparison gallery; pauses when the tab is hidden.
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setVsShot((i) => (i + 1) % VS_SHOTS.length);
    }, VS_INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  const scrollUgc = (dir: number) => {
    const el = ugcRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const active = colors[color];
  const selectedSize = size != null ? sizes[size] : null;

  // Chart lookup for the step-by-step finder.
  const recommended =
    sgBand != null && sgCup != null
      ? SIZE_ROWS.find((r) => r.cup === sgCup)?.cells[SIZE_BANDS.indexOf(sgBand)] ?? null
      : null;

  const selectRecommended = () => {
    if (recommended && sizes.includes(recommended)) {
      setSize(sizes.indexOf(recommended));
      setSizeGuide(false);
    }
  };

  React.useEffect(() => {
    if (!sizeGuide && !reviewsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSizeGuide(false);
      setReviewsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sizeGuide, reviewsOpen]);

  return (
    <main
      className={`pdp${expanded ? " pdp--expanded" : ""}${reviewsOpen ? " pdp--reviews" : ""}`}
    >
      <TruekindFonts />

      {/* Hero — a single 100vh screen; the "why" section flows below it.
          Header, reviews panel and size-guide are fixed overlays and stay
          viewport-anchored even though they live inside this wrapper. */}
      <div className="pdp-hero">

      {/* Reviews bubble — opens the left review panel */}
      <button
        type="button"
        className="pdp-reviews-btn"
        aria-label={`Read reviews, rated ${REVIEW_AVG} out of 5`}
        onClick={() => setReviewsOpen(true)}
      >
        <TruekindStarIcon size={15} />
        <span>{REVIEW_AVG}</span>
      </button>

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

      {/* Size-guide bubble — opens the size chart */}
      <button
        type="button"
        className="pdp-sizeguide-btn"
        aria-label="Size guide"
        onClick={() => setSizeGuide(true)}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="2.5" y="7.5" width="19" height="9" rx="1.6" />
          <path d="M6.5 7.5v4M10.5 7.5v3M14.5 7.5v4M18.5 7.5v3" />
        </svg>
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

      {/* Left reviews panel — pushes the product content toward the center */}
      <aside
        className="pdp-reviews-panel"
        aria-label="Product reviews"
        aria-hidden={!reviewsOpen}
      >
        <div className="pdp-rv-head">
          <div>
            <div className="pdp-rv-avg">
              <span className="pdp-rv-avg-num">{REVIEW_AVG}</span>
              <TruekindStars rating={Math.round(REVIEW_AVG)} size={16} />
            </div>
            <p className="pdp-rv-count">Based on {REVIEW_COUNT} reviews</p>
          </div>
          <button
            type="button"
            className="pdp-rv-close"
            aria-label="Close reviews"
            onClick={() => setReviewsOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="pdp-rv-list">
          {REVIEWS.map((r, i) => (
            <article className="pdp-rv-item" key={i}>
              <div className="pdp-rv-top">
                <span className="pdp-rv-name">{r.name}</span>
                <span className="pdp-rv-verified" title="Verified Buyer">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.2l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" />
                  </svg>
                  Verified Buyer
                </span>
                <span className="pdp-rv-when">{r.when}</span>
              </div>

              <TruekindStars rating={r.stars} size={14} />
              <h3 className="pdp-rv-title">{r.title}</h3>
              <p className="pdp-rv-body">{r.body}</p>

              <dl className="pdp-rv-meta">
                <div><dt>Size</dt><dd>{r.size}</dd></div>
                <div><dt>Age</dt><dd>{r.age}</dd></div>
                <div><dt>Height</dt><dd>{r.height}</dd></div>
              </dl>

              <div className="pdp-rv-fit">
                <div className="pdp-rv-fit-track">
                  <span className="pdp-rv-fit-dot" style={{ left: `${r.fit * 100}%` }} />
                </div>
                <div className="pdp-rv-fit-labels">
                  <span>Runs small</span>
                  <span>True to size</span>
                  <span>Runs large</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </aside>

      {/* Details card */}
      <aside className="pdp-card">
        <div className="pdp-card-scroll">
          <span className="pdp-badge">Selling Fast</span>

          <h1 className="pdp-title">Supportive Comfort Wireless Shaping Bra</h1>

          <button
            type="button"
            className="pdp-rating"
            aria-label="Rated 4.5 out of 5 — read reviews"
            onClick={() => setReviewsOpen(true)}
          >
            <TruekindStarIcon size={15} />
            <strong>4.5</strong>
            <span className="pdp-reviews">80,000+ five-star reviews</span>
          </button>

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
              <button type="button" className="pdp-guide" onClick={() => setSizeGuide(true)}>
                View size guide
              </button>
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
          <div className="pdp-buyrow">
            <div className="pdp-qty">
              <button
                type="button"
                className="pdp-qty-btn"
                aria-label="Decrease quantity"
                disabled={qty <= 1}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                &minus;
              </button>
              <span className="pdp-qty-value" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                className="pdp-qty-btn"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
              >
                +
              </button>
            </div>
            <button type="button" className="pdp-cta">
              Add to Cart — ${(UNIT_PRICE * qty).toFixed(2)}
            </button>
          </div>
          <p className="pdp-reassure">Free shipping over $80 · 100-day fit guarantee · Free exchanges</p>
        </div>
      </aside>

      </div>{/* /pdp-hero */}

      {/* Trust bar */}
      <section className="pdp-trust" aria-label="Why shop with us">
        <ul className="pdp-trust-inner">
          <li className="pdp-trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            100% seamless knit
          </li>
          <li className="pdp-trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3l7 3v5c0 4.4-3 7.4-7 8.5-4-1.1-7-4.1-7-8.5V6l7-3z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            100-day fit guarantee
          </li>
          <li className="pdp-trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 7h11v8H3z" />
              <path d="M14 10h4l3 3v2h-7z" />
              <circle cx="7" cy="18" r="1.6" />
              <circle cx="17.5" cy="18" r="1.6" />
            </svg>
            Free shipping &amp; returns
          </li>
          <li className="pdp-trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9L12 3z" />
            </svg>
            4.5 ★ · 80,000+ reviews
          </li>
        </ul>
      </section>

      {/* Why you'll love it — content section below the hero */}
      <section className="pdp-why" aria-label="Why you'll love it">
        <div className="pdp-why-inner">
          <div className="pdp-why-left">
            <p className="pdp-why-eyebrow">The details</p>
            <h2 className="pdp-why-title">Why you&rsquo;ll love it</h2>
          </div>
          <ul className="pdp-why-list">
            {WHY.map((item) => (
              <li className="pdp-why-item" key={item.title}>
                <span className="pdp-why-check" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div>
                  <h3 className="pdp-why-item-title">{item.title}</h3>
                  <p className="pdp-why-item-body">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* UGC videos — placeholders until the real clips are supplied */}
      <section className="pdp-ugc" aria-label="Real reviews from real people">
        <div className="pdp-ugc-inner">
          <h2 className="pdp-ugc-title">Real reviews, real people</h2>

          <div className="pdp-ugc-viewport">
            <div className="pdp-ugc-track" ref={ugcRef}>
              {UGC.map((v, i) => (
                <article className="pdp-ugc-card" key={i}>
                  {v.src ? (
                    <video
                      className="pdp-ugc-media"
                      src={v.src}
                      poster={v.poster}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <div className="pdp-ugc-placeholder" role="img" aria-label="Video coming soon">
                      <span className="pdp-ugc-play" aria-hidden>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5.5v13l11-6.5-11-6.5z" />
                        </svg>
                      </span>
                    </div>
                  )}
                  <span className="pdp-ugc-badge">
                    <span className="pdp-ugc-dot" style={{ background: v.hex }} aria-hidden />
                    {v.color} / {v.size}
                  </span>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="pdp-ugc-nav pdp-ugc-nav--prev"
              aria-label="Previous videos"
              onClick={() => scrollUgc(-1)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="pdp-ugc-nav pdp-ugc-nav--next"
              aria-label="Next videos"
              onClick={() => scrollUgc(1)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Truekind vs. a regular bra */}
      <section className="pdp-vs" aria-label="How Truekind compares">
        <div className="pdp-vs-media">
          <div className="pdp-vs-gallery" aria-roledescription="carousel" aria-label="Product detail photos">
            {VS_SHOTS.map((s, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                className={`pdp-vs-slide${i === vsShot ? " pdp-vs-slide--on" : ""}`}
                aria-hidden={i !== vsShot}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="pdp-vs-dots">
              {VS_SHOTS.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  className={`pdp-vs-dot${i === vsShot ? " pdp-vs-dot--on" : ""}`}
                  aria-label={`Show photo ${i + 1} of ${VS_SHOTS.length}`}
                  aria-current={i === vsShot}
                  onClick={() => setVsShot(i)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pdp-vs-body">
          <h2 className="pdp-vs-title">
            <span className="pdp-vs-title-1">More comfort.</span>
            <span className="pdp-vs-title-2">Feel the difference.</span>
          </h2>

          <table className="pdp-vs-table">
            <thead>
              <tr>
                <th scope="col">Benefits</th>
                <th scope="col" className="pdp-vs-brand">Truekind</th>
                <th scope="col">Regular bra</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row}>
                  <th scope="row">{row}</th>
                  <td>
                    <span className="pdp-vs-yes">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="pdp-sr">Yes</span>
                    </span>
                  </td>
                  <td>
                    <span className="pdp-vs-no">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      <span className="pdp-sr">No</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* You may also like */}
      <section className="pdp-related" aria-label="You may also like">
        <div className="pdp-related-inner">
          <h2 className="pdp-related-title">You may also like</h2>
          <div className="pdp-related-grid">
            {RELATED.map((p) => (
              <a className="pdp-related-card" href={p.href} key={p.name}>
                <div className="pdp-related-imgwrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <p className="pdp-related-name">{p.name}</p>
                <div className="pdp-related-prices">
                  <span className="pdp-related-price">{p.price}</span>
                  <span className="pdp-related-compare">{p.compareAt}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pdp-faq" aria-label="Frequently asked questions">
        <div className="pdp-faq-inner">
          <div className="pdp-faq-left">
            <p className="pdp-faq-eyebrow">FAQ</p>
            <h2 className="pdp-faq-title">Questions?</h2>
            <p className="pdp-faq-intro">
              We&rsquo;ve gathered the most frequently asked questions from our customers to help you in
              the best possible way.
            </p>
          </div>

          <div className="pdp-faq-list">
            {FAQ.map((item) => (
              <details className="pdp-faq-item" key={item.q}>
                <summary>
                  {item.q}
                  <span className="pdp-faq-icon" aria-hidden />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}

            <p className="pdp-faq-more">
              <span className="pdp-faq-more-label">Need more info</span> If you&rsquo;re still looking for
              answers, our detailed FAQ might be helpful.
            </p>
          </div>
        </div>
      </section>

      {/* Size-guide overlay */}
      {sizeGuide && (
        <div className="pdp-sg" role="dialog" aria-modal="true" aria-label="Size guide">
          <div className="pdp-sg-backdrop" onClick={() => setSizeGuide(false)} />
          <div className="pdp-sg-panel">
            <button
              type="button"
              className="pdp-sg-close"
              aria-label="Close size guide"
              onClick={() => setSizeGuide(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2 className="pdp-sg-title">Unsure of your size?</h2>
            <p className="pdp-sg-sub">Use our size chart to ensure a perfect fit</p>

            <div className="pdp-sg-cols">
              <div className="pdp-sg-left">
                <div className="pdp-sg-tablewrap">
                  <table className="pdp-sg-table">
                    <thead>
                      <tr>
                        <th className="pdp-sg-band" colSpan={SIZE_BANDS.length + 1}>Band →</th>
                      </tr>
                      <tr>
                        <th className="pdp-sg-cup" scope="col">Cup ↓</th>
                        {SIZE_BANDS.map((b) => (
                          <th key={b} scope="col">{b}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_ROWS.map((row) => (
                        <tr key={row.cup}>
                          <th className="pdp-sg-rowhead" scope="row">{row.cup}</th>
                          {row.cells.map((c, i) => {
                            const isFinderHit = row.cup === sgCup && SIZE_BANDS[i] === sgBand;
                            const isSizeHit = c && c === selectedSize;
                            const hit = isFinderHit || isSizeHit;
                            // With an active selection only the matching cells
                            // keep their color; everything else fades back.
                            const hasSelection =
                              Boolean(selectedSize) || (sgBand != null && sgCup != null);
                            const dim = hasSelection && !hit;
                            return (
                              <td
                                key={i}
                                className={`pdp-sg-cell${hit ? " pdp-sg-hit" : ""}${dim ? " pdp-sg-cell--dim" : ""}`}
                                style={c ? { background: SIZE_COLORS[c] } : undefined}
                              >
                                {c}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="pdp-sg-note">
                  Your selection: {selectedSize ? <strong>{selectedSize}</strong> : "pick a size to highlight it"}
                </p>
              </div>

              {/* Step-by-step finder */}
              <div className="pdp-sg-finder">
                <h3 className="pdp-sg-finder-title">Find my size</h3>

                <p className="pdp-sg-q">1. What is your closest Band Size?</p>
                <div className="pdp-sg-opts" role="radiogroup" aria-label="Band size">
                  {SIZE_BANDS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      role="radio"
                      aria-checked={sgBand === b}
                      className={`pdp-sg-opt${sgBand === b ? " pdp-sg-opt--active" : ""}`}
                      onClick={() => setSgBand(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>

                <p className="pdp-sg-q">2. What is your closest Cup Size?</p>
                <div className="pdp-sg-opts" role="radiogroup" aria-label="Cup size">
                  {SIZE_ROWS.map((r) => (
                    <button
                      key={r.cup}
                      type="button"
                      role="radio"
                      aria-checked={sgCup === r.cup}
                      className={`pdp-sg-opt${sgCup === r.cup ? " pdp-sg-opt--active" : ""}`}
                      onClick={() => setSgCup(r.cup)}
                    >
                      {r.cup}
                    </button>
                  ))}
                </div>

                {sgBand != null && sgCup != null && (
                  <div className="pdp-sg-result">
                    <p className="pdp-sg-result-label">Recommended size</p>
                    {recommended ? (
                      <p className="pdp-sg-result-size">
                        {sgBand}
                        {sgCup} = <strong>{recommended}</strong>
                      </p>
                    ) : (
                      <p className="pdp-sg-result-miss">
                        This combination isn&apos;t available for this style yet.
                      </p>
                    )}
                    <div className="pdp-sg-result-actions">
                      <button
                        type="button"
                        className="pdp-sg-restart"
                        onClick={() => {
                          setSgBand(null);
                          setSgCup(null);
                        }}
                      >
                        Start over
                      </button>
                      {recommended && (
                        <button type="button" className="pdp-sg-select" onClick={selectRecommended}>
                          Select this size
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .pdp {
          position: relative;
          background: #f4efe7;
          color: var(--ink-900, #292929);
          font-family: var(--font-body, "Circular XX", system-ui, sans-serif);
          --font-body: "Circular XX", system-ui, sans-serif;
          --font-display: "Circular XX", system-ui, sans-serif;
          /* Height of the Truekind site header (marquee + nav); offsets everything below. */
          --pdp-header: 92px;
          /* Width the left reviews panel claims when open. */
          --pdp-reviews-w: min(400px, 34vw);
        }
        /* The hero is one full screen; absolute children scroll away with it. */
        .pdp-hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
          /* Backdrop painted by the page itself — imagery ships as cutouts. */
          background:
            radial-gradient(120% 90% at 28% 42%, rgba(255, 252, 246, 0.9) 0%, rgba(255, 252, 246, 0) 55%),
            linear-gradient(180deg, #f6f0e7 0%, #eee5d8 55%, #e3d7c6 100%);
        }
        /* Shorter announcement marquee on the PDP (scoped — landing keeps its own). */
        .pdp :global(.tk-marquee-item) {
          padding-top: 5px;
          padding-bottom: 5px;
        }
        .pdp-stage {
          position: absolute;
          z-index: 0;
          top: var(--pdp-header);
          bottom: 0;
          left: 0;
          right: min(480px, 38vw);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          transition: right 0.45s cubic-bezier(0.4, 0, 0.2, 1),
            left 0.42s cubic-bezier(0.4, 0, 0.2, 1);
        }
        /* Reviews open → the image slides toward the center. */
        .pdp--reviews .pdp-stage {
          left: var(--pdp-reviews-w);
        }
        .pdp-expand {
          position: absolute;
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
        /* Size-guide bubble — stacked under the expand button. */
        .pdp-sizeguide-btn {
          position: absolute;
          z-index: 5;
          top: calc(var(--pdp-header) + 14px + 52px);
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
        }
        .pdp-sizeguide-btn:hover {
          background: #fff;
        }
        .pdp-sizeguide-btn:focus-visible {
          outline: 2px solid var(--ink-900, #292929);
          outline-offset: 2px;
        }
        /* Hide the bubbles when the image takes over the screen. */
        .pdp--expanded .pdp-sizeguide-btn {
          display: none;
        }
        /* Reviews bubble — star + rating pill on the left edge. */
        .pdp-reviews-btn {
          position: absolute;
          z-index: 5;
          top: calc(var(--pdp-header) + 14px);
          left: clamp(16px, 2.5vw, 32px);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 44px;
          padding: 0 16px;
          color: var(--ink-900, #292929);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          backdrop-filter: blur(6px);
          font-weight: 700;
          font-size: 14px;
        }
        .pdp-reviews-btn:hover {
          background: #fff;
        }
        .pdp-reviews-btn:focus-visible {
          outline: 2px solid var(--ink-900, #292929);
          outline-offset: 2px;
        }
        .pdp--expanded .pdp-reviews-btn,
        .pdp--reviews .pdp-reviews-btn {
          opacity: 0;
          pointer-events: none;
        }
        .pdp-thumbs {
          transition: left 0.42s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pdp--reviews .pdp-thumbs {
          left: calc(var(--pdp-reviews-w) + clamp(16px, 2.5vw, 32px));
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
          position: absolute;
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
          position: absolute;
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
          background: none;
          border: none;
          padding: 0;
          font-family: inherit;
          color: inherit;
          cursor: pointer;
        }
        .pdp-rating .pdp-reviews {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .pdp-rating:hover .pdp-reviews {
          color: var(--ink-900, #292929);
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
          font-family: inherit;
          font-weight: 400;
          font-size: 12px;
          color: var(--ink-600, #5a5a5a);
          text-decoration: underline;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .pdp-guide:hover {
          color: var(--ink-900, #292929);
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
        /* Quantity selector sits to the left of the CTA. */
        .pdp-buyrow {
          display: flex;
          align-items: stretch;
          gap: 10px;
        }
        .pdp-qty {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 0 6px;
          min-height: 52px;
          border: 1px solid var(--ink-300, #cfcfcf);
          border-radius: 9999px;
          background: #fff;
        }
        .pdp-qty-btn {
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          border-radius: 9999px;
          font-family: inherit;
          font-size: 17px;
          line-height: 1;
          color: var(--ink-900, #292929);
          cursor: pointer;
        }
        .pdp-qty-btn:hover:not(:disabled) {
          background: #f2ece2;
        }
        .pdp-qty-btn:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .pdp-qty-btn:focus-visible {
          outline: 2px solid var(--ink-900, #292929);
          outline-offset: 1px;
        }
        .pdp-qty-value {
          min-width: 20px;
          text-align: center;
          font-weight: 700;
          font-size: 14px;
          font-variant-numeric: tabular-nums;
        }
        .pdp-cta {
          flex: 1;
          min-width: 0;
          min-height: 52px;
          padding: 0 16px;
          background: var(--ink-1000, #000);
          color: #fff;
          border: none;
          border-radius: 9999px;
          font-family: inherit;
          font-weight: 700;
          font-size: 15px;
          white-space: nowrap;
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

        /* ---- Trust bar (between hero and why) ---- */
        .pdp-trust {
          position: relative;
          z-index: 1;
          background: #f1ede6;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        .pdp-trust-inner {
          list-style: none;
          margin: 0 auto;
          max-width: 1160px;
          padding: 16px clamp(20px, 6vw, 80px);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 14px clamp(24px, 5vw, 64px);
        }
        .pdp-trust-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 600;
          color: var(--ink-900, #292929);
          white-space: nowrap;
        }
        .pdp-trust-item svg {
          flex-shrink: 0;
          color: var(--ink-800, #3a3a3a);
        }
        @media (max-width: 760px) {
          /* 2x2 grid keeps all four signals visible without a tall stack. */
          .pdp-trust-inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px 12px;
            padding: 16px;
          }
          .pdp-trust-item {
            align-items: flex-start;
            gap: 7px;
            font-size: 11.5px;
            line-height: 1.3;
            letter-spacing: -0.005em;
            white-space: normal;
          }
          .pdp-trust-item svg {
            width: 17px;
            height: 17px;
            margin-top: 1px;
          }
        }

        /* ---- Why you'll love it (below the hero) ---- */
        .pdp-why {
          position: relative;
          z-index: 1;
          background: #fbf8f3;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          padding: clamp(40px, 5vw, 64px) clamp(20px, 6vw, 80px);
        }
        .pdp-why-inner {
          max-width: 1160px;
          margin: 0 auto;
        }
        .pdp-why-left {
          margin-bottom: clamp(22px, 3vw, 34px);
        }
        .pdp-why-eyebrow {
          margin: 0 0 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-500, #808080);
        }
        .pdp-why-title {
          margin: 0;
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-weight: 800;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          line-height: 1.04;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }
        /* Items sit in a row of outlined boxes below the title. */
        .pdp-why-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }
        .pdp-why-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px 18px;
          border: 1px solid rgba(0, 0, 0, 0.16);
          border-radius: 12px;
        }
        .pdp-why-check {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 9999px;
          background: var(--ink-1000, #1c1b1a);
          color: #fff;
        }
        .pdp-why-item-title {
          margin: 0;
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-weight: 700;
          font-size: 15px;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }
        .pdp-why-item-body {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: var(--ink-700, #454545);
        }
        @media (max-width: 1080px) {
          .pdp-why-list {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 700px) {
          .pdp-why-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }
        }

        /* ---- UGC video carousel ---- */
        .pdp-ugc {
          position: relative;
          z-index: 1;
          background: #fff;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding: clamp(40px, 5vw, 68px) 0;
        }
        .pdp-ugc-inner {
          max-width: 1160px;
          margin: 0 auto;
        }
        .pdp-ugc-title {
          margin: 0 0 clamp(20px, 3vw, 32px);
          padding: 0 clamp(20px, 6vw, 80px);
          text-align: center;
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-weight: 700;
          font-size: clamp(1.5rem, 2.8vw, 2.125rem);
          letter-spacing: -0.02em;
        }
        .pdp-ugc-viewport {
          position: relative;
        }
        .pdp-ugc-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 0 clamp(20px, 6vw, 80px);
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .pdp-ugc-track::-webkit-scrollbar {
          display: none;
        }
        .pdp-ugc-card {
          position: relative;
          flex: 0 0 auto;
          width: clamp(190px, 22vw, 250px);
          aspect-ratio: 3 / 4;
          border-radius: 14px;
          overflow: hidden;
          scroll-snap-align: start;
          background: #f1ece4;
        }
        .pdp-ugc-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        /* Empty slot awaiting a real clip. */
        .pdp-ugc-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #f6f1e9 0%, #e9e1d5 100%);
        }
        .pdp-ugc-play {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          padding-left: 3px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.92);
          color: var(--ink-900, #292929);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }
        .pdp-ugc-badge {
          position: absolute;
          left: 10px;
          bottom: 10px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          border-radius: 9999px;
          background: #fff;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }
        .pdp-ugc-dot {
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
        }
        .pdp-ugc-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
          color: var(--ink-900, #292929);
          cursor: pointer;
        }
        .pdp-ugc-nav:hover {
          background: #fff;
        }
        .pdp-ugc-nav--prev {
          left: clamp(6px, 2vw, 28px);
        }
        .pdp-ugc-nav--next {
          right: clamp(6px, 2vw, 28px);
        }
        @media (max-width: 700px) {
          .pdp-ugc-nav {
            display: none;
          }
          .pdp-ugc-track {
            padding: 0 16px;
          }
        }

        /* ---- Truekind vs. regular bra ---- */
        .pdp-sr {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .pdp-vs {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          align-items: stretch;
          background: #fbf8f3;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }
        .pdp-vs-media {
          min-height: 100%;
        }
        .pdp-vs-gallery {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 380px;
          overflow: hidden;
          background: #ece4d6;
        }
        .pdp-vs-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .pdp-vs-slide--on {
          opacity: 1;
        }
        .pdp-vs-dots {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 16px;
          z-index: 1;
          display: flex;
          justify-content: center;
          gap: 7px;
        }
        .pdp-vs-dot {
          width: 7px;
          height: 7px;
          padding: 0;
          border: none;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.55);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          transition: background 0.25s ease, width 0.25s ease;
        }
        .pdp-vs-dot--on {
          width: 20px;
          background: #fff;
        }
        .pdp-vs-dot:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 2px;
        }
        .pdp-vs-body {
          padding: clamp(40px, 5vw, 72px) clamp(20px, 5vw, 64px);
        }
        .pdp-vs-title {
          margin: 0 0 clamp(22px, 3vw, 34px);
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-weight: 800;
          font-size: clamp(1.75rem, 3.2vw, 2.75rem);
          line-height: 1.06;
          letter-spacing: -0.025em;
        }
        .pdp-vs-title-1,
        .pdp-vs-title-2 {
          display: block;
        }
        .pdp-vs-title-1 {
          color: var(--ink-400, #a8a29a);
        }
        .pdp-vs-title-2 {
          color: var(--ink-1000, #1c1b1a);
        }
        .pdp-vs-table {
          width: 100%;
          border-collapse: collapse;
        }
        .pdp-vs-table thead th {
          padding: 0 0 12px;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink-600, #5a5a5a);
          text-align: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        }
        .pdp-vs-table thead th:first-child {
          text-align: left;
        }
        .pdp-vs-brand {
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-weight: 800 !important;
          color: var(--ink-1000, #1c1b1a) !important;
        }
        .pdp-vs-table tbody th {
          padding: 14px 16px 14px 0;
          text-align: left;
          font-size: 14.5px;
          font-weight: 500;
          line-height: 1.35;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .pdp-vs-table tbody td {
          width: 108px;
          padding: 8px 0;
          text-align: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .pdp-vs-yes {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 40px;
          border-radius: 8px;
          background: #ece4d6;
          color: var(--ink-1000, #1c1b1a);
        }
        .pdp-vs-no {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 40px;
          color: var(--ink-400, #a8a29a);
        }
        @media (max-width: 860px) {
          .pdp-vs {
            grid-template-columns: 1fr;
          }
          .pdp-vs-gallery {
            min-height: 0;
            aspect-ratio: 4 / 3;
          }
          .pdp-vs-table tbody td {
            width: 76px;
          }
          .pdp-vs-yes,
          .pdp-vs-no {
            width: 56px;
            height: 36px;
          }
        }

        /* ---- You may also like ---- */
        .pdp-related {
          position: relative;
          z-index: 1;
          background: #fff;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding: clamp(48px, 7vw, 88px) clamp(20px, 6vw, 80px);
        }
        .pdp-related-inner {
          max-width: 1160px;
          margin: 0 auto;
        }
        .pdp-related-title {
          margin: 0 0 clamp(24px, 3vw, 40px);
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-weight: 700;
          font-size: clamp(1.5rem, 2.8vw, 2.125rem);
          letter-spacing: -0.02em;
        }
        .pdp-related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(14px, 2vw, 28px);
        }
        .pdp-related-card {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        .pdp-related-imgwrap {
          aspect-ratio: 3 / 4;
          background: #f4f0ea;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        .pdp-related-imgwrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.4s ease;
        }
        .pdp-related-card:hover .pdp-related-imgwrap img {
          transform: scale(1.04);
        }
        .pdp-related-name {
          margin: 0 0 6px;
          font-size: 14.5px;
          font-weight: 500;
          line-height: 1.35;
        }
        .pdp-related-prices {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .pdp-related-price {
          font-weight: 700;
          font-size: 15px;
        }
        .pdp-related-compare {
          font-size: 13px;
          color: var(--ink-500, #808080);
          text-decoration: line-through;
        }
        @media (max-width: 760px) {
          .pdp-related-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px 12px;
          }
        }

        /* ---- FAQ ---- */
        .pdp-faq {
          position: relative;
          z-index: 1;
          background: #fbf8f3;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding: clamp(48px, 8vw, 104px) clamp(20px, 6vw, 80px);
        }
        .pdp-faq-inner {
          max-width: 1160px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(32px, 6vw, 100px);
          align-items: start;
        }
        .pdp-faq-eyebrow {
          margin: 0 0 12px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-500, #808080);
        }
        .pdp-faq-title {
          margin: 0 0 16px;
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.25rem);
          line-height: 1.02;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }
        .pdp-faq-intro {
          margin: 0;
          font-size: 15px;
          line-height: 1.55;
          color: var(--ink-700, #454545);
          max-width: 34ch;
        }
        .pdp-faq-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        }
        .pdp-faq-item summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 22px 0;
          list-style: none;
          cursor: pointer;
          font-size: clamp(1rem, 1.5vw, 1.1875rem);
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .pdp-faq-item summary::-webkit-details-marker {
          display: none;
        }
        .pdp-faq-icon {
          position: relative;
          flex-shrink: 0;
          width: 16px;
          height: 16px;
        }
        .pdp-faq-icon::before,
        .pdp-faq-icon::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          background: var(--ink-800, #3a3a3a);
          transform: translate(-50%, -50%);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .pdp-faq-icon::before {
          width: 16px;
          height: 1.8px;
        }
        .pdp-faq-icon::after {
          width: 1.8px;
          height: 16px;
        }
        .pdp-faq-item[open] .pdp-faq-icon::after {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(90deg);
        }
        .pdp-faq-item p {
          margin: 0;
          padding: 0 40px 24px 0;
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--ink-700, #454545);
          max-width: 62ch;
        }
        .pdp-faq-more {
          margin: 26px 0 0;
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--ink-600, #5a5a5a);
        }
        .pdp-faq-more-label {
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink-900, #292929);
          margin-right: 8px;
        }
        @media (max-width: 760px) {
          .pdp-faq-inner {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        /* ---- Left reviews panel ---- */
        .pdp-reviews-panel {
          position: fixed;
          z-index: 6;
          top: var(--pdp-header);
          left: 0;
          bottom: 0;
          width: var(--pdp-reviews-w);
          display: flex;
          flex-direction: column;
          background: #fff;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 12px 0 40px rgba(43, 34, 26, 0.1);
          transform: translateX(-100%);
          transition: transform 0.42s cubic-bezier(0.3, 0.7, 0.25, 1);
        }
        .pdp--reviews .pdp-reviews-panel {
          transform: translateX(0);
        }
        .pdp-rv-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 20px 20px 16px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .pdp-rv-avg {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pdp-rv-avg-num {
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-weight: 800;
          font-size: 30px;
          line-height: 1;
        }
        .pdp-rv-count {
          margin: 6px 0 0;
          font-size: 12.5px;
          color: var(--ink-600, #5a5a5a);
        }
        .pdp-rv-close {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ink-900, #292929);
          background: #f4f0ea;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
        }
        .pdp-rv-close:hover {
          background: #e9e3d9;
        }
        .pdp-rv-list {
          flex: 1;
          overflow-y: auto;
          padding: 4px 20px 24px;
          scrollbar-width: thin;
        }
        .pdp-rv-item {
          padding: 20px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.07);
        }
        .pdp-rv-top {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }
        .pdp-rv-name {
          font-weight: 700;
          font-size: 14px;
        }
        .pdp-rv-verified {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          color: #4c8a5a;
          font-weight: 600;
        }
        .pdp-rv-when {
          margin-left: auto;
          font-size: 12px;
          color: var(--ink-500, #808080);
        }
        .pdp-rv-title {
          margin: 8px 0 4px;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .pdp-rv-body {
          margin: 0 0 12px;
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--ink-700, #454545);
        }
        .pdp-rv-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 18px;
          margin: 0 0 14px;
        }
        .pdp-rv-meta div {
          display: flex;
          gap: 5px;
        }
        .pdp-rv-meta dt {
          font-size: 12px;
          color: var(--ink-500, #808080);
        }
        .pdp-rv-meta dd {
          margin: 0;
          font-size: 12px;
          font-weight: 700;
        }
        .pdp-rv-fit-track {
          position: relative;
          height: 4px;
          border-radius: 9999px;
          background: #e6e0d6;
          margin-bottom: 6px;
        }
        .pdp-rv-fit-dot {
          position: absolute;
          top: 50%;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background: var(--ink-900, #292929);
          transform: translate(-50%, -50%);
        }
        .pdp-rv-fit-labels {
          display: flex;
          justify-content: space-between;
          font-size: 10.5px;
          color: var(--ink-500, #808080);
        }

        /* ---- Size guide drawer (slides up from the bottom) ---- */
        .pdp-sg {
          position: fixed;
          inset: 0;
          z-index: 1200;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .pdp-sg-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(43, 34, 26, 0.44);
          backdrop-filter: blur(2px);
          animation: pdp-sg-fade 0.2s ease;
        }
        .pdp-sg-panel {
          position: relative;
          z-index: 1;
          width: 100%;
          max-height: 86vh;
          overflow-y: auto;
          background: #fff;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 26px 26px 0 0;
          padding: clamp(24px, 3vw, 40px) clamp(20px, 4vw, 48px) clamp(28px, 4vw, 44px);
          box-shadow: 0 -20px 60px rgba(43, 34, 26, 0.26);
          animation: pdp-sg-up 0.34s cubic-bezier(0.2, 0.75, 0.25, 1);
          scrollbar-width: none;
        }
        .pdp-sg-panel::-webkit-scrollbar {
          display: none;
        }
        /* Constrain the content on wide screens while the drawer spans full width. */
        .pdp-sg-title,
        .pdp-sg-sub,
        .pdp-sg-cols {
          max-width: 1080px;
          margin-left: auto;
          margin-right: auto;
        }
        .pdp-sg-cols {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: clamp(24px, 3vw, 40px);
          align-items: start;
        }
        @media (max-width: 900px) {
          .pdp-sg-cols {
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
          }
          /* On small screens the finder is the primary tool — show it first. */
          .pdp-sg-finder {
            order: -1;
          }
          .pdp-sg-panel {
            max-height: 92vh;
            padding: 20px 16px 24px;
            border-radius: 20px 20px 0 0;
          }
          .pdp-sg-close {
            position: sticky;
            float: right;
            top: 0;
          }
          .pdp-sg-title {
            font-size: 1.25rem;
            padding-right: 44px;
          }
          .pdp-sg-sub {
            font-size: 13.5px;
            margin-bottom: 14px;
          }
          .pdp-sg-table {
            min-width: 520px;
            font-size: 12.5px;
          }
          .pdp-sg-table th,
          .pdp-sg-table td {
            height: 38px;
            min-width: 42px;
          }
          .pdp-sg-band,
          .pdp-sg-cup {
            padding-left: 12px;
          }
          .pdp-sg-rowhead {
            padding: 0 10px;
          }
          .pdp-sg-finder {
            padding: 16px;
          }
          .pdp-sg-result-size {
            font-size: 19px;
          }
          .pdp-sg-result-size strong {
            font-size: 26px;
          }
        }
        .pdp-sg-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ink-900, #292929);
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          cursor: pointer;
        }
        .pdp-sg-close:hover {
          background: #f2ece2;
        }
        .pdp-sg-title {
          margin: 0 auto 4px;
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-weight: 700;
          font-size: clamp(1.375rem, 2.4vw, 1.75rem);
          letter-spacing: -0.015em;
        }
        .pdp-sg-sub {
          margin: 0 auto 20px;
          font-size: 15px;
          color: var(--ink-600, #5a5a5a);
        }
        .pdp-sg-tablewrap {
          overflow-x: auto;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          background: #fff;
        }
        .pdp-sg-table {
          border-collapse: collapse;
          width: 100%;
          min-width: 620px;
          font-size: 14px;
        }
        .pdp-sg-table th,
        .pdp-sg-table td {
          border: 1px solid rgba(0, 0, 0, 0.06);
          text-align: center;
          height: 46px;
          min-width: 50px;
          font-weight: 600;
          color: var(--ink-900, #292929);
        }
        .pdp-sg-band {
          text-align: left;
          padding-left: 18px;
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-size: 15px;
          background: #f6f6f5;
          border-bottom: none;
        }
        .pdp-sg-cup,
        .pdp-sg-rowhead {
          background: #f6f6f5;
          font-weight: 700;
        }
        .pdp-sg-table thead th {
          position: sticky;
          top: 0;
        }
        .pdp-sg-cup {
          text-align: left;
          padding-left: 18px;
        }
        .pdp-sg-rowhead {
          padding: 0 14px;
          white-space: nowrap;
        }
        .pdp-sg-cell {
          color: var(--ink-900, #292929);
          transition: opacity 0.25s ease;
        }
        /* Quiet-luxury focus: non-matching cells recede when something is selected. */
        .pdp-sg-cell--dim {
          opacity: 0.18;
        }
        .pdp-sg-hit {
          outline: 2.5px solid var(--ink-1000, #1c1b1a);
          outline-offset: -2.5px;
          font-weight: 800;
        }
        .pdp-sg-note {
          margin: 16px auto 0;
          font-size: 13px;
          color: var(--ink-600, #5a5a5a);
        }

        /* ---- Step-by-step finder ---- */
        .pdp-sg-finder {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          padding: 20px;
        }
        .pdp-sg-finder-title {
          margin: 0 0 14px;
          font-family: var(--font-display, "Circular XX", sans-serif);
          font-weight: 700;
          font-size: 17px;
          letter-spacing: -0.01em;
        }
        .pdp-sg-q {
          margin: 0 0 8px;
          font-weight: 700;
          font-size: 13px;
        }
        .pdp-sg-opts {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        .pdp-sg-opt {
          min-width: 44px;
          min-height: 36px;
          padding: 0 10px;
          background: #fff;
          border: 1px solid var(--ink-300, #cfcfcf);
          border-radius: 8px;
          font-family: inherit;
          font-weight: 600;
          font-size: 13px;
          color: var(--ink-900, #292929);
          cursor: pointer;
        }
        .pdp-sg-opt:hover {
          border-color: var(--ink-900, #292929);
        }
        .pdp-sg-opt--active {
          background: var(--ink-1000, #000);
          border-color: var(--ink-1000, #000);
          color: #fff;
        }
        .pdp-sg-result {
          border-top: 1px solid rgba(0, 0, 0, 0.09);
          padding-top: 14px;
        }
        .pdp-sg-result-label {
          margin: 0 0 6px;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-600, #5a5a5a);
        }
        .pdp-sg-result-size {
          margin: 0 0 14px;
          font-size: 22px;
          letter-spacing: -0.01em;
        }
        .pdp-sg-result-size strong {
          font-weight: 800;
          font-size: 30px;
        }
        .pdp-sg-result-miss {
          margin: 0 0 14px;
          font-size: 13.5px;
          line-height: 1.45;
          color: var(--ink-700, #454545);
        }
        .pdp-sg-result-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .pdp-sg-restart {
          background: none;
          border: none;
          padding: 0;
          font-family: inherit;
          font-weight: 600;
          font-size: 13px;
          color: var(--ink-700, #454545);
          text-decoration: underline;
          cursor: pointer;
        }
        .pdp-sg-restart:hover {
          color: var(--ink-1000, #000);
        }
        .pdp-sg-select {
          flex: 1;
          min-height: 44px;
          background: var(--ink-1000, #000);
          color: #fff;
          border: none;
          border-radius: 9999px;
          font-family: inherit;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
        }
        .pdp-sg-select:hover {
          background: #222;
        }
        @keyframes pdp-sg-fade {
          from {
            opacity: 0;
          }
        }
        @keyframes pdp-sg-up {
          from {
            transform: translateY(100%);
          }
        }

        @media (max-width: 860px) {
          .pdp {
            display: block;
            /* Slimmer header on mobile buys more room for the first fold. */
            --pdp-header: 84px;
          }
          /* Compact the shared nav on mobile — scoped to the PDP only. */
          .pdp :global(.tk-nav) {
            padding-top: 9px;
            padding-bottom: 9px;
          }
          /* The floating bubbles are desktop-only; the drawer owns mobile. */
          .pdp-expand,
          .pdp-sizeguide-btn,
          .pdp-reviews-btn {
            display: none;
          }
          /* Reviews cover the screen on mobile instead of pushing content. */
          .pdp-reviews-panel {
            width: 100%;
          }
          .pdp--reviews .pdp-stage {
            left: 0;
          }
          .pdp--reviews .pdp-thumbs {
            left: 50%;
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
            position: absolute;
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
            position: absolute;
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
            position: absolute;
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
