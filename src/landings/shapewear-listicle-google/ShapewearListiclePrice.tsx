import styled from "styled-components";

const StyledPrice = styled.p`
  display: inline-flex;
  align-items: flex-start;
  gap: 3px;
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 28px;
  color: var(--ink-1000);
  line-height: 1;

  @media (max-width: 600px) {
    font-size: 26px;
  }
`;

const StyledSymbol = styled.span`
  font-size: 0.52em;
  line-height: 1;
  padding-top: 0.12em;
`;

const StyledDollars = styled.span`
  font-size: 1em;
  line-height: 0.92;
  letter-spacing: -0.02em;
`;

const StyledCents = styled.span`
  font-size: 0.52em;
  line-height: 1;
  padding-top: 0.12em;
`;

type ShapewearListiclePriceProps = {
  /** e.g. "$23.99" */
  value: string;
};

const parsePrice = (value: string) => {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const [dollars = "0", cents = "00"] = cleaned.split(".");
  return {
    dollars,
    cents: (cents + "00").slice(0, 2),
  };
};

export const ShapewearListiclePrice = ({ value }: ShapewearListiclePriceProps) => {
  const { dollars, cents } = parsePrice(value);
  return (
    <StyledPrice aria-label={value}>
      <StyledSymbol>$</StyledSymbol>
      <StyledDollars>{dollars}</StyledDollars>
      <StyledCents>{cents}</StyledCents>
    </StyledPrice>
  );
};
