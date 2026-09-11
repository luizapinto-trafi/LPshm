import styled from "styled-components";

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px 12px;
`;

const StyledSale = styled.p`
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

const StyledCompare = styled.span`
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 400;
  color: var(--ink-500);
  text-decoration: line-through;
  line-height: 1.2;
`;

const StyledOff = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--sale);
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--white);
  line-height: 1;
`;

type ShapewearListiclePriceProps = {
  /** e.g. "$23.99" */
  value: string;
  /** e.g. "$45.00" */
  compareAt?: string;
  /** e.g. "45% OFF" */
  discountLabel?: string;
};

const parsePrice = (value: string) => {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const [dollars = "0", cents = "00"] = cleaned.split(".");
  return {
    dollars,
    cents: (cents + "00").slice(0, 2),
  };
};

export const ShapewearListiclePrice = ({
  value,
  compareAt,
  discountLabel,
}: ShapewearListiclePriceProps) => {
  const { dollars, cents } = parsePrice(value);
  const aria = compareAt
    ? `${value}, was ${compareAt}${discountLabel ? `, ${discountLabel}` : ""}`
    : value;

  return (
    <StyledRow aria-label={aria}>
      {compareAt ? <StyledCompare>{compareAt}</StyledCompare> : null}
      <StyledSale>
        <StyledSymbol>$</StyledSymbol>
        <StyledDollars>{dollars}</StyledDollars>
        <StyledCents>{cents}</StyledCents>
      </StyledSale>
      {discountLabel ? <StyledOff>{discountLabel}</StyledOff> : null}
    </StyledRow>
  );
};
