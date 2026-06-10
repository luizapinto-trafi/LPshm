import Head from "next/head";
import type { GetStaticProps, NextPage } from "next";

// ─── Design tokens (Figma: Shaperbox LP / node 130:5015) ───────────────────────
const INK_900 = "#292929";
const PEACH = "#F7A08B";
const PEACH_HOVER = "#E08F7C";
const STAR = "#F5A623";
const FONT = "'Avenir Next LT Pro', 'Avenir Next', sans-serif";

function StarRating() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", color: STAR }} aria-label="4.5 out of 5 stars">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} style={{ fontSize: 20, lineHeight: 1 }} aria-hidden>★</span>
      ))}
      <span
        aria-hidden
        style={{
          position: "relative",
          display: "inline-block",
          width: 20,
          fontSize: 20,
          lineHeight: 1,
        }}
      >
        <span style={{ color: "#E0E0E0" }}>★</span>
        <span style={{ position: "absolute", left: 0, top: 0, width: "50%", overflow: "hidden", color: STAR }}>★</span>
      </span>
    </div>
  );
}

const HeroSection: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shaperbox — 5 Reasons</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main style={{ minHeight: "100vh", margin: 0, background: "#fff", fontFamily: FONT }}>
        <section className="hero">
          {/* Content side */}
          <div className="hero-content">
            <div style={{ display: "flex", flexDirection: "column", gap: 8, color: INK_900, width: "100%" }}>
              <h1 style={{
                fontFamily: FONT, fontSize: 30, fontWeight: 700,
                lineHeight: "40px", margin: 0, wordBreak: "break-word",
              }}>
                5 Reasons Why This is the #1 Trending Bra for Lift and Comfort Every Day — Without Painful Wires!!
              </h1>
              <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 400, margin: 0 }}>
                Your Everyday Comfort Upgrade.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 0", width: "100%" }}>
              <StarRating />
              <p style={{ fontFamily: FONT, fontSize: 14, color: INK_900, margin: 0, whiteSpace: "nowrap" }}>
                <span style={{ fontWeight: 700 }}>80,000+ Reviews |</span>
                <span style={{ fontWeight: 600 }}> 10,000,000+ Verified Buyers</span>
              </p>
            </div>

            <div style={{
              fontFamily: FONT, fontSize: 16, fontWeight: 400,
              color: INK_900, lineHeight: "24px", width: "100%",
            }}>
              <p style={{ margin: 0 }}>
                Discover how you can look 10 years younger in every outfit with the wire-free bra that lifts, shapes, and smooths your silhouette perfectly. Comfortable for everyday use and gorgeous for every holiday gathering —no adjusting required.
              </p>
              <p style={{ margin: "24px 0 0" }}>
                Find out why this bra has over 80,000 5-star reviews, featured in Oprah Daily and sold out in Good Morning America and Walmart.
              </p>
            </div>

            <button
              type="button"
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                gap: 12, padding: "12px 16px", borderRadius: 8, border: "none",
                background: PEACH, color: INK_900,
                fontFamily: FONT, fontSize: 16, fontWeight: 700,
                lineHeight: "22px", textTransform: "uppercase",
                cursor: "pointer", transition: "background 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = PEACH_HOVER; }}
              onMouseLeave={e => { e.currentTarget.style.background = PEACH; }}
            >
              Try before you buy
            </button>
          </div>

          {/* Image side */}
          <div className="hero-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/blank/hero.png" alt="Woman comparing bras in a mirror" />
          </div>
        </section>

        <style jsx>{`
          .hero {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 48px;
            padding: 48px 20px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            flex: 1 0 0;
            min-width: 343px;
            max-width: 560px;
          }
          .hero-image {
            position: relative;
            width: 100%;
            max-width: 496px;
            aspect-ratio: 496 / 470;
            border-radius: 4px;
            overflow: hidden;
            flex-shrink: 0;
          }
          .hero-image img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            pointer-events: none;
          }
          @media (min-width: 992px) {
            .hero {
              padding: 48px 120px;
              flex-wrap: nowrap;
              align-items: center;
            }
            .hero-image {
              height: 470px;
              aspect-ratio: auto;
            }
          }
        `}</style>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default HeroSection;
