import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { JellybraCdn } from "./jellybraCdn";
import { JellybraPrimaryButton } from "./JellybraPrimaryButton";

const REASON_IMAGES = [
  JellybraCdn.reasonLift,
  JellybraCdn.reasonCoverage,
  JellybraCdn.reasonSupport,
  JellybraCdn.reasonSilhouette,
  JellybraCdn.reasonEverybody,
] as const;

/** Viral ebra reasons: centered title + 5 equal square cards. */
const StyledSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-800) var(--space-400) var(--space-800);
  text-align: center;
  @media (max-width: 899px) {
    padding: var(--space-600) var(--space-400);
  }
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(26px, 4vw, 36px);
  line-height: 1.2;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0 0 var(--space-800);
  text-wrap: balance;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--space-500);
  text-align: left;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-500) var(--space-400);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-500) var(--space-300);
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
`;

const StyledCardMedia = styled.div`
  aspect-ratio: 3 / 4;
  border: 1px solid var(--ink-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--coral-050);
  line-height: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledCardTitle = styled.p`
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0;
  line-height: 1.35;
  strong {
    display: block;
    margin-bottom: 6px;
    font-size: 16px;
  }
  span {
    font-family: var(--font-body);
    font-weight: 400;
    font-size: 14px;
    line-height: 1.45;
    color: var(--ink-700);
  }
`;

const StyledCtaWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--space-800);
`;

const StyledCta = styled(JellybraPrimaryButton)``;

type ReasonItem = { title: string; body: string; alt: string };

export const JellybraReasonsSection = () => {
  const { t } = useTranslation("jellybra");
  const items = t("reasons.items", { returnObjects: true }) as ReasonItem[];

  return (
    <StyledSection aria-labelledby="jellybra-reasons-title">
      <StyledH2 id="jellybra-reasons-title">{t("reasons.title")}</StyledH2>
      <StyledGrid>
        {items.map((item, i) => (
          <StyledCard key={item.title}>
            <StyledCardMedia>
              <Image src={REASON_IMAGES[i]} alt={item.alt} width={300} height={400} unoptimized />
            </StyledCardMedia>
            <StyledCardTitle>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </StyledCardTitle>
          </StyledCard>
        ))}

      </StyledGrid>
      <StyledCtaWrap>
        <StyledCta href="#offer">{t("reasons.cta")}</StyledCta>
      </StyledCtaWrap>
    </StyledSection>
  );
};
