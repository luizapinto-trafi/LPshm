import { useLayoutEffect } from "react";
import { hairSerumWebflowBodyHtml } from "./hairSerumWebflowBodyHtml";
import { useWebflowHairSerumTimer } from "./useWebflowHairSerumTimer";
import styles from "./webflowListicleWiderLayout.module.css";

/**
 * Published Webflow body markup (from try.thespadr.com hair serum listicle), rendered verbatim.
 * CSS is loaded from the same shared bundle Webflow uses for identical styling.
 */
export const SpaDrListcicleWebflowEmbed = () => {
  useWebflowHairSerumTimer();

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("w-mod-js", "w-mod-touch");
    return () => {
      root.classList.remove("w-mod-js", "w-mod-touch");
    };
  }, []);

  return (
    <div
      className={`${styles.embedWider} webflow-tsp-embed w-mod-js w-mod-touch`}
      dangerouslySetInnerHTML={{ __html: hairSerumWebflowBodyHtml }}
      suppressHydrationWarning
    />
  );
};
