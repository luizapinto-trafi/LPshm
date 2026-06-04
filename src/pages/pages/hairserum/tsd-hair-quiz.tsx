import Head from "next/head";
import { useEffect, useState } from "react";
import type { GetStaticProps, NextPage } from "next";

// ─── The Spa Dr. "follicle" quiz tokens (mirrors tsd-hair-quiz design) ────────
const BG = "#FDFCF9";
const SURFACE = "#FFFFFF";
const SURFACE_WARM = "#F8F5EF";
const BORDER = "#E6E0D4";
const BORDER_LIGHT = "#EEEAE2";
const TEXT = "#1F1D18";
const TEXT_MID = "#524E44";
const TEXT_SOFT = "#8A857A";
const SAGE = "#4A6B4E";
const SAGE_DARK = "#3D5A41";
const SAGE_BG = "#F0F5F0";
const SAGE_BORDER = "#C4D6C6";
const ROSE = "#A4545A";

const HEAD_FONT = "'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif";
const BODY_FONT = "'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif";

// Typographic rhythm — large serif display reads best with slight negative tracking.
const HEAD_TRACK = "-0.015em";
const EYEBROW_TRACK = "0.14em";

// ─── Brand assets (The Spa Dr. CDN, reused from existing landings) ────────────
const CDN = "https://cdn.prod.website-files.com/6581a4ebeea456b4072fe120";
const TSD_FAVICON = `${CDN}/65e9c5d0891fce2e5fa27009_Favicon_TSD.png`;
const PUBLISHED_ORIGIN = "https://try.thespadr.com";
const PAGE_PATH = "/pages/hairserum/tsd-hair-quiz";
const ASSETS = {
  logo: `${CDN}/658c86ec661f9aca80cf7811_thespadr_logo.svg.svg`,
  bottle: "https://cdn.shopify.com/s/files/1/0912/0596/files/1_bottle_1.png",
  resultHero: "/quiz/result/serum-hands.png",
  asSeen: [
    { src: `${CDN}/686e9986bd7fb3698d4e4216_Logo%20-%20vogue.svg`, alt: "Vogue" },
    { src: `${CDN}/686e9986bd7fb3698d4e421b_Logo%20-%20womens%20health.svg`, alt: "Women's Health" },
    { src: `${CDN}/686e9986bd7fb3698d4e4217_Logo-%20PubMed.svg`, alt: "PubMed" },
  ],
  badges: [
    { src: `${CDN}/68c86cda6a552c0fe8ea776d_doctor%20formulated.svg`, alt: "Doctor formulated" },
    { src: `${CDN}/68c86cdacced445c79eb2161_clinically%20tested.svg`, alt: "Clinically tested" },
    { src: `${CDN}/68c86cdae69ba234db71fdf7_clean%20non%20toxic%20ingr.svg`, alt: "Clean & non-toxic" },
    { src: `${CDN}/69d6b1d937a9f421e4be6f9e_doctor%20recomended%20seal.svg`, alt: "Doctor recommended" },
  ],
  creditCards: `${CDN}/688015ba89575d7fb4695966_ddeb5c291a7f3b87ee5eee8ea949b7d4_credit-cards.svg`,
};

// Final result CTA routes by Step 4 (Q4): GLP-1 users (selected "lost weight
// quickly") go to the GLP-1 offer; everyone else goes to the general offer.
const OFFER_URL_GLP1 = "https://try.thespadr.com/pages/hairserum/lp1-offer-glp1";
const OFFER_URL_GENERAL = "https://thespadr.com/pages/hairserum/lp1-lead-offershort-list-tox-v2";

// ─── Screen model ─────────────────────────────────────────────────────────────
type Option = {
  value: string;
  label: string;
  sub?: string; // small subtitle under label (cards)
  desc?: string; // supporting line (list)
  icon?: string; // emoji bullet (list)
  emoji?: string; // card glyph
  gradient?: string; // card image gradient
  img?: string; // real photo (card)
};

type QuestionScreen = {
  kind: "question";
  id: string;
  qNumber: number; // 1..7 (drives "X of 7" + progress)
  layout: "cards" | "list";
  multi?: boolean;
  noAutoAdvance?: boolean; // single-select that still shows NEXT (no auto-advance)
  title: string;
  subtitle?: string;
  options: Option[];
  cta: string;
};

type Screen =
  | { kind: "welcome" }
  | QuestionScreen
  | { kind: "interstitial" }
  | { kind: "loading" }
  | { kind: "lead" }
  | { kind: "result" };

const TOTAL_QUESTIONS = 7;

const SCREENS: Screen[] = [
  { kind: "welcome" },
  {
    kind: "question",
    id: "q1",
    qNumber: 1,
    layout: "cards",
    title: "What does your hair look like most days?",
    subtitle: "Your natural hair type helps us find your best match.",
    cta: "Next →",
    options: [
      { value: "straight", label: "Straight", sub: "Fine to medium texture", img: "/quiz/hairtype/straight.png" },
      { value: "wavy", label: "Wavy", sub: "Natural movement & body", img: "/quiz/hairtype/wavy.png" },
      { value: "curly", label: "Curly", sub: "Defined curl pattern", img: "/quiz/hairtype/curly.png" },
      { value: "coily", label: "Coily", sub: "Tight coils or kinks", img: "/quiz/hairtype/coily.png" },
    ],
  },
  {
    kind: "question",
    id: "q2",
    qNumber: 2,
    layout: "cards",
    title: "Which of these looks most like what you're experiencing?",
    cta: "Next →",
    options: [
      { value: "thinning", label: "Thinning", sub: "Less volume over time", img: "/quiz/concern/thinning.png" },
      { value: "shedding", label: "Shedding", sub: "Hair in brush & drain", img: "/quiz/concern/shedding.png" },
      { value: "damaged", label: "Damaged", sub: "Brittle, breaking strands", img: "/quiz/concern/damaged.png" },
      { value: "flat", label: "Flat & lifeless", sub: "No volume or body", img: "/quiz/concern/flat.png" },
    ],
  },
  {
    kind: "question",
    id: "q3",
    qNumber: 3,
    layout: "cards",
    noAutoAdvance: true,
    title: "How much hair are you actually losing every day?",
    cta: "Next →",
    options: [
      { value: "none", label: "I barely notice any", icon: "😌" },
      { value: "light", label: "Some, light daily shedding", icon: "🪮" },
      { value: "noticeable", label: "Noticeable hair in the brush and shower", icon: "😟" },
      { value: "heavy", label: "A lot, it concerns me every day", icon: "😰" },
    ],
  },
  {
    kind: "question",
    id: "q4",
    qNumber: 4,
    layout: "cards",
    multi: true,
    title: "Has anything changed in the last 6 months?",
    subtitle: "Select all that apply, this helps us find the real cause.",
    cta: "Next →",
    options: [
      { value: "weightloss", label: "I've lost weight quickly", desc: "Through diet, a program, or a big lifestyle change", icon: "⚖️" },
      { value: "hormonal", label: "I've been through a hormonal change", desc: "Perimenopause, postpartum, PCOS", icon: "🌙" },
      { value: "stress", label: "I've been under high or chronic stress", icon: "🧠" },
      { value: "medication", label: "I started a new medication", icon: "💊" },
      { value: "none", label: "Nothing specific has changed", icon: "🤷‍♀️" },
    ],
  },
  { kind: "interstitial" },
  {
    kind: "question",
    id: "q5",
    qNumber: 5,
    layout: "cards",
    multi: true,
    title: "Where are you noticing it most?",
    subtitle: "Select all that apply",
    cta: "Next →",
    options: [
      { value: "hairline", label: "Hairline", img: "/quiz/location/hairline.jpg" },
      { value: "crown", label: "Crown", img: "/quiz/location/crown.jpg" },
      { value: "temples", label: "Temples", img: "/quiz/location/temples.jpg" },
      { value: "ends", label: "Ends of hair", img: "/quiz/location/ends.jpg" },
      { value: "allover", label: "All over", img: "/quiz/location/allover.jpg" },
    ],
  },
  {
    kind: "question",
    id: "q6",
    qNumber: 6,
    layout: "cards",
    title: "What's your age?",
    subtitle: "Hair follicles respond differently at every life stage. Your age helps us personalize your results.",
    cta: "Next →",
    options: [
      { value: "under21", label: "Under 21" },
      { value: "21-25", label: "21 – 25" },
      { value: "26-35", label: "26 – 35" },
      { value: "36-50", label: "36 – 50" },
      { value: "50+", label: "50 and up" },
    ],
  },
  {
    kind: "question",
    id: "q7",
    qNumber: 7,
    layout: "cards",
    title: "What would change everything for you?",
    cta: "See my results →",
    options: [
      { value: "fuller", label: "Visibly thicker & fuller", sub: "More volume overall", img: "/quiz/goal/fuller.png" },
      { value: "healthier", label: "Healthier-looking hair", sub: "Strong and resilient", img: "/quiz/goal/healthier.png" },
      { value: "lessshedding", label: "Less daily shedding", sub: "Fewer hairs on the brush", img: "/quiz/goal/lessshedding.png" },
      { value: "volume", label: "More volume", sub: "Body and movement", img: "/quiz/goal/volume.png" },
    ],
  },
  { kind: "loading" },
  { kind: "lead" },
  { kind: "result" },
];

type Answers = Record<string, string[]>;

// ─── Personalization (driven by Q4 lifestyle triggers) ────────────────────────
type Variant = "glp1" | "hormonal" | "default";

function getVariant(answers: Answers): Variant {
  const q4 = answers.q4 ?? [];
  // Priority: Version A (weight loss) > Version B (hormonal) > Version C (everything else).
  if (q4.includes("weightloss")) return "glp1";
  if (q4.includes("hormonal")) return "hormonal";
  return "default";
}

const INTERSTITIAL: Record<Variant, { headline: string; pre: string; strong: string; post: string }> = {
  // Version A — shown when "lost weight quickly" is selected
  glp1: {
    headline: "Here's What Rapid Weight Loss Does To Your Follicle.",
    pre: "When your body loses weight fast, it redirects nutrients away from non-essential functions — including your hair. ",
    strong: "Your follicle gets starved of the protein it needs to hold each strand in place.",
    post: " That's the shedding you're seeing. It's not permanent. But your follicle needs direct support to recover.",
  },
  // Version B — shown when "hormonal changes" is selected
  hormonal: {
    headline: "Hormonal Shifts Weaken Your Follicle From The Inside.",
    pre: "As estrogen levels change, your follicle loses the support it needs to keep hair anchored. ",
    strong: "The growth phase shortens. Strands release before they've had time to grow back strong.",
    post: " This isn't damage from styling or products — it starts at the root.",
  },
  // Version C — shown when "stress", "products", or "none" is selected
  default: {
    headline: "Your Follicle Is Being Starved, Here's Why.",
    pre: "Buildup from daily products, chronic stress, and hormonal shifts all do the same thing: ",
    strong: "they cut off the nutrients your follicle needs to hold each strand in place.",
    post: " Most hair products never reach the follicle. They coat the strand and rinse off. The root gets nothing.",
  },
};

const RESULT: Record<Variant, { headline: string; summary: string; tagline: string; reasons: string[] }> = {
  glp1: {
    headline: "We found your match — and we know why this is happening.",
    summary:
      "Rapid weight loss redirects your body's energy away from hair growth. Your follicle stops getting the protein and nutrients it needs to hold each strand in place. The fix isn't a supplement. It's a water-based formula that delivers peptides directly to the follicle, bypassing digestion entirely.",
    tagline: "Built for what rapid weight loss does to your hair.",
    reasons: [
      "Bypasses digestion — delivers peptides directly to the scalp where nutrient gaps hit hardest",
      "Reinforces the follicle anchoring structure weakened by rapid weight loss",
      "Safe alongside GLP-1 medications — no interactions, no conflicts",
      "Clinically tested: 97% reported visibly fuller hair, 94% noticed less shedding in 90 days",
    ],
  },
  hormonal: {
    headline: "We found your match — it's designed for exactly what you're going through.",
    summary:
      "When estrogen levels shift, follicles lose the support they need to hold each strand in place. The growth phase shortens and strands release early. This isn't damage — it's your follicle responding to a hormonal environment it wasn't prepared for.",
    tagline: "Formulated for hormonal hair loss at the root.",
    reasons: [
      "Red Clover Flower Extract counters follicle weakening that accelerates with hormonal change",
      "Reinforces the anchoring structure so strands stay rooted through every hormonal stage",
      "Free from endocrine-disrupting chemicals — safe through perimenopause, postpartum, and beyond",
      "Clinically tested: 97% reported visibly fuller hair in 90 days",
    ],
  },
  default: {
    headline: "We found your match.",
    summary:
      "Your follicle is losing its grip. The anchoring structure that holds each strand in place is being weakened — from buildup, hormonal shifts, or nutrient starvation. Most products never address this. This one does.",
    tagline: "Your follicle fix.",
    reasons: [
      "Water-based formula absorbs directly into the scalp, reaches the follicle where most serums never get",
      "Peptides reinforce the anchoring structure that holds each strand in place",
      "Clinically tested: 97% reported visibly fuller hair, 94% noticed less shedding in 90 days",
      "Doctor-formulated, non-toxic, safe for daily long-term use",
    ],
  },
};

// ─── Shared bits ──────────────────────────────────────────────────────────────
function BadgePill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: SAGE_BG,
        border: `1px solid ${SAGE_BORDER}`,
        color: SAGE,
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: EYEBROW_TRACK,
        textTransform: "uppercase",
        padding: "5px 12px",
        borderRadius: 100,
      }}
    >
      {children}
    </span>
  );
}

function CtaButton({
  children,
  onClick,
  disabled,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}) {
  const style: React.CSSProperties = {
    width: "100%",
    padding: "17px 18px",
    background: disabled ? BORDER : SAGE,
    color: disabled ? TEXT_SOFT : "#fff",
    border: "none",
    borderRadius: 13,
    fontFamily: BODY_FONT,
    fontSize: 13.5,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease",
    boxShadow: disabled ? "none" : "0 8px 20px -10px rgba(74, 107, 78, 0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    textDecoration: "none",
    boxSizing: "border-box",
  };
  const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    e.currentTarget.style.background = SAGE_DARK;
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 12px 26px -10px rgba(74, 107, 78, 0.75)";
  };
  const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    e.currentTarget.style.background = SAGE;
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 8px 20px -10px rgba(74, 107, 78, 0.65)";
  };

  if (href) {
    return (
      <a href={href} style={style} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} style={style} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
      {children}
    </button>
  );
}

function CtaSub({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ textAlign: "center", fontSize: 11, color: TEXT_SOFT, margin: "10px 0 0" }}>{children}</p>
  );
}

// ─── Welcome ──────────────────────────────────────────────────────────────────
function Welcome() {
  return (
    <div style={{ padding: "32px 24px 24px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
          gap: 6,
          aspectRatio: "586 / 600",
          marginBottom: 28,
        }}
      >
        {[
          { src: WD.hero.main, alt: "Woman with healthy hair", col: "1 / span 2", row: "1 / span 4" },
          { src: WD.hero.flip, alt: "Voluminous hair in motion", col: "3 / span 2", row: "1 / span 2" },
          { src: WD.hero.bottle, alt: "The Spa Dr. Hair Serum", col: "3", row: "3" },
          { src: WD.hero.woman, alt: "Customer holding the serum", col: "4", row: "3" },
          { src: WD.hero.flip2, alt: "Hair full of movement", col: "3 / span 2", row: "4" },
        ].map((tile) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={tile.alt}
            src={tile.src}
            alt={tile.alt}
            style={{
              gridColumn: tile.col,
              gridRow: tile.row,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 12,
              display: "block",
            }}
          />
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: D_BADGE_BG,
            border: `0.8px solid ${D_BADGE_BORDER}`,
            color: D_SUCCESS,
            fontFamily: POPPINS,
            fontSize: 13,
            fontWeight: 400,
            lineHeight: "20px",
            padding: "4px 10px",
            borderRadius: 24,
          }}
        >
          <span aria-hidden style={{ fontSize: 9 }}>✦</span> Hair Analysis
        </span>
      </div>

      <h1
        style={{
          fontFamily: POPPINS,
          fontWeight: 500,
          fontSize: "clamp(26px, 7.6vw, 32px)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: D_TEXT,
          margin: "0 0 12px",
        }}
      >
        Most Women Don&apos;t Know Why Their Hair Is Thinning. This Quiz Does.
      </h1>
      <p style={{ fontFamily: POPPINS, fontSize: 16, lineHeight: 1.4, letterSpacing: "-0.005em", color: D_TEXT, margin: "0 0 24px" }}>
        Answer 7 questions and find out exactly what&apos;s happening to your hair and what actually fixes it.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {WD_BULLETS.map((b) => (
          <div key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: POPPINS, fontSize: 14, lineHeight: "18px", letterSpacing: "-0.005em", color: D_TEXT }}>
            <DCheck />
            <span>{b}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          border: `1px solid ${D_BORDER}`,
          borderRadius: 16,
          padding: "18px 16px",
          boxShadow: "0 1px 2px rgba(12, 12, 13, 0.05)",
        }}
      >
        <span style={{ fontFamily: POPPINS, fontSize: 12, lineHeight: "16px", letterSpacing: "0.04em", textTransform: "uppercase", color: D_TEXT_TERTIARY }}>
          As seen on:
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          {WD.press.map((p) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={p.alt} src={p.src} alt={p.alt} style={{ height: 22, width: p.w, objectFit: "contain", opacity: 0.6 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Question screen ──────────────────────────────────────────────────────────
function QuestionScreenView({
  screen,
  selected,
  onToggle,
}: {
  screen: QuestionScreen;
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const hasImages = screen.options.some((o) => o.img);
  return (
    <div className="tsd-q">
      <div className="tsd-q-head">
        <span className="tsd-q-eyebrow">
          Question {screen.qNumber} of {TOTAL_QUESTIONS}
        </span>
        <h2 className="tsd-q-title">{screen.title}</h2>
        {screen.subtitle && <p className="tsd-q-sub">{screen.subtitle}</p>}
      </div>

      {hasImages ? (
        <div className="tsd-cards">
          {screen.options.map((opt) => {
            const isSel = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onToggle(opt.value)}
                className={`tsd-card${isSel ? " is-sel" : ""}`}
                aria-pressed={isSel}
              >
                <span className="tsd-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={opt.img} alt="" aria-hidden />
                </span>
                <span className="tsd-card-row">
                  <span className={`tsd-radio${screen.multi ? " is-multi" : ""}${isSel ? " is-on" : ""}`} aria-hidden>
                    {isSel ? screen.multi ? "✓" : <span className="tsd-radio-dot" /> : null}
                  </span>
                  <span className="tsd-card-label">{opt.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="tsd-list">
          {screen.options.map((opt) => {
            const isSel = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onToggle(opt.value)}
                className={`tsd-opt${isSel ? " is-sel" : ""}`}
                aria-pressed={isSel}
              >
                <span className={`tsd-radio${screen.multi ? " is-multi" : ""}${isSel ? " is-on" : ""}`} aria-hidden>
                  {isSel ? screen.multi ? "✓" : <span className="tsd-radio-dot" /> : null}
                </span>
                <span className="tsd-opt-text">
                  <span className="tsd-opt-label">{opt.label}</span>
                  {opt.desc && <span className="tsd-opt-desc">{opt.desc}</span>}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .tsd-q {
          padding: 24px 16px 8px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .tsd-q-head {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .tsd-q-eyebrow {
          font-family: ${POPPINS};
          font-size: 10px;
          font-weight: 700;
          line-height: 14px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          color: #58745d;
        }
        .tsd-q-title {
          margin: 0;
          font-family: ${POPPINS};
          font-size: 24px;
          font-weight: 500;
          line-height: 32px;
          letter-spacing: -0.48px;
          color: ${D_TEXT};
          text-transform: capitalize;
        }
        .tsd-q-sub {
          margin: 0;
          font-family: ${POPPINS};
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
          letter-spacing: -0.07px;
          color: ${D_TEXT_TERTIARY};
        }
        .tsd-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .tsd-card {
          display: flex;
          flex-direction: column;
          padding: 0 0 16px;
          border: 1.5px solid ${D_TILE_BORDER};
          border-radius: 16px;
          background: ${SURFACE};
          box-shadow: 0 3px 1.5px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
        }
        .tsd-card:hover {
          border-color: ${D_ACCENT};
          transform: translateY(-1px);
        }
        .tsd-card.is-sel {
          border-color: ${D_ACCENT};
          background: ${D_BADGE_BG};
        }
        .tsd-card-img {
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-size: cover;
          background-position: center;
        }
        .tsd-card-img :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .tsd-card-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px 0;
        }
        .tsd-radio {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          border-radius: 50%;
          border: 1px solid ${D_ACCENT};
          background: ${SURFACE};
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
        }
        .tsd-radio.is-multi {
          border-radius: 5px;
        }
        .tsd-radio.is-on {
          background: ${D_ACCENT};
          border-color: ${D_ACCENT};
        }
        .tsd-radio-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
        }
        .tsd-card-label {
          font-family: ${POPPINS};
          font-size: 14px;
          font-weight: 500;
          line-height: 18px;
          letter-spacing: -0.07px;
          color: ${D_TEXT};
        }
        .tsd-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .tsd-opt {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 16px;
          border: 1.5px solid ${D_TILE_BORDER};
          border-radius: 12px;
          background: ${SURFACE};
          box-shadow: 0 3px 1.5px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          text-align: left;
          transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;
        }
        .tsd-opt:hover {
          border-color: ${D_ACCENT};
        }
        .tsd-opt.is-sel {
          border-color: ${D_ACCENT};
          background: ${D_BADGE_BG};
        }
        .tsd-opt-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .tsd-opt-label {
          font-family: ${POPPINS};
          font-size: 16px;
          font-weight: 500;
          line-height: 22px;
          letter-spacing: -0.08px;
          color: ${D_TEXT};
        }
        .tsd-opt-desc {
          font-family: ${POPPINS};
          font-size: 13px;
          font-weight: 400;
          line-height: 18px;
          color: ${D_TEXT_TERTIARY};
        }
      `}</style>
    </div>
  );
}

// ─── Interstitial ─────────────────────────────────────────────────────────────
// Scalp cross-section: a hair strand rising from a follicle bulb in the skin layer.
function FollicleIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden focusable="false">
      {/* Hair shaft emerging from top */}
      <path d="M22 2 C21 6 20.5 10 21 14 C21.4 17 22 19 22 22" stroke="#457A41" strokeWidth="2" strokeLinecap="round" />
      {/* Cuticle layers */}
      <path d="M20 14 C19 16 19.5 18 21 19" stroke="#7AAB77" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M24 13 C25.2 15 24.8 17.5 23 19" stroke="#7AAB77" strokeWidth="1.2" strokeLinecap="round" />
      {/* Follicle bulb - outer sheath */}
      <ellipse cx="22" cy="30" rx="7" ry="9" fill="#D7E7D2" />
      {/* Inner root sheath */}
      <ellipse cx="22" cy="30.5" rx="4.5" ry="6.5" fill="#B4D0B0" />
      {/* Hair matrix */}
      <ellipse cx="22" cy="35" rx="3" ry="2.5" fill="#9AB898" />
      {/* Dermal papilla */}
      <ellipse cx="22" cy="37.5" rx="2.2" ry="1.5" fill="#376234" />
      {/* Sebaceous gland suggestion */}
      <ellipse cx="28" cy="24" rx="2.5" ry="1.8" fill="#C4D6C6" />
      {/* Shaft inside bulb */}
      <path d="M22 22 L22 33" stroke="#457A41" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function InterstitialView({ variant }: { variant: Variant }) {
  const data = INTERSTITIAL[variant];
  return (
    <div style={{ padding: "40px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: SAGE_BG,
          border: `1px solid ${SAGE_BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
        aria-hidden
      >
        <FollicleIcon />
      </div>
      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 28, fontWeight: 600, lineHeight: 1.2, letterSpacing: HEAD_TRACK, color: TEXT, margin: "0 0 16px" }}>
        {data.headline}
      </h2>
      <p style={{ fontSize: 14, color: TEXT_MID, lineHeight: 1.7, margin: 0, maxWidth: 360 }}>
        {data.pre}
        <strong style={{ color: TEXT, fontWeight: 600 }}>{data.strong}</strong>
        {data.post}
      </p>
    </div>
  );
}

// ─── Loading ──────────────────────────────────────────────────────────────────
const LOADING_LABELS = [
  "Analyzing your hair profile...",
  "Identifying root causes...",
  "Matching formula to your profile...",
  "Almost there...",
];

const LOADING_DURATION = 6000; // ms — give the user time to read the testimonial

function LoadingView({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / LOADING_DURATION) * 100, 100);
      setProgress(pct);
    }, 80);
    const timer = setTimeout(onDone, LOADING_DURATION);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onDone]);

  const labelIdx = Math.min(Math.floor(progress / 25), LOADING_LABELS.length - 1);

  return (
    <div style={{ padding: "48px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 24, fontWeight: 600, letterSpacing: HEAD_TRACK, textAlign: "center", color: TEXT, margin: "0 0 12px" }}>
        Finding your match...
      </h2>
      <p style={{ fontSize: 14, color: TEXT_MID, lineHeight: 1.6, textAlign: "center", margin: "0 0 24px", maxWidth: 360 }}>
        Based on your answers, we&rsquo;re identifying the exact cause of your hair changes — and the formula designed to address it.
      </p>

      <div style={{ width: "100%", height: 6, background: BORDER_LIGHT, borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: SAGE, borderRadius: 3, transition: "width 0.2s linear" }} />
      </div>
      <div style={{ fontSize: 13, color: TEXT_SOFT, marginBottom: 40, textAlign: "center" }}>{LOADING_LABELS[labelIdx]}</div>

      <div style={{ background: SURFACE_WARM, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 16, width: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/quiz/testimonial/rachel-beforeafter.jpg"
          alt="Rachel K. before and after"
          style={{ width: "100%", borderRadius: 10, display: "block", marginBottom: 12 }}
        />
        <div style={{ color: "#F4A636", fontSize: 15, letterSpacing: 1, marginBottom: 4 }}>★★★★★</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>Rachel K. —</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
            <path
              d="M12 2l2.4 1.8 3-.2 1 2.8 2.4 1.8-1 2.8 1 2.8-2.4 1.8-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8L3.2 14l1-2.8-1-2.8 2.4-1.8 1-2.8 3 .2L12 2z"
              fill="#2F88FF"
            />
            <path d="M8.5 12l2.3 2.3 4.7-4.7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 12, color: TEXT_SOFT }}>Verified Customer</span>
        </div>
        <p style={{ fontSize: 14, color: TEXT_MID, lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
          &ldquo;Three months on Mounjaro and my hair started falling out in handfuls. Two months using this and I finally
          stopped dreading wash day.&rdquo;
        </p>
      </div>
    </div>
  );
}

// ─── Lead / email capture ─────────────────────────────────────────────────────
function LeadView({ email, onChange, invalid }: { email: string; onChange: (v: string) => void; invalid: boolean }) {
  return (
    <div style={{ padding: "32px 24px 24px", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 16 }}>
        <BadgePill>
          <span aria-hidden>✦</span> Your results are ready
        </BadgePill>
      </div>

      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 26, fontWeight: 600, lineHeight: 1.2, letterSpacing: HEAD_TRACK, color: TEXT, margin: "0 0 10px" }}>
        Great job! Your personalized hair analysis is ready.
      </h2>
      <p style={{ fontSize: 12.5, color: TEXT_SOFT, lineHeight: 1.55, margin: "0 0 22px" }}>
        Enter your email to see your results — plus unlock an exclusive discount on the formula matched to your hair profile.
      </p>

      <div
        style={{
          background: SAGE_BG,
          border: `1px solid ${SAGE_BORDER}`,
          borderRadius: 14,
          padding: 18,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >

        <span style={{ fontSize: 13, color: TEXT_MID, lineHeight: 1.5 }}>
          <strong style={{ display: "block", fontSize: 14, color: TEXT, fontWeight: 700, marginBottom: 2 }}>Your match is ready</strong>
          Based on your answers, we&apos;ve identified your hair&apos;s root cause and the formula designed for it.
        </span>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_MID, marginBottom: 8, letterSpacing: "0.04em" }}>EMAIL ADDRESS</div>
      <input
        type="email"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        style={{
          width: "100%",
          padding: "14px 16px",
          border: `1.5px solid ${invalid ? ROSE : BORDER}`,
          borderRadius: 10,
          fontFamily: BODY_FONT,
          fontSize: 14,
          color: TEXT,
          background: SURFACE,
          outline: "none",
          marginBottom: 20,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          color: TEXT_SOFT,
          padding: "10px 14px",
          background: SURFACE_WARM,
          borderRadius: 8,
          border: `1px solid ${BORDER_LIGHT}`,
        }}
      >
        <span aria-hidden>🎁</span>
        <span>
          You&apos;ll also receive a <strong style={{ color: TEXT }}>FREE gift</strong> with your first order
        </span>
      </div>
    </div>
  );
}

// ─── Result ───────────────────────────────────────────────────────────────────
function ResultView({ variant }: { variant: Variant }) {
  const data = RESULT[variant];
  return (
    <div style={{ padding: "28px 24px 24px", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 14 }}>
        <BadgePill>
          <span aria-hidden>✦</span> Your Match Found
        </BadgePill>
      </div>

      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 30, fontWeight: 600, lineHeight: 1.16, letterSpacing: HEAD_TRACK, color: TEXT, margin: "0 0 12px" }}>
        {data.headline}
      </h2>
      <p style={{ fontSize: 13.5, color: TEXT_MID, lineHeight: 1.7, margin: "0 0 24px" }}>{data.summary}</p>

      <div style={{ border: `1px solid ${SAGE_BORDER}`, borderRadius: 18, overflow: "hidden", marginBottom: 16, boxShadow: "0 16px 40px -24px rgba(31,29,24,0.28)", width: "min(650px, calc(100vw - 24px))", marginLeft: "50%", transform: "translateX(-50%)" }}>
        <div
          style={{
            background: SAGE_BG,
            padding: "20px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: EYEBROW_TRACK, textTransform: "uppercase", color: SAGE }}>
            Your recommended formula
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              background: SAGE,
              borderRadius: 100,
              padding: "4px 10px",
              flexShrink: 0,
            }}
          >
            55% OFF
          </span>
        </div>

        <div className="tsd-result-product">
          <div className="tsd-result-media" style={{ background: SAGE_BG }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.resultHero} alt="The Spa Dr. Peptide-Powered Hair Serum" />
          </div>

          <div className="tsd-result-info" style={{ padding: "20px 18px 22px", background: SURFACE }}>
          <div style={{ fontFamily: HEAD_FONT, fontSize: 23, fontWeight: 600, color: TEXT, lineHeight: 1.18, letterSpacing: HEAD_TRACK, marginBottom: 5 }}>
            The Spa Dr.® Peptide-Powered Hair Serum
          </div>
          <div style={{ fontSize: 13, color: SAGE, fontWeight: 600, marginBottom: 16 }}>{data.tagline}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {data.reasons.map((reason) => (
              <div key={reason} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span
                  aria-hidden
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: SAGE_BG,
                    border: `1px solid ${SAGE_BORDER}`,
                    color: SAGE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 13, color: TEXT_MID, lineHeight: 1.5 }}>{reason}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #F0F5F0, #E8F2E9)",
          border: `1px solid ${SAGE_BORDER}`,
          borderRadius: 12,
          padding: 16,
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ fontFamily: HEAD_FONT, fontSize: 34, fontWeight: 600, color: SAGE, lineHeight: 1, letterSpacing: HEAD_TRACK, marginBottom: 4 }}>55% OFF</div>
        <div style={{ fontSize: 12, color: TEXT_MID }}>Your exclusive quiz discount is already applied to the offer</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.creditCards} alt="Secure payments" style={{ height: 22, width: "auto", opacity: 0.8 }} />
      </div>

      <style jsx>{`
        .tsd-result-product {
          display: flex;
          align-items: stretch;
        }
        .tsd-result-media {
          flex: 0 0 46%;
          line-height: 0;
          overflow: hidden;
        }
        .tsd-result-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .tsd-result-info {
          flex: 1;
          min-width: 0;
        }
        @media (max-width: 560px) {
          .tsd-result-product {
            flex-direction: column;
          }
          .tsd-result-media {
            flex: none;
          }
          .tsd-result-media img {
            height: auto;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Desktop Welcome (mirrors The Spa Dr. master Figma file) ──────────────────
const POPPINS = "'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif";
const D_TEXT = "#292929";
const D_TEXT_TERTIARY = "#6A6E6D";
const D_ACCENT = "#457A41";
const D_ACCENT_DARK = "#3A6636";
const D_SUCCESS = "#376234";
const D_BADGE_BG = "#E9F2E5";
const D_BADGE_BORDER = "#B5CAB3";
const D_TILE_BG = "#F8FBF4";
const D_TILE_BORDER = "#D1E3CA";
const D_BORDER = "#E2E3E3";
const D_PROOF_BG = "#F5F5F5";
const STAR_GOLD = "#F4A636";

const WD = {
  hero: {
    main: "/quiz/welcome/hero-main.jpg",
    flip: "/quiz/welcome/hero-flip.jpg",
    flip2: "/quiz/welcome/hero-flip2.png",
    bottle: "/quiz/welcome/hero-bottle.png",
    woman: "/quiz/welcome/hero-woman.png",
  },
  press: [
    { src: "/quiz/welcome/press-ok.svg", alt: "OK!", w: 48 },
    { src: "/quiz/welcome/press-wwd.svg", alt: "WWD", w: 64 },
    { src: "/quiz/welcome/press-e.svg", alt: "E!", w: 8 },
    { src: "/quiz/welcome/press-voyage.svg", alt: "Voyage New York", w: 82 },
  ],
  badges: [
    { src: "/quiz/welcome/badge-cruelty.svg", label: "Cruelty-Free" },
    { src: "/quiz/welcome/badge-fragrance.svg", label: "No Artificial Fragrances" },
    { src: "/quiz/welcome/badge-gmo.svg", label: "Non-GMO" },
    { src: "/quiz/welcome/badge-silicone.svg", label: "No Silicones" },
    { src: "/quiz/welcome/badge-paraben.svg", label: "No Parabens" },
    { src: "/quiz/welcome/badge-sls.svg", label: "SLS-Free" },
  ],
};

const WD_BULLETS = [
  "Visibly thicken your hair",
  "Strengthen strands",
  "Reduce shedding and daily hair loss",
  "Boost fuller-looking hair",
];

function DCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M5 12.5l4.2 4.2L19 7" stroke={D_ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DStars() {
  return (
    <span style={{ position: "relative", display: "inline-block", lineHeight: 1, fontSize: 26, letterSpacing: 2 }} aria-label="4.5 out of 5 stars">
      <span style={{ color: "#E2E3E3" }}>★★★★★</span>
      <span style={{ position: "absolute", top: 0, left: 0, width: "90%", overflow: "hidden", whiteSpace: "nowrap", color: STAR_GOLD }} aria-hidden>
        ★★★★★
      </span>
    </span>
  );
}

function WelcomeDesktop({ onStart }: { onStart: () => void }) {
  return (
    <div className="wd-root">
      {/* Header */}
      <header className="wd-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.logo} alt="The Spa Dr." style={{ height: 30, width: "auto" }} />
      </header>

      {/* Fold */}
      <section className="wd-section">
        <div className="wd-inner wd-fold">
          <div className="wd-hero">
            <div className="wd-mosaic">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="wd-tile wd-tile-main" src={WD.hero.main} alt="Woman with healthy hair" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="wd-tile wd-tile-flip" src={WD.hero.flip} alt="Voluminous hair in motion" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="wd-tile wd-tile-bottle" src={WD.hero.bottle} alt="The Spa Dr. Hair Serum" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="wd-tile wd-tile-woman" src={WD.hero.flip2} alt="Voluminous hair in motion" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="wd-tile wd-tile-face" src={WD.hero.woman} alt="Customer holding the serum" />
            </div>

            <div className="wd-content">
              <div className="wd-heading">
                <span className="wd-badge">
                  <span aria-hidden style={{ fontSize: 9 }}>✦</span> Hair Analysis
                </span>
                <h1 className="wd-h1">Most Women Don&apos;t Know Why Their Hair Is Thinning. This Quiz Does.</h1>
                <p className="wd-sub">Answer 7 questions and find out exactly what&apos;s happening to your hair and what actually fixes it.</p>
              </div>

              <div className="wd-bullets">
                {WD_BULLETS.map((b) => (
                  <div key={b} className="wd-bullet">
                    <DCheck />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="wd-cta">
                <button type="button" className="wd-btn" onClick={onStart}>
                  FIND OUT WHY
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 12h15M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className="wd-cta-sub">Under 2 minutes · Free · No obligation</span>
              </div>
            </div>
          </div>

          <div className="wd-press">
            <span className="wd-press-label">As seen on:</span>
            {WD.press.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.alt} src={p.src} alt={p.alt} style={{ height: 24, width: p.w, objectFit: "contain", opacity: 0.6 }} />
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="wd-proof">
        <div className="wd-inner wd-proof-row">
          <div className="wd-rating">
            <DStars />
            <p className="wd-rating-text">Trusted by over 300,000 women to support a healthier, fuller-looking hair.</p>
          </div>
          <div className="wd-badges">
            {WD.badges.map((b) => (
              <div key={b.label} className="wd-badge-card">
                <span className="wd-badge-icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.src} alt="" aria-hidden style={{ width: 24, height: 24 }} />
                </span>
                <span className="wd-badge-label">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="wd-footer">
        <div className="wd-inner">
          <div className="wd-footer-row">
            <div className="wd-footer-col wd-footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.logo} alt="The Spa Dr." style={{ height: 40, width: "auto" }} />
              <p className="wd-disclaimer">
                Legal disclaimer: Results may vary from person to person.
                <br />
                Our service does not intend to diagnose, treat, cure, or prevent any disease and does not constitute medical advice.
              </p>
            </div>
            <div className="wd-footer-col wd-footer-pay">
              <span className="wd-pay-label">Secure Payments</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.creditCards} alt="Accepted payment methods" style={{ height: 24, width: "auto" }} />
            </div>
            <nav className="wd-footer-col wd-footer-links">
              <a href="#">Home</a>
              <a href="#">Terms of Use</a>
              <a href="#">Contact Us</a>
            </nav>
          </div>
          <div className="wd-divider" />
          <p className="wd-copy">© 2026, The Spa Dr.</p>
        </div>
      </footer>

      <style jsx>{`
        .wd-root {
          font-family: ${POPPINS};
          color: ${D_TEXT};
          background: #fff;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .wd-header {
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid ${D_BORDER};
        }
        .wd-section,
        .wd-proof,
        .wd-footer {
          padding: 32px clamp(16px, 5vw, 140px);
        }
        .wd-inner {
          max-width: 1264px;
          margin: 0 auto;
          width: 100%;
        }
        .wd-fold {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .wd-hero {
          display: flex;
          gap: 32px;
          align-items: flex-start;
        }
        .wd-mosaic {
          flex: 1 1 0;
          min-width: 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(4, 1fr);
          gap: 8px;
          aspect-ratio: 586 / 600;
        }
        .wd-tile {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          display: block;
        }
        .wd-tile-main {
          grid-column: 1 / span 2;
          grid-row: 1 / span 4;
        }
        .wd-tile-flip {
          grid-column: 3 / span 2;
          grid-row: 1 / span 2;
        }
        .wd-tile-bottle {
          grid-column: 3;
          grid-row: 3;
        }
        .wd-tile-woman {
          grid-column: 4;
          grid-row: 3;
        }
        .wd-tile-face {
          grid-column: 3 / span 2;
          grid-row: 4;
        }
        .wd-content {
          width: clamp(320px, 42%, 542px);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .wd-heading {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .wd-badge {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: ${D_BADGE_BG};
          border: 0.8px solid ${D_BADGE_BORDER};
          color: ${D_SUCCESS};
          font-size: 16px;
          line-height: 24px;
          padding: 4px 10px;
          border-radius: 24px;
        }
        .wd-h1 {
          margin: 0;
          font-weight: 400;
          font-size: clamp(34px, 3.7vw, 52px);
          line-height: 1.3;
          letter-spacing: -0.03em;
          color: ${D_TEXT};
        }
        .wd-sub {
          margin: 0;
          font-weight: 400;
          font-size: clamp(16px, 1.4vw, 20px);
          line-height: 1.4;
          letter-spacing: -0.005em;
          color: ${D_TEXT};
        }
        .wd-bullets {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .wd-bullet {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          line-height: 18px;
          letter-spacing: -0.005em;
          color: ${D_TEXT};
        }
        .wd-cta {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
        }
        .wd-btn {
          width: 290px;
          max-width: 100%;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: ${D_ACCENT};
          color: #fff;
          border: none;
          border-radius: 8px;
          font-family: ${POPPINS};
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.005em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease;
        }
        .wd-btn:hover {
          background: ${D_ACCENT_DARK};
          transform: translateY(-1px);
        }
        .wd-cta-sub {
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #000;
        }
        .wd-press {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          border: 1px solid ${D_BORDER};
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 1px 2px rgba(12, 12, 13, 0.05);
        }
        .wd-press-label {
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: ${D_TEXT_TERTIARY};
        }
        .wd-proof {
          background: ${D_PROOF_BG};
        }
        .wd-proof-row {
          display: flex;
          gap: 24px 32px;
          align-items: center;
          flex-wrap: wrap;
        }
        .wd-rating {
          flex: 1 1 0;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .wd-rating-text {
          margin: 0;
          font-size: 14px;
          line-height: 22px;
          letter-spacing: -0.005em;
          color: ${D_TEXT};
          max-width: 360px;
        }
        .wd-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .wd-badge-card {
          width: 104px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .wd-badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          background: ${D_TILE_BG};
          border: 1px solid ${D_TILE_BORDER};
          border-radius: 1000px;
          box-shadow: 0 1px 2px rgba(12, 12, 13, 0.05);
        }
        .wd-badge-label {
          font-size: 10px;
          line-height: 16px;
          font-weight: 600;
          text-align: center;
          color: ${D_TEXT};
        }
        .wd-footer {
          box-shadow: 0 12px 8px rgba(12, 12, 13, 0.08), 0 4px 2px rgba(12, 12, 13, 0.05);
        }
        .wd-footer-row {
          display: flex;
          gap: clamp(24px, 5vw, 80px);
          align-items: flex-start;
        }
        .wd-footer-col {
          flex: 1 1 0;
          min-width: 0;
        }
        .wd-footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .wd-disclaimer {
          margin: 0;
          font-size: 10px;
          line-height: 16px;
          color: ${D_TEXT_TERTIARY};
        }
        .wd-footer-pay {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .wd-pay-label {
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: ${D_TEXT_TERTIARY};
        }
        .wd-footer-links {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .wd-footer-links a {
          font-size: 10px;
          line-height: 16px;
          color: ${D_TEXT_TERTIARY};
          text-decoration: none;
        }
        .wd-footer-links a:hover {
          color: ${D_TEXT};
        }
        .wd-divider {
          height: 1px;
          background: ${D_BORDER};
          width: 100%;
          margin: 32px 0;
        }
        .wd-copy {
          margin: 0;
          font-size: 10px;
          line-height: 16px;
          color: ${D_TEXT_TERTIARY};
        }
        /* Keep the two-column hero comfortable in narrow desktop windows */
        @media (max-width: 820px) {
          .wd-section,
          .wd-proof,
          .wd-footer {
            padding: 24px 16px;
          }
          .wd-hero {
            gap: 16px;
          }
          .wd-content {
            width: clamp(240px, 44%, 360px);
            gap: 16px;
          }
          .wd-h1 {
            font-size: clamp(26px, 5.2vw, 38px);
          }
        }
      `}</style>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
const RESULT_INDEX = SCREENS.findIndex((s) => s.kind === "result");

const TsdHairQuizPage: NextPage = () => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);

  const screen = SCREENS[index];
  const variant = getVariant(answers);
  // Route A for GLP-1 users (Q4 "lost weight quickly"); Route B for everyone else.
  const offerUrl = variant === "glp1" ? OFFER_URL_GLP1 : OFFER_URL_GENERAL;

  const goNext = () => setIndex((i) => Math.min(i + 1, SCREENS.length - 1));
  const goBack = () =>
    setIndex((i) => {
      let n = Math.max(i - 1, 0);
      if (SCREENS[n].kind === "loading") n = Math.max(n - 1, 0);
      return n;
    });

  const toggleAnswer = (value: string) => {
    if (screen.kind !== "question") return;
    const { id, multi, noAutoAdvance } = screen;
    setAnswers((prev) => {
      const cur = prev[id] ?? [];
      if (!multi) return { ...prev, [id]: [value] };
      if (value === "none") return { ...prev, [id]: ["none"] };
      const withoutNone = cur.filter((v) => v !== "none");
      const next = withoutNone.includes(value) ? withoutNone.filter((v) => v !== value) : [...withoutNone, value];
      return { ...prev, [id]: next };
    });
  };

  const submitEmail = () => {
    if (!email.includes("@")) {
      setEmailInvalid(true);
      return;
    }
    setEmailInvalid(false);
    goNext();
  };

  const currentSelection = screen.kind === "question" ? answers[screen.id] ?? [] : [];
  const canContinue = currentSelection.length > 0;

  const showBack = index > 0 && screen.kind !== "loading" && screen.kind !== "result";
  // Monotonic progress across the whole flow so the bar never jumps back
  // (e.g. on the interstitial or loading screens between questions).
  const progressPct = index > 0 ? Math.min((index / RESULT_INDEX) * 100, 100) : 0;
  const showProgress = index > 0 && index < RESULT_INDEX;

  return (
    <>
      <Head>
        <link href="https://cdn.prod.website-files.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link rel="icon" type="image/png" href={TSD_FAVICON} />
        <title>The Spa Dr. — Hair Quiz</title>
        <meta
          name="description"
          content="Take The Spa Dr. 60-second hair quiz and discover the peptide-powered serum for visibly thicker, fuller-looking hair."
        />
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Spa Dr. — Hair Quiz" />
        <meta
          property="og:description"
          content="Take The Spa Dr. 60-second hair quiz and discover the peptide-powered serum for visibly thicker, fuller-looking hair."
        />
        <link rel="canonical" href={`${PUBLISHED_ORIGIN}${PAGE_PATH}`} />
      </Head>

      {screen.kind === "welcome" && (
        <div className="tsd-welcome-desktop">
          <WelcomeDesktop onStart={goNext} />
        </div>
      )}

      <div className={`tsd-page${screen.kind === "welcome" ? " tsd-welcome-mobile" : ""}`}>
        <div className="tsd-shell">
          {/* Header + progress — same branded header as the welcome page */}
          <div className="tsd-topbar">
            <div className="tsd-header">
              <button
                className="tsd-back"
                onClick={goBack}
                aria-label="Go back"
                style={{ visibility: showBack ? "visible" : "hidden" }}
              >
                ←
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="tsd-logo-img" src={ASSETS.logo} alt="The Spa Dr." />
            </div>
            {showProgress && (
              <div className="tsd-progress-wrap">
                <div className="tsd-progress-bar" style={{ width: `${progressPct}%` }} />
              </div>
            )}
          </div>

          <div className="tsd-main">
          {/* Content */}
          <div className="tsd-content" key={index}>
            {screen.kind === "welcome" && <Welcome />}
            {screen.kind === "question" && (
              <QuestionScreenView screen={screen} selected={currentSelection} onToggle={toggleAnswer} />
            )}
            {screen.kind === "interstitial" && <InterstitialView variant={variant} />}
            {screen.kind === "loading" && <LoadingView onDone={goNext} />}
            {screen.kind === "lead" && <LeadView email={email} onChange={setEmail} invalid={emailInvalid} />}
            {screen.kind === "result" && <ResultView variant={variant} />}
          </div>

          {/* Bottom bar */}
          {screen.kind === "welcome" && (
            <div className="tsd-bottom">
              <CtaButton onClick={goNext}>FIND OUT WHY →</CtaButton>
              <CtaSub>Under 2 minutes · Free · No obligation</CtaSub>
            </div>
          )}
          {screen.kind === "question" && (
            <div className="tsd-bottom">
              <CtaButton onClick={goNext} disabled={!canContinue}>
                {screen.cta}
              </CtaButton>
            </div>
          )}
          {screen.kind === "interstitial" && (
            <div className="tsd-bottom">
              <CtaButton onClick={goNext}>KEEP INVESTIGATING →</CtaButton>
            </div>
          )}
          {screen.kind === "lead" && (
            <div className="tsd-bottom">
              <CtaButton onClick={submitEmail}>SEE MY RESULTS →</CtaButton>
              <CtaSub>No spam. Unsubscribe anytime.</CtaSub>
            </div>
          )}
          {screen.kind === "result" && (
            <div className="tsd-bottom">
              <CtaButton href={offerUrl}>GET 55% OFF MY MATCH →</CtaButton>
              <CtaSub>30-Day Money-Back Guarantee · Free Shipping · Free Gifts</CtaSub>
            </div>
          )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        body {
          background: ${BG};
        }
      `}</style>
      <style jsx>{`
        .tsd-welcome-desktop {
          display: none;
        }
        @media (min-width: 560px) {
          .tsd-welcome-desktop {
            display: block;
          }
          .tsd-welcome-mobile {
            display: none;
          }
        }
        .tsd-page {
          background:
            radial-gradient(120% 80% at 50% 0%, #FBF8F2 0%, ${BG} 55%);
          color: ${TEXT};
          font-family: ${BODY_FONT};
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        .tsd-shell {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: ${SURFACE};
        }
        .tsd-main {
          flex: 1;
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }
        .tsd-topbar {
          position: sticky;
          top: 0;
          z-index: 10;
          background: ${SURFACE};
        }
        .tsd-header {
          position: relative;
          height: 64px;
          padding: 0 16px;
          border-bottom: 1px solid ${BORDER_LIGHT};
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${SURFACE};
        }
        .tsd-back {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: ${TEXT_SOFT};
          border: none;
          background: none;
          font-size: 18px;
          border-radius: 50%;
          transition: background 0.15s;
        }
        .tsd-back:hover {
          background: ${SURFACE_WARM};
        }
        .tsd-logo-img {
          height: 28px;
          width: auto;
          display: block;
        }
        .tsd-progress-wrap {
          height: 4px;
          background: ${BORDER_LIGHT};
        }
        .tsd-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, ${D_ACCENT}, ${D_ACCENT_DARK});
          border-radius: 0 4px 4px 0;
          box-shadow: 0 0 8px -1px rgba(69, 122, 65, 0.5);
          transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tsd-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          animation: tsdFadeUp 0.35s ease both;
        }
        .tsd-content > :global(div) {
          flex: 1;
        }
        @keyframes tsdFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .tsd-bottom {
          padding: 18px 24px 26px;
          border-top: 1px solid ${BORDER_LIGHT};
          background: ${SURFACE};
          position: sticky;
          bottom: 0;
        }
        .tsd-bottom::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -24px;
          height: 24px;
          background: linear-gradient(to top, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0));
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default TsdHairQuizPage;
