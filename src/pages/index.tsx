import Link from "next/link";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps } from "next";
import { TruekindBraPagePath } from "@/landings/truekind-bra-offer/truekindBraCdn";
import { GrunsPagePath } from "@/landings/gruns-first-order/grunsCdn";
import { StraplessPagePath } from "@/landings/strapless-landing/straplessCdn";

const StyledMain = styled.main`
  min-height: 100vh;
  max-width: 40rem;
  margin: 0 auto;
  padding: var(--space-1200) var(--space-500);
  color: var(--ink-900);
  font-family: var(--font-body);
`;

const StyledH1 = styled.h1`
  color: var(--ink-1000);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 var(--space-400) 0;
`;

const StyledP = styled.p`
  color: var(--ink-700);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 var(--space-600) 0;
`;

const StyledLandings = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-600);
`;

const StyledLandingCard = styled.div`
  padding: var(--space-500);
  background: var(--ink-050);
  border-radius: var(--radius-xl);
  border: 1px solid var(--ink-200);
`;

const StyledCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: var(--space-300) var(--space-600);
  background: var(--coral-500);
  color: var(--white) !important;
  border-radius: var(--radius-lg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  letter-spacing: 0.04em;
  &:hover {
    background: var(--coral-450);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledGrunsCta = styled(StyledCta)`
  background: var(--gruns-primary);
  &:hover {
    background: var(--gruns-primary-light);
  }
`;

const StyledHint = styled.p`
  color: var(--ink-500);
  font-size: 12px;
  line-height: 1.4;
  margin: var(--space-400) 0 0 0;
`;

export const HomePage = () => {
  const { t } = useTranslation("common");
  return (
    <StyledMain>
      <StyledH1>{t("home.title")}</StyledH1>
      <StyledP>{t("home.lead")}</StyledP>

      <StyledLandings>
        <StyledLandingCard>
          <StyledCta href={TruekindBraPagePath}>{t("home.truekindCta")}</StyledCta>
          <StyledHint>{t("home.truekindHint")}</StyledHint>
        </StyledLandingCard>

        <StyledLandingCard>
          <StyledGrunsCta href={GrunsPagePath}>{t("home.grunsCta")}</StyledGrunsCta>
          <StyledHint>{t("home.grunsHint")}</StyledHint>
        </StyledLandingCard>

        <StyledLandingCard>
          <StyledCta href={StraplessPagePath}>{t("home.straplessCta")}</StyledCta>
          <StyledHint>{t("home.straplessHint")}</StyledHint>
        </StyledLandingCard>
      </StyledLandings>
    </StyledMain>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default HomePage;
