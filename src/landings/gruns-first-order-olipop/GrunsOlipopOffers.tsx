import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { GrunsOlipopCdn, GrunsOlipopGallery } from "./grunsOlipopCdn";

const StyledSection = styled.section`
  background: var(--gruns-cream);
  padding: var(--space-1200) var(--space-1000);
  scroll-margin-top: 72px;
  @media (max-width: 800px) {
    padding: var(--space-800) var(--space-400);
  }
`;

const StyledInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const StyledTrust = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  font-size: 14px;
  margin-bottom: var(--space-600);
  color: var(--gruns-dark);
  font-family: var(--font-body);
`;

const StyledStars = styled.span`
  color: var(--gruns-gold);
  letter-spacing: 2px;
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--gruns-dark);
  margin: 0 0 var(--space-300) 0;
`;

const StyledLead = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: var(--gruns-gray);
  margin: 0 0 var(--space-600) 0;
  max-width: 640px;
`;

const StyledBullets = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-800) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
`;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  font-size: 15px;
  &::before {
    content: "✓";
    color: var(--gruns-primary);
    font-weight: 800;
  }
`;

const StyledFlavorRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-400);
  margin-bottom: var(--space-800);
`;

const StyledFlavor = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-200);
  padding: var(--space-400);
  border-radius: var(--radius-xl);
  border: 2px solid var(--gruns-primary);
  background: var(--white);
  cursor: default;
  text-align: left;
  font: inherit;
  max-width: 260px;
`;

const StyledFlavorAlt = styled(StyledFlavor)`
  border-color: var(--ink-200);
  opacity: 0.85;
`;

const StyledThumb = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const StyledFlavorLabel = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: var(--gruns-dark);
`;

const StyledHint = styled.span`
  font-size: 12px;
  color: var(--gruns-gray);
`;

const StyledCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-500);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled.div<{ $featured?: boolean }>`
  border-radius: var(--radius-xl);
  padding: var(--space-500);
  border: 2px solid
    ${({ $featured }) => ($featured ? "var(--gruns-primary)" : "var(--ink-200)")};
  background: ${({ $featured }) => ($featured ? "var(--white)" : "var(--ink-050)")};
  position: relative;
`;

const StyledRibbon = styled.span`
  position: absolute;
  top: var(--space-400);
  right: var(--space-400);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--gruns-primary);
`;

const StyledPriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: var(--space-300);
  margin: var(--space-400) 0;
  flex-wrap: wrap;
`;

const StyledPriceNow = styled.span`
  font-size: 2rem;
  font-weight: 800;
  font-family: var(--font-display);
  color: var(--gruns-primary);
`;

const StyledPriceWas = styled.span`
  font-size: 1rem;
  text-decoration: line-through;
  color: var(--ink-500);
`;

const StyledPerDay = styled.div`
  font-size: 13px;
  color: var(--gruns-gray);
`;

const StyledCardList = styled.ul`
  margin: var(--space-400) 0 0 0;
  padding-left: 1.1rem;
  font-size: 13px;
  line-height: 1.5;
  color: var(--gruns-dark);
`;

const StyledCta = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--space-500);
  width: 100%;
  min-height: 52px;
  background: var(--coral-500);
  color: var(--white);
  font-family: var(--font-display);
  font-weight: 600;
  border-radius: var(--radius-lg);
  text-decoration: none;
  &:hover {
    background: var(--coral-450);
  }
`;

const StyledSeal = styled.div`
  margin-top: var(--space-800);
  display: flex;
  justify-content: center;
  opacity: 0.9;
`;

export const GrunsOlipopOffers = () => {
  const { t } = useTranslation("grunsOlipop");
  const bullets = t("offers.bullets", { returnObjects: true }) as string[];
  const subBullets = t("offers.subscribeBullets", { returnObjects: true }) as string[];
  const otpBullets = t("offers.otpBullets", { returnObjects: true }) as string[];
  const heroThumb = GrunsOlipopGallery[0];
  return (
    <StyledSection id="offers">
      <StyledInner>
        <StyledTrust>
          <StyledStars aria-hidden>★★★★★</StyledStars>
          {t("offers.trustLine")}
        </StyledTrust>
        <StyledH2>{t("offers.productTitle")}</StyledH2>
        <StyledLead>{t("offers.productLead")}</StyledLead>
        <StyledBullets>
          {bullets.map((b) => (
            <StyledLi key={b}>{b}</StyledLi>
          ))}
        </StyledBullets>

        <p
          style={{
            fontWeight: 700,
            marginBottom: "var(--space-300)",
            fontFamily: "var(--font-display)",
          }}
        >
          {t("offers.flavorLabel")}
        </p>
        <StyledFlavorRow>
          <StyledFlavor type="button">
            <StyledThumb>
              <Image src={heroThumb} alt="" fill sizes="72px" style={{ objectFit: "cover" }} />
            </StyledThumb>
            <StyledFlavorLabel>{t("offers.flavorNew")}</StyledFlavorLabel>
            <StyledHint>{t("offers.flavorHint")}</StyledHint>
          </StyledFlavor>
          <StyledFlavorAlt type="button">
            <StyledThumb>
              <Image src={GrunsOlipopGallery[2]} alt="" fill sizes="72px" style={{ objectFit: "cover" }} />
            </StyledThumb>
            <StyledFlavorLabel>{t("offers.flavorOriginal")}</StyledFlavorLabel>
          </StyledFlavorAlt>
        </StyledFlavorRow>

        <StyledCards>
          <StyledCard $featured>
            <StyledRibbon>Popular</StyledRibbon>
            <strong>{t("offers.subscribeTitle")}</strong>
            <div style={{ fontSize: 14, marginTop: 8, color: "var(--gruns-gray)" }}>
              {t("offers.subscribeSub")}
            </div>
            <StyledPriceRow>
              <StyledPriceNow>{t("offers.subscribePriceNow")}</StyledPriceNow>
              <StyledPriceWas>{t("offers.subscribePriceWas")}</StyledPriceWas>
            </StyledPriceRow>
            <StyledPerDay>{t("offers.subscribePerDay")}</StyledPerDay>
            <StyledCardList>
              {subBullets.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </StyledCardList>
            <StyledCta href="https://shapermint.com">{t("offers.cta")}</StyledCta>
          </StyledCard>
          <StyledCard>
            <strong>{t("offers.otpTitle")}</strong>
            <div style={{ fontSize: 14, marginTop: 8, color: "var(--gruns-gray)" }}>
              {t("offers.otpSub")}
            </div>
            <StyledPriceRow>
              <StyledPriceNow>{t("offers.otpPrice")}</StyledPriceNow>
            </StyledPriceRow>
            <StyledPerDay>{t("offers.otpPerDay")}</StyledPerDay>
            <StyledCardList>
              {otpBullets.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </StyledCardList>
            <StyledCta href="https://shapermint.com">{t("offers.cta")}</StyledCta>
          </StyledCard>
        </StyledCards>

        <StyledSeal>
          <Image src={GrunsOlipopCdn.seal} alt="" width={120} height={120} />
        </StyledSeal>
      </StyledInner>
    </StyledSection>
  );
};
