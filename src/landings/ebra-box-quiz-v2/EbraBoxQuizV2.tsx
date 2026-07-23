/* eslint-disable */
// @ts-nocheck
/**
 * ShaperBox (Club+) preference quiz — v2.
 *
 * Distinct from the bra-fit quiz: captures category preferences + sizes,
 * then reveals the try-before-you-buy Club+ offer with a personalized preview.
 *
 * Flow: Landing → Categories → Fit priorities → Sizes → Loader → Offer
 */
import React from "react";
import {
  BRA_BANDS,
  BRA_CUPS,
  CATEGORY_OPTIONS,
  CLOTHING_SIZES,
  FIT_PRIORITY_OPTIONS,
  categoryLabel,
  emptyAnswers,
} from "./boxQuizData";
import {
  SHM_BTN,
  SHM_CHIP,
  SHM_COLORS,
  SHM_FONT,
  SHM_LOGO,
  SHM_RADIUS,
  SHM_SELECTED,
  SHM_WEIGHT,
} from "./shmBoxQuizTokens";

const TOTAL_STEPS = 3; // progress for Q screens only (categories, priorities, sizes)

function PrimaryButton({ children, onClick, disabled, full, compact }) {
  const bg = disabled ? SHM_BTN.disabledBg : SHM_BTN.primary;
  const fg = disabled ? SHM_BTN.disabledFg : SHM_BTN.primaryFg;
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: compact ? "14px 24px" : "16px 32px",
        borderRadius: SHM_RADIUS,
        border: "none",
        background: bg,
        color: fg,
        fontFamily: SHM_FONT,
        fontSize: compact ? 14 : 15,
        fontWeight: SHM_BTN.weight,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        width: full ? "100%" : "auto",
        transition: "background .15s, transform .12s",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = SHM_BTN.primaryHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        if (!disabled) e.currentTarget.style.background = SHM_BTN.primary;
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(1px)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "none";
      }}
    >
      {children}
    </button>
  );
}

function ProgressBar({ step, total = TOTAL_STEPS, onBack, compact }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: compact ? 28 : 36 }}>
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        style={{
          width: 28,
          height: 28,
          borderRadius: SHM_RADIUS,
          border: "none",
          background: "transparent",
          color: SHM_COLORS.ink,
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          padding: 0,
          opacity: 0.7,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M9 2 L4 7 L9 12" />
        </svg>
      </button>
      <div style={{ flex: 1, display: "flex", gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 9999,
              background: i < step ? SHM_COLORS.accentText : "rgba(31,26,23,0.12)",
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: SHM_FONT,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(31,26,23,0.55)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}

function OptionPill({ selected, onClick, children, compact }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: compact ? "13px 18px" : "15px 22px",
        borderRadius: SHM_RADIUS,
        background: selected ? SHM_SELECTED.bg : SHM_CHIP.bg,
        color: selected ? SHM_SELECTED.fg : SHM_CHIP.fg,
        border: selected ? `2px solid ${SHM_SELECTED.border}` : `1px solid ${SHM_CHIP.border}`,
        fontFamily: SHM_FONT,
        fontSize: compact ? 14 : 15,
        fontWeight: SHM_WEIGHT,
        letterSpacing: "0.005em",
        cursor: "pointer",
        textAlign: "left",
        transition: "background .15s, border-color .15s, transform .12s",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translateY(1px)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "none";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
      }}
    >
      {children}
    </button>
  );
}

function ScreenLanding({ compact, onStart }) {
  const logoSize = compact ? 88 : 110;
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
        padding: compact ? "8px 8px 32px" : "12px 0 48px",
        maxWidth: compact ? "100%" : 640,
        margin: "0 auto",
        minHeight: "100%",
      }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SHM_LOGO} alt="Shapermint" style={{ width: logoSize, height: "auto", display: "block" }} />
      </div>

      <div style={{ width: "100%" }}>
        <h1
          style={{
            fontFamily: SHM_FONT,
            fontWeight: 700,
            fontSize: compact ? 34 : 52,
            lineHeight: 1.08,
            letterSpacing: "-0.018em",
            margin: 0,
            color: SHM_COLORS.ink,
            textWrap: "balance",
          }}
        >
          Your next box,
          <br />
          <em style={{ fontStyle: "italic", color: SHM_COLORS.accentText }}>styled for you.</em>
        </h1>
        <p
          style={{
            margin: compact ? "22px 0 32px" : "28px 0 40px",
            fontSize: compact ? 16 : 18,
            color: SHM_COLORS.muted,
            maxWidth: "42ch",
            lineHeight: 1.5,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Tell us your sizes and favorite categories.
          <br />
          <strong style={{ color: SHM_COLORS.accentText, fontWeight: 700 }}>
            Then try before you buy — $0 today.
          </strong>
        </p>
        <PrimaryButton onClick={onStart} compact={compact}>
          Start the quiz
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 7 H 12 M 8 3 L 12 7 L 8 11" />
          </svg>
        </PrimaryButton>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: compact ? 12 : 18,
          flexWrap: "wrap",
          justifyContent: "center",
          fontSize: compact ? 13 : 14,
          color: SHM_COLORS.muted,
          fontWeight: 500,
        }}
      >
        <span>$0 to try</span>
        <span aria-hidden>·</span>
        <span>3 best-sellers + free gift</span>
        <span aria-hidden>·</span>
        <span>Keep what you love</span>
      </div>
    </div>
  );
}

function ScreenCategories({ compact, selected, onToggle, onBack, onAdvance }) {
  return (
    <React.Fragment>
      <ProgressBar step={1} onBack={onBack} compact={compact} />
      <h1
        style={{
          fontFamily: SHM_FONT,
          fontWeight: 700,
          fontSize: compact ? 28 : 40,
          lineHeight: 1.1,
          letterSpacing: "-0.015em",
          margin: 0,
          color: SHM_COLORS.ink,
          textWrap: "balance",
        }}
      >
        What do you want{" "}
        <em style={{ fontStyle: "italic", color: SHM_COLORS.accentText }}>in your box?</em>
      </h1>
      <p style={{ margin: compact ? "10px 0 22px" : "12px 0 28px", fontSize: compact ? 14 : 15, color: SHM_COLORS.muted }}>
        Pick as many as you like. We&apos;ll prioritize these categories.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {CATEGORY_OPTIONS.map((opt) => (
          <OptionPill key={opt.id} compact={compact} selected={selected.includes(opt.id)} onClick={() => onToggle(opt.id)}>
            {opt.label}
          </OptionPill>
        ))}
      </div>
      <div style={{ marginTop: compact ? 28 : 36 }}>
        <PrimaryButton onClick={onAdvance} compact={compact} full={compact} disabled={selected.length === 0}>
          Continue
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 7 H 12 M 8 3 L 12 7 L 8 11" />
          </svg>
        </PrimaryButton>
      </div>
    </React.Fragment>
  );
}

function ScreenPriorities({ compact, selected, onToggle, onBack, onAdvance }) {
  return (
    <React.Fragment>
      <ProgressBar step={2} onBack={onBack} compact={compact} />
      <h1
        style={{
          fontFamily: SHM_FONT,
          fontWeight: 700,
          fontSize: compact ? 28 : 40,
          lineHeight: 1.1,
          letterSpacing: "-0.015em",
          margin: 0,
          color: SHM_COLORS.ink,
          textWrap: "balance",
        }}
      >
        What matters most{" "}
        <em style={{ fontStyle: "italic", color: SHM_COLORS.accentText }}>in your fit?</em>
      </h1>
      <p style={{ margin: compact ? "10px 0 22px" : "12px 0 28px", fontSize: compact ? 14 : 15, color: SHM_COLORS.muted }}>
        Pick the priorities your stylist should lean on.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {FIT_PRIORITY_OPTIONS.map((opt) => (
          <OptionPill key={opt.id} compact={compact} selected={selected.includes(opt.id)} onClick={() => onToggle(opt.id)}>
            {opt.label}
          </OptionPill>
        ))}
      </div>
      <div style={{ marginTop: compact ? 28 : 36 }}>
        <PrimaryButton onClick={onAdvance} compact={compact} full={compact} disabled={selected.length === 0}>
          Continue
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 7 H 12 M 8 3 L 12 7 L 8 11" />
          </svg>
        </PrimaryButton>
      </div>
    </React.Fragment>
  );
}

function SizeChip({ label, selected, onClick, compact }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        minWidth: compact ? 52 : 60,
        height: compact ? 48 : 52,
        padding: "0 12px",
        borderRadius: SHM_RADIUS,
        border: selected ? `2px solid ${SHM_SELECTED.border}` : `1px solid ${SHM_CHIP.border}`,
        background: selected ? SHM_SELECTED.bg : SHM_CHIP.bg,
        color: selected ? SHM_SELECTED.fg : SHM_CHIP.fg,
        fontFamily: SHM_FONT,
        fontWeight: SHM_WEIGHT,
        fontSize: compact ? 14 : 15,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function ScreenSizes({ compact, answers, onChange, onBack, onAdvance }) {
  const canContinue = Boolean(answers.clothingSize);
  return (
    <React.Fragment>
      <ProgressBar step={3} onBack={onBack} compact={compact} />
      <h1
        style={{
          fontFamily: SHM_FONT,
          fontWeight: 700,
          fontSize: compact ? 28 : 40,
          lineHeight: 1.1,
          letterSpacing: "-0.015em",
          margin: 0,
          color: SHM_COLORS.ink,
          textWrap: "balance",
        }}
      >
        What sizes{" "}
        <em style={{ fontStyle: "italic", color: SHM_COLORS.accentText }}>should we ship?</em>
      </h1>
      <p style={{ margin: compact ? "10px 0 22px" : "12px 0 28px", fontSize: compact ? 14 : 15, color: SHM_COLORS.muted }}>
        Apparel size is required. Bra size is optional if you want bras in your box.
      </p>

      <div style={{ marginBottom: compact ? 22 : 28 }}>
        <div
          style={{
            fontFamily: SHM_FONT,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(31,26,23,0.55)",
            marginBottom: 12,
          }}
        >
          Apparel size
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CLOTHING_SIZES.map((size) => (
            <SizeChip
              key={size}
              label={size}
              compact={compact}
              selected={answers.clothingSize === size}
              onClick={() => onChange({ clothingSize: size })}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: compact ? 12 : 16 }}>
        <div
          style={{
            fontFamily: SHM_FONT,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(31,26,23,0.55)",
            marginBottom: 12,
          }}
        >
          Bra size <span style={{ fontWeight: 500, letterSpacing: "0.04em", textTransform: "none" }}>(optional)</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 13, color: SHM_COLORS.muted, marginBottom: 8 }}>Band</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {BRA_BANDS.map((band) => (
                <SizeChip
                  key={band}
                  label={band}
                  compact={compact}
                  selected={answers.braBand === band}
                  onClick={() => onChange({ braBand: answers.braBand === band ? null : band })}
                />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: SHM_COLORS.muted, marginBottom: 8 }}>Cup</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {BRA_CUPS.map((cup) => (
                <SizeChip
                  key={cup}
                  label={cup}
                  compact={compact}
                  selected={answers.braCup === cup}
                  onClick={() => onChange({ braCup: answers.braCup === cup ? null : cup })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: compact ? 28 : 36, display: "flex", flexDirection: compact ? "column" : "row", gap: 10 }}>
        <PrimaryButton onClick={onAdvance} compact={compact} full={compact} disabled={!canContinue}>
          See my box offer
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 7 H 12 M 8 3 L 12 7 L 8 11" />
          </svg>
        </PrimaryButton>
      </div>
    </React.Fragment>
  );
}

function ScreenLoader({ compact, answers, onDone }) {
  const [tick, setTick] = React.useState(0);
  const lines = [
    "Reading your category picks…",
    "Matching sizes to ShaperBox inventory…",
    "Building your first-box preview…",
  ];

  React.useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 700);
    const done = setTimeout(onDone, 2400);
    return () => {
      clearInterval(t);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: compact ? "40px 12px" : "64px 24px",
        gap: 20,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 9999,
          border: "2px solid rgba(31,26,23,0.08)",
          borderTopColor: SHM_COLORS.accentText,
          animation: "sbzspin 0.9s linear infinite",
        }}
      />
      <h2
        style={{
          margin: 0,
          fontFamily: SHM_FONT,
          fontWeight: 700,
          fontSize: compact ? 24 : 30,
          color: SHM_COLORS.ink,
        }}
      >
        Curating your ShaperBox…
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", maxWidth: 360 }}>
        {lines.map((line, i) => (
          <div key={line} style={{ display: "flex", gap: 8, alignItems: "center", opacity: tick > i ? 1 : 0.35, transition: "opacity .25s" }}>
            <span style={{ color: SHM_COLORS.accentText, fontWeight: 700 }}>{tick > i ? "✓" : "·"}</span>
            <span style={{ fontSize: 14, color: SHM_COLORS.ink }}>{line}</span>
          </div>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: SHM_COLORS.muted }}>
        Prefs locked: {answers.preferredCategories.map(categoryLabel).join(", ") || "—"}
      </p>
    </div>
  );
}

function ScreenOffer({ compact, answers, onClaim, onRestart }) {
  const sizeLine = [
    answers.clothingSize ? `Size ${answers.clothingSize}` : null,
    answers.braBand && answers.braCup ? `Bra ${answers.braBand}${answers.braCup}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const summaryRows = [
    { label: "3 curated best-sellers", value: "Try free", tone: "ink" },
    { label: "Free gift", value: "Included", tone: "mint" },
    { label: "Shipping & returns", value: "Free both ways", tone: "mint" },
    { label: "Due today", value: "$0.00", tone: "total" },
  ];

  return (
    <div style={{ padding: "0 0 32px", maxWidth: compact ? "100%" : 640, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: compact ? 22 : 28 }}>
        <div
          style={{
            width: compact ? 48 : 56,
            height: compact ? 48 : 56,
            borderRadius: "50%",
            background: SHM_COLORS.mint,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M5 12.5 L10 17.5 L19 7" />
          </svg>
        </div>
        <div
          style={{
            fontFamily: SHM_FONT,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: SHM_COLORS.mint,
            marginBottom: 10,
          }}
        >
          Your box is one click away
        </div>
        <h1
          style={{
            fontFamily: SHM_FONT,
            fontWeight: 700,
            fontSize: compact ? 30 : 40,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            margin: "0 0 12px",
            color: SHM_COLORS.ink,
          }}
        >
          You&apos;re all set!
        </h1>
        <p style={{ margin: 0, fontSize: compact ? 14 : 15, lineHeight: 1.5, color: SHM_COLORS.muted, textWrap: "pretty" }}>
          Based on your quiz, your stylist will curate <strong style={{ color: SHM_COLORS.ink }}>3 best-sellers</strong> for
          you — plus a <strong style={{ color: SHM_COLORS.ink }}>free gift</strong>
          {sizeLine ? <> ({sizeLine})</> : null}.
        </p>
      </div>

      {/* TBYB offer card */}
      <div
        style={{
          border: `1px solid ${SHM_COLORS.border}`,
          borderRadius: SHM_RADIUS,
          background: "#FFFFFF",
          padding: compact ? 18 : 22,
        }}
      >
        <div
          style={{
            fontFamily: SHM_FONT,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: SHM_COLORS.accentText,
            marginBottom: 10,
          }}
        >
          Try before you buy
        </div>
        <p
          style={{
            margin: "0 0 16px",
            fontFamily: SHM_FONT,
            fontSize: compact ? 18 : 20,
            lineHeight: 1.35,
            color: SHM_COLORS.ink,
            fontWeight: 600,
            textWrap: "pretty",
          }}
        >
          Try 3 best-sellers <em style={{ fontStyle: "italic", color: SHM_COLORS.accentText }}>for free</em> — keep what
          you love for an extra <span style={{ color: SHM_COLORS.accentText }}>30% off</span> site prices.
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["You pay $0 to try.", "Your box arrives with 3 best-sellers curated for your sizes and categories."],
            ["Take 7 days to decide.", "Keep what you love, return the rest free with the prepaid label."],
            ["Extra 30% OFF site prices", "on every piece you keep."],
            ["Plus a FREE gift, yours forever.", "Even if you return all 3 best-sellers."],
            ["Ships every 90 days.", "Cancel or skip anytime — your prefs stay on file for the next box."],
          ].map(([title, body]) => (
            <li key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span
                style={{
                  flex: "0 0 auto",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: SHM_COLORS.terraSoft,
                  color: SHM_COLORS.accentText,
                  display: "grid",
                  placeItems: "center",
                  marginTop: 1,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2.5 6 L5 8.5 L9.5 3.5" />
                </svg>
              </span>
              <p style={{ margin: 0, fontSize: compact ? 13.5 : 14.5, lineHeight: 1.45, color: "rgba(41,41,41,0.78)" }}>
                <strong style={{ color: SHM_COLORS.ink }}>{title}</strong> {body}
              </p>
            </li>
          ))}
        </ul>

        <div
          style={{
            marginTop: compact ? 18 : 20,
            padding: compact ? "12px 14px" : "14px 16px",
            background: SHM_COLORS.terraSoft,
            border: `1px solid ${SHM_COLORS.accent}`,
            borderRadius: SHM_RADIUS,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ color: SHM_COLORS.accentText, flex: "0 0 auto", display: "grid", placeItems: "center" }} aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="9" width="18" height="12" rx="1.5" />
              <path d="M3 13 H 21" />
              <path d="M12 9 V 21" />
              <path d="M8 6 C 8 4, 12 4, 12 9 C 12 4, 16 4, 16 6 C 16 8, 12 9, 12 9 C 12 9, 8 8, 8 6 Z" />
            </svg>
          </span>
          <div>
            <div style={{ fontFamily: SHM_FONT, fontWeight: 700, fontSize: compact ? 13.5 : 14.5, color: SHM_COLORS.ink, lineHeight: 1.3 }}>
              Every box includes a Free Gift
            </div>
            <div style={{ marginTop: 2, fontSize: compact ? 12 : 13, color: "rgba(41,41,41,0.65)", lineHeight: 1.35 }}>
              Our thank you for trying at home
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div
        style={{
          marginTop: compact ? 14 : 16,
          padding: compact ? 16 : 18,
          background: SHM_COLORS.sandSoft,
          borderRadius: SHM_RADIUS,
        }}
      >
        {summaryRows.map((row, i) => {
          const isTotal = row.tone === "total";
          return (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: isTotal ? 0 : 10,
                paddingTop: isTotal ? 12 : 0,
                borderTop: isTotal ? `1px solid ${SHM_COLORS.border}` : "none",
                fontSize: isTotal ? (compact ? 16 : 18) : compact ? 14 : 15,
                fontWeight: isTotal ? 700 : 400,
              }}
            >
              <span style={{ color: SHM_COLORS.ink, fontWeight: isTotal ? 700 : 400 }}>{row.label}</span>
              <span
                style={{
                  color: row.tone === "mint" || isTotal ? SHM_COLORS.mint : SHM_COLORS.ink,
                  fontWeight: 700,
                }}
              >
                {row.value}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: compact ? 18 : 22 }}>
        <PrimaryButton onClick={onClaim} compact={compact} full>
          Proceed to checkout
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M2 7 H 12 M 8 3 L 12 7 L 8 11" />
          </svg>
        </PrimaryButton>
        <p style={{ margin: "10px 0 0", textAlign: "center", fontSize: 12, color: SHM_COLORS.muted, lineHeight: 1.4 }}>
          $0 due today · Free returns · Charged only for keepers after day 7
        </p>
      </div>

      <p
        style={{
          margin: compact ? "28px 0 0" : "32px 0 0",
          fontSize: 11,
          lineHeight: 1.55,
          color: "rgba(41,41,41,0.5)",
          textWrap: "pretty",
        }}
      >
        By proceeding, you agree to Shapermint Club+ terms. Your stylist will curate 3 best-sellers based on your quiz
        answers, plus a free gift. You have 7 days from delivery to keep what you love or return the rest free. You&apos;ll
        only be charged for items you keep. The free gift is yours either way.
      </p>

      {onRestart && (
        <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            onClick={onRestart}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              border: `1px solid rgba(31,26,23,0.25)`,
              color: SHM_COLORS.ink,
              cursor: "pointer",
              fontFamily: SHM_FONT,
              fontSize: 13,
              fontWeight: SHM_WEIGHT,
              padding: "10px 18px",
              borderRadius: SHM_RADIUS,
            }}
          >
            <span aria-hidden>↺</span> Start over
          </button>
        </div>
      )}
    </div>
  );
}

function QuizFrame({ children, compact, paper }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: compact ? "20px 16px 40px" : "36px 40px 56px",
        background: paper,
        color: SHM_COLORS.ink,
        fontFamily: SHM_FONT,
        ["--font-body"]: SHM_FONT,
        ["--font-display"]: SHM_FONT,
      }}
    >
      {children}
    </div>
  );
}

function QuizApp({ compact, onBgChange }) {
  const [screen, setScreen] = React.useState(0);
  const [answers, setAnswers] = React.useState(emptyAnswers);

  const go = (n) => setScreen(Math.max(0, Math.min(5, n)));
  const patch = (partial) => setAnswers((a) => ({ ...a, ...partial }));

  const toggleList = (key, id) => {
    setAnswers((a) => {
      const list = a[key];
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
      return { ...a, [key]: next };
    });
  };

  const screenBg = screen === 5 ? "#FFFFFF" : SHM_COLORS.paper;
  React.useEffect(() => {
    onBgChange?.(screenBg);
  }, [screenBg, onBgChange]);

  const screens = {
    0: <ScreenLanding compact={compact} onStart={() => go(1)} />,
    1: (
      <ScreenCategories
        compact={compact}
        selected={answers.preferredCategories}
        onToggle={(id) => toggleList("preferredCategories", id)}
        onBack={() => go(0)}
        onAdvance={() => go(2)}
      />
    ),
    2: (
      <ScreenPriorities
        compact={compact}
        selected={answers.fitPriorities}
        onToggle={(id) => toggleList("fitPriorities", id)}
        onBack={() => go(1)}
        onAdvance={() => go(3)}
      />
    ),
    3: (
      <ScreenSizes
        compact={compact}
        answers={answers}
        onChange={patch}
        onBack={() => go(2)}
        onAdvance={() => go(4)}
      />
    ),
    4: <ScreenLoader compact={compact} answers={answers} onDone={() => go(5)} />,
    5: (
      <ScreenOffer
        compact={compact}
        answers={answers}
        onClaim={() => {
          // Hook for Club+ signup — expose answers for analytics / profile wiring
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("shaperbox-quiz-complete", { detail: answers }));
          }
        }}
        onRestart={() => {
          setAnswers(emptyAnswers());
          go(0);
        }}
      />
    ),
  };

  return (
    <QuizFrame compact={compact} paper={screenBg}>
      <div key={screen} className="sbz-slide" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {screens[screen]}
      </div>
    </QuizFrame>
  );
}

const QUIZ_CSS = `
.ebra-box-quiz-v2-root { overflow-x: hidden; }
@keyframes sbzspin { to { transform: rotate(360deg); } }
@keyframes sbzfadeIn { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: translateX(0); } }
.sbz-slide { animation: sbzfadeIn .25s ease-out; }
`;

export const EbraBoxQuizV2 = () => {
  const [compact, setCompact] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  const [rootBg, setRootBg] = React.useState(SHM_COLORS.paper);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setCompact(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      className="ebra-box-quiz-v2-root"
      style={{
        minHeight: "100vh",
        background: rootBg,
        transition: "background .2s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: SHM_FONT,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: QUIZ_CSS }} />
      <div
        style={{
          width: "100%",
          maxWidth: compact ? "100%" : 900,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <QuizApp compact={compact} onBgChange={setRootBg} />
      </div>
    </div>
  );
};

export default EbraBoxQuizV2;
