import styled from "styled-components";

const StyledStars = styled.span<{ $sizePx: number }>`
  display: inline-flex;
  gap: 3px;
  color: var(--gold-600);
  line-height: 0;
  svg {
    width: ${({ $sizePx }) => $sizePx}px;
    height: ${({ $sizePx }) => $sizePx}px;
  }
`;

/** Estrella solo trazo (distinta de la landing strapless original). */
const starOutlinePath =
  "M12 2.2l2.2 4.5h4.9l-3.9 2.8 1.5 4.7L12 11.9l-3.7 2.2 1.5-4.7-3.9-2.8h4.9L12 2.2z";

type StraplessFiveStarsProps = {
  label: string;
  sizePx?: number;
};

export const StraplessFiveStars = ({ label, sizePx = 16 }: StraplessFiveStarsProps) => (
  <StyledStars $sizePx={sizePx} aria-label={label}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden>
        <path d={starOutlinePath} strokeLinejoin="round" />
      </svg>
    ))}
  </StyledStars>
);
