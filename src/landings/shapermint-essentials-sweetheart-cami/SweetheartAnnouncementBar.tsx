import styled from "styled-components";
import { useEffect, useState } from "react";

/** Promo offer bar + live countdown (reference: starts at 04:59:59, ticks every second). */
const INITIAL_SECS = 4 * 3600 + 59 * 60 + 59;

const StyledBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--ink-900);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 8px 12px;
  text-align: center;
  box-sizing: border-box;
  min-height: 40px;
`;

const StyledMsg = styled.span`
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.02em;
  b {
    color: var(--coral-300);
    letter-spacing: 0.04em;
  }
`;

const StyledTimer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #5c1f24;
  border-radius: 8px;
  padding: 4px 9px;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
  color: var(--white);
`;

const StyledUnit = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  min-width: 1.6em;
  small {
    font-size: 7px;
    font-weight: 700;
    opacity: 0.75;
    letter-spacing: 0.04em;
  }
`;

const pad = (n: number) => String(n).padStart(2, "0");

export const SweetheartAnnouncementBar = () => {
  const [secs, setSecs] = useState(INITIAL_SECS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = window.setInterval(() => {
      setSecs((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const display = mounted ? secs : INITIAL_SECS;
  const h = pad(Math.floor(display / 3600));
  const m = pad(Math.floor((display % 3600) / 60));
  const s = pad(display % 60);

  return (
    <StyledBar role="region" aria-label="Promotions">
      <StyledMsg>
        🔥 UP TO 45% OFF <b>+ FREE GIFT</b> 🔥
      </StyledMsg>
      <StyledTimer aria-live="polite" aria-atomic="true">
        <StyledUnit>
          {h}
          <small>HRS</small>
        </StyledUnit>
        :
        <StyledUnit>
          {m}
          <small>MIN</small>
        </StyledUnit>
        :
        <StyledUnit>
          {s}
          <small>SEC</small>
        </StyledUnit>
      </StyledTimer>
    </StyledBar>
  );
};
