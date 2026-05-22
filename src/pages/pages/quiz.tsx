import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import shapermintLogo from "@shapermint/assets/logos/shapermint-logo.svg";

// ─── Design tokens ────────────────────────────────────────────────────────────
const TEAL = "#4CBEA4";
const GRAY = "#D1D1D1";
const INK_900 = "#292929";
const INK_700 = "#1B1B1B";
const INK_500 = "#808080";
const INK_200 = "#E5E5E5";
const PEACH = "#F7A08B"; // --bg/fill/primary
const PEACH_HOVER = "#E08F7C";
const FONT = "'Avenir Next LT Pro', 'Avenir Next', sans-serif";

const TOTAL_STEPS = 4;

// ─── Stepper bar ─────────────────────────────────────────────────────────────
const STEP_LABELS = ["Step 1", "Step 2", "Step 3", "Step 4"];

function ActiveDot() {
  return (
    <div style={{
      width: 20, height: 20, borderRadius: "50%",
      border: `2.5px solid ${TEAL}`, background: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: TEAL }} />
    </div>
  );
}

function SmallDot({ color }: { color: string }) {
  return <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}

function StepDotWithLabel({ index, current }: { index: number; current: number }) {
  const label = STEP_LABELS[index];
  const isActive = index === current;
  const isCompleted = index < current;
  const dotWidth = isActive ? 20 : 10;

  return (
    <div style={{
      position: "relative",
      flexShrink: 0,
      width: dotWidth,
      height: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {isCompleted
        ? <SmallDot color={TEAL} />
        : isActive
        ? <ActiveDot />
        : <SmallDot color={GRAY} />}
      <span style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: FONT,
        fontSize: 11,
        fontWeight: isActive ? 600 : 400,
        color: isCompleted ? TEAL : isActive ? INK_900 : INK_500,
        whiteSpace: "nowrap",
        letterSpacing: "0.2px",
      }}>
        {label}
      </span>
    </div>
  );
}

function QuizStepperBar({ current }: { current: number }) {
  return (
    <div style={{ background: "#fff", padding: "16px 24px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", maxWidth: 230, margin: "0 auto" }}>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} style={{ display: "contents" }}>
            <StepDotWithLabel index={i} current={current} />
            {i < TOTAL_STEPS - 1 && (
              <div style={{ flex: 1, height: 4, background: i < current ? TEAL : GRAY, transition: "background 0.3s" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Question 1 ──────────────────────────────────────────────────────────────
const Q1_OPTIONS = [
  "Underwire digging in",
  "Straps slipping",
  "Lack of support",
  "Shows under clothes",
  "Nothing ever fits right",
];

function Question1({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h2 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: INK_900, textAlign: "center", margin: "0 0 8px" }}>
        What bothers you most about your current bra?
      </h2>
      <p style={{ fontFamily: FONT, fontSize: 14, color: INK_500, textAlign: "center", margin: "0 0 4px" }}>
        Choose one option
      </p>
      {Q1_OPTIONS.map(opt => (
        <button key={opt} onClick={() => onSelect(opt)} style={{
          width: "100%", padding: "14px 20px",
          border: `2px solid ${selected === opt ? TEAL : INK_200}`,
          borderRadius: 12,
          background: selected === opt ? "#EBF9F5" : "#fff",
          color: selected === opt ? TEAL : INK_900,
          fontFamily: FONT, fontSize: 16, fontWeight: selected === opt ? 600 : 400,
          cursor: "pointer", textAlign: "left", transition: "all 0.15s",
        }}>
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Question 2 ──────────────────────────────────────────────────────────────
const Q2_OPTIONS = [
  "Every day",
  "Work",
  "Workouts",
  "Under tight outfits",
  "Special occasions",
];

function Question2({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h2 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: INK_900, textAlign: "center", margin: "0 0 8px" }}>
        When do you wear a bra the most?
      </h2>
      <p style={{ fontFamily: FONT, fontSize: 14, color: INK_500, textAlign: "center", margin: "0 0 4px" }}>
        Choose one option
      </p>
      {Q2_OPTIONS.map(opt => (
        <button key={opt} onClick={() => onSelect(opt)} style={{
          width: "100%", padding: "14px 20px",
          border: `2px solid ${selected === opt ? TEAL : INK_200}`,
          borderRadius: 12,
          background: selected === opt ? "#EBF9F5" : "#fff",
          color: selected === opt ? TEAL : INK_900,
          fontFamily: FONT, fontSize: 16, fontWeight: selected === opt ? 600 : 400,
          cursor: "pointer", textAlign: "left", transition: "all 0.15s",
        }}>
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Result product ──────────────────────────────────────────────────────────
const PRODUCT = {
  name: "Truekind® Supportive Comfort Wireless Shaping Bra",
  brand: "Truekind",
  price: "$32.99",
  rating: 4.5,
  reviews: 18839,
  image: "/quiz/truekind-wireless-bra-model.png",
  url: "https://shapermint.com/products/truekind-supportive-comfort-wireless-shaping-bra-1?variant=40278561292422",
  features: [
    "Supportive as an underwire bra, without the wire",
    "Modern foam cups for a perfect fit",
    "Lifted, shaped & contoured all day",
    "Adjustable hook-and-eye closure",
  ],
};

function StarRating({ value }: { value: number }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.25 && value - full < 0.75;
  const totalFull = hasHalf ? full : Math.round(value);

  return (
    <div style={{ display: "inline-flex", gap: 1, color: "#F5A623" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ fontSize: 14, lineHeight: 1 }}>
          {i < totalFull ? "★" : i === totalFull && hasHalf ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function ResultProduct() {
  return (
    <div style={{
      marginTop: 24,
      background: "#fff",
      border: `1px solid ${INK_200}`,
      borderRadius: 16,
      overflow: "hidden",
    }}>
      <div className="quiz-result-grid">
        {/* Image side */}
        <div className="quiz-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PRODUCT.image}
            alt={PRODUCT.name}
            className="quiz-image"
            loading="lazy"
          />
        </div>

        {/* Info side */}
        <div style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column" }}>
          {/* Offer headline */}
          <div style={{
            background: "#FFF6EF",
            border: `1px solid ${PEACH}`,
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span style={{ fontSize: 18 }} aria-hidden>🎁</span>
            <p style={{
              fontFamily: FONT, fontSize: 14, fontWeight: 700,
              color: INK_900, margin: 0, lineHeight: 1.3,
            }}>
              $22 savings + free best-selling bottom
            </p>
          </div>

          <p style={{
            fontFamily: FONT, fontSize: 11, fontWeight: 600,
            color: INK_500, margin: "0 0 6px", letterSpacing: "1px",
            textTransform: "uppercase",
          }}>
            {PRODUCT.brand}
          </p>
          <h3 style={{
            fontFamily: FONT, fontSize: 18, fontWeight: 700,
            color: INK_900, margin: "0 0 8px", lineHeight: 1.3,
          }}>
            {PRODUCT.name}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <StarRating value={PRODUCT.rating} />
            <span style={{ fontFamily: FONT, fontSize: 12, color: INK_500 }}>
              {PRODUCT.rating} ({PRODUCT.reviews.toLocaleString()} reviews)
            </span>
          </div>
          <p style={{
            fontFamily: FONT, fontSize: 22, fontWeight: 700,
            color: INK_900, margin: "0 0 14px",
          }}>
            {PRODUCT.price}
          </p>

          <div style={{ borderTop: `1px solid ${INK_200}`, paddingTop: 14, marginBottom: 16 }}>
            <p style={{
              fontFamily: FONT, fontSize: 12, fontWeight: 600,
              color: INK_900, margin: "0 0 8px",
            }}>
              Why you&apos;ll love it
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {PRODUCT.features.map(f => (
                <li key={f} style={{
                  fontFamily: FONT, fontSize: 13, color: INK_900,
                  display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.4,
                }}>
                  <span style={{ color: TEAL, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={PRODUCT.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: "auto",
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "100%", height: 48, padding: "12px 24px",
              borderRadius: 8,
              background: PEACH,
              color: INK_700,
              fontFamily: FONT, fontSize: 18, fontWeight: 600,
              lineHeight: "28px",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = PEACH_HOVER; }}
            onMouseLeave={e => { e.currentTarget.style.background = PEACH; }}
          >
            Save $22 + Free Gift
          </a>
        </div>
      </div>

      {/* Responsive: side-by-side on tablet+, stacked on mobile */}
      <style jsx>{`
        .quiz-result-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        .quiz-image-wrap {
          background: #f7f7f7;
          position: relative;
          overflow: hidden;
        }
        .quiz-image {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: center;
        }
        @media (min-width: 640px) {
          .quiz-result-grid {
            grid-template-columns: 1fr 1fr;
          }
          .quiz-image-wrap {
            min-height: 320px;
          }
          .quiz-image {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Question 3 — skin-tone swatches ─────────────────────────────────────────
const SKIN_TONES = [
  { label: "Porcelain",   color: "#F5DEC8" },
  { label: "Ivory",       color: "#E8C6A0" },
  { label: "Sand",        color: "#D4A574" },
  { label: "Caramel",     color: "#B07D4E" },
  { label: "Espresso",    color: "#7A4F2E" },
  { label: "Ebony",       color: "#3E1F0D" },
];

function Question3({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: INK_900, textAlign: "center", margin: "0 0 4px" }}>
        Which color suits you best?
      </h2>
      <p style={{ fontFamily: FONT, fontSize: 14, color: INK_500, textAlign: "center", margin: "0 0 8px" }}>
        Select your skin tone
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        {SKIN_TONES.map(({ label, color }) => {
          const isSelected = selected === label;
          return (
            <button key={label} onClick={() => onSelect(label)} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 8, background: "none", border: "none", cursor: "pointer", padding: 4,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", background: color,
                border: `3px solid ${isSelected ? TEAL : "transparent"}`,
                outline: isSelected ? `2px solid #EBF9F5` : "none",
                outlineOffset: 2,
                boxShadow: isSelected ? `0 0 0 2px ${TEAL}` : "0 1px 3px rgba(0,0,0,0.15)",
                transition: "all 0.15s",
              }} />
              <span style={{
                fontFamily: FONT, fontSize: 12,
                color: isSelected ? TEAL : INK_500,
                fontWeight: isSelected ? 600 : 400,
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const QuizPage: NextPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });

  const currentAnswer = step === 0 ? answers.q1 : step === 1 ? answers.q2 : answers.q3;
  const canContinue = currentAnswer !== "";

  const handleSelect = (value: string) => {
    const key = step === 0 ? "q1" : step === 1 ? "q2" : "q3";
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleContinue = () => {
    if (step < TOTAL_STEPS - 1) setStep(s => s + 1);
  };

  return (
    <>
      <Head>
        <title>Quiz</title>
        <meta name="robots" content="noindex" />
      </Head>

      {/* Header */}
      <header style={{
        background: "#fff", borderBottom: "1px solid #f0f0f0",
        display: "flex", alignItems: "center", justifyContent: "center",
        height: 64, width: "100%",
      }}>
        <Image src={shapermintLogo} alt="Shapermint" height={28} priority />
      </header>

      {/* Stepper */}
      <QuizStepperBar current={step} />

      {/* Content */}
      <main style={{
        maxWidth: step === 3 ? 820 : 480,
        margin: "0 auto",
        padding: "32px 20px 100px",
        fontFamily: FONT,
        transition: "max-width 0.2s",
      }}>
        {step === 0 && <Question1 selected={answers.q1} onSelect={handleSelect} />}
        {step === 1 && <Question2 selected={answers.q2} onSelect={handleSelect} />}
        {step === 2 && <Question3 selected={answers.q3} onSelect={handleSelect} />}
        {step === 3 && (
          <div style={{ paddingTop: 24 }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: INK_900, marginBottom: 12 }}>
                Your perfect fit is ready! 🎉
              </h2>
              <p style={{ fontFamily: FONT, fontSize: 16, color: INK_500 }}>
                Based on your answers, we have the ideal bra for you.
              </p>
            </div>
            <ResultProduct />
          </div>
        )}

        {/* CTA */}
        {step < TOTAL_STEPS - 1 && (
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <button
              onClick={handleContinue}
              disabled={!canContinue}
              style={{
                width: "100%", height: 48, padding: "12px 24px",
                borderRadius: 8, border: "none",
                background: canContinue ? PEACH : INK_200,
                color: canContinue ? INK_700 : INK_500,
                fontFamily: FONT, fontSize: 18, fontWeight: 600,
                lineHeight: "28px", letterSpacing: 0,
                textTransform: "uppercase",
                cursor: canContinue ? "pointer" : "not-allowed",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => { if (canContinue) e.currentTarget.style.background = PEACH_HOVER; }}
              onMouseLeave={e => { if (canContinue) e.currentTarget.style.background = PEACH; }}
            >
              Continue
            </button>
            {step >= 2 && (
              <button onClick={() => setStep(s => s - 1)} style={{
                height: 48, padding: "12px 24px",
                background: "none", border: "none",
                fontFamily: FONT, fontSize: 16, fontWeight: 700,
                lineHeight: "24px", letterSpacing: "-0.08px",
                color: INK_700,
                cursor: "pointer", textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}>
                Back
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: "24px 20px",
        textAlign: "center",
        fontFamily: FONT,
        fontSize: 12,
        color: INK_500,
        borderTop: `1px solid ${INK_200}`,
      }}>
        © {new Date().getFullYear()} Shapermint, All rights reserved.
      </footer>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default QuizPage;
