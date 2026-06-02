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
const SAGE_SELECTED = "#EBF3EC";
const ROSE = "#A4545A";

const HEAD_FONT = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const BODY_FONT = "'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif";

// ─── Brand assets (The Spa Dr. CDN, reused from existing landings) ────────────
const CDN = "https://cdn.prod.website-files.com/6581a4ebeea456b4072fe120";
const ASSETS = {
  logo: `${CDN}/658c86ec661f9aca80cf7811_thespadr_logo.svg.svg`,
  bottle: "https://cdn.shopify.com/s/files/1/0912/0596/files/1_bottle_1.png",
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
  // Real concern photos for Q2 — [thinning, damaged, shedding, flat]
  concernPhotos: [
    `${CDN}/692053358dd98234d1944ceb_3.png`,
    `${CDN}/69205324c1d8849201ee3e22_2.png`,
    `${CDN}/6920536b46a6c9ee8cbca2e1_4.png`,
    `${CDN}/6920538afcfec62df9835b63_5.jpg`,
  ],
  creditCards: `${CDN}/688015ba89575d7fb4695966_ddeb5c291a7f3b87ee5eee8ea949b7d4_credit-cards.svg`,
};

// Final result CTA points to the live offer page.
const OFFER_URL = "https://try.thespadr.com/pages/hairserum/lp1-offer-glp1";

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
      { value: "straight", label: "Straight", sub: "Fine to medium texture", emoji: "〰️", gradient: "linear-gradient(135deg,#E8E0D4,#D4CCBC)" },
      { value: "wavy", label: "Wavy", sub: "Natural movement & body", emoji: "〜〜〜", gradient: "linear-gradient(135deg,#D4E0D8,#C0CEC2)" },
      { value: "curly", label: "Curly", sub: "Defined curl pattern", emoji: "〰〰〰", gradient: "linear-gradient(135deg,#D8D4E0,#C4C0CC)" },
      { value: "coily", label: "Coily", sub: "Tight coils or kinks", emoji: "🌀🌀", gradient: "linear-gradient(135deg,#E0D8D4,#CCBCB0)" },
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
      { value: "thinning", label: "Thinning", sub: "Less volume over time", img: ASSETS.concernPhotos[0] },
      { value: "shedding", label: "Shedding", sub: "Hair in brush & drain", img: ASSETS.concernPhotos[2] },
      { value: "damaged", label: "Damaged", sub: "Brittle, breaking strands", img: ASSETS.concernPhotos[1] },
      { value: "flat", label: "Flat & lifeless", sub: "No volume or body", img: ASSETS.concernPhotos[3] },
    ],
  },
  {
    kind: "question",
    id: "q3",
    qNumber: 3,
    layout: "list",
    title: "How much hair are you actually losing every day?",
    cta: "Next →",
    options: [
      { value: "none", label: "I barely notice any", icon: "😌" },
      { value: "light", label: "Some — light daily shedding", icon: "🪮" },
      { value: "noticeable", label: "Noticeable hair in the brush and shower", icon: "😟" },
      { value: "heavy", label: "A lot — it concerns me every day", icon: "😰" },
    ],
  },
  {
    kind: "question",
    id: "q4",
    qNumber: 4,
    layout: "list",
    multi: true,
    title: "Has anything changed in the last 6 months?",
    subtitle: "Select all that apply — this helps us find the real cause.",
    cta: "Next →",
    options: [
      { value: "weightloss", label: "I've lost weight significantly or quickly", icon: "⚖️" },
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
    layout: "list",
    multi: true,
    title: "Where are you noticing it most?",
    subtitle: "Select all that apply",
    cta: "Next →",
    options: [
      { value: "hairline", label: "Hairline", icon: "👤" },
      { value: "crown", label: "Crown", icon: "👑" },
      { value: "temples", label: "Temples", icon: "◀▶" },
      { value: "ends", label: "Ends of hair", icon: "✂️" },
      { value: "allover", label: "All over", icon: "🔄" },
    ],
  },
  {
    kind: "question",
    id: "q6",
    qNumber: 6,
    layout: "list",
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
      { value: "fuller", label: "Visibly thicker & fuller", sub: "More volume overall", emoji: "💆‍♀️", gradient: "linear-gradient(135deg,#D4E4D6,#B8CEB9)" },
      { value: "healthier", label: "Healthier-looking hair", sub: "Strong and resilient", emoji: "🌿", gradient: "linear-gradient(135deg,#D8E4D4,#C0D4BA)" },
      { value: "lessshedding", label: "Less daily shedding", sub: "Fewer hairs on the brush", emoji: "✨", gradient: "linear-gradient(135deg,#E4D8D4,#D4C4BE)" },
      { value: "volume", label: "More volume", sub: "Body and movement", emoji: "🌟", gradient: "linear-gradient(135deg,#D4D8E4,#C0C4D4)" },
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
  if (q4.includes("weightloss") || q4.includes("medication")) return "glp1";
  if (q4.includes("hormonal")) return "hormonal";
  return "default";
}

const INTERSTITIAL: Record<Variant, { icon: string; headline: string; pre: string; strong: string; post: string }> = {
  glp1: {
    icon: "⚖️",
    headline: "Here's what rapid weight loss does to your follicle.",
    pre: "When your body loses weight quickly, it redirects energy away from non-essential functions — including hair growth. ",
    strong: "Your follicle gets starved of the protein and nutrients it needs to hold each strand in place.",
    post: " That's the shedding you're seeing. It's not permanent. But your follicle needs direct support to recover — and most products never reach it.",
  },
  hormonal: {
    icon: "🌙",
    headline: "Here's what hormonal shifts do to your follicle.",
    pre: "As estrogen levels shift during perimenopause, postpartum, or other hormonal changes, follicles lose the support they need to hold each strand in place. ",
    strong: "The growth phase shortens, strands release early, and thinning accelerates — even when you're doing everything right.",
    post: " Your follicle isn't damaged. It just needs targeted support.",
  },
  default: {
    icon: "🔬",
    headline: "Here's what's actually happening to your hair.",
    pre: "Most hair loss isn't about the strand — it's about the follicle underneath. Stress, product buildup, and daily environmental factors gradually starve the follicle of what it needs to hold each strand in place. ",
    strong: "When the follicle weakens, hair releases early and grows back thinner.",
    post: " The right formula reaches the follicle directly — and most products never do.",
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
      "Water-based formula absorbs directly into the scalp — reaches the follicle where most serums never get",
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
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "4px 10px",
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
    padding: 16,
    background: disabled ? BORDER : SAGE,
    color: disabled ? TEXT_SOFT : "#fff",
    border: "none",
    borderRadius: 12,
    fontFamily: BODY_FONT,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.04em",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    textDecoration: "none",
    boxSizing: "border-box",
  };
  const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) e.currentTarget.style.background = SAGE_DARK;
  };
  const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) e.currentTarget.style.background = SAGE;
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
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
const WELCOME_BULLETS = [
  "Identify the real cause of your shedding",
  "Understand what your follicle actually needs",
  "Get matched to the right solution for your hair",
  "Doctor-formulated & clinically proven",
  "300,000+ women transformed their hair",
];

function Welcome() {
  return (
    <div style={{ padding: "32px 24px 24px" }}>
      <div
        style={{
          background: SAGE_BG,
          borderRadius: 14,
          overflow: "hidden",
          marginBottom: 28,
          aspectRatio: "16 / 10",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.bottle} alt="The Spa Dr. Hair Serum" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <BadgePill>
          <span aria-hidden>✦</span> Hair Analysis
        </BadgePill>
      </div>

      <h1 style={{ fontFamily: HEAD_FONT, fontSize: 28, fontWeight: 600, lineHeight: 1.2, color: TEXT, margin: "0 0 12px" }}>
        Most Women Don&apos;t Know Why Their Hair Is Thinning. This Quiz Does.
      </h1>
      <p style={{ fontSize: 13, color: TEXT_MID, lineHeight: 1.6, margin: "0 0 24px" }}>
        Answer 7 questions and find out exactly what&apos;s happening to your hair — and what actually fixes it.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        {WELCOME_BULLETS.map((b) => (
          <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: TEXT_MID }}>
            <span
              aria-hidden
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: SAGE,
                color: "#fff",
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
            <span>{b}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, color: TEXT_SOFT, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          As seen on
        </span>
        {ASSETS.asSeen.map((item) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={item.alt} src={item.src} alt={item.alt} style={{ height: 18, width: "auto", objectFit: "contain", opacity: 0.7 }} />
        ))}
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
  return (
    <div style={{ padding: "28px 24px 16px", display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: SAGE, marginBottom: 10 }}>
        Question {screen.qNumber} of {TOTAL_QUESTIONS}
      </div>
      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 24, fontWeight: 600, lineHeight: 1.25, color: TEXT, margin: 0 }}>
        {screen.title}
      </h2>
      {screen.subtitle && <p style={{ fontSize: 12, color: TEXT_SOFT, margin: "6px 0 0" }}>{screen.subtitle}</p>}

      <div style={{ marginTop: 22 }}>
        {screen.layout === "cards" ? (
          <div className="tsd-cards">
            {screen.options.map((opt) => {
              const isSel = selected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => onToggle(opt.value)}
                  className="tsd-card"
                  style={{ border: `${isSel ? 2 : 1.5}px solid ${isSel ? SAGE : BORDER}` }}
                >
                  <div className="tsd-card-img" style={{ background: opt.img ? SURFACE_WARM : opt.gradient }}>
                    {opt.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={opt.img} alt={opt.label} />
                    ) : (
                      <span aria-hidden>{opt.emoji}</span>
                    )}
                    {isSel && <span className="tsd-card-check" aria-hidden>✓</span>}
                  </div>
                  <span className="tsd-card-label">
                    {opt.label}
                    {opt.sub && <span className="tsd-card-sub">{opt.sub}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {screen.options.map((opt) => {
              const isSel = selected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => onToggle(opt.value)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    border: `1.5px solid ${isSel ? SAGE : BORDER}`,
                    borderRadius: 12,
                    background: isSel ? SAGE_SELECTED : SURFACE,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: screen.multi ? 6 : "50%",
                      border: `2px solid ${isSel ? SAGE : BORDER}`,
                      background: isSel ? SAGE : "transparent",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {isSel && screen.multi ? "✓" : isSel ? <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} /> : ""}
                  </span>
                  {opt.icon && (
                    <span aria-hidden style={{ fontSize: 20, width: 28, textAlign: "center", flexShrink: 0 }}>
                      {opt.icon}
                    </span>
                  )}
                  <span>
                    <span style={{ display: "block", fontSize: 14, fontWeight: 500, color: TEXT, lineHeight: 1.3 }}>{opt.label}</span>
                    {opt.desc && <span style={{ display: "block", fontSize: 11, color: TEXT_SOFT, marginTop: 2 }}>{opt.desc}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .tsd-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .tsd-card {
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          background: ${SURFACE};
          padding: 0;
          transition: all 0.15s;
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .tsd-card-img {
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          position: relative;
          overflow: hidden;
        }
        .tsd-card-img :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tsd-card-check {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 22px;
          height: 22px;
          background: ${SAGE};
          border-radius: 50%;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tsd-card-label {
          padding: 10px 12px;
          font-size: 13px;
          font-weight: 600;
          color: ${TEXT};
          line-height: 1.3;
        }
        .tsd-card-sub {
          display: block;
          font-size: 11px;
          color: ${TEXT_SOFT};
          font-weight: 400;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}

// ─── Interstitial ─────────────────────────────────────────────────────────────
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
          fontSize: 36,
          marginBottom: 24,
        }}
        aria-hidden
      >
        {data.icon}
      </div>
      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 26, fontWeight: 600, lineHeight: 1.25, color: TEXT, margin: "0 0 16px" }}>
        {data.headline}
      </h2>
      <p style={{ fontSize: 14, color: TEXT_MID, lineHeight: 1.7, margin: 0, maxWidth: 340 }}>
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

function LoadingView({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18 + 8, 100);
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 600);
    const timer = setTimeout(onDone, 2800);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onDone]);

  const labelIdx = Math.min(Math.floor(progress / 25), LOADING_LABELS.length - 1);

  return (
    <div style={{ padding: "48px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 22, fontWeight: 600, textAlign: "center", color: TEXT, margin: "0 0 20px" }}>
        Finding your match...
      </h2>

      <div style={{ width: "100%", height: 6, background: BORDER_LIGHT, borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: SAGE, borderRadius: 3, transition: "width 0.3s ease" }} />
      </div>
      <div style={{ fontSize: 13, color: TEXT_SOFT, marginBottom: 40, textAlign: "center" }}>{LOADING_LABELS[labelIdx]}</div>

      <div style={{ background: SURFACE_WARM, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 20, width: "100%" }}>
        <div style={{ color: "#F4A636", fontSize: 14, marginBottom: 10 }}>★★★★★</div>
        <p style={{ fontSize: 14, color: TEXT_MID, lineHeight: 1.65, fontStyle: "italic", margin: "0 0 14px" }}>
          &ldquo;I tried everything for months. Nothing worked until I understood what was actually happening to my follicle.
          Once I started using the right formula, the shedding slowed and my hair finally came back thicker.&rdquo;
        </p>
        <div>
          <span style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>Sarah R.</span>
          <span style={{ fontSize: 10, color: TEXT_SOFT }}> · Verified Customer</span>
        </div>
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

      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 24, fontWeight: 600, lineHeight: 1.25, color: TEXT, margin: "0 0 10px" }}>
        Great job! Your personalized hair analysis is ready.
      </h2>
      <p style={{ fontSize: 12, color: TEXT_SOFT, margin: "0 0 20px" }}>
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
        <span
          aria-hidden
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: SAGE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          🌿
        </span>
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

      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 28, fontWeight: 600, lineHeight: 1.25, color: TEXT, margin: "0 0 12px" }}>
        {data.headline}
      </h2>
      <p style={{ fontSize: 13, color: TEXT_MID, lineHeight: 1.65, margin: "0 0 22px" }}>{data.summary}</p>

      <div style={{ border: `1px solid ${SAGE_BORDER}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
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
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: SAGE }}>
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
            50% OFF
          </span>
        </div>

        <div style={{ background: SURFACE_WARM, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.bottle} alt="The Spa Dr. Peptide-Powered Hair Serum" style={{ maxWidth: 180, width: "100%", height: "auto" }} />
        </div>

        <div style={{ padding: "20px 18px 22px", background: SURFACE }}>
          <div style={{ fontFamily: HEAD_FONT, fontSize: 22, fontWeight: 600, color: TEXT, lineHeight: 1.2, marginBottom: 4 }}>
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
        <div style={{ fontFamily: HEAD_FONT, fontSize: 32, fontWeight: 600, color: SAGE, lineHeight: 1, marginBottom: 4 }}>50% OFF</div>
        <div style={{ fontSize: 12, color: TEXT_MID }}>Your exclusive quiz discount — applied at checkout</div>
      </div>

      <div className="tsd-result-badges">
        {ASSETS.badges.map((b) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={b.alt} src={b.src} alt={b.alt} style={{ height: 52, width: "auto", objectFit: "contain" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.creditCards} alt="Secure payments" style={{ height: 22, width: "auto", opacity: 0.8 }} />
      </div>

      <style jsx>{`
        .tsd-result-badges {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 14px;
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

  const goNext = () => setIndex((i) => Math.min(i + 1, SCREENS.length - 1));
  const goBack = () =>
    setIndex((i) => {
      let n = Math.max(i - 1, 0);
      if (SCREENS[n].kind === "loading") n = Math.max(n - 1, 0);
      return n;
    });

  const toggleAnswer = (value: string) => {
    if (screen.kind !== "question") return;
    const { id, multi } = screen;
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
  const isQuestion = screen.kind === "question";
  const stepCount = isQuestion ? `${screen.qNumber}/${TOTAL_QUESTIONS}` : "";
  const progressPct = isQuestion ? ((screen.qNumber - 1) / TOTAL_QUESTIONS) * 100 : 0;
  const showProgress = index > 0 && index < RESULT_INDEX;

  return (
    <>
      <Head>
        <title>The Spa Dr. — Hair Quiz</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="tsd-page">
        <div className="tsd-shell">
          {/* Header */}
          <div className="tsd-header">
            <button
              className="tsd-back"
              onClick={goBack}
              aria-label="Go back"
              style={{ visibility: showBack ? "visible" : "hidden" }}
            >
              ←
            </button>
            <div className="tsd-logo">The Spa Dr.®</div>
            <div className="tsd-step">{stepCount}</div>
          </div>

          {/* Progress */}
          {showProgress && (
            <div className="tsd-progress-wrap">
              <div className="tsd-progress-bar" style={{ width: `${progressPct}%` }} />
            </div>
          )}

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
              <CtaButton onClick={goNext}>GOT IT — SHOW ME THE FIX →</CtaButton>
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
              <CtaButton href={OFFER_URL}>GET 50% OFF MY MATCH →</CtaButton>
              <CtaSub>30-Day Money-Back Guarantee · Free Shipping · Free Gifts</CtaSub>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        body {
          background: ${BG};
        }
      `}</style>
      <style jsx>{`
        .tsd-page {
          background: ${BG};
          color: ${TEXT};
          font-family: ${BODY_FONT};
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }
        .tsd-shell {
          max-width: 480px;
          margin: 0 auto;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: ${SURFACE};
          box-shadow: 0 0 60px rgba(0, 0, 0, 0.06);
        }
        .tsd-header {
          padding: 16px 20px 12px;
          border-bottom: 1px solid ${BORDER_LIGHT};
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          background: ${SURFACE};
          z-index: 10;
        }
        .tsd-back {
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
        .tsd-logo {
          font-family: ${HEAD_FONT};
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${TEXT};
        }
        .tsd-step {
          font-size: 11px;
          color: ${TEXT_SOFT};
          font-weight: 600;
          letter-spacing: 0.05em;
          min-width: 32px;
          text-align: right;
        }
        .tsd-progress-wrap {
          height: 3px;
          background: ${BORDER_LIGHT};
          position: sticky;
          top: 57px;
          z-index: 9;
        }
        .tsd-progress-bar {
          height: 100%;
          background: ${SAGE};
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
          padding: 16px 24px 24px;
          border-top: 1px solid ${BORDER_LIGHT};
          background: ${SURFACE};
          position: sticky;
          bottom: 0;
        }
        @media (min-width: 520px) {
          .tsd-shell {
            border-radius: 20px;
            margin: 24px auto;
            min-height: calc(100vh - 48px);
          }
        }
      `}</style>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default TsdHairQuizPage;
