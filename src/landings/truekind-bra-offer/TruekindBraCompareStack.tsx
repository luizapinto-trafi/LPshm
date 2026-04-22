import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { TruekindBraCdn } from "./truekindBraCdn";

const StyledBlock = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-400) var(--space-1000);
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr);
  gap: var(--space-500);
  align-items: center;
  padding: var(--space-800) 0;
  border-top: 1px solid var(--ink-200);
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCol = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-300);
`;

const StyledKicker = styled.p`
  color: var(--ink-600);
  font-family: var(--font-body);
  font-size: 12px;
  margin: 0;
  text-align: center;
  width: 100%;
`;

const StyledProse = styled.div`
  text-align: left;
  @media (max-width: 800px) {
    max-width: 28rem;
    margin: 0 auto;
  }
`;

const StyledQuote = styled.p`
  color: var(--ink-800);
  font-family: var(--font-body);
  font-size: 15px;
  font-style: italic;
  line-height: 1.5;
  margin: 0 0 var(--space-400) 0;
`;

const StyledName = styled.p`
  color: var(--ink-1000);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  text-transform: none;
`;

const StyledTag = styled.p`
  color: var(--coral-500);
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.3;
  text-transform: uppercase;
  margin: 0;
`;

const compareRows = [
  {
    other: TruekindBraCdn.table2,
    otherAlt: "compare.row2ProductAlt" as const,
    name: "compare.row1Name" as const,
    label: "compare.row1Label" as const,
    quote: "compare.row1Quote" as const,
  },
  {
    other: TruekindBraCdn.table2,
    otherAlt: "compare.row2ProductAlt" as const,
    name: "compare.row2Name" as const,
    label: "compare.row2Label" as const,
    quote: "compare.row2Quote" as const,
  },
  {
    other: TruekindBraCdn.table3,
    otherAlt: "compare.row3ProductAlt" as const,
    name: "compare.row3Name" as const,
    label: "compare.row3Label" as const,
    quote: "compare.row3Quote" as const,
  },
] as const;

const StyledImg = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px;
  aspect-ratio: 0.8;
  & img {
    object-fit: contain;
  }
`;

export const TruekindBraCompareStack = () => {
  const { t } = useTranslation("truekindBra");
  return (
    <StyledBlock>
      {compareRows.map((row) => (
        <StyledRow key={row.name}>
          <StyledCol>
            <Image
              src={TruekindBraCdn.logo}
              alt={t("nav.logoHomeAria")}
              width={140}
              height={28}
              unoptimized
            />
            <StyledImg>
              <Image
                src={TruekindBraCdn.table1}
                alt={t("compare.row1ProductAlt")}
                width={200}
                height={260}
                unoptimized
                style={{ width: "100%", height: "auto" }}
              />
            </StyledImg>
          </StyledCol>
          <StyledCol>
            <StyledKicker>{t("designDifference.otherCamis")}</StyledKicker>
            <StyledImg>
              <Image
                src={row.other}
                alt={t(row.otherAlt)}
                width={200}
                height={260}
                unoptimized
                style={{ width: "100%", height: "auto" }}
              />
            </StyledImg>
          </StyledCol>
          <StyledProse>
            <StyledQuote>“{t(row.quote)}”</StyledQuote>
            <StyledName>{t(row.name)}</StyledName>
            <StyledTag>{t(row.label)}</StyledTag>
          </StyledProse>
        </StyledRow>
      ))}
    </StyledBlock>
  );
};
