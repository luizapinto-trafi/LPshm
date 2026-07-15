/**
 * Truekind landing.
 * Hero section with a looping background video; rest of the page is a blank canvas.
 */
import React from "react";
import { TruekindHeader } from "./TruekindHeader";
import { TruekindProductsSection } from "./TruekindProductsSection";
import { TruekindFeaturesSection } from "./TruekindFeaturesSection";
import { TruekindBundlesSection } from "./TruekindBundlesSection";
import { TruekindStars } from "./TruekindStars";

const HeroSection = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // iOS Safari: guarantee inline muted autoplay (React doesn't always reflect
  // `muted` to the DOM, and Low Power Mode blocks autoplay until a gesture).
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("webkit-playsinline", "");
    const tryPlay = () => {
      if (v.paused) v.play().catch(() => {});
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    const onGesture = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
    window.addEventListener("pointerdown", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });
    return () => {
      v.removeEventListener("canplay", tryPlay);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "90vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        background: "#e6dcd7",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        className="hero-video"
        style={{
          position: "absolute",
          top: "var(--tk-header-h, 100px)",
          left: 0,
          width: "100%",
          height: "calc(100% - var(--tk-header-h, 100px))",
          objectFit: "cover",
          objectPosition: "right top",
          zIndex: 0,
        }}
      >
        <source src="/truekind/hero-bg.mp4" type="video/mp4" />
      </video>

      <div aria-hidden className="hero-scrim" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
      <style jsx>{`
        :global(.hero-video::-webkit-media-controls-start-playback-button) {
          display: none !important;
          -webkit-appearance: none;
        }
        :global(.hero-video::-webkit-media-controls) {
          display: none !important;
        }
        .hero-scrim {
          background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.94) 0%,
            rgba(255, 255, 255, 0.72) 35%,
            rgba(255, 255, 255, 0) 70%
          );
        }
        @media (min-width: 992px) {
          .hero-scrim {
            background: linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.78) 0%,
              rgba(255, 255, 255, 0.4) 20%,
              rgba(255, 255, 255, 0) 42%
            );
          }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "56rem",
          padding:
            "0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 32px) clamp(16px, 3vw, 32px)",
          textAlign: "left",
          color: "var(--ink-900, #292929)",
        }}
      >
        <p
          style={{
            display: "inline-block",
            margin: "0 0 var(--space-250, 20px)",
            padding: "var(--space-075, 6px) var(--space-250, 20px)",
            border: "1px solid var(--ink-900, #292929)",
            borderRadius: "var(--radius-full, 9999px)",
            fontFamily: "var(--font-body, 'Avenir Next', sans-serif)",
            fontWeight: 600,
            fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
            lineHeight: 1.3,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Black Friday in July
        </p>

        <h1
          style={{
            margin: "0 0 var(--space-200, 16px)",
            fontFamily: "var(--font-display, 'Avenir Next LT Pro', sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(2.25rem, 7vw, 5.5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
          }}
        >
          Up to 60% Off
          <br />
          True Comfort
        </h1>

        <p
          style={{
            margin: "0 0 var(--space-300, 24px)",
            maxWidth: "30rem",
            fontFamily: "var(--font-body, 'Avenir Next', sans-serif)",
            fontWeight: 400,
            fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
            lineHeight: 1.45,
          }}
        >
          Stock up on supportive bras &amp; seamless undies on sale.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--space-300, 24px)",
          }}
        >
          <a
            href="#shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 48,
              padding: "0 var(--space-400, 32px)",
              background: "var(--ink-1000, #000)",
              color: "#fff",
              borderRadius: "var(--radius-full, 9999px)",
              fontFamily: "var(--font-display, 'Avenir Next LT Pro', sans-serif)",
              fontWeight: 600,
              fontSize: "1.0625rem",
              textDecoration: "none",
            }}
          >
            Shop Now
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-100, 8px)" }}>
            <TruekindStars rating={5} size={16} />
            <span
              style={{
                fontFamily: "var(--font-body, 'Avenir Next', sans-serif)",
                fontSize: "0.9375rem",
                lineHeight: 1.3,
              }}
            >
              <strong style={{ fontWeight: 700 }}>80,000+</strong> five-star reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Truekind = () => {
  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        background: "#fff",
        color: "#292929",
        // Scope Circular XX to this landing by overriding the design-system
        // font variables that every Truekind* component reads.
        ["--font-body" as string]: "'Circular XX', system-ui, sans-serif",
        ["--font-display" as string]: "'Circular XX', system-ui, sans-serif",
        fontFamily: "'Circular XX', system-ui, sans-serif",
      }}
    >
      <style jsx global>{`
        @font-face {
          font-family: "Circular XX";
          src: url("/truekind/fonts/CircularXX-Regular.woff2") format("woff2");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        /* Bold (700) also serves the 600 "semibold" the design asks for. */
        @font-face {
          font-family: "Circular XX";
          src: url("/truekind/fonts/CircularXX-Bold.woff2") format("woff2");
          font-weight: 600 700;
          font-style: normal;
          font-display: swap;
        }
        /* Black (900) serves the 800 headings. */
        @font-face {
          font-family: "Circular XX";
          src: url("/truekind/fonts/CircularXX-Black.woff2") format("woff2");
          font-weight: 800 900;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
      <TruekindHeader />
      <HeroSection />
      <TruekindProductsSection />
      <TruekindFeaturesSection />
      <TruekindBundlesSection />
      {/* Continue building the Truekind landing here. */}
    </main>
  );
};

export default Truekind;
