/**
 * Truekind — product feature highlights (3-up detail shots + copy).
 * Features of the Supportive Comfort Wireless Shaping Bra.
 */
import React from "react";

const IMG = "/truekind/features";

const IconLift = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
    <path d="M4 19c0-6 3-12 10-12s10 6 10 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M14 7v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M10.5 12.5 14 16l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 22h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2.4 3" />
  </svg>
);

const IconInvisible = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
    <path d="M5 6v9a9 9 0 0 0 18 0V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8 13c2 1.6 4 2.4 6 2.4s4-.8 6-2.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2.2 2.8" />
  </svg>
);

const IconComfort = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
    <circle cx="14" cy="14" r="4.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14 7.6v-1M14 21.4v-1M20.4 14h1M6.6 14h1M18.5 9.5l.7-.7M8.8 19.2l.7-.7M18.5 18.5l.7.7M8.8 8.8l.7.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M23 10a10 10 0 0 0-5-4.5M5 18a10 10 0 0 0 5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="m23 6.8.2 3.4-3.3-.6M5 21.2l-.2-3.4 3.3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features = [
  {
    image: `${IMG}/detail-1035.jpg`,
    alt: "Inside view of the molded foam cups and bonded underbust",
    Icon: IconLift,
    title: "Wireless Lift",
    body: "A bonded underbust lifts without underwire. Molded foam cups provide support and shaping.",
  },
  {
    image: `${IMG}/detail-1040.jpg`,
    alt: "Smooth bonded edges and breathable perforated fabric",
    Icon: IconInvisible,
    title: "Invisible Under Clothes",
    body: "Bonded edges and a smooth finish make this bra invisible under clothes.",
  },
  {
    image: `${IMG}/detail-1039.jpg`,
    alt: "Wide wings and soft back closure of the shaping bra",
    Icon: IconComfort,
    title: "All-Day Comfort",
    body: "Premium stretch fabrics, wide wings, and soft straps feel like a second skin.",
  },
];

export const TruekindFeaturesSection = () => {
  return (
    <section
      style={{
        background: "#f7f4ee",
        padding: "clamp(48px, 6vw, 96px) clamp(16px, 3vw, 32px)",
        color: "var(--ink-900, #292929)",
      }}
    >
      <div className="tkf-grid">
        {features.map(({ image, alt, Icon, title, body }) => (
          <article key={title} className="tkf-item">
            <div className="tkf-imgwrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={alt} className="tkf-img" loading="lazy" />
            </div>
            <span className="tkf-icon" aria-hidden>
              <Icon />
            </span>
            <h3 className="tkf-title">{title}</h3>
            <p className="tkf-body">{body}</p>
          </article>
        ))}
      </div>

      <style jsx>{`
        .tkf-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(24px, 3vw, 48px);
        }
        @media (max-width: 900px) {
          .tkf-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        .tkf-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .tkf-imgwrap {
          width: 100%;
          aspect-ratio: 1 / 1.05;
          border-radius: 16px;
          overflow: hidden;
          background: #eee6dc;
        }
        .tkf-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .tkf-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          margin-top: clamp(24px, 3vw, 40px);
          border: 1.5px solid var(--ink-900, #292929);
          border-radius: 12px;
          color: var(--ink-900, #292929);
        }
        .tkf-title {
          margin: clamp(20px, 2.5vw, 32px) 0 0;
          font-family: var(--font-body, "Avenir Next", sans-serif);
          font-weight: 700;
          font-size: 15px;
          line-height: 1.3;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .tkf-body {
          margin: 12px 0 0;
          max-width: 26rem;
          font-family: var(--font-body, "Avenir Next", sans-serif);
          font-weight: 400;
          font-size: clamp(1rem, 1.4vw, 1.125rem);
          line-height: 1.45;
          color: var(--ink-700, #3a3a3a);
        }
      `}</style>
    </section>
  );
};

export default TruekindFeaturesSection;
