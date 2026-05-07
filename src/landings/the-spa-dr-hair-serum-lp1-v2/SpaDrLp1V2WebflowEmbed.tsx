import { useLayoutEffect } from "react";
import { hairSerumLp1V2WebflowBodyHtml } from "./hairSerumLp1V2WebflowBodyHtml";
import styles from "./webflowLp1V2Layout.module.css";

/**
 * The Spa Dr. — hair serum LP1 v2 (PDP-style Webflow page).
 *
 * Renders the published `<body>` markup verbatim from
 * https://try.thespadr.com/pages/hairserum/lp1-lead-offershort-list-tox-v2
 *
 * Phase 1 (current): visual fidelity only. The Webflow CSS bundle is loaded
 * via `pages/_document.tsx` and the embedded markup includes the original
 * inline `<style>` blocks (which the browser applies on insertion). The
 * `<script>` tags inside the markup are inert when injected via
 * `dangerouslySetInnerHTML`, so the buybox / tabs / popup are NOT
 * interactive yet — they render in their default state. Add the JS layer in
 * a Phase 2 (re-execute scripts after mount) when interactivity is needed.
 */
export const SpaDrLp1V2WebflowEmbed = () => {
  useLayoutEffect(() => {
    // Webflow's runtime CSS keys off these document-element classes
    // (e.g. `w-mod-js` enables JS-driven hover/touch behaviours).
    const root = document.documentElement;
    root.classList.add("w-mod-js", "w-mod-touch");
    return () => {
      root.classList.remove("w-mod-js", "w-mod-touch");
    };
  }, []);

  return (
    <div
      className={`${styles.embedV2} webflow-tsp-embed-v2 w-mod-js w-mod-touch`}
      dangerouslySetInnerHTML={{ __html: hairSerumLp1V2WebflowBodyHtml }}
      suppressHydrationWarning
    />
  );
};
