import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { SweetheartCdn } from "./sweetheartCamiCdn";

const ICONS = [
  SweetheartCdn.iconSupport,
  SweetheartCdn.iconSmoothing,
  SweetheartCdn.iconBreathable,
] as const;

const StyledSection = styled.section`
  background: var(--white);
  padding: 24px 0;
`;

const StyledGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  align-items: start;
  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: var(--space-1000);
    padding: 0 var(--space-400);
  }
`;

const StyledMedia = styled.div`
  border-radius: 14px;
  overflow: hidden;
  background: var(--coral-050);
  line-height: 0;
`;

const StyledCopy = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (min-width: 900px) {
    gap: 24px;
  }
`;

const StyledZones = styled.p`
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--coral-500);
  margin: 0;
  @media (min-width: 900px) {
    font-size: 12px;
  }
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(22px, 5.5vw, 36px);
  font-weight: 700;
  line-height: 1.2;
  color: var(--ink-900);
  margin: 0;
  text-wrap: balance;
`;

const StyledLead = styled.p`
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-800);
  margin: 0 0 6px;
  max-width: 46ch;
  @media (min-width: 900px) {
    font-size: 16px;
    margin: 0;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  align-items: start;
`;

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  min-width: 0;
`;

const StyledIcon = styled.div`
  width: 40px;
  height: 40px;
  line-height: 0;
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    display: block;
  }
`;

const StyledItemTitle = styled.p`
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--ink-900);
  margin: 0;
  min-height: 0;
  @media (min-width: 900px) {
    font-size: 15px;
  }
`;

const StyledItemBody = styled.p`
  font-family: var(--font-body);
  font-size: 12.5px;
  line-height: 1.35;
  color: var(--ink-600);
  margin: 2px 0 0;
`;

type BenefitItem = { title: string; body: string };

export const SweetheartBenefitsSection = () => {
  const { t } = useTranslation("sweetheartCami");
  const items = t("benefits.items", { returnObjects: true }) as BenefitItem[];

  return (
    <StyledSection aria-labelledby="sweetheart-benefits-title">
      <StyledGrid>
        <StyledMedia>
          <Image
            src={SweetheartCdn.lifestyle}
            alt={t("benefits.imageAlt")}
            width={720}
            height={900}
            unoptimized
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </StyledMedia>
        <StyledCopy>
          <StyledZones>{t("benefits.zones")}</StyledZones>
          <StyledH2 id="sweetheart-benefits-title">{t("benefits.title")}</StyledH2>
          <StyledLead>{t("benefits.body")}</StyledLead>
          <StyledList>
            {items.map((item, i) => (
              <StyledItem key={item.title}>
                <StyledIcon>
                  <Image src={ICONS[i]} alt="" width={40} height={40} unoptimized />
                </StyledIcon>
                <div>
                  <StyledItemTitle>{item.title}</StyledItemTitle>
                  <StyledItemBody>{item.body}</StyledItemBody>
                </div>
              </StyledItem>
            ))}
          </StyledList>
        </StyledCopy>
      </StyledGrid>
    </StyledSection>
  );
};
