import Head from "next/head";
import { useEffect, useState } from "react";
import type { GetStaticProps, NextPage } from "next";

// ─── The Spa Dr. brand tokens ────────────────────────────────────────────────
const GREEN = "#1F4E48"; // deep spa teal-green
const GREEN_DARK = "#163933";
const GREEN_SOFT = "#E9F1EE"; // selected fill
const CREAM = "#FBF8F2"; // page background
const INK_900 = "#2A2A2A";
const INK_500 = "#707070";
const INK_200 = "#E4E4E4";
const GOLD = "#E0A93B";
const BAR_GRAY = "#E0E0E0";

const HEAD_FONT = "'Cormorant Garamond', 'Georgia', 'Times New Roman', serif";
const BODY_FONT = "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

// ─── Brand assets (The Spa Dr. CDN, reused from existing landings) ────────────
const CDN = "https://cdn.prod.website-files.com/6581a4ebeea456b4072fe120";
const ASSETS = {
  logo: `${CDN}/658c86ec661f9aca80cf7811_thespadr_logo.svg.svg`,
  bottle: "https://cdn.shopify.com/s/files/1/0912/0596/files/1_bottle_1.png",
  starsQuiz: `${CDN}/688b8b1aae94eb87db05b898_stars%20quiz.svg`,
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
  concernPhotos: [
    `${CDN}/692053358dd98234d1944ceb_3.png`,
    `${CDN}/69205324c1d8849201ee3e22_2.png`,
    `${CDN}/6920536b46a6c9ee8cbca2e1_4.png`,
    `${CDN}/6920538afcfec62df9835b63_5.jpg`,
  ],
  authorLea: `${CDN}/688bafa6d6e071bc0b46ce01_lea.png`,
  creditCards: `${CDN}/688015ba89575d7fb4695966_ddeb5c291a7f3b87ee5eee8ea949b7d4_credit-cards.svg`,
};

const PRODUCT_URL = "https://thespadr.com/products/hair-serum";

// ─── Screen model ─────────────────────────────────────────────────────────────
type Option = { label: string; img?: string };

type Screen =
  | { kind: "welcome" }
  | {
      kind: "question";
      id: string;
      multi?: boolean;
      photos?: boolean;
      title: string;
      subtitle?: string;
      options: Option[];
    }
  | { kind: "info"; title: string; body?: string; cta: string }
  | { kind: "loading" }
  | { kind: "lead" }
  | { kind: "result" };

const SCREENS: Screen[] = [
  { kind: "welcome" },
  {
    kind: "question",
    id: "hair-days",
    title: "How would you describe your hair on most days?",
    options: [
      { label: "Dry and damaged" },
      { label: "Oily or greasy" },
      { label: "Thin and flat" },
      { label: "Shedding a lot" },
      { label: "Pretty normal" },
      { label: "Not really sure" },
    ],
  },
  {
    kind: "question",
    id: "concerns",
    multi: true,
    title: "What are your top hair concerns?",
    subtitle: "Select all that apply",
    options: [
      { label: "Hair thinning" },
      { label: "Excessive shedding" },
      { label: "Weak strands" },
      { label: "Slow hair growth" },
      { label: "Itchy or irritated scalp" },
      { label: "None of the above" },
    ],
  },
  {
    kind: "info",
    title:
      "Using the right hair products can help reduce shedding, support fuller-looking hair, and restore strength to damaged strands.",
    cta: "Got it",
  },
  {
    kind: "question",
    id: "shedding",
    title: "How would you describe your current hair shedding?",
    options: [
      { label: "I barely notice any" },
      { label: "Light daily shedding" },
      { label: "Noticeable hair in the brush/shower" },
      { label: "Heavy shedding that concerns me" },
    ],
  },
  {
    kind: "question",
    id: "thinning-area",
    multi: true,
    title: "Where do you notice the most hair thinning or damage?",
    subtitle: "Select all that apply",
    options: [
      { label: "Hairline" },
      { label: "Crown" },
      { label: "Temples" },
      { label: "Ends of hair" },
      { label: "All over" },
      { label: "None of the above" },
    ],
  },
  {
    kind: "question",
    id: "products-used",
    multi: true,
    title: "Which hair care products do you use regularly?",
    subtitle: "Select all that apply",
    options: [
      { label: "Shampoo" },
      { label: "Conditioner" },
      { label: "Hair Serum" },
      { label: "Scalp treatment" },
      { label: "Heat protectant" },
      { label: "None of the above" },
    ],
  },
  {
    kind: "info",
    title:
      "Did you know most hair products contain harsh sulfates and silicones that can damage hair and irritate the scalp?",
    body:
      "Using clean, non-toxic ingredients is essential for long-term hair strength and growth.",
    cta: "Got it",
  },
  {
    kind: "question",
    id: "goals",
    multi: true,
    title: "What are you hoping to improve about your hair?",
    subtitle: "Select all that apply",
    options: [
      { label: "Thicker-looking hair" },
      { label: "Reduced hair loss or shedding" },
      { label: "Stronger, healthier strands" },
      { label: "Scalp health and hydration" },
      { label: "Faster baby hair growth" },
      { label: "Repairing visible damage" },
      { label: "Something else" },
    ],
  },
  {
    kind: "question",
    id: "routine-time",
    title: "Be real: how long do you usually spend on your hair routine?",
    options: [
      { label: "Less than 5 minutes" },
      { label: "5-10 minutes" },
      { label: "10-20 minutes" },
      { label: "30+ minutes" },
    ],
  },
  {
    kind: "question",
    id: "heat-styling",
    title: "How often do you style your hair with heat or tight styles?",
    options: [
      { label: "Every day" },
      { label: "Few times a week" },
      { label: "Rarely" },
      { label: "Never" },
    ],
  },
  {
    kind: "info",
    title: "Let's get into your hair goals!",
    body:
      "We're going to show you some photos. When making a choice, select the ones that most closely match how your hair and scalp currently look: density, texture, and any visible concerns. Psst… to get the best match, be sure to tell us what kind of change you're looking for.",
    cta: "Got it",
  },
  {
    kind: "question",
    id: "hair-type",
    title: "Your natural hair type helps determine the best routine.",
    options: [
      { label: "Straight" },
      { label: "Wavy" },
      { label: "Curly" },
      { label: "Coily" },
    ],
  },
  {
    kind: "question",
    id: "concern-photo",
    photos: true,
    title: "Which of these looks most like your current hair concern?",
    options: [
      { label: "Thinning", img: ASSETS.concernPhotos[0] },
      { label: "Damaged", img: ASSETS.concernPhotos[1] },
      { label: "Shedding", img: ASSETS.concernPhotos[2] },
      { label: "Flatness", img: ASSETS.concernPhotos[3] },
    ],
  },
  {
    kind: "question",
    id: "ideal-result",
    title: "What's your ideal hair result?",
    options: [
      { label: "Visibly thicker and fuller" },
      { label: "Looking healthier" },
      { label: "Less daily shedding" },
      { label: "More volume" },
    ],
  },
  {
    kind: "question",
    id: "age",
    title: "What's your age range?",
    subtitle: "Pro tip: it's never too early or too late to start taking better care of your hair and scalp.",
    options: [
      { label: "Under 21" },
      { label: "21-25" },
      { label: "26-35" },
      { label: "36-50" },
      { label: "50 and up" },
    ],
  },
  { kind: "loading" },
  { kind: "lead" },
  { kind: "result" },
];

const QUESTION_TOTAL = SCREENS.filter((s) => s.kind === "question").length;

type Answers = Record<string, string[]>;

// ─── Shared UI bits ───────────────────────────────────────────────────────────
function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={ASSETS.logo} alt="The Spa Dr." style={{ height: 30, width: "auto" }} />
  );
}

function ProgressBar({ index }: { index: number }) {
  const pct = Math.round((index / QUESTION_TOTAL) * 100);
  return (
    <div style={{ padding: "16px 20px 0", maxWidth: 560, margin: "0 auto", width: "100%" }}>
      <div style={{ height: 6, borderRadius: 999, background: BAR_GRAY, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: GREEN,
            borderRadius: 999,
            transition: "width 0.35s ease",
          }}
        />
      </div>
      <p style={{ fontFamily: BODY_FONT, fontSize: 12, color: INK_500, margin: "8px 0 0", textAlign: "center" }}>
        {index} of {QUESTION_TOTAL}
      </p>
    </div>
  );
}

function TrustLine() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        margin: "20px 0 12px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ASSETS.starsQuiz} alt="" style={{ height: 16, width: "auto" }} />
      <span style={{ fontFamily: BODY_FONT, fontSize: 13, color: INK_500 }}>
        <strong style={{ color: INK_900 }}>TrustScore 4.8</strong> | 1,000+ Reviews
      </span>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  as = "button",
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  as?: "button" | "a";
  href?: string;
}) {
  const style: React.CSSProperties = {
    width: "100%",
    height: 52,
    borderRadius: 999,
    border: "none",
    background: disabled ? INK_200 : GREEN,
    color: disabled ? INK_500 : "#fff",
    fontFamily: BODY_FONT,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    textDecoration: "none",
  };
  const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) e.currentTarget.style.background = GREEN_DARK;
  };
  const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) e.currentTarget.style.background = GREEN;
  };
  if (as === "a") {
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

// ─── Welcome ────────────────────────────────────────────────────────────────
const WELCOME_BULLETS = [
  "Visibly thicken your hair",
  "Strengthen strands",
  "Reduce shedding and daily hair loss",
  "Boost fuller-looking hair",
  "Repair damaged hair",
  "Doctor-formulated & clinically proven",
];

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="10" fill={GREEN_SOFT} />
      <path d="M6.5 11.3l3 3L15.5 8" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <>
      <div className="hsq-welcome">
        <div className="hsq-welcome-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.bottle} alt="The Spa Dr. Hair Serum" />
        </div>
        <div className="hsq-welcome-content">
          <h1
            style={{
              fontFamily: HEAD_FONT,
              fontSize: 34,
              fontWeight: 600,
              color: GREEN,
              margin: "0 0 24px",
              lineHeight: 1.2,
            }}
          >
            The Spa Dr. is here to help with thinning, shedding, and damaged hair.
          </h1>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 14 }}>
            {WELCOME_BULLETS.map((b) => (
              <li
                key={b}
                style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: BODY_FONT, fontSize: 16, color: INK_900 }}
              >
                <CheckIcon />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <PrimaryButton onClick={onStart}>
            Start the quiz <span aria-hidden>→</span>
          </PrimaryButton>
        </div>
      </div>

      <section className="hsq-asseen">
        <p
          style={{
            fontFamily: BODY_FONT,
            fontSize: 13,
            fontWeight: 700,
            color: INK_500,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
            margin: 0,
          }}
        >
          As seen on
        </p>
        <div className="hsq-asseen-grid">
          {ASSETS.asSeen.map((item) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={item.alt} src={item.src} alt={item.alt} style={{ height: 28, width: "auto", objectFit: "contain", opacity: 0.75 }} />
          ))}
        </div>
      </section>

      <style jsx>{`
        .hsq-welcome {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: center;
        }
        .hsq-welcome-image {
          background: ${GREEN_SOFT};
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .hsq-welcome-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .hsq-asseen {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 44px 0 8px;
        }
        .hsq-asseen-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 36px;
        }
        @media (min-width: 768px) {
          .hsq-welcome {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </>
  );
}

// ─── Question screen ──────────────────────────────────────────────────────────
function QuestionScreen({
  screen,
  selected,
  onToggle,
}: {
  screen: Extract<Screen, { kind: "question" }>;
  selected: string[];
  onToggle: (label: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h2
        style={{
          fontFamily: HEAD_FONT,
          fontSize: 28,
          fontWeight: 600,
          color: GREEN,
          textAlign: "center",
          margin: "0 0 4px",
          lineHeight: 1.25,
        }}
      >
        {screen.title}
      </h2>
      {screen.subtitle && (
        <p style={{ fontFamily: BODY_FONT, fontSize: 14, color: INK_500, textAlign: "center", margin: "0 0 8px" }}>
          {screen.subtitle}
        </p>
      )}

      {screen.photos ? (
        <div className="hsq-photo-grid">
          {screen.options.map((opt) => {
            const isSel = selected.includes(opt.label);
            return (
              <button
                key={opt.label}
                onClick={() => onToggle(opt.label)}
                className="hsq-photo-card"
                style={{ borderColor: isSel ? GREEN : INK_200, background: isSel ? GREEN_SOFT : "#fff" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={opt.img} alt={opt.label} />
                <span style={{ fontFamily: BODY_FONT, fontSize: 15, fontWeight: isSel ? 700 : 500, color: isSel ? GREEN : INK_900 }}>
                  {opt.label}
                </span>
              </button>
            );
          })}
          <style jsx>{`
            .hsq-photo-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 14px;
            }
            .hsq-photo-card {
              border: 2px solid;
              border-radius: 16px;
              overflow: hidden;
              cursor: pointer;
              padding: 0 0 12px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;
              transition: all 0.15s;
            }
            .hsq-photo-card img {
              width: 100%;
              aspect-ratio: 1 / 1;
              object-fit: cover;
            }
          `}</style>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {screen.options.map((opt) => {
            const isSel = selected.includes(opt.label);
            return (
              <button
                key={opt.label}
                onClick={() => onToggle(opt.label)}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  border: `2px solid ${isSel ? GREEN : INK_200}`,
                  borderRadius: 12,
                  background: isSel ? GREEN_SOFT : "#fff",
                  color: isSel ? GREEN : INK_900,
                  fontFamily: BODY_FONT,
                  fontSize: 16,
                  fontWeight: isSel ? 700 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span>{opt.label}</span>
                {screen.multi && (
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      border: `2px solid ${isSel ? GREEN : INK_200}`,
                      background: isSel ? GREEN : "#fff",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 14,
                    }}
                  >
                    {isSel ? "✓" : ""}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Info / interstitial screen ───────────────────────────────────────────────
function InfoScreen({ screen, onContinue }: { screen: Extract<Screen, { kind: "info" }>; onContinue: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "12px 0" }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: GREEN_SOFT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          fontSize: 30,
        }}
        aria-hidden
      >
        💡
      </div>
      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 26, fontWeight: 600, color: GREEN, margin: "0 0 14px", lineHeight: 1.3 }}>
        {screen.title}
      </h2>
      {screen.body && (
        <p style={{ fontFamily: BODY_FONT, fontSize: 16, color: INK_500, margin: "0 auto 28px", maxWidth: 440, lineHeight: 1.55 }}>
          {screen.body}
        </p>
      )}
      <div style={{ marginTop: screen.body ? 0 : 28 }}>
        <PrimaryButton onClick={onContinue}>{screen.cta}</PrimaryButton>
      </div>
    </div>
  );
}

// ─── Loading / finding match ──────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 4, 100));
    }, 80);
    const timer = setTimeout(onDone, 2400);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <div style={{ textAlign: "center", padding: "12px 0" }}>
      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 28, fontWeight: 600, color: GREEN, margin: "0 0 20px" }}>
        Finding your match!
      </h2>
      <div style={{ height: 8, borderRadius: 999, background: BAR_GRAY, overflow: "hidden", maxWidth: 320, margin: "0 auto 32px" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: GREEN, transition: "width 0.08s linear" }} />
      </div>

      <div
        style={{
          background: "#fff",
          border: `1px solid ${INK_200}`,
          borderRadius: 16,
          padding: 24,
          maxWidth: 420,
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.authorLea} alt="Lea Roman" style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <p style={{ fontFamily: BODY_FONT, fontSize: 15, fontWeight: 700, color: INK_900, margin: 0 }}>Lea Roman</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.starsQuiz} alt="5 stars" style={{ height: 14, marginTop: 4 }} />
          </div>
        </div>
        <p style={{ fontFamily: BODY_FONT, fontSize: 14, color: INK_500, lineHeight: 1.55, margin: 0, fontStyle: "italic" }}>
          “I used to try product after product, but nothing helped: my hair kept thinning and shedding got worse. Everything
          changed when I found this formula. Slowly, my hair felt stronger, the shedding slowed, and I started noticing more
          fullness at the roots.”
        </p>
      </div>
    </div>
  );
}

// ─── Lead form (UI only) ──────────────────────────────────────────────────────
function LeadScreen({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const valid = name.trim() !== "" && /\S+@\S+\.\S+/.test(email);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 52,
    padding: "0 16px",
    borderRadius: 12,
    border: `2px solid ${INK_200}`,
    fontFamily: BODY_FONT,
    fontSize: 16,
    color: INK_900,
    outline: "none",
    background: "#fff",
  };

  return (
    <div style={{ textAlign: "center", padding: "12px 0" }}>
      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 30, fontWeight: 600, color: GREEN, margin: "0 0 10px" }}>Great job!</h2>
      <p style={{ fontFamily: BODY_FONT, fontSize: 16, color: INK_500, margin: "0 auto 8px", maxWidth: 420, lineHeight: 1.5 }}>
        Fill in your details and we&apos;ll email your product matches. You&apos;ll also get the results on the next page.
      </p>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: GREEN_SOFT,
          color: GREEN,
          fontFamily: BODY_FONT,
          fontSize: 13,
          fontWeight: 700,
          padding: "8px 16px",
          borderRadius: 999,
          margin: "0 0 24px",
        }}
      >
        🎁 You will also get a FREE gift!
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onSubmit();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 420, margin: "0 auto", textAlign: "left" }}
      >
        <input
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          aria-label="First name"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          aria-label="Email address"
        />
        <PrimaryButton disabled={!valid}>See my results</PrimaryButton>
        <p style={{ fontFamily: BODY_FONT, fontSize: 11, color: INK_500, textAlign: "center", margin: "4px 0 0", lineHeight: 1.4 }}>
          By continuing you agree to receive emails from The Spa Dr. You can unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}

// ─── Result / Congratulations ──────────────────────────────────────────────────
function ResultScreen() {
  return (
    <div style={{ textAlign: "center", padding: "12px 0" }}>
      <p
        style={{
          fontFamily: BODY_FONT,
          fontSize: 13,
          fontWeight: 700,
          color: GREEN,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          margin: "0 0 8px",
        }}
      >
        Congratulations!
      </p>
      <h2 style={{ fontFamily: HEAD_FONT, fontSize: 30, fontWeight: 600, color: GREEN, margin: "0 0 24px", lineHeight: 1.25 }}>
        We found the right match for you to regain healthier, fuller-looking hair — without the toxic ingredients.
      </h2>

      <div
        style={{
          background: "#fff",
          border: `1px solid ${INK_200}`,
          borderRadius: 20,
          overflow: "hidden",
          maxWidth: 460,
          margin: "0 auto 28px",
        }}
      >
        <div style={{ background: GREEN_SOFT, padding: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.bottle} alt="The Spa Dr. Hair Serum" style={{ maxWidth: 220, width: "100%", height: "auto" }} />
        </div>
        <div style={{ padding: "24px 24px 28px" }}>
          <h3 style={{ fontFamily: HEAD_FONT, fontSize: 24, fontWeight: 600, color: INK_900, margin: "0 0 8px" }}>
            The Spa Dr. Hair Serum
          </h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.starsQuiz} alt="" style={{ height: 16 }} />
            <span style={{ fontFamily: BODY_FONT, fontSize: 13, color: INK_500 }}>4.8 | 1,000+ Reviews</span>
          </div>
          <PrimaryButton as="a" href={PRODUCT_URL}>
            Claim my offer + free gift
          </PrimaryButton>
        </div>
      </div>

      <p style={{ fontFamily: BODY_FONT, fontSize: 14, color: INK_500, margin: "0 auto 20px", maxWidth: 420, lineHeight: 1.5 }}>
        Trusted by over 100,000 people to support visibly healthier, fuller-looking hair.
      </p>

      <div className="hsq-badges">
        {ASSETS.badges.map((b) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={b.alt} src={b.src} alt={b.alt} style={{ height: 64, width: "auto", objectFit: "contain" }} />
        ))}
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "8px auto 24px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 16px",
          maxWidth: 460,
        }}
      >
        {["Cruelty-Free", "No Artificial Fragrances", "Non-GMO", "No Silicones", "No Parabens", "SLS-Free"].map((t) => (
          <li key={t} style={{ fontFamily: BODY_FONT, fontSize: 13, color: INK_900, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: GREEN, fontWeight: 700 }}>✓</span> {t}
          </li>
        ))}
      </ul>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ASSETS.creditCards} alt="Secure payments" style={{ height: 24, width: "auto", opacity: 0.8 }} />

      <style jsx>{`
        .hsq-badges {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
const HairSerumQuizPage: NextPage = () => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const screen = SCREENS[index];
  const goNext = () => setIndex((i) => Math.min(i + 1, SCREENS.length - 1));
  const goBack = () => setIndex((i) => Math.max(i - 1, 0));

  // 1-based index among question screens (for the progress bar).
  const questionIndex = SCREENS.slice(0, index + 1).filter((s) => s.kind === "question").length;

  const toggleAnswer = (label: string) => {
    if (screen.kind !== "question") return;
    setAnswers((prev) => {
      const current = prev[screen.id] ?? [];
      if (screen.multi) {
        const next = current.includes(label) ? current.filter((l) => l !== label) : [...current, label];
        return { ...prev, [screen.id]: next };
      }
      return { ...prev, [screen.id]: [label] };
    });
  };

  const currentSelection = screen.kind === "question" ? answers[screen.id] ?? [] : [];
  const canContinue = currentSelection.length > 0;

  const showHeaderBack = index > 0 && screen.kind !== "result";

  return (
    <>
      <Head>
        <title>Hair Serum Quiz | The Spa Dr.</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: "100vh", background: CREAM, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            background: "#fff",
            borderBottom: `1px solid ${INK_200}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            height: 60,
            padding: "0 16px",
          }}
        >
          {showHeaderBack && (
            <button
              onClick={goBack}
              aria-label="Go back"
              style={{
                position: "absolute",
                left: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 22,
                color: INK_500,
                lineHeight: 1,
              }}
            >
              ←
            </button>
          )}
          <Logo />
        </header>

        {/* Progress bar — only on question screens */}
        {screen.kind === "question" && <ProgressBar index={questionIndex} />}

        {/* Content */}
        <main
          style={{
            flex: 1,
            width: "100%",
            maxWidth: screen.kind === "welcome" ? 920 : 560,
            margin: "0 auto",
            padding: "28px 20px 60px",
            fontFamily: BODY_FONT,
          }}
        >
          {screen.kind === "welcome" && <Welcome onStart={goNext} />}

          {screen.kind === "question" && (
            <>
              <QuestionScreen screen={screen} selected={currentSelection} onToggle={toggleAnswer} />
              <TrustLine />
              <PrimaryButton onClick={goNext} disabled={!canContinue}>
                Next
              </PrimaryButton>
            </>
          )}

          {screen.kind === "info" && <InfoScreen screen={screen} onContinue={goNext} />}
          {screen.kind === "loading" && <LoadingScreen onDone={goNext} />}
          {screen.kind === "lead" && <LeadScreen onSubmit={goNext} />}
          {screen.kind === "result" && <ResultScreen />}
        </main>

        {/* Footer */}
        <footer
          style={{
            padding: "24px 20px 32px",
            textAlign: "center",
            fontFamily: BODY_FONT,
            fontSize: 12,
            color: INK_500,
            borderTop: `1px solid ${INK_200}`,
            background: "#fff",
          }}
        >
          <p style={{ margin: "0 auto 8px", maxWidth: 620, lineHeight: 1.5 }}>
            Legal disclaimer: Results may vary from person to person. Our service does not intend to diagnose, treat, cure, or
            prevent any disease and does not constitute medical advice.
          </p>
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} The Spa Dr.</p>
        </footer>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default HairSerumQuizPage;
