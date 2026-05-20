import { useEffect } from "react";

const TIMER_MINUTES = 120;

const pad2 = (n: number) => String(n).padStart(2, "0");

function setElText(selector: string, value: string) {
  if (typeof document === "undefined") {
    return;
  }
  document.querySelectorAll(selector).forEach((el) => {
    el.textContent = value;
  });
}

/**
 * Replicates the inline Webflow script: countdown on `.hours` / `.minutes` / `.seconds`
 * (bar + labels are static in the HTML).
 */
export const useWebflowHairSerumTimer = () => {
  useEffect(() => {
    let durationInSeconds = TIMER_MINUTES * 60;

    const tick = () => {
      if (durationInSeconds < 0) {
        return;
      }
      const h = Math.floor(durationInSeconds / 3600);
      const m = Math.floor((durationInSeconds % 3600) / 60);
      const s = durationInSeconds % 60;
      setElText(".hours", pad2(h));
      setElText(".minutes", pad2(m));
      setElText(".seconds", pad2(s));
      durationInSeconds -= 1;
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
};
