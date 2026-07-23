/* eslint-disable */
// @ts-nocheck
/**
 * EBRA · Modern Bra — Fit Quiz (V2, email gate).
 *
 * Native React port of the shareable bundle export
 * (`public/ebra-quiz-v2/index.html`). The original was a self-contained
 * design-canvas export that rendered the quiz inside mobile/desktop device
 * mockups with a "Tweaks" panel. Those staging frames are intentionally
 * dropped here so the quiz renders directly in the page DOM — making the
 * visual element selector work and giving us full control over spacing.
 *
 * Screens: Landing → Q1 Shape → Q2 Issues → Q3 Wants → Q4 Size → Loader →
 * Email gate → Reveal → Gift. Logic and copy stay faithful to the export;
 * chrome uses the Shapermint design system (Avenir, peach CTAs, SHM logo).
 * Assets live under `/public/ebra-quiz-v2/assets`.
 */
import React from "react";
import { TruekindStarIcon, TruekindStars } from "@/landings/truekind/TruekindStars";
import { TK_BTN, TK_CHIP, TK_COLORS, TK_FONT, TK_LOGO, TK_PRODUCT_TONES, TK_QUIZ_BTN_WEIGHT, TK_RADIUS, TK_SELECTED, TK_SIZE_CHART_COLORS, TK_SIZE_CHART_HEAD_BG } from "./truekindQuizTokens";

const IMG = (p: string) => `/ebra-quiz-v2/${p}`;

// ─── Tokens (Shapermint DS) ──────────────────────────────────────────────────
const DEFAULTS = {
  paper: TK_COLORS.paper,
  ink: TK_COLORS.ink,
  /** Text/UI accent — coral-500 so headlines & body pass contrast on cream */
  accent: TK_COLORS.accentText,
  pinkAccent: TK_COLORS.sandSoft,
  surface: TK_COLORS.surface,
  headlineFont: "Avenir Next LT Pro",
  bodyFont: "Avenir Next",
  logoSize: 110,
};

function headlineFontStack() {
  return TK_FONT;
}
function bodyFontStack() {
  return TK_FONT;
}

// ─── Silhouettes ─────────────────────────────────────────────────────────────
const SH_STROKE = 1.4;

function Glyph({ children, w = 92, h = 56 }) {
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={SH_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", overflow: "visible" }}
    >
      <g transform={`translate(0 ${h}) scale(1 -1)`}>{children}</g>
    </svg>
  );
}

const ShapeDot = ({ cx, cy, r = 1.6 }) => (
  <circle cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />
);

const SHAPES = {
  round: (
    <Glyph>
      <path d="M 4 52 Q 4 28, 22 28 Q 42 32, 42 52" />
      <path d="M 50 52 Q 50 32, 70 28 Q 88 28, 88 52" />
      <ShapeDot cx={28} cy={44} />
      <ShapeDot cx={64} cy={44} />
    </Glyph>
  ),
  teardrop: (
    <Glyph>
      <path d="M -2 52 Q -6 22, 14 18 Q 36 22, 36 52" />
      <path d="M 56 52 Q 56 22, 78 18 Q 98 22, 94 52" />
      <ShapeDot cx={10} cy={30} />
      <ShapeDot cx={82} cy={30} />
    </Glyph>
  ),
  slender: (
    <Glyph>
      <path d="M 14 52 Q 14 18, 26 18 Q 38 18, 38 52" />
      <path d="M 54 52 Q 54 18, 66 18 Q 78 18, 78 52" />
      <ShapeDot cx={26} cy={34} />
      <ShapeDot cx={66} cy={34} />
    </Glyph>
  ),
  sideSet: (
    <Glyph>
      <path d="M -2 52 Q -2 22, 14 22 Q 30 22, 30 52" />
      <path d="M 62 52 Q 62 22, 78 22 Q 94 22, 94 52" />
      <ShapeDot cx={14} cy={32} />
      <ShapeDot cx={78} cy={32} />
    </Glyph>
  ),
  eastWest: (
    <Glyph>
      <path d="M 4 52 Q 4 22, 20 18 Q 42 26, 44 52" />
      <path d="M 48 52 Q 50 26, 72 18 Q 88 22, 88 52" />
      <ShapeDot cx={28} cy={40} />
      <ShapeDot cx={64} cy={40} />
    </Glyph>
  ),
  asymmetric: (
    <Glyph>
      <path d="M 4 52 Q 4 22, 20 22 Q 36 22, 36 52" />
      <path d="M 46 52 Q 46 10, 68 10 Q 88 10, 88 52" />
      <ShapeDot cx={20} cy={32} />
      <ShapeDot cx={68} cy={24} />
    </Glyph>
  ),
  bell: (
    <Glyph>
      <path d="M 14 52 Q 4 40, 4 24 Q 4 8, 24 8 Q 44 8, 44 24 Q 44 40, 34 52" />
      <path d="M 58 52 Q 48 40, 48 24 Q 48 8, 68 8 Q 88 8, 88 24 Q 88 40, 78 52" />
      <ShapeDot cx={20} cy={16} />
      <ShapeDot cx={72} cy={16} />
    </Glyph>
  ),
  relaxed: (
    <Glyph>
      <path d="M 4 52 Q 4 12, 24 12 Q 44 12, 44 52" />
      <path d="M 48 52 Q 48 12, 68 12 Q 88 12, 88 52" />
      <ShapeDot cx={24} cy={26} />
      <ShapeDot cx={68} cy={26} />
    </Glyph>
  ),
};

const SHAPE_LIST = [
  { id: "round", name: "Round", desc: "Even fullness top and bottom. Naturally balanced shape." },
  { id: "teardrop", name: "Teardrop", desc: "Less fullness at the top, more weight settled toward the bottom." },
  { id: "slender", name: "Slender", desc: "Narrow silhouette with contained volume. Nipples angle down." },
  { id: "sideSet", name: "Side-set", desc: "Visible space at the center. Breasts positioned outward." },
  { id: "eastWest", name: "East-West", desc: "Nipples angle out to the sides rather than facing forward." },
  { id: "asymmetric", name: "Asymmetric", desc: "Noticeable difference in size or shape between left and right." },
  { id: "bell", name: "Bell", desc: "Slimmer at the top, fuller at the bottom. Bell-shaped curve." },
  { id: "relaxed", name: "Relaxed", desc: "Softer tissue with weight settled lower. Nipples point down." },
];

// ─── Question data ───────────────────────────────────────────────────────────
const PROBLEMS = [
  "Gaping cups", "Lack of support", "Spillage", "Digging straps",
  "Band riding up", "Side bulge", "Bra lines", "Uncomfortable wires",
];

const WANTS = [
  "Lift", "Support", "Comfort", "Smoothing",
  "Seamless under clothes", "No digging", "Everyday Versatility",
];

const SIZES = ["A–B", "C–D", "DD+", "Not sure"];
const BANDS = ["30", "32", "34", "36", "38", "40", "42", "44", "46", "48"];
const CUPS = ["A", "B", "C", "D", "DD/E", "DDD/F", "G", "H/I"];

const SIZE_MATRIX = {
  A: { 34: "S", 36: "M", 38: "M" },
  B: { 30: "S", 32: "S", 34: "S", 36: "M", 38: "L", 40: "XL", 42: "XL" },
  C: { 30: "S", 32: "S", 34: "M", 36: "L", 38: "L", 40: "XL", 42: "XL", 44: "2XL", 46: "3XL", 48: "3XL" },
  D: { 30: "S", 32: "S", 34: "M", 36: "L", 38: "XL", 40: "XL", 42: "2XL", 44: "3XL", 46: "3XL", 48: "4XL" },
  "DD/E": { 30: "S", 32: "M", 34: "L", 36: "XL", 38: "XL", 40: "2XL", 42: "2XL", 44: "3XL", 46: "4XL", 48: "4XL" },
  "DDD/F": { 30: "M", 32: "L", 34: "L", 36: "XL", 38: "2XL", 40: "2XL", 42: "2XL", 44: "3XL", 46: "4XL", 48: "4XL" },
  G: { 36: "2XL", 38: "2XL", 40: "3XL", 42: "3XL", 44: "4XL", 46: "4XL" },
  "H/I": { 36: "2XL", 38: "2XL", 40: "3XL", 42: "3XL" },
};

function lookupSize(band, cup) {
  return (SIZE_MATRIX[cup] || {})[band] || null;
}

function combosForSize(size) {
  const out = [];
  for (const cup of CUPS) {
    for (const band of BANDS) {
      if (SIZE_MATRIX[cup]?.[band] === size) out.push(`${band}${cup}`);
    }
  }
  return out;
}

function measureToSize(underBust, bust) {
  if (!underBust || !bust) return { band: null, cup: null };
  const ub = parseFloat(underBust);
  const b = parseFloat(bust);
  if (isNaN(ub) || isNaN(b)) return { band: null, cup: null };
  const bandNum = Math.max(30, Math.min(48, Math.round(ub / 2) * 2));
  const diff = Math.round(b - bandNum);
  const cupTable = ["A", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H/I", "H/I", "H/I"];
  const cup = cupTable[Math.max(0, Math.min(cupTable.length - 1, diff))];
  return { band: String(bandNum), cup };
}

function shapeName(id) {
  const s = SHAPE_LIST.find((x) => x.id === id);
  return s ? s.name : "—";
}

// ─── Shared chrome ───────────────────────────────────────────────────────────
function QuizFrame({ children, compact, accent, paper, ink, pinkAccent, surface, headlineFont, bodyFont }) {
  return (
    <div
      style={{
        width: "100%", flex: 1, minHeight: "100vh",
        background: paper, color: ink,
        fontFamily: bodyFont || "var(--qz-body-font)",
        fontSize: compact ? 16 : 17, lineHeight: 1.5,
        display: "flex", flexDirection: "column",
        padding: compact ? "24px 22px 40px" : "40px 80px 64px",
        boxSizing: "border-box", position: "relative",
        "--qz-accent": accent,
        "--qz-ink": ink,
        "--qz-paper": paper,
        "--qz-pink": pinkAccent || TK_COLORS.sandSoft,
        "--qz-surface": surface || TK_COLORS.surface,
        "--qz-headline-font": headlineFont || TK_FONT,
        "--qz-body-font": bodyFont || TK_FONT,
        ["--font-body" as string]: TK_FONT,
        ["--font-display" as string]: TK_FONT,
      }}
    >
      {children}
    </div>
  );
}

function ProgressBar({ step, total = 4, accent, ink, compact, onBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: compact ? 28 : 36 }}>
      <button onClick={onBack} aria-label="Back" style={{
        width: 28, height: 28, borderRadius: TK_RADIUS, border: "none", background: "transparent",
        color: ink, cursor: "pointer", display: "grid", placeItems: "center", padding: 0, opacity: 0.7,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 2 L4 7 L9 12" />
        </svg>
      </button>
      <div style={{ flex: 1, display: "flex", gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 9999,
            background: i < step ? accent : "rgba(31,26,23,0.12)",
            transition: "background .25s",
          }} />
        ))}
      </div>
      <div style={{
        fontFamily: "var(--qz-body-font)", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: "rgba(31,26,23,0.55)", fontVariantNumeric: "tabular-nums",
      }}>
        {String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}

// Shapermint DS button — peach fill, Demi (600), 8px radius
const TK_BTN_FONT = TK_FONT;

function PillCTA({ children, onClick, accent, ink, compact, full, ghost, disabled }) {
  const bg = disabled ? TK_BTN.disabledBg : ghost ? "transparent" : TK_BTN.primary;
  const fg = disabled ? TK_BTN.disabledFg : ghost ? TK_COLORS.inkStrong : TK_BTN.primaryFg;
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      padding: compact ? "14px 24px" : "16px 32px",
      borderRadius: TK_RADIUS, border: disabled ? "none" : ghost ? `1px solid ${TK_COLORS.inkStrong}` : "none",
      background: bg, color: fg,
      fontFamily: TK_BTN_FONT,
      fontSize: compact ? 14 : 15, fontWeight: TK_BTN.weight,
      lineHeight: compact ? "20px" : "22px",
      letterSpacing: "0.06em", textTransform: "uppercase",
      cursor: disabled ? "not-allowed" : "pointer", width: full ? "100%" : "auto",
      transition: "transform .12s, background .15s",
    }}
      onMouseEnter={(e) => { if (!disabled && !ghost) e.currentTarget.style.background = TK_BTN.primaryHover; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; if (!disabled && !ghost) e.currentTarget.style.background = TK_BTN.primary; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "translateY(1px)"; }}
      onMouseUp={(e) => (e.currentTarget.style.transform = "none")}
    >
      {children}
    </button>
  );
}

function BraIcon({ size = 36, color }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 60 42" fill="none"
      stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14 Q 18 6, 30 14 Q 42 6, 56 14" />
      <path d="M4 14 Q 6 30, 18 32 Q 28 30, 30 24" />
      <path d="M56 14 Q 54 30, 42 32 Q 32 30, 30 24" />
      <path d="M18 32 Q 30 36, 42 32" />
    </svg>
  );
}

function Dot() {
  return <span style={{ width: 3, height: 3, borderRadius: 9999, background: TK_COLORS.border }} />;
}

// ─── Screen 1 · Landing ──────────────────────────────────────────────────────
function ScreenLanding({ compact, ink, accent, paper, onStart, logoSize }) {
  const lSize = logoSize || (compact ? 88 : 110);
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "space-between",
      textAlign: "center", padding: compact ? "8px 8px 32px" : "12px 0 48px",
      maxWidth: compact ? "100%" : 640, margin: "0 auto", minHeight: "100%",
    }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={TK_LOGO} alt="Shapermint"
          style={{ width: lSize, height: "auto", display: "block" }} />
      </div>

      <div style={{ width: "100%" }}>
        <h1 style={{
          fontFamily: "var(--qz-headline-font)", fontWeight: 800,
          fontSize: compact ? 38 : 58, lineHeight: 1.05,
          letterSpacing: "-0.018em", margin: 0, color: ink, textWrap: "balance",
        }}>
          Discover the bra<br />that was made<br />
          <em style={{ fontStyle: "italic", color: accent }}>for your shape.</em>
        </h1>
        <p style={{
          margin: compact ? "22px 0 32px" : "28px 0 40px",
          fontSize: compact ? 16 : 18, color: TK_COLORS.muted,
          maxWidth: "38ch", lineHeight: 1.5, marginLeft: "auto", marginRight: "auto",
        }}>
          Take the 15-second fit quiz.<br />
          <strong style={{ color: TK_COLORS.accentText, fontWeight: 700 }}>Unlock your secret gift.</strong>
        </p>
        <PillCTA onClick={onStart} compact={compact} ink={ink}>
          Start the quiz
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 7 H 12 M 8 3 L 12 7 L 8 11" />
          </svg>
        </PillCTA>
      </div>

      <div style={{ width: "100%" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: compact ? 12 : 18,
          flexWrap: "wrap", justifyContent: "center",
          fontSize: compact ? 13 : 14, color: TK_COLORS.muted, fontWeight: 500,
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <TruekindStarIcon size={14} color={TK_COLORS.star} /> 4.8
          </span>
          <Dot />
          <span>Trusted by 100k+ women</span>
          <Dot />
          <span>60-day fit guarantee</span>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2 · Q1 shape grid ──────────────────────────────────────────────────
function ScreenShape({ compact, ink, accent, paper, answer, onSelect, onBack, onAdvance }) {
  const [revealed, setRevealed] = React.useState(null);
  const [helpOpen, setHelpOpen] = React.useState(false);

  const handleTap = (id) => {
    if (compact) {
      onSelect(id);
      setRevealed(id);
    } else {
      onSelect(id);
    }
  };

  const cols = compact ? 2 : 4;

  return (
    <React.Fragment>
      <ProgressBar step={1} total={4} accent={accent} ink={ink} compact={compact} onBack={onBack} />

      <h1 style={{
        fontFamily: "var(--qz-headline-font)", fontWeight: 700,
        fontSize: compact ? 28 : 40, lineHeight: 1.1,
        letterSpacing: "-0.015em", margin: 0, color: ink, textWrap: "balance",
      }}>
        What best describes <em style={{ color: accent }}>your breast shape?</em>
      </h1>
      <p style={{ margin: compact ? "10px 0 22px" : "12px 0 32px", fontSize: compact ? 14 : 15, color: "rgba(31,26,23,0.6)" }}>
        Tap each to see the description. Pick the closest.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: compact ? 10 : 14 }}>
        {SHAPE_LIST.map((s) => (
          <ShapeCell key={s.id}
            shape={s}
            selected={answer === s.id}
            open={revealed === s.id && compact}
            accent={accent} ink={ink} compact={compact}
            onClick={() => handleTap(s.id)}
          />
        ))}
      </div>

      <div style={{ marginTop: compact ? 22 : 28, textAlign: "center", display: "flex", justifyContent: "center" }}>
        <PillCTA onClick={onAdvance} compact={compact} ink={ink} full={compact} disabled={!answer}>
          Continue
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 7 H 12 M 8 3 L 12 7 L 8 11" />
          </svg>
        </PillCTA>
      </div>

      {helpOpen && (
        <ShapeHelpModal compact={compact} ink={ink} accent={accent} onClose={() => setHelpOpen(false)} />
      )}
    </React.Fragment>
  );
}

function ShapeHelpModal({ compact, ink, accent, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 50, background: "rgba(20,15,12,0.55)",
      display: "flex", alignItems: compact ? "flex-end" : "center", justifyContent: "center",
      animation: "qzfadeIn .2s ease-out", padding: compact ? 0 : 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: TK_COLORS.sandSoft, borderRadius: compact ? `${TK_RADIUS}px ${TK_RADIUS}px 0 0` : TK_RADIUS,
        padding: compact ? "20px 22px 28px" : "32px 36px",
        maxWidth: compact ? "100%" : 520, width: "100%",
        maxHeight: compact ? "85%" : "90%", overflowY: "auto",
        boxShadow: "0 -20px 60px rgba(0,0,0,0.2)", position: "relative",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <h2 style={{
            fontFamily: "var(--qz-headline-font)", fontWeight: 700,
            fontSize: compact ? 22 : 28, lineHeight: 1.15, margin: 0, color: ink, paddingRight: 24,
          }}>
            How to identify <em style={{ color: accent }}>your shape.</em>
          </h2>
          <button onClick={onClose} aria-label="Close" style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: ink, width: 28, height: 28, borderRadius: TK_RADIUS,
            display: "grid", placeItems: "center", padding: 0, flex: "0 0 auto",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 3 L 11 11 M 11 3 L 3 11" />
            </svg>
          </button>
        </div>
        <ol style={{ margin: 0, paddingLeft: 22, fontSize: compact ? 14 : 15, lineHeight: 1.55, color: "rgba(31,26,23,0.75)" }}>
          <li style={{ marginBottom: 10 }}>Look at yourself in a mirror, facing forward, without a bra.</li>
          <li style={{ marginBottom: 10 }}>Notice where the volume sits — evenly, fuller at the bottom, fuller at the top, or settled toward the sides.</li>
          <li style={{ marginBottom: 10 }}>Check the spacing in the middle and the direction your nipples point.</li>
          <li>Pick the silhouette that best matches — it doesn’t have to be exact.</li>
        </ol>
        <div style={{
          marginTop: 20, padding: "14px 16px", background: "rgba(92,31,46,0.06)",
          borderRadius: TK_RADIUS, fontSize: 13, color: "rgba(31,26,23,0.7)", lineHeight: 1.5,
        }}>
          Tip: many women have features of two shapes. Pick the closest — we’ll handle the rest.
        </div>
      </div>
    </div>
  );
}

function ShapeCell({ shape, selected, open, accent, ink, compact, onClick }) {
  const chipBg = TK_CHIP.bg;
  return (
    <button onClick={onClick} className="qz-shape-cell" style={{
      position: "relative",
      background: selected ? TK_SELECTED.bg : chipBg,
      border: selected ? `2px solid ${TK_SELECTED.border}` : `1px solid ${TK_CHIP.border}`,
      borderRadius: TK_RADIUS, padding: compact ? "18px 10px 14px" : "22px 14px 16px",
      cursor: "pointer", color: selected ? TK_SELECTED.glyph : accent,
      fontFamily: "var(--qz-body-font)", fontWeight: TK_QUIZ_BTN_WEIGHT,
      transition: "background .18s, transform .12s, border-color .18s",
      textAlign: "center", fontFamily: "inherit",
    }}
      onMouseEnter={(e) => { if (!compact && !selected) e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { if (!compact) e.currentTarget.style.transform = "none"; }}
    >
      {selected && (
        <div style={{
          position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: TK_RADIUS,
          background: TK_SELECTED.checkBg, color: TK_SELECTED.checkFg, display: "grid", placeItems: "center",
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 5 L4 7 L8 3" />
          </svg>
        </div>
      )}
      <div style={{ height: compact ? 64 : 80, display: "grid", placeItems: "center", color: selected ? TK_SELECTED.glyph : accent }}>
        {SHAPES[shape.id]}
      </div>
      <div style={{
        marginTop: compact ? 8 : 10, fontSize: compact ? 13 : 14,
        letterSpacing: "0.005em", color: selected ? TK_SELECTED.fg : TK_CHIP.fg,
      }}>{shape.name}</div>

      {open && (
        <div style={{
          marginTop: 8, fontSize: 11.5, lineHeight: 1.4,
          color: selected ? TK_COLORS.muted : TK_COLORS.muted, fontWeight: 400,
        }}>{shape.desc}</div>
      )}

      {!compact && (
        <div className="qz-tooltip" style={{
          position: "absolute", top: "100%", left: "50%", transform: "translate(-50%, 6px)",
          background: ink, color: TK_COLORS.sand, padding: "8px 12px", borderRadius: TK_RADIUS,
          fontSize: 11.5, lineHeight: 1.35, width: 180,
          opacity: 0, pointerEvents: "none", transition: "opacity .15s", zIndex: 5, fontWeight: 400,
        }}>{shape.desc}</div>
      )}
    </button>
  );
}

// ─── Pill multi/single select question ─────────────────────────────────────────
function QuestionPills({ step, total = 4, compact, ink, accent, paper, title, titleEm, sub, options, answer, multi, max, onSelect, onAdvance, onBack }) {
  const isSelected = (opt) => (multi ? (answer || []).includes(opt) : answer === opt);
  const canAdvance = multi ? answer && answer.length > 0 : !!answer;

  const handle = (opt) => {
    if (multi) {
      const cur = answer || [];
      if (cur.includes(opt)) onSelect(cur.filter((x) => x !== opt));
      else if (!max || cur.length < max) onSelect([...cur, opt]);
      else onSelect([...cur.slice(1), opt]);
    } else {
      onSelect(opt);
      setTimeout(() => onAdvance(), 220);
    }
  };

  return (
    <React.Fragment>
      <ProgressBar step={step} total={total} accent={accent} ink={ink} compact={compact} onBack={onBack} />

      <h1 style={{
        fontFamily: "var(--qz-headline-font)", fontWeight: 700,
        fontSize: compact ? 30 : 44, lineHeight: 1.08,
        letterSpacing: "-0.015em", margin: 0, color: ink, textWrap: "balance",
      }}>
        {title}{" "}
        {titleEm && <em style={{ color: accent, fontStyle: "italic" }}>{titleEm}</em>}
      </h1>
      <p style={{ margin: compact ? "12px 0 28px" : "14px 0 36px", fontSize: compact ? 14 : 16, color: "rgba(31,26,23,0.6)" }}>{sub}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: compact ? 8 : 10, maxWidth: compact ? "100%" : 640 }}>
        {options.map((opt) => {
          const sel = isSelected(opt);
          return (
            <PillButton key={opt} selected={sel} ink={ink} accent={accent} compact={compact} onClick={() => handle(opt)}>
              {sel && multi && <Check inverted accent={accent} />}
              {opt}
            </PillButton>
          );
        })}
      </div>

      {multi && max && (
        <div style={{ marginTop: compact ? 16 : 20, fontSize: 12, color: "rgba(31,26,23,0.5)", fontVariantNumeric: "tabular-nums" }}>
          {(answer || []).length} / {max} selected
        </div>
      )}
      {multi && !max && (answer || []).length > 0 && (
        <div style={{ marginTop: compact ? 16 : 20, fontSize: 12, color: "rgba(31,26,23,0.5)", fontVariantNumeric: "tabular-nums" }}>
          {(answer || []).length} selected
        </div>
      )}

      {multi && (
        <div style={{ marginTop: compact ? 28 : 36, textAlign: "left" }}>
          <PillCTA onClick={onAdvance} compact={compact} ink={ink} disabled={!canAdvance}>
            Continue
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M2 7 H 12 M 8 3 L 12 7 L 8 11" />
            </svg>
          </PillCTA>
        </div>
      )}
    </React.Fragment>
  );
}

function PillButton({ children, selected, ink, accent, compact, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: compact ? "13px 18px" : "15px 22px", borderRadius: TK_RADIUS,
      background: selected ? TK_SELECTED.bg : TK_CHIP.bg,
      color: selected ? TK_SELECTED.fg : TK_CHIP.fg,
      border: selected ? `2px solid ${TK_SELECTED.border}` : `1px solid ${TK_CHIP.border}`,
      fontFamily: "var(--qz-body-font)", fontSize: compact ? 14 : 15, fontWeight: TK_QUIZ_BTN_WEIGHT,
      letterSpacing: "0.005em", cursor: "pointer",
      transition: "background .15s, color .15s, border-color .15s, transform .12s",
    }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "none")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
    >
      {children}
    </button>
  );
}

function Check({ inverted, accent }) {
  return (
    <span style={{ display: "inline-grid", placeItems: "center", width: 16, height: 16, borderRadius: TK_RADIUS, background: TK_CHIP.bg, color: accent }}>
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 5 L4 7 L8 3" />
      </svg>
    </span>
  );
}

// ─── Screen 5 · Q4 size picker ─────────────────────────────────────────────────
function ScreenSize({ compact, ink, accent, paper, answer, onSelect, onAdvance, onBack }) {
  const init = typeof answer === "object" && answer ? answer : { band: null, cup: null };
  const [band, setBand] = React.useState(init.band);
  const [cup, setCup] = React.useState(init.cup);
  const [helpOpen, setHelpOpen] = React.useState(false);
  const [notSure, setNotSure] = React.useState(answer === "not-sure");

  const size = band && cup ? lookupSize(band, cup) : null;
  const fits = size ? combosForSize(size) : [];

  React.useEffect(() => {
    if (notSure) onSelect("not-sure");
    else if (band && cup) onSelect({ band, cup, size });
    else onSelect(null);
  }, [band, cup, size, notSure]);

  const canContinue = notSure || (band && cup && size);

  const handleApplyMeasurements = (b, c) => {
    setBand(b);
    setCup(c);
    setNotSure(false);
    setHelpOpen(false);
  };

  return (
    <React.Fragment>
      <ProgressBar step={4} total={4} accent={accent} ink={ink} compact={compact} onBack={onBack} />

      <h1 style={{
        fontFamily: "var(--qz-headline-font)", fontWeight: 700,
        fontSize: compact ? 30 : 44, lineHeight: 1.08,
        letterSpacing: "-0.015em", margin: 0, color: ink, textWrap: "balance",
      }}>
        What size <em style={{ color: accent }}>are you?</em>
      </h1>
      <p style={{ margin: compact ? "12px 0 28px" : "14px 0 32px", fontSize: compact ? 14 : 16, color: "rgba(31,26,23,0.6)" }}>
        Pick your band and cup. We'll match you to a size.
      </p>

      <div style={{ opacity: notSure ? 0.4 : 1, pointerEvents: notSure ? "none" : "auto", transition: "opacity .2s" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: compact ? 6 : 10, flexWrap: "wrap" }}>
          <SizeSelect label="Band" value={band} placeholder="Band" options={BANDS} onChange={setBand} accent={accent} ink={ink} compact={compact} />
          <SizeSelect label="Cup" value={cup} placeholder="Cup" options={CUPS} onChange={setCup} accent={accent} ink={ink} compact={compact} />
          <div style={{
            fontFamily: "var(--qz-headline-font)", fontSize: compact ? 22 : 28,
            color: "rgba(31,26,23,0.45)", padding: compact ? "0 2px 12px" : "0 4px 14px", lineHeight: 1,
          }}>=</div>
          <SizeResult size={size} accent={accent} ink={ink} compact={compact} />
        </div>

        <div style={{
          marginTop: compact ? 18 : 22, padding: compact ? "14px 16px" : "16px 20px",
          background: TK_COLORS.sandSoft, border: "1px solid rgba(31,26,23,0.08)", borderRadius: TK_RADIUS,
          display: "flex", gap: 12, alignItems: "flex-start", fontSize: compact ? 13 : 14, lineHeight: 1.5,
        }}>
          <span style={{ color: accent, flex: "0 0 auto", marginTop: 2 }}>
            <BraIcon size={compact ? 22 : 26} color="currentColor" />
          </span>
          <div style={{ color: "rgba(31,26,23,0.75)" }}>
            {size ? (
              <React.Fragment>
                <strong style={{ color: ink, fontWeight: 700 }}>Size {size}</strong> fits:{" "}
                <span style={{ color: "rgba(31,26,23,0.65)" }}>{fits.join(", ")}</span>
              </React.Fragment>
            ) : !band || !cup ? (
              <span style={{ color: "rgba(31,26,23,0.6)" }}>Pick a band and a cup to see your size.</span>
            ) : (
              <span style={{ color: "rgba(31,26,23,0.6)" }}>That combination isn't standard — try a nearby band or cup.</span>
            )}
          </div>
        </div>

        <SizeChart band={band} cup={cup} ink={ink} compact={compact} />
      </div>

      <div style={{ marginTop: compact ? 24 : 32 }}>
        <PillCTA onClick={onAdvance} compact={compact} ink={ink} full={compact} disabled={!canContinue}>
          {notSure ? "Continue without a size" : size ? `Continue with Size ${size}` : "Continue"}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 7 H 12 M 8 3 L 12 7 L 8 11" />
          </svg>
        </PillCTA>
      </div>

      {helpOpen && (
        <MeasureModal compact={compact} ink={ink} accent={accent}
          onApply={handleApplyMeasurements}
          onSkip={() => { setNotSure(true); setHelpOpen(false); }}
          onClose={() => setHelpOpen(false)} />
      )}
    </React.Fragment>
  );
}

function SizeSelect({ label, value, placeholder, options, onChange, accent, ink, compact }) {
  const empty = !value;
  return (
    <label style={{ position: "relative", display: "inline-flex", flexDirection: "column", gap: 4, flex: "1 1 0", minWidth: compact ? 0 : 110 }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(31,26,23,0.55)", marginLeft: 2 }}>{label}</span>
      <div style={{ position: "relative" }}>
        <select value={value || ""} onChange={(e) => onChange(e.target.value)} style={{
          appearance: "none", WebkitAppearance: "none", width: "100%", boxSizing: "border-box",
          height: compact ? 52 : 60,
          padding: compact ? "0 32px 0 14px" : "0 36px 0 18px",
          borderRadius: TK_RADIUS, border: "1px solid rgba(31,26,23,0.2)", background: "#FFFFFF",
          fontFamily: "var(--qz-headline-font)", fontSize: compact ? 18 : 22, fontWeight: 400,
          color: empty ? "rgba(31,26,23,0.4)" : ink, cursor: "pointer", outline: "none",
        }}
          onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(31,26,23,0.2)")}
        >
          <option value="" disabled>{placeholder || label}</option>
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: "absolute", right: compact ? 12 : 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.55 }}>
          <path d="M1 1 L 5 5 L 9 1" />
        </svg>
      </div>
    </label>
  );
}

function SizeResult({ size, accent, ink, compact }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 4, flex: "1 1 0", minWidth: compact ? 0 : 110 }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(31,26,23,0.55)", marginLeft: 2 }}>You are</span>
      <div style={{
        padding: compact ? "0 14px" : "0 18px", borderRadius: TK_RADIUS,
        background: size ? TK_SELECTED.bg : TK_CHIP.bg,
        color: size ? TK_SELECTED.fg : "rgba(31,26,23,0.4)",
        border: size ? `2px solid ${TK_SELECTED.border}` : `1px dashed ${TK_CHIP.border}`,
        fontFamily: "var(--qz-body-font)", fontWeight: TK_QUIZ_BTN_WEIGHT, fontSize: compact ? 18 : 22,
        textAlign: "center", height: compact ? 52 : 60,
        display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box",
      }}>
        {size ? `Size ${size}` : "—"}
      </div>
    </div>
  );
}

function SizeChart({ band, cup, ink, compact }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{
      marginTop: compact ? 14 : 18,
      borderRadius: TK_RADIUS,
      border: "1px solid rgba(31,26,23,0.1)",
      background: "#FFFFFF",
      overflow: "hidden",
    }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="qz-size-chart-panel"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: compact ? "14px 14px" : "16px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "inherit",
          color: ink,
        }}
      >
        <span style={{
          fontFamily: "var(--qz-headline-font)",
          fontWeight: TK_QUIZ_BTN_WEIGHT,
          fontSize: compact ? 16 : 18,
          lineHeight: 1.3,
        }}>
          Unsure of your size?
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          style={{
            flex: "0 0 auto",
            opacity: 0.55,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .2s ease",
          }}
        >
          <path d="M2 4 L6 8 L10 4" />
        </svg>
      </button>

      {open && (
        <div
          id="qz-size-chart-panel"
          className="qz-size-chart-scroll"
          style={{
            overflowX: compact ? "auto" : "visible",
            overflowY: "hidden",
            borderTop: "1px solid rgba(31,26,23,0.08)",
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorX: "contain",
            touchAction: "pan-x",
          }}
        >
          <div style={{
            padding: compact ? "14px 14px 16px" : "16px 20px 22px",
            width: compact ? "fit-content" : "auto",
            minWidth: "100%",
            boxSizing: "border-box",
          }}>
            <p style={{
              margin: "0 0 14px",
              fontSize: compact ? 12.5 : 13.5,
              color: "rgba(31,26,23,0.6)",
              lineHeight: 1.4,
              maxWidth: compact ? "none" : "52ch",
              whiteSpace: compact ? "nowrap" : "normal",
            }}>
              Use our size chart to ensure the perfect fit for every body type, petite to plus-size.
            </p>

            {compact && (
              <p style={{
                margin: "0 0 8px",
                fontSize: 11,
                color: "rgba(31,26,23,0.45)",
                display: "flex",
                alignItems: "center",
                gap: 4,
                whiteSpace: "nowrap",
              }}>
                Scroll to see the whole chart <span aria-hidden>→</span>
              </p>
            )}

            <table style={{
              borderCollapse: "collapse",
              width: "100%",
              minWidth: compact ? 480 : 0,
              borderRadius: TK_RADIUS,
              overflow: "hidden",
            }}>
              <thead>
                <tr>
                  <th style={{
                    ...sizeChartHeadCellStyle(true),
                    position: "sticky",
                    left: 0,
                    zIndex: 2,
                    boxShadow: "1px 0 0 rgba(31,26,23,0.08)",
                  }}>
                    Band <span style={{ opacity: 0.5 }}>→</span>
                  </th>
                  {BANDS.map((b) => (
                    <th
                      key={b}
                      style={{
                        ...sizeChartHeadCellStyle(false),
                        background: b === band ? TK_COLORS.terraSoft : sizeChartHeadCellStyle(false).background,
                      }}
                    >
                      {b}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CUPS.map((c) => (
                  <tr key={c}>
                    <th style={{
                      ...sizeChartRowHeadStyle,
                      position: "sticky",
                      left: 0,
                      zIndex: 1,
                      boxShadow: "1px 0 0 rgba(31,26,23,0.08)",
                      background: c === cup ? TK_COLORS.terraSoft : sizeChartRowHeadStyle.background,
                    }}>
                      {c} {c === CUPS[0] && <span style={{ opacity: 0.5 }}>↓</span>}
                    </th>
                    {BANDS.map((b) => {
                      const cellSize = (SIZE_MATRIX[c] || {})[b];
                      const isActive = c === cup && b === band;
                      return (
                        <td
                          key={b}
                          style={{
                            padding: compact ? "9px 6px" : "11px 8px",
                            textAlign: "center",
                            fontFamily: "var(--qz-body-font)",
                            fontSize: compact ? 12 : 13,
                            fontWeight: TK_QUIZ_BTN_WEIGHT,
                            color: ink,
                            borderTop: "1px solid rgba(31,26,23,0.06)",
                            background: cellSize ? TK_SIZE_CHART_COLORS[cellSize] : "#FFFFFF",
                            boxShadow: isActive ? `inset 0 0 0 2px ${TK_COLORS.inkStrong}` : "none",
                          }}
                        >
                          {cellSize || ""}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function sizeChartHeadCellStyle(isCorner) {
  return {
    padding: isCorner ? "10px 12px" : "10px 6px", textAlign: isCorner ? "left" : "center",
    fontFamily: "var(--qz-body-font)", fontSize: 12, fontWeight: 700, letterSpacing: "0.01em",
    color: "rgba(31,26,23,0.7)", background: TK_SIZE_CHART_HEAD_BG, whiteSpace: "nowrap",
  };
}

const sizeChartRowHeadStyle = {
  padding: "9px 12px", textAlign: "left", fontFamily: "var(--qz-body-font)", fontSize: 12.5,
  fontWeight: 700, color: "rgba(31,26,23,0.7)", background: TK_SIZE_CHART_HEAD_BG,
  borderTop: "1px solid rgba(31,26,23,0.06)", whiteSpace: "nowrap",
} as const;

function MeasureModal({ compact, ink, accent, onApply, onSkip, onClose }) {
  const [underBust, setUnderBust] = React.useState("");
  const [bust, setBust] = React.useState("");
  const calc = measureToSize(underBust, bust);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 50, background: "rgba(20,15,12,0.55)",
      display: "flex", alignItems: compact ? "flex-end" : "center", justifyContent: "center",
      animation: "qzfadeIn .2s ease-out", padding: compact ? 0 : 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: TK_COLORS.sandSoft, borderRadius: compact ? `${TK_RADIUS}px ${TK_RADIUS}px 0 0` : TK_RADIUS,
        padding: compact ? "24px 22px 28px" : "32px 36px", maxWidth: compact ? "100%" : 540,
        width: "100%", maxHeight: "90%", overflowY: "auto", boxShadow: "0 -20px 60px rgba(0,0,0,0.25)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{
              fontFamily: "var(--qz-body-font)", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: accent, marginBottom: 8,
            }}>Let's measure together</div>
            <h2 style={{
              fontFamily: "var(--qz-headline-font)", fontWeight: 700,
              fontSize: compact ? 24 : 30, lineHeight: 1.15, margin: 0, color: ink, textWrap: "balance",
            }}>
              Find your size <em style={{ color: accent }}>in two measurements.</em>
            </h2>
          </div>
          <button onClick={onClose} aria-label="Close" style={{
            background: "transparent", border: "none", cursor: "pointer", color: ink,
            width: 28, height: 28, borderRadius: TK_RADIUS, display: "grid", placeItems: "center",
            padding: 0, flex: "0 0 auto", marginTop: 4,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 3 L 11 11 M 11 3 L 3 11" />
            </svg>
          </button>
        </div>

        <p style={{ margin: "0 0 22px", fontSize: 14, color: "rgba(31,26,23,0.65)", lineHeight: 1.5 }}>
          Use a soft tape measure. Stand straight, wear an unpadded bra (or none), and breathe normally.
        </p>

        <MeasureStep n={1} title="Underbust (Band)" hint="Measure snugly around your ribcage, just below the bust. Keep the tape level."
          value={underBust} onChange={setUnderBust} unit="in" ink={ink} accent={accent} diagram="band" />
        <MeasureStep n={2} title="Fullest bust" hint="Wrap the tape around the fullest part of your bust, parallel to the floor."
          value={bust} onChange={setBust} unit="in" ink={ink} accent={accent} diagram="bust" />

        <div style={{
          marginTop: 18, padding: "16px 18px",
          background: calc.band && calc.cup ? accent : "transparent",
          color: calc.band && calc.cup ? TK_COLORS.inkStrong : "rgba(31,26,23,0.45)",
          border: calc.band && calc.cup ? "none" : "1px dashed rgba(31,26,23,0.2)",
          borderRadius: TK_RADIUS, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
        }}>
          <div>
            <div style={{ fontFamily: "var(--qz-body-font)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.8, marginBottom: 4 }}>Your size</div>
            <div style={{ fontFamily: "var(--qz-headline-font)", fontWeight: 700, fontSize: compact ? 22 : 26, lineHeight: 1.1 }}>
              {calc.band && calc.cup
                ? <>Band <strong style={{ fontStyle: "italic" }}>{calc.band}</strong> · Cup <strong style={{ fontStyle: "italic" }}>{calc.cup}</strong></>
                : "Enter your measurements above"}
            </div>
          </div>
          {calc.band && calc.cup && (() => {
            const s = lookupSize(calc.band, calc.cup);
            return s ? (
              <div style={{ background: "rgba(255,255,255,0.18)", padding: "8px 16px", borderRadius: TK_RADIUS, fontFamily: "var(--qz-headline-font)", fontSize: 18, whiteSpace: "nowrap" }}>Size {s}</div>
            ) : null;
          })()}
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 10, flexDirection: compact ? "column" : "row" }}>
          <button onClick={() => calc.band && calc.cup && onApply(calc.band, calc.cup)} disabled={!calc.band || !calc.cup} style={{
            flex: 1, padding: "14px 22px", borderRadius: TK_RADIUS, border: "none",
            background: calc.band && calc.cup ? TK_BTN.primary : TK_BTN.disabledBg,
            color: calc.band && calc.cup ? TK_BTN.primaryFg : TK_BTN.disabledFg,
            cursor: calc.band && calc.cup ? "pointer" : "not-allowed",
            fontFamily: "var(--qz-body-font)", fontSize: 14, fontWeight: TK_BTN.weight, letterSpacing: "0.04em",
          }}>
            Use these measurements
          </button>
          <button onClick={onSkip} style={{
            padding: "14px 22px", borderRadius: TK_RADIUS, border: "1px solid rgba(31,26,23,0.25)",
            background: "transparent", color: ink, cursor: "pointer",
            fontFamily: "var(--qz-body-font)", fontSize: 14, fontWeight: TK_BTN.weight, letterSpacing: "0.04em",
          }}>
            Skip — I'm still not sure
          </button>
        </div>

        <p style={{ margin: "16px 0 0", fontSize: 11.5, color: "rgba(31,26,23,0.5)", lineHeight: 1.5 }}>
          Standard US sizing. Band size = nearest even number to your underbust. Cup letter = each inch of difference between bust and band (1" = A, 2" = B, 3" = C, 4" = D, 5" = DD/E, and so on).
        </p>
      </div>
    </div>
  );
}

function MeasureStep({ n, title, hint, value, onChange, unit, ink, accent, diagram }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px", alignItems: "center", gap: 14, padding: "14px 0", borderTop: "1px solid rgba(31,26,23,0.08)" }}>
      <div style={{ color: accent, width: 50, height: 50, display: "grid", placeItems: "center", background: "rgba(92,31,46,0.06)", borderRadius: TK_RADIUS }}>
        <MeasureDiagram kind={diagram} />
      </div>
      <div>
        <div style={{ fontFamily: "var(--qz-body-font)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(31,26,23,0.55)", marginBottom: 4 }}>Step {n}</div>
        <div style={{ fontFamily: "var(--qz-headline-font)", fontWeight: 700, fontSize: 17, color: ink, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12, color: "rgba(31,26,23,0.6)", lineHeight: 1.45 }}>{hint}</div>
      </div>
      <div style={{ position: "relative" }}>
        <input type="number" inputMode="decimal" min="20" max="60" step="0.5" value={value} onChange={(e) => onChange(e.target.value)} placeholder="—"
          style={{
            width: "100%", boxSizing: "border-box", padding: "13px 38px 13px 14px", borderRadius: TK_RADIUS,
            border: "1px solid rgba(31,26,23,0.18)", background: "#fff", fontFamily: "inherit",
            fontSize: 16, color: ink, outline: "none", fontVariantNumeric: "tabular-nums",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(31,26,23,0.18)")}
        />
        <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "rgba(31,26,23,0.5)" }}>{unit}</span>
      </div>
    </div>
  );
}

function MeasureDiagram({ kind }) {
  const tapeY = kind === "band" ? 30 : 18;
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 8 4 V 34 M 30 4 V 34" opacity="0.4" />
      <path d="M 10 18 Q 10 26, 18 26 Q 22 26, 22 18" transform={`translate(0 ${kind === "band" ? -2 : 0})`} />
      <path d="M 22 18 Q 22 26, 26 26 Q 30 26, 30 18" transform={`translate(0 ${kind === "band" ? -2 : 0})`} />
      <line x1="4" y1={tapeY} x2="34" y2={tapeY} strokeDasharray="2 1.5" stroke="currentColor" />
      <path d={`M 4 ${tapeY - 2} L 2 ${tapeY} L 4 ${tapeY + 2}`} />
      <path d={`M 34 ${tapeY - 2} L 36 ${tapeY} L 34 ${tapeY + 2}`} />
    </svg>
  );
}

// ─── Screen 6 · Loader ──────────────────────────────────────────────────────────
function ScreenLoader({ compact, ink, accent, paper, answers, onDone }) {
  const lines = [
    { label: "Matching your shape", value: shapeName(answers.shape) },
    { label: "Solving for", value: (answers.problems || []).join(" + ") || "—" },
    { label: "Designed for", value: (answers.wants || []).join(" + ") || "—" },
  ];
  const [visible, setVisible] = React.useState(0);

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setVisible(1), 500),
      setTimeout(() => setVisible(2), 1100),
      setTimeout(() => setVisible(3), 1700),
      setTimeout(() => onDone && onDone(), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: compact ? 32 : 44, padding: compact ? "40px 0" : "60px 0" }}>
      <Spinner accent={accent} />
      <div style={{ display: "flex", flexDirection: "column", gap: compact ? 14 : 18, width: "100%", maxWidth: 420 }}>
        {lines.map((l, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "baseline", gap: 12,
            opacity: visible > i ? 1 : 0,
            transform: visible > i ? "translateY(0)" : "translateY(6px)",
            transition: "opacity .4s, transform .4s",
          }}>
            <span style={{ color: accent, fontSize: 14, fontWeight: 700, fontFamily: "var(--qz-body-font)", flex: "0 0 auto" }}>✓</span>
            <span style={{ fontSize: compact ? 14 : 15, color: "rgba(31,26,23,0.6)", flex: "0 0 auto" }}>{l.label}:</span>
            <span style={{ fontFamily: "var(--qz-headline-font)", fontStyle: "italic", fontSize: compact ? 17 : 19, color: ink, fontWeight: 400 }}>{l.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Spinner({ accent }) {
  return <div style={{ width: 56, height: 56, borderRadius: 9999, border: "2px solid rgba(31,26,23,0.08)", borderTopColor: accent, animation: "qzspin 0.9s linear infinite" }} />;
}

// ─── Screen 6.5 · Email gate ────────────────────────────────────────────────────
function ScreenEmailGate({ compact, ink, accent, paper, pinkAccent, surface, onUnlock, onBack }) {
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onUnlock(email.trim());
    }, 380);
  };

  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: compact ? "24px 8px 32px" : "36px 0 56px", maxWidth: compact ? "100%" : 560,
      margin: "0 auto", width: "100%", textAlign: "center",
    }}>
      <div style={{
        width: compact ? 56 : 64, height: compact ? 56 : 64, borderRadius: TK_RADIUS,
        background: surface || "#FCD9D1", color: accent, display: "grid", placeItems: "center",
        marginBottom: compact ? 22 : 28, animation: "qzunwrap .5s cubic-bezier(.2,.7,.3,1) both",
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12 L 10 18 L 20 6" />
        </svg>
      </div>

      <div style={{ fontFamily: "var(--qz-body-font)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>
        Quiz complete
      </div>

      <h1 style={{
        fontFamily: "var(--qz-headline-font)", fontWeight: 700, fontSize: compact ? 36 : 52,
        lineHeight: 1.05, letterSpacing: "-0.018em", margin: 0, color: ink, textWrap: "balance",
      }}>
        Your results <em style={{ color: accent }}>are ready.</em>
      </h1>

      <p style={{
        margin: compact ? "14px 0 28px" : "18px 0 36px", fontSize: compact ? 15 : 17,
        color: "rgba(31,26,23,0.7)", maxWidth: "40ch", lineHeight: 1.5,
        marginLeft: "auto", marginRight: "auto", textWrap: "pretty",
      }}>
        We'll send your <strong style={{ color: ink, fontWeight: 700 }}>perfect match</strong> to your inbox.
      </p>

      <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: compact ? 12 : 14, alignItems: "stretch", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
        <input type="email" inputMode="email" autoComplete="email" placeholder="Enter your email…" value={email} onChange={(e) => setEmail(e.target.value)} required
          style={{
            width: "100%", boxSizing: "border-box", padding: compact ? "16px 20px" : "18px 22px",
            borderRadius: TK_RADIUS, border: "1px solid rgba(31,26,23,0.18)", background: "#fff",
            fontFamily: "var(--qz-body-font)", fontSize: compact ? 15 : 16, color: ink,
            outline: "none", textAlign: "center", transition: "border-color .15s, box-shadow .15s",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${accent}22`; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(31,26,23,0.18)"; e.currentTarget.style.boxShadow = "none"; }}
        />

        <button type="submit" disabled={!valid || submitting} style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
          width: "100%", padding: compact ? "14px 20px" : "16px 24px", borderRadius: TK_RADIUS, border: "none",
          background: valid ? TK_BTN.primary : TK_BTN.disabledBg,
          color: valid ? TK_BTN.primaryFg : TK_BTN.disabledFg,
          fontFamily: TK_BTN_FONT, fontSize: compact ? 14 : 15, fontWeight: TK_BTN.weight,
          lineHeight: compact ? "20px" : "22px",
          letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap",
          cursor: valid && !submitting ? "pointer" : "not-allowed",
          transition: "background .15s, transform .12s",
        }}
          onMouseEnter={(e) => { if (valid && !submitting) e.currentTarget.style.background = TK_BTN.primaryHover; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; if (valid) e.currentTarget.style.background = TK_BTN.primary; }}
          onMouseDown={(e) => { if (valid && !submitting) e.currentTarget.style.transform = "translateY(1px)"; }}
          onMouseUp={(e) => (e.currentTarget.style.transform = "none")}
        >
          {submitting ? "Unlocking…" : "Unlock my match & gift"}
        </button>

        <div style={{ marginTop: 4, fontSize: 11.5, color: "rgba(31,26,23,0.55)", lineHeight: 1.45, textWrap: "pretty" }}>
          By entering your email, you agree to receive marketing emails from Shapermint. Unsubscribe anytime.
        </div>
      </form>
    </div>
  );
}

// ─── Screen 7 · Reveal ──────────────────────────────────────────────────────────
const PRODUCT_COLORS = [
  { id: "black", name: "Black", hex: TK_PRODUCT_TONES.black, fit: IMG("assets/fit-chocolate.jpg"), bra: IMG("assets/bra-black.jpg") },
  { id: "chai", name: "Chai", hex: TK_PRODUCT_TONES.chai, fit: IMG("assets/fit-black.jpg"), bra: IMG("assets/bra-sand.jpg") },
  { id: "white", name: "White", hex: TK_PRODUCT_TONES.white, fit: IMG("assets/fit-white.jpg"), bra: IMG("assets/bra-white.jpg") },
  { id: "tan", name: "Tan", hex: TK_PRODUCT_TONES.tan, fit: IMG("assets/fit-sand.jpg"), bra: IMG("assets/bra-pink.jpg") },
  { id: "cocoa", name: "Cocoa", hex: TK_PRODUCT_TONES.cocoa, fit: IMG("assets/fit-pink.jpg"), bra: IMG("assets/bra-chocolate.jpg") },
];

function ScreenReveal({ compact, ink, accent, paper, pinkAccent, surface, answers, onClaim, onRestart }) {
  const shape = SHAPE_LIST.find((x) => x.id === answers.shape);
  const shapeLabel = shape ? shape.name.toLowerCase() : "your shape";
  const problems = answers.problems || [];
  const wants = answers.wants || [];
  const [selectedColor, setSelectedColor] = React.useState("black");

  const color = PRODUCT_COLORS.find((c) => c.id === selectedColor) || PRODUCT_COLORS[0];
  const why = buildWhy(shapeLabel, problems, wants);

  return (
    <div style={{ padding: "0 0 24px" }}>
      <div style={{ fontFamily: "var(--qz-body-font)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>
        Your match
      </div>
      <h1 style={{
        fontFamily: "var(--qz-headline-font)", fontWeight: 700, fontSize: compact ? 30 : 44,
        lineHeight: 1.04, letterSpacing: "-0.018em", margin: 0, color: ink, textWrap: "balance",
      }}>
        Meet your match:<br />
        <em style={{ color: accent }}>Supportive Comfort Wireless Shaping Bra.</em>
      </h1>

      <TryBeforeYouBuyBanner accent={accent} surface={surface} ink={ink} compact={compact} />

      {/* Two-column PDP layout: images left, info right (stacks on mobile) */}
      <div style={{
        marginTop: compact ? 24 : 32,
        display: compact ? "flex" : "grid",
        flexDirection: "column",
        gridTemplateColumns: compact ? undefined : "1fr 1fr",
        gap: compact ? 20 : 32,
        alignItems: "stretch",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: compact ? 8 : 12 }}>
          <ProductImage src={color.bra} alt={`${color.name} — product`} label="Product" fit="contain" />
          <ProductImage src={color.fit} alt={`${color.name} — on body`} label="On body" fit="cover" />
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 16,
          height: "100%",
        }}>
          <ProductHeader compact={compact} />
          <ColorSelector colors={PRODUCT_COLORS} value={selectedColor} onChange={setSelectedColor} ink={ink} accent={accent} compact={compact} />
          <div>
            <p style={{
              margin: "0 0 12px",
              fontSize: 12, lineHeight: 1.4, color: "rgba(41, 41, 41, 0.82)",
              textAlign: compact ? "center" : "left",
            }}>
              $0 to try this bra · Keep it for 30% off · Free gift included
            </p>
            <button onClick={onClaim} style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: compact ? "14px 24px" : "16px 32px", borderRadius: TK_RADIUS, border: "none",
              background: TK_BTN.primary, color: TK_BTN.primaryFg, fontFamily: TK_BTN_FONT,
              fontWeight: TK_BTN.weight, fontSize: compact ? 14 : 15, lineHeight: compact ? "20px" : "22px",
              letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap",
              cursor: "pointer", transition: "background .15s, transform .12s",
              width: compact ? "100%" : "auto",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = TK_BTN.primaryHover)}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.background = TK_BTN.primary; }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "none")}
            >
              Try before you buy
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 7 H 12 M 8 3 L 12 7 L 8 11" />
              </svg>
            </button>
            <p style={{
              margin: "12px 0 0",
              fontSize: 11, lineHeight: 1.55, color: TK_COLORS.muted,
              textAlign: compact ? "center" : "left",
              textWrap: "pretty",
            }}>
              By clicking &quot;Yes,&quot; you agree to our Terms and join Shapermint Club+: box (up to 4 items, max $100+tax) ships in 15, then every 90 days, until cancelled. Free returns within 7 days. Keep past 14, we charge you. Cancel in My Account.
            </p>
          </div>
        </div>
      </div>

      <HowItWorksSection compact={compact} ink={ink} accent={accent} />

      <div style={{ marginTop: compact ? 24 : 32 }}>
        <div style={{ fontFamily: "var(--qz-body-font)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(31,26,23,0.55)", marginBottom: 12 }}>
          Why this is your match
        </div>
        <p style={{ margin: 0, fontFamily: "var(--qz-headline-font)", fontSize: compact ? 19 : 22, lineHeight: 1.4, color: ink, textWrap: "pretty" }}>{why}</p>
      </div>

      <div style={{ marginTop: compact ? 24 : 32 }}>
        <div style={{ fontFamily: "var(--qz-body-font)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(31,26,23,0.55)", marginBottom: compact ? 16 : 20 }}>
          Why you&apos;ll love it!
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "repeat(2, 1fr)", gap: compact ? 10 : 14 }}>
        <BenefitCard accent={accent} ink={ink} glyph="underwire" title="Supportive as an underwire — without the wire" body="Engineered support that lifts and holds, with none of the dig." />
        <BenefitCard accent={accent} ink={ink} glyph="cups" title="Modern foam cups for a perfect fit" body="Lightweight cups shape to you — never the other way around." />
        <BenefitCard accent={accent} ink={ink} glyph="allday" title="Lifted, shaped & contoured all day" body="Holds its lift from morning to night, no readjusting." />
        <BenefitCard accent={accent} ink={ink} glyph="straps" title="Adjustable straps with no-slip comfort" body="Stay in place across your shoulders — no slipping, no dig." />
        <BenefitCard accent={accent} ink={ink} glyph="band" title="Extra band coverage for a smooth shape" body="Wide elastic band that smooths your sides and stays put." />
        <BenefitCard accent={accent} ink={ink} glyph="closure" title="Adjustable hook-and-eye closure" body="Three sets of hooks so the band fits as your body changes." />
        <BenefitCard accent={accent} ink={ink} glyph="convertible" title="Convertible straps" body="Wear them straight or crossed — versatile under every neckline." />
      </div>

      <div style={{ marginTop: compact ? 24 : 36 }}>
        <div style={{ fontFamily: "var(--qz-body-font)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(31,26,23,0.55)", marginBottom: compact ? 14 : 18 }}>
          Reviews
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "1fr 1fr", gap: compact ? 14 : 20 }}>
        <ReviewQuote ink={ink} accent={accent} title="Lifts more than I expected" quote="I honestly didn't expect a wireless bra to lift this much. It gives me a nice shape under t-shirts without feeling tight." name="Linda M." age={52} shape="Teardrop" />
        <ReviewQuote ink={ink} accent={accent} title="No more gaps or digging" quote="Finally, no cup gaps or straps digging in. I can wear it all day without constantly adjusting it." name="Dawn K." age={48} shape="Asymmetric" />
      </div>

    </div>
  );
}

const HOW_IT_WORKS_STEPS = [
  { id: "ship", icon: "truck", text: "We ship your box with 4 products. You pay $0, nothing." },
  { id: "try", icon: "box", text: "Once your box arrives at your home, take 7 days to try everything." },
  { id: "keep", icon: "bell", text: "Keep what you love. Return the rest for free with the prepaid label." },
  { id: "repeat", icon: "refresh", text: "Your box arrives every 90 days with 4 new products. Cancel anytime in your account." },
] as const;

function HowItWorksIcon({ kind, color }: { kind: string; color: string }) {
  const props = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "truck") {
    return (
      <svg {...props}>
        <path d="M1 8h13v9H1z" />
        <path d="M14 11h4l3 3v3h-7v-6z" />
        <circle cx="5.5" cy="18.5" r="1.5" fill={color} stroke="none" />
        <circle cx="17.5" cy="18.5" r="1.5" fill={color} stroke="none" />
        <path d="M1 12h13" />
      </svg>
    );
  }
  if (kind === "box") {
    return (
      <svg {...props}>
        <path d="M3 8.5 12 3l9 5.5v9L12 23 3 17.5v-9z" />
        <path d="M12 12v11" />
        <path d="M3 8.5 12 12l9-3.5" />
        <path d="M8 5.8 16 10.5" />
      </svg>
    );
  }
  if (kind === "bell") {
    return (
      <svg {...props}>
        <path d="M6 10a6 6 0 0 1 12 0c0 5 2 6.5 2 6.5H4S6 15 6 10z" />
        <path d="M10 19.5a2 2 0 0 0 4 0" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M21 12a9 9 0 1 1-2.6-6.3" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

function HowItWorksSection({
  compact,
  ink,
  accent,
}: {
  compact: boolean;
  ink: string;
  accent: string;
}) {
  const mutedIcon = "rgba(41,41,41,0.38)";
  const [showImage, setShowImage] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => setShowImage(e.matches);
    setShowImage(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      style={{
        marginTop: compact ? 32 : 48,
        display: showImage ? "grid" : "flex",
        flexDirection: showImage ? undefined : "column",
        gridTemplateColumns: showImage ? "1fr 1fr" : undefined,
        gap: showImage ? 40 : compact ? 24 : 32,
        alignItems: "stretch",
      }}
    >
      {showImage && (
        <div
          style={{
            position: "relative",
            borderRadius: TK_RADIUS,
            overflow: "hidden",
            border: "1px solid rgba(31,26,23,0.08)",
            background: "#F5F0E8",
            minHeight: 0,
            height: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG("assets/how-it-works-box.png")}
            alt="Opening a Shapermint box at home"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--qz-headline-font)",
            fontWeight: 700,
            fontSize: compact ? 26 : 34,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: ink,
            textWrap: "balance",
          }}
        >
          How Try Before You Buy works
        </h2>
        <p
          style={{
            margin: compact ? "12px 0 0" : "14px 0 0",
            fontSize: compact ? 15 : 16,
            lineHeight: 1.55,
            color: ink,
            textWrap: "pretty",
          }}
        >
          The days of going to stores to find the right size are over. Thousands of women now enjoy trying styles at home – and you can try it for FREE.
        </p>

        <div
          style={{
            marginTop: compact ? 22 : 28,
            fontFamily: "var(--qz-body-font)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(31,26,23,0.55)",
          }}
        >
          How it works:
        </div>

        <ol style={{ listStyle: "none", margin: "16px 0 0", padding: 0 }}>
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const isFirst = index === 0;
            const iconColor = isFirst ? accent : mutedIcon;
            const ring = isFirst ? accent : "rgba(41,41,41,0.18)";
            const isLast = index === HOW_IT_WORKS_STEPS.length - 1;
            return (
              <li
                key={step.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",
                  gap: 14,
                  alignItems: "start",
                  position: "relative",
                  paddingBottom: isLast ? 0 : 18,
                }}
              >
                {!isLast && (
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 19,
                      top: 40,
                      bottom: 0,
                      width: 1,
                      background: "rgba(41,41,41,0.14)",
                    }}
                  />
                )}
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 9999,
                    border: `1.5px solid ${ring}`,
                    display: "grid",
                    placeItems: "center",
                    background: "#fff",
                    position: "relative",
                    zIndex: 1,
                    flex: "0 0 auto",
                  }}
                >
                  <HowItWorksIcon kind={step.icon} color={iconColor} />
                </span>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: compact ? 14 : 15,
                    lineHeight: 1.45,
                    color: ink,
                    fontWeight: 700,
                    textWrap: "pretty",
                  }}
                >
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function TryBeforeYouBuyBanner({ accent, surface, ink, compact }) {
  return (
    <div style={{
      marginTop: compact ? 22 : 28, position: "relative",
      padding: compact ? "18px 18px 18px 64px" : "22px 26px 22px 84px", borderRadius: TK_RADIUS,
      background: surface || TK_COLORS.surface, color: ink, overflow: "hidden",
      animation: "qzunwrap .5s cubic-bezier(.2,.7,.3,1) both",
    }}>
      <div style={{
        position: "absolute", left: compact ? 18 : 24, top: "50%", transform: "translateY(-50%)",
        width: compact ? 36 : 48, height: compact ? 36 : 48, borderRadius: TK_RADIUS,
        background: "#fff", display: "grid", placeItems: "center", color: accent,
      }}>
        <GiftSvg size={compact ? 18 : 24} />
      </div>
      <span style={{
        position: "absolute", right: compact ? 14 : 22, top: compact ? 14 : 18, width: 8, height: 8, borderRadius: 9999,
        background: accent, boxShadow: `0 0 0 0 ${accent}`, animation: "qzpulse 1.8s ease-out infinite",
      }} />
      <div style={{ fontFamily: "var(--qz-body-font)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accent, marginBottom: 4 }}>
        Try before you buy
      </div>
      <div style={{ fontFamily: "var(--qz-headline-font)", fontWeight: 700, fontSize: compact ? 18 : 24, lineHeight: 1.2, letterSpacing: "-0.01em", color: ink }}>
        Try this bra + 2 best-sellers + a free gift{" "}
        <span style={{ color: accent }}>at home for $0</span>
      </div>
      <div style={{ marginTop: 8, fontSize: compact ? 13 : 14.5, color: "rgba(31,26,23,0.75)", fontWeight: 500, lineHeight: 1.45 }}>
        This bra costs you <strong style={{ color: ink, fontWeight: 700 }}>$0 to try</strong>.
        {" "}Keep it and get an extra <strong style={{ color: accent, fontWeight: 700 }}>30% off</strong>.
      </div>
    </div>
  );
}

function GiftSvg({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="18" height="12" rx="1.5" />
      <path d="M3 13 H 21" />
      <path d="M12 9 V 21" />
      <path d="M8 6 C 8 4, 12 4, 12 9 C 12 4, 16 4, 16 6 C 16 8, 12 9, 12 9 C 12 9, 8 8, 8 6 Z" />
    </svg>
  );
}

function ProductImage({ src, alt, label, fit = "cover" }) {
  const [stack, setStack] = React.useState(() => [{ src, key: 0, ready: true }]);
  const keyRef = React.useRef(0);

  React.useEffect(() => {
    if (stack[stack.length - 1].src === src) return;
    const img = new Image();
    img.src = src;
    let cancelled = false;
    const onReady = () => {
      if (cancelled) return;
      keyRef.current += 1;
      setStack((prev) => [...prev, { src, key: keyRef.current, ready: true }].slice(-2));
      setTimeout(() => {
        if (cancelled) return;
        setStack((prev) => (prev.length > 1 ? prev.slice(-1) : prev));
      }, 320);
    };
    if (img.complete) onReady();
    else { img.onload = onReady; img.onerror = onReady; }
    return () => { cancelled = true; };
  }, [src]);

  return (
    <div style={{
      position: "relative", aspectRatio: "3 / 4",
      background: fit === "contain" ? "#ffffff" : "#F5F0E8",
      borderRadius: TK_RADIUS, overflow: "hidden", border: "1px solid rgba(31,26,23,0.08)",
    }}>
      {stack.map((layer, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={layer.key} src={layer.src} alt={alt} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: fit,
          display: "block", opacity: i === stack.length - 1 ? 1 : 0, transition: "opacity .28s ease-out",
        }} />
      ))}
      <div style={{
        position: "absolute", bottom: 8, left: 8, padding: "4px 10px", borderRadius: TK_RADIUS,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
        fontFamily: "var(--qz-body-font)", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(31,26,23,0.7)",
      }}>{label}</div>
    </div>
  );
}

// Truekind DS star rating (reuses TruekindStars component)
function PdpRating({ value = 3.5, reviews = "10926" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <TruekindStars rating={value} size={20} color={TK_COLORS.star} />
      <span style={{ fontFamily: TK_BTN_FONT, fontWeight: 400, fontSize: 16, lineHeight: "24px", color: TK_COLORS.ink }}>
        {reviews} reviews
      </span>
    </div>
  );
}

function ProductHeader({ compact }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: compact ? 12 : 16 }}>
      <p style={{
        margin: 0, fontFamily: TK_BTN_FONT, fontWeight: 500,
        fontSize: compact ? 24 : 30, lineHeight: compact ? "32px" : "38px", color: TK_COLORS.ink,
      }}>
        Truekind® Daily Comfort Wireless Shaper Bra
      </p>
      <PdpRating value={3.5} reviews="10926" />
    </div>
  );
}

function ColorSelector({ colors, value, onChange, ink, accent, compact, action }) {
  const current = colors.find((c) => c.id === value) || colors[0];
  return (
    <div style={{
      display: "flex", flexDirection: compact ? "column" : "row",
      alignItems: compact ? "stretch" : "center", gap: compact ? 14 : 20,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Label: "Color: " regular + name demi bold — Figma 415:24322 */}
        <div style={{ marginBottom: compact ? 12 : 14, fontFamily: TK_BTN_FONT, fontSize: 14, lineHeight: "22px", color: "#292929" }}>
          <span style={{ fontWeight: 400 }}>Color: </span>
          <span style={{ fontWeight: 600 }}>{current.name}</span>
        </div>
        {/* Swatches: 32px container, 24px inner circle, 8px gap — Figma 415:24323 */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {colors.map((c) => {
          const isSelected = c.id === value;
          return (
            <button key={c.id} onClick={() => onChange(c.id)} aria-label={c.name} title={c.name} style={{
              position: "relative", width: 32, height: 32, borderRadius: TK_RADIUS,
              border: isSelected ? `2px solid ${TK_COLORS.terra}` : "2px solid transparent",
              padding: 0, cursor: "pointer", background: "transparent",
              display: "grid", placeItems: "center",
              transition: "border-color .15s", boxSizing: "border-box",
            }}>
              <span style={{
                width: 24, height: 24, borderRadius: TK_RADIUS,
                background: c.hex,
                border: c.id === "white" ? "1px solid rgba(31,26,23,0.18)" : "none",
                boxShadow: "inset 0 -2px 6px rgba(0,0,0,0.08)",
                display: "block",
              }} />
            </button>
          );
          })}
        </div>
      </div>
      {action}
    </div>
  );
}

function RestartLink({ onClick, ink }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8, background: "transparent",
      border: "1px solid rgba(31,26,23,0.25)", color: ink, cursor: "pointer",
      fontFamily: "var(--qz-body-font)", fontSize: 13, fontWeight: TK_QUIZ_BTN_WEIGHT,
      padding: "10px 18px", borderRadius: TK_RADIUS, letterSpacing: "0.02em",
      transition: "background .15s, border-color .15s",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(31,26,23,0.6)"; e.currentTarget.style.background = "rgba(31,26,23,0.04)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(31,26,23,0.25)"; e.currentTarget.style.background = "transparent"; }}
    >
      <span style={{ fontSize: 15 }}>↺</span> Start over
    </button>
  );
}

function buildWhy(shapeLabel, problems, wants) {
  const shapeFix = {
    round: "cradle and round your shape evenly, so nothing flattens or shifts",
    teardrop: "lift the fullness sitting low and rebalance volume to the top",
    slender: "gently project and round you out without adding bulk",
    "side-set": "pull your shape inward to close the gap and centre your fullness",
    "east-west": "rotate your fullness forward to face you out — not the sides",
    asymmetric: "flex on both sides so each cup conforms to its own shape",
    bell: "support the fullness at the bottom while smoothing the top",
    relaxed: "lift and reposition your fullness without underwire pressure",
  };

  const probMap = {
    "gaping cups": "foam-formed cups that adapt to your fullness so they never gape",
    "lack of support": "a wide elastic band + reinforced power-mesh wings that hold you up all day — wireless",
    spillage: "higher cup coverage with a flexible top edge that contains every shape",
    "digging straps": "cushioned wide straps that distribute weight across your shoulders",
    "band riding up": "a longline elastic band that anchors firmly without rolling",
    "side bulge": "side-smoothing panels that pull tissue forward instead of out",
    "bra lines": "seamless bonded edges that disappear under fitted tops",
    "uncomfortable wires": "a wire-free build with structured foam doing the lifting instead",
  };

  const wantMap = {
    lift: "engineered lift from sculpted foam cups",
    support: "all-day support without a single wire",
    comfort: "buttery-soft jersey you forget you're wearing",
    smoothing: "a sleek silhouette under every layer",
    "seamless under clothes": "bonded edges that vanish under t-shirts and dresses",
    "no digging": "zero pressure points — wide bands, no wires, soft straps",
    "everyday versatility": "one bra that works under sweats, blouses, and slip dresses",
  };

  const fixedShape = shapeFix[shapeLabel] || "work with your natural shape";
  const probsCopy = problems.map((p) => probMap[p.toLowerCase()]).filter(Boolean);
  const wantsCopy = wants.map((w) => wantMap[w.toLowerCase()]).filter(Boolean);

  let s = `For a ${shapeLabel} shape, the Supportive Comfort Shaping Bra is built to ${fixedShape}. `;
  if (probsCopy.length) s += `It solves your biggest fit issue${probsCopy.length > 1 ? "s" : ""} with ${humanList(probsCopy)}. `;
  if (wantsCopy.length) s += `And it delivers exactly what you asked for: ${humanList(wantsCopy)}.`;
  return s.trim();
}

function humanList(arr) {
  if (arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
}

function BenefitCard({ ink, accent, title, body, glyph }) {
  return (
    <div style={{ padding: "20px 18px", background: TK_COLORS.paper, border: `1px solid ${TK_COLORS.border}`, borderRadius: TK_RADIUS }}>
      <div style={{ width: 56, height: 56, borderRadius: TK_RADIUS, background: TK_COLORS.terraSoft, color: TK_COLORS.terra, display: "grid", placeItems: "center", marginBottom: 14 }}>
        <BenefitGlyph kind={glyph} accent={accent} />
      </div>
      <div style={{ fontFamily: "var(--qz-headline-font)", fontWeight: 700, fontSize: 17, color: ink, marginBottom: 6, lineHeight: 1.25, letterSpacing: "-0.005em" }}>{title}</div>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "rgba(31,26,23,0.65)" }}>{body}</p>
    </div>
  );
}

function BenefitGlyph({ kind, accent }) {
  const stroke = "currentColor";
  const fill = TK_COLORS.surface;
  const lineProps = { fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const wrap = (children) => <svg width="40" height="40" viewBox="0 0 40 40">{children}</svg>;
  const bra = (
    <g {...lineProps}>
      <path d="M 8 7 L 11 14" />
      <path d="M 32 7 L 29 14" />
      <path d="M 11 14 Q 13 22, 20 22" />
      <path d="M 29 14 Q 27 22, 20 22" />
      <path d="M 20 22 V 19" />
      <path d="M 11 22 L 9 26 H 31 L 29 22" />
    </g>
  );

  if (kind === "underwire") return wrap(<g>
    {bra}
    <circle cx="30" cy="30" r="6" fill="#fff" stroke={stroke} strokeWidth="1.4" />
    <path d="M 27 30 L 29.4 32 L 33 28" fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </g>);

  if (kind === "cups") return wrap(<g>
    <path d="M 11 14 Q 13 22, 20 22 Q 20 19, 20 19 V 14 Q 16 12, 11 14 Z" fill={fill} stroke="none" />
    <path d="M 29 14 Q 27 22, 20 22 Q 20 19, 20 19 V 14 Q 24 12, 29 14 Z" fill={fill} stroke="none" />
    {bra}
  </g>);

  if (kind === "allday") return wrap(<g {...lineProps}>
    <path d="M 8 18 Q 8 8, 18 8 Q 28 8, 26 22 L 12 24 Z" />
    <path d="M 10 22 L 22 12" strokeWidth="1.1" />
    <path d="M 4 30 Q 8 27, 12 30 T 20 30 T 28 30 T 36 30" stroke={fill} strokeWidth="2.4" fill="none" />
    <path d="M 4 33 Q 8 30, 12 33 T 20 33 T 28 33 T 36 33" stroke={fill} strokeWidth="1" strokeDasharray="1.5 1.5" fill="none" opacity="0.7" />
  </g>);

  if (kind === "straps") return wrap(<g>
    <path d="M 8 7 L 11 14" stroke={fill} strokeWidth="2.8" strokeLinecap="round" fill="none" />
    <path d="M 32 7 L 29 14" stroke={fill} strokeWidth="2.8" strokeLinecap="round" fill="none" />
    {bra}
    <rect x="7.5" y="10" width="4" height="2.5" rx="0.6" fill="#fff" stroke={stroke} strokeWidth="1" />
  </g>);

  if (kind === "band") return wrap(<g>
    {bra}
    <path d="M 11 22 L 9 26 H 31 L 29 22 Z" fill={fill} stroke={stroke} strokeWidth="1.4" />
  </g>);

  if (kind === "closure") return wrap(<g>
    {bra}
    <circle cx="17" cy="24" r="0.9" fill={accent} />
    <circle cx="20" cy="24" r="0.9" fill={accent} />
    <circle cx="23" cy="24" r="0.9" fill={accent} />
  </g>);

  if (kind === "convertible") return wrap(<g>
    <path d="M 9 7 L 24 17" stroke={fill} strokeWidth="2.6" strokeLinecap="round" fill="none" />
    <path d="M 31 7 L 16 17" stroke={fill} strokeWidth="2.6" strokeLinecap="round" fill="none" />
    <g {...lineProps}>
      <path d="M 11 16 Q 13 24, 20 24" />
      <path d="M 29 16 Q 27 24, 20 24" />
      <path d="M 20 24 V 21" />
      <path d="M 11 24 L 9 28 H 31 L 29 24" />
    </g>
  </g>);

  return wrap(bra);
}

function ReviewQuote({ ink, accent, title, quote, name, age, shape }) {
  return (
    <div style={{
      height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 9,
      padding: 20, background: "#FAFAFA", border: "1px solid rgba(41,41,41,0.06)", borderRadius: TK_RADIUS,
    }}>
      <div style={{ fontFamily: TK_BTN_FONT, fontWeight: 700, fontSize: 14, lineHeight: "22px", color: "#292929" }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ display: "inline-flex", gap: 1 }} aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <TruekindStarIcon key={i} size={12} color={TK_COLORS.star} />
          ))}
        </span>
        <span style={{ fontFamily: TK_BTN_FONT, fontWeight: 400, fontSize: 12, lineHeight: "16px", color: "#292929" }}>
          {name} · {age} · {shape}
        </span>
      </div>
      <p style={{ margin: 0, fontFamily: TK_BTN_FONT, fontWeight: 400, fontSize: 12, lineHeight: "16px", color: "#292929", textWrap: "pretty" }}>{quote}</p>
    </div>
  );
}

// ─── Screen 8 · Gift unlock + checkout ──────────────────────────────────────────
function ScreenGift({ compact, ink, accent, paper, answers, onEdit, onRestart }) {
  const [email, setEmail] = React.useState("");
  const [openFaq, setOpenFaq] = React.useState(0);
  const [time, setTime] = React.useState(23 * 3600 + 59 * 60 + 47);

  React.useEffect(() => {
    const t = setInterval(() => setTime((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = String(Math.floor(time / 3600)).padStart(2, "0");
  const mm = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  const recSize = answers.size === "not-sure" ? "L" : (typeof answers.size === "object" ? answers.size.size : answers.size) || "M";

  return (
    <div style={{ padding: "0 0 96px" }}>
      <div style={{
        marginTop: compact ? 6 : 12, padding: compact ? "32px 24px" : "48px 36px",
        background: TK_COLORS.sandSoft, color: ink, borderRadius: TK_RADIUS, textAlign: "center",
        position: "relative", overflow: "hidden", animation: "qzunwrap .6s ease-out",
      }}>
        <div style={{ fontFamily: "var(--qz-body-font)", fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.7, marginBottom: 14 }}>
          ✦ Your gift, unlocked ✦
        </div>
        <div style={{ fontFamily: "var(--qz-headline-font)", fontStyle: "italic", fontSize: compact ? 17 : 20, opacity: 0.85, marginBottom: 6, fontWeight: 500 }}>
          A welcome gift from us:
        </div>
        <div style={{ fontFamily: "var(--qz-headline-font)", fontWeight: 700, fontSize: compact ? 48 : 76, lineHeight: 1, letterSpacing: "-0.02em", marginTop: 6, color: accent }}>
          40% OFF
        </div>
        <div style={{ marginTop: 12, fontSize: compact ? 14 : 16, opacity: 0.85 }}>
          Supportive Comfort Shaping Bra · in your size and shape
        </div>
      </div>

      <div style={{ marginTop: compact ? 28 : 36 }}>
        <h2 style={{ fontFamily: "var(--qz-headline-font)", fontWeight: 700, fontSize: compact ? 24 : 32, lineHeight: 1.15, letterSpacing: "-0.01em", margin: 0, color: ink }}>
          Save my match + claim 40% OFF.
        </h2>
        <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 18, display: "flex", gap: 10, flexDirection: compact ? "column" : "row" }}>
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{
            flex: 1, padding: "17px 20px", borderRadius: TK_RADIUS, border: "1px solid rgba(31,26,23,0.2)",
            background: TK_COLORS.sandSoft, fontFamily: "inherit", fontSize: 15, color: ink, outline: "none",
          }} />
          <PillCTA compact={compact} ink={ink} full={compact} onClick={() => {}}>
            Send it
          </PillCTA>
        </form>
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(31,26,23,0.6)" }}>
          <ClockSvg color={accent} />
          Your gift expires in&nbsp;
          <strong style={{ color: accent, fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>{hh}:{mm}:{ss}</strong>
        </div>
      </div>

      <div style={{ marginTop: compact ? 32 : 48 }}>
        <h3 style={{ fontFamily: "var(--qz-headline-font)", fontWeight: 700, fontSize: compact ? 22 : 28, color: ink, margin: "0 0 14px" }}>
          Questions, answered.
        </h3>
        <div style={{ background: TK_COLORS.sandSoft, border: "1px solid rgba(31,26,23,0.08)", borderRadius: TK_RADIUS, overflow: "hidden" }}>
          {FAQ.map((item, i) => (
            <FaqItem key={i} item={item} open={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} accent={accent} ink={ink} last={i === FAQ.length - 1} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: compact ? 20 : 28, textAlign: "center" }}>
        <RestartLink onClick={onRestart} ink={ink} />
      </div>

      <div style={{
        marginTop: compact ? 24 : 32, display: "grid",
        gridTemplateColumns: compact ? "1fr 1fr" : "repeat(3, 1fr)", gap: 10,
        padding: compact ? "14px 12px" : "20px 22px", border: "1px solid rgba(31,26,23,0.1)",
        borderRadius: TK_RADIUS, fontSize: 12, color: "rgba(31,26,23,0.7)",
      }}>
        <TrustBadge ink={ink}>60-day perfect fit guarantee</TrustBadge>
        <TrustBadge ink={ink}>Free shipping on every order</TrustBadge>
        {!compact && <TrustBadge ink={ink}>Free easy returns</TrustBadge>}
      </div>

      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, background: TK_COLORS.sandSoft,
        borderTop: "1px solid rgba(31,26,23,0.12)", padding: compact ? "10px 14px" : "12px 22px",
        display: "flex", alignItems: "center", gap: 12, boxShadow: "0 -8px 20px rgba(0,0,0,0.04)",
      }}>
        <div style={{
          width: compact ? 46 : 56, height: compact ? 46 : 56, borderRadius: TK_RADIUS,
          background: "repeating-linear-gradient(45deg, rgba(92,31,46,0.07) 0 6px, rgba(92,31,46,0.12) 6px 12px)",
          border: "1px solid rgba(31,26,23,0.1)", flex: "0 0 auto",
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--qz-headline-font)", fontSize: compact ? 14 : 16, color: ink, lineHeight: 1.2 }}>Supportive Comfort Shaping Bra</div>
          <div style={{ fontSize: 11, color: "rgba(31,26,23,0.6)", marginTop: 2, letterSpacing: "0.02em" }}>
            Size {recSize} · <s style={{ opacity: 0.6 }}>$48</s>{" "}
            <strong style={{ color: accent, fontWeight: 700 }}>$29</strong>
          </div>
        </div>
        <PillCTA compact={true} ink={ink} onClick={() => {}}>
          Add to cart
        </PillCTA>
      </div>
    </div>
  );
}

const FAQ = [
  { q: "How is my match chosen?", a: "Your shape, your pain points, your goals, and your size all feed into a single recommendation. No guessing — just the one bra built for that combination." },
  { q: "What if it doesn't fit?", a: "Send it back. The 60-day Perfect Fit Guarantee covers free returns, free size exchanges, and a full refund. Worn, washed, tags off — all fine." },
  { q: "Will the 40% OFF apply automatically?", a: "Yes. Your gift is held to the email on this page for the duration of the countdown. The discount applies at checkout — no code needed." },
];

function FaqItem({ item, open, onClick, accent, ink, last }) {
  return (
    <div style={{ borderBottom: last ? "none" : "1px solid rgba(31,26,23,0.08)" }}>
      <button onClick={onClick} style={{
        width: "100%", textAlign: "left", padding: "16px 18px", background: "transparent", border: "none",
        display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: ink, fontFamily: "inherit",
      }}>
        <span style={{ fontSize: 14, fontWeight: TK_QUIZ_BTN_WEIGHT }}>{item.q}</span>
        <span style={{ color: accent, fontSize: 20, fontWeight: 300, lineHeight: 1, transform: open ? "rotate(45deg)" : "none", transition: "transform .2s" }}>+</span>
      </button>
      {open && (
        <div style={{ padding: "0 18px 16px", fontSize: 13.5, lineHeight: 1.5, color: "rgba(31,26,23,0.7)" }}>{item.a}</div>
      )}
    </div>
  );
}

function TrustBadge({ ink, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
      <span style={{ width: 16, height: 16, borderRadius: TK_RADIUS, background: "rgba(92,31,46,0.1)", display: "grid", placeItems: "center", color: "var(--qz-accent)", flex: "0 0 auto" }}>
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 5 L4 7 L8 3" />
        </svg>
      </span>
      <span style={{ color: ink, fontWeight: 500 }}>{children}</span>
    </div>
  );
}

function ClockSvg({ color }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="4.5" />
      <path d="M6 3.5 V 6 L 7.6 7" />
    </svg>
  );
}

// ─── Quiz controller ───────────────────────────────────────────────────────────
function QuizApp({ compact, tokens, onBgChange }) {
  const [screen, setScreen] = React.useState(0);
  const [answers, setAnswers] = React.useState({
    shape: null,
    problems: [],
    wants: [],
    size: null,
  });

  const go = (n) => setScreen(Math.max(0, Math.min(7, n)));
  const setAns = (key, value) => setAnswers((a) => ({ ...a, [key]: value }));

  const screenMap = {
    0: <ScreenLanding compact={compact} {...tokens} logoSize={tokens.logoSize} onStart={() => go(1)} />,
    1: <ScreenShape compact={compact} {...tokens} answer={answers.shape} onSelect={(v) => setAns("shape", v)} onAdvance={() => go(2)} onBack={() => go(0)} />,
    2: <QuestionPills compact={compact} {...tokens} step={2} title="What's your biggest" titleEm="issue with your current bra?" sub="Pick as many as you want." options={PROBLEMS} answer={answers.problems} multi onSelect={(v) => setAns("problems", v)} onAdvance={() => go(3)} onBack={() => go(1)} />,
    3: <QuestionPills compact={compact} {...tokens} step={3} title="What do you want" titleEm="most from your bra?" sub="Pick as many as you want." options={WANTS} answer={answers.wants} multi onSelect={(v) => setAns("wants", v)} onAdvance={() => go(4)} onBack={() => go(2)} />,
    4: <ScreenSize compact={compact} {...tokens} answer={answers.size} onSelect={(v) => setAns("size", v)} onAdvance={() => go(5)} onBack={() => go(3)} />,
    5: <ScreenLoader compact={compact} {...tokens} answers={answers} onDone={() => go(7)} />,
    7: <ScreenReveal compact={compact} {...tokens} answers={answers} onClaim={() => {}} onRestart={() => go(0)} />,
  };

  // Reveal ("Your match") screen uses a white background; the rest use paper.
  const screenBg = screen === 7 ? "#FFFFFF" : tokens.paper;
  React.useEffect(() => { onBgChange?.(screenBg); }, [screenBg, onBgChange]);

  return (
    <QuizFrame compact={compact} {...tokens} paper={screenBg}>
      <div key={screen} className="qz-slide" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {screenMap[screen]}
      </div>
    </QuizFrame>
  );
}

const QUIZ_CSS = `
.ebra-quiz-root { overflow-x: hidden; }
@keyframes qzspin { to { transform: rotate(360deg); } }
@keyframes qzunwrap { from { transform: scale(0.94); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes qzfadeIn { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: translateX(0); } }
.qz-slide { animation: qzfadeIn .25s ease-out; }
@keyframes qzpulse { 0% { box-shadow: 0 0 0 0 currentColor; opacity: 0.7; } 70% { box-shadow: 0 0 0 12px transparent; opacity: 0; } 100% { box-shadow: 0 0 0 0 transparent; opacity: 0; } }
@media (hover: hover) { .qz-shape-cell:hover .qz-tooltip { opacity: 1 !important; } .qz-shape-cell:hover { z-index: 10; } }
`;

/**
 * Top-level entry: picks compact (mobile) vs full (desktop) by viewport,
 * applies brand tokens, and renders the quiz directly into the page DOM.
 */
export const EbraQuizV2 = () => {
  const tokens = {
    accent: DEFAULTS.accent,
    paper: DEFAULTS.paper,
    ink: DEFAULTS.ink,
    pinkAccent: DEFAULTS.pinkAccent,
    surface: DEFAULTS.surface,
    headlineFont: headlineFontStack(),
    bodyFont: bodyFontStack(),
    logoSize: DEFAULTS.logoSize,
  };

  const [compact, setCompact] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  const [rootBg, setRootBg] = React.useState(tokens.paper);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setCompact(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      className="ebra-quiz-root"
      style={{
        minHeight: "100vh", background: rootBg, transition: "background .2s",
        display: "flex", flexDirection: "column", alignItems: "center",
        fontFamily: TK_FONT,
        ["--font-body" as string]: TK_FONT,
        ["--font-display" as string]: TK_FONT,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: QUIZ_CSS }} />
      <div
        style={{
          width: "100%", maxWidth: compact ? "100%" : 1100,
          flex: 1, display: "flex", flexDirection: "column",
        }}
      >
        <QuizApp compact={compact} tokens={tokens} onBgChange={setRootBg} />
      </div>
    </div>
  );
};

export default EbraQuizV2;
