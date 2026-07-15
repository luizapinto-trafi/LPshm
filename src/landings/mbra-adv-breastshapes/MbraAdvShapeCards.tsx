import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import React from "react";

// ─── SVG glyphs (ported from EbraQuizV2) ─────────────────────────────────────

const ShapeDot = ({ cx, cy }: { cx: number; cy: number }) => (
  <circle cx={cx} cy={cy} r={1.6} fill="currentColor" stroke="none" />
);

const Glyph = ({ children }: { children: React.ReactNode }) => (
  <svg
    width={92}
    height={56}
    viewBox="0 0 92 56"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block", overflow: "visible" }}
  >
    <g transform="translate(0 56) scale(1 -1)">{children}</g>
  </svg>
);

const GlyphRelaxed = () => (
  <Glyph>
    <path d="M 4 52 Q 4 12, 24 12 Q 44 12, 44 52" />
    <path d="M 48 52 Q 48 12, 68 12 Q 88 12, 88 52" />
    <ShapeDot cx={24} cy={26} />
    <ShapeDot cx={68} cy={26} />
  </Glyph>
);

const GlyphSideSet = () => (
  <Glyph>
    <path d="M -2 52 Q -2 22, 14 22 Q 30 22, 30 52" />
    <path d="M 62 52 Q 62 22, 78 22 Q 94 22, 94 52" />
    <ShapeDot cx={14} cy={32} />
    <ShapeDot cx={78} cy={32} />
  </Glyph>
);

const GlyphAsymmetric = () => (
  <Glyph>
    <path d="M 4 52 Q 4 22, 20 22 Q 36 22, 36 52" />
    <path d="M 46 52 Q 46 10, 68 10 Q 88 10, 88 52" />
    <ShapeDot cx={20} cy={32} />
    <ShapeDot cx={68} cy={24} />
  </Glyph>
);

const GlyphTeardrop = () => (
  <Glyph>
    <path d="M -2 52 Q -6 22, 14 18 Q 36 22, 36 52" />
    <path d="M 56 52 Q 56 22, 78 18 Q 98 22, 94 52" />
    <ShapeDot cx={10} cy={30} />
    <ShapeDot cx={82} cy={30} />
  </Glyph>
);

// ─── Styled components ────────────────────────────────────────────────────────

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 26px 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ecdfd0;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fffaf4;
`;

const StyledThumb = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1.4;
  background-color: #f9f0e8;
  color: #c64844;
`;

const StyledBody = styled.div`
  padding: 14px 16px 18px;
`;

const StyledName = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #292929;
  margin-bottom: 6px;
`;

const StyledDesc = styled.p`
  font-family: Georgia, "Times New Roman", serif;
  font-size: 15px;
  line-height: 1.5;
  color: #4a4a4a;
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const SHAPES = [
  { key: "relaxed", Glyph: GlyphRelaxed },
  { key: "sideset", Glyph: GlyphSideSet },
  { key: "asym", Glyph: GlyphAsymmetric },
  { key: "teardrop", Glyph: GlyphTeardrop },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export const MbraAdvShapeCards = () => {
  const { t } = useTranslation("mbraAdv");
  return (
    <StyledGrid>
      {SHAPES.map(({ key, Glyph: ShapeGlyph }) => {
        const name = t(`article.shapes.${key}Name`);
        return (
          <StyledCard key={key}>
            <StyledThumb role="img" aria-label={name}>
              <ShapeGlyph />
            </StyledThumb>
            <StyledBody>
              <StyledName>{name}</StyledName>
              <StyledDesc>{t(`article.shapes.${key}Desc`)}</StyledDesc>
            </StyledBody>
          </StyledCard>
        );
      })}
    </StyledGrid>
  );
};
