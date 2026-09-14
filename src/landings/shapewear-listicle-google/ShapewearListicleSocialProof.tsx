import styled from "styled-components";

const STAR_COLOR = "var(--gold-600)";
const STAR_EMPTY = "var(--ink-200)";

const StyledRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-100);
`;

const StyledStars = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  line-height: 0;
`;

const StyledLink = styled.a`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2;
  color: var(--ink-900);
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: var(--coral-500);
  }
`;

const Star = ({ fill, gradientId }: { fill: "full" | "half" | "empty"; gradientId: string }) => {
  if (fill === "half") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor={STAR_COLOR} />
            <stop offset="50%" stopColor={STAR_EMPTY} />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${gradientId})`}
          d="M8 1.2l1.76 3.56 3.93.57-2.84 2.77.67 3.91L8 10.96l-3.52 1.85.67-3.91L2.31 5.33l3.93-.57L8 1.2z"
        />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill={fill === "full" ? STAR_COLOR : STAR_EMPTY}
        d="M8 1.2l1.76 3.56 3.93.57-2.84 2.77.67 3.91L8 10.96l-3.52 1.85.67-3.91L2.31 5.33l3.93-.57L8 1.2z"
      />
    </svg>
  );
};

type ShapewearListicleSocialProofProps = {
  rating?: number;
  reviewCount: number;
  href: string;
  /** Unique id so half-star gradients don't collide across items. */
  id: string;
};

const fillsForRating = (rating: number): Array<"full" | "half" | "empty"> =>
  [1, 2, 3, 4, 5].map((star) => {
    if (rating >= star) return "full";
    if (rating >= star - 0.5) return "half";
    return "empty";
  });

export const ShapewearListicleSocialProof = ({
  rating = 4.5,
  reviewCount,
  href,
  id,
}: ShapewearListicleSocialProofProps) => (
  <StyledRow>
    <StyledStars aria-label={`${rating} out of 5 stars`}>
      {fillsForRating(rating).map((fill, i) => (
        <Star key={i} fill={fill} gradientId={`${id}-half-${i}`} />
      ))}
    </StyledStars>
    <StyledLink href={href} target="_blank" rel="noopener noreferrer">
      {reviewCount} reviews
    </StyledLink>
  </StyledRow>
);
