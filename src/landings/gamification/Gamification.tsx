import React, { useCallback, useRef, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

/* ------------------------------------------------------------------ */
/* Fonts                                                               */
/* ------------------------------------------------------------------ */
const FontFaces = createGlobalStyle`
  @font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Regular.woff2") format("opentype"); font-weight: normal; font-display: swap; }
  @font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Demi.otf") format("opentype"); font-weight: 600; font-display: swap; }
  @font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Bold.otf") format("opentype"); font-weight: 700; font-display: swap; }
  @font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Heavy.otf") format("opentype"); font-weight: 800 900; font-display: swap; }
`;

/* ------------------------------------------------------------------ */
/* Palette (taken from the reference mockup)                           */
/* ------------------------------------------------------------------ */
const COLORS = {
  page: "#f1ebe2",
  cardBg: "#ece2d3",
  ink: "#2e2e2e",
  inkSoft: "#8a8a8a",
  coral: "#ee8268",
  coralDeep: "#d65f4b",
  darkRed: "#c1544d",
  mediumCoral: "#e8917b",
  lightCoral: "#f0b4a4",
  lightPink: "#f6d7ce",
  button: "#262626",
};

/* ------------------------------------------------------------------ */
/* Wheel definition — 6 segments, boundaries every 60° from -90° (top) */
/* ------------------------------------------------------------------ */
type Segment = {
  label: [string, string];
  color: string;
  textColor: string;
};

// Ordered by segment center: -60, 0, 60, 120, 180, 240
const SEGMENTS: Segment[] = [
  { label: ["$20", "OFF"], color: COLORS.lightPink, textColor: "#7a4a40" }, // -60 upper-right
  { label: ["$10", "OFF"], color: COLORS.mediumCoral, textColor: "#5a2a22" }, // 0 right
  { label: ["FREE", "GIFT"], color: COLORS.lightCoral, textColor: "#6a342b" }, // 60 lower-right
  { label: ["FREE", "PROD"], color: COLORS.lightPink, textColor: "#7a4a40" }, // 120 lower-left
  { label: ["40%", "OFF"], color: COLORS.lightCoral, textColor: "#6a342b" }, // 180 left
  { label: ["FREE", "SHIP"], color: COLORS.darkRed, textColor: "#ffffff" }, // 240 upper-left
];

const CENTERS = [-60, 0, 60, 120, 180, 240];
const C = 200; // svg center
const R = 190; // wedge radius

const wedgePath = (centerDeg: number) => {
  const start = (centerDeg - 30) * (Math.PI / 180);
  const end = (centerDeg + 30) * (Math.PI / 180);
  const x1 = C + R * Math.cos(start);
  const y1 = C + R * Math.sin(start);
  const x2 = C + R * Math.cos(end);
  const y2 = C + R * Math.sin(end);
  return `M${C},${C} L${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R} 0 0 1 ${x2.toFixed(
    2
  )},${y2.toFixed(2)} Z`;
};

/* ------------------------------------------------------------------ */
/* Styled                                                              */
/* ------------------------------------------------------------------ */
const Page = styled.main`
  min-height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  background: ${COLORS.page};
  color: ${COLORS.ink};
  font-family: "AvenirNextLTPro", system-ui, sans-serif;
`;

const Shell = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 28px 22px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* Product card --------------------------------------------------- */
const ProductCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 30px;
`;

const ProductThumb = styled.div`
  flex: 0 0 96px;
  width: 96px;
  height: 96px;
  border-radius: 14px;
  background: ${COLORS.cardBg};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 74%;
    height: 74%;
    object-fit: contain;
  }
`;

const ProductInfo = styled.div`
  flex: 1 1 auto;
  line-height: 1.3;
`;

const ProductName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${COLORS.ink};
`;

const PriceRow = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const FreeTag = styled.span`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: ${COLORS.coralDeep};
`;

const OldPrice = styled.span`
  font-size: 14px;
  color: ${COLORS.inkSoft};
  text-decoration: line-through;
`;

const AppNote = styled.div`
  margin-top: 2px;
  font-size: 13px;
  color: ${COLORS.inkSoft};
`;

/* Headline ------------------------------------------------------- */
const Headline = styled.h2`
  margin: 0 0 26px;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #4a4a4a;
  text-align: center;
`;

/* Wheel ---------------------------------------------------------- */
const WheelArea = styled.div`
  position: relative;
  width: min(86vw, 340px);
  aspect-ratio: 1;
  margin-bottom: 34px;
`;

const Pointer = styled.div`
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 17px solid transparent;
  border-right: 17px solid transparent;
  border-top: 26px solid ${COLORS.darkRed};
  filter: drop-shadow(0 3px 4px rgba(41, 41, 41, 0.22));
  z-index: 3;
`;

const Wheel = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
`;

const pop = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.06); }
`;

const SpinHub = styled.button<{ $spinning: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 27%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 4px solid ${COLORS.coral};
  background: #fff;
  color: ${COLORS.coralDeep};
  font-family: inherit;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: ${(p) => (p.$spinning ? "default" : "pointer")};
  box-shadow: 0 6px 16px rgba(41, 41, 41, 0.16);
  z-index: 2;
  animation: ${(p) => (p.$spinning ? "none" : pop)} 1.8s ease-in-out infinite;
  &:disabled {
    opacity: 1;
  }
`;

/* Result + CTA --------------------------------------------------- */
const Result = styled.div<{ $show: boolean }>`
  min-height: 24px;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: ${COLORS.coralDeep};
  opacity: ${(p) => (p.$show ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Cta = styled.button`
  width: 100%;
  padding: 18px 24px;
  border: none;
  border-radius: 10px;
  background: ${COLORS.button};
  color: #fff;
  font-family: inherit;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;

  span {
    color: ${COLORS.coral};
  }
`;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export const Gamification = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [wonIndex, setWonIndex] = useState<number | null>(null);
  const rotationRef = useRef(0);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setWonIndex(null);

    const idx = Math.floor(Math.random() * SEGMENTS.length);
    // Land the chosen wedge centre under the pointer (top = 270°):
    // we need (center + R) ≡ 270 (mod 360)
    const base = (((270 - CENTERS[idx]) % 360) + 360) % 360;
    const current = rotationRef.current;
    let target = Math.ceil(current / 360) * 360 + 360 * 4 + base;
    if (target <= current + 360) target += 360;

    rotationRef.current = target;
    setRotation(target);

    window.setTimeout(() => {
      setSpinning(false);
      setWonIndex(idx);
    }, 4300);
  }, [spinning]);

  const won = wonIndex !== null ? SEGMENTS[wonIndex] : null;

  return (
    <Page>
      <FontFaces />
      <Shell>
        <ProductCard>
          <ProductThumb>
            <img src="/shapermint-concept/product-panty.png" alt="Best-selling shaper bottom" />
          </ProductThumb>
          <ProductInfo>
            <ProductName>Best-selling shaper bottom</ProductName>
            <PriceRow>
              <FreeTag>FREE</FreeTag>
              <OldPrice>$26.00</OldPrice>
            </PriceRow>
            <AppNote>Only available through the app</AppNote>
          </ProductInfo>
        </ProductCard>

        <Headline>Spin to unlock your reward</Headline>

        <WheelArea>
          <Pointer />
          <Wheel viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            {/* outer ring */}
            <circle cx={C} cy={C} r={196} fill="#fff" stroke={COLORS.coral} strokeWidth={8} />
            <g
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "200px 200px",
                transition: spinning
                  ? "transform 4.2s cubic-bezier(0.16, 0.84, 0.22, 1)"
                  : "none",
              }}
            >
              {SEGMENTS.map((seg, i) => (
                <path
                  key={`w-${i}`}
                  d={wedgePath(CENTERS[i])}
                  fill={seg.color}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
              {SEGMENTS.map((seg, i) => {
                const center = CENTERS[i];
                const lr = 122; // label radius
                const flip = center > 90 && center < 270;
                return (
                  <g key={`l-${i}`} transform={`rotate(${center} ${C} ${C})`}>
                    <g transform={flip ? `rotate(180 ${C + lr} ${C})` : undefined}>
                      <text
                        x={C + lr}
                        y={C}
                        textAnchor="middle"
                        fontFamily="AvenirNextLTPro, system-ui, sans-serif"
                        fontWeight={800}
                        fontSize={20}
                        fill={seg.textColor}
                      >
                        <tspan x={C + lr} dy={-3}>
                          {seg.label[0]}
                        </tspan>
                        <tspan x={C + lr} dy={20}>
                          {seg.label[1]}
                        </tspan>
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          </Wheel>
          <SpinHub $spinning={spinning} onClick={spin} disabled={spinning}>
            {spinning ? (
              <>
                Spin
                <br />
                ning…
              </>
            ) : (
              <>
                Tap
                <br />
                to
                <br />
                spin
              </>
            )}
          </SpinHub>
        </WheelArea>

        <Result $show={!!won}>
          {won ? `🎉 You unlocked ${won.label.join(" ")}!` : ""}
        </Result>

        <Cta onClick={spin}>
          Spin & <span>Claim on the app →</span>
        </Cta>
      </Shell>
    </Page>
  );
};

export default Gamification;
