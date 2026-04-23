import styled from "styled-components";

const StyledStars = styled.span<{ $sizePx: number }>`
  display: inline-flex;
  gap: 2px;
  color: var(--gold-600);
  line-height: 0;
  svg {
    width: ${({ $sizePx }) => $sizePx}px;
    height: ${({ $sizePx }) => $sizePx}px;
  }
`;

const starPath =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z";

type StraplessFiveStarsProps = {
  label: string;
  sizePx?: number;
};

export const StraplessFiveStars = ({ label, sizePx = 16 }: StraplessFiveStarsProps) => (
  <StyledStars $sizePx={sizePx} aria-label={label}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d={starPath} />
      </svg>
    ))}
  </StyledStars>
);
