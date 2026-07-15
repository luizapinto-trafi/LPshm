/**
 * Truekind — Circular XX font faces, shared by every Truekind page.
 * Scoped loading: only pages that render this component request the files.
 */
import React from "react";

export const TruekindFonts = () => (
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
);

export default TruekindFonts;
