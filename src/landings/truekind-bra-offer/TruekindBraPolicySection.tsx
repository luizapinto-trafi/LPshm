import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { TruekindBraCdn } from "./truekindBraCdn";

const StyledSection = styled.section`
  background: var(--ink-050);
  padding: var(--space-1000) var(--space-400);
`;

const StyledInner = styled.div`
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
`;

const StyledH2 = styled.h2`
  color: var(--ink-900);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 var(--space-400) 0;
  text-transform: none;
`;

const StyledBody = styled.p`
  color: var(--ink-800);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.55;
  margin: 0;
`;

const StyledStrong = styled.strong`
  color: var(--ink-900);
  font-weight: 600;
`;

const StyledBadge = styled.div`
  margin: 0 auto var(--space-500);
  display: flex;
  justify-content: center;
`;

export const TruekindBraPolicySection = () => {
  const { t } = useTranslation("truekindBra");
  return (
    <StyledSection>
      <StyledInner>
        <StyledBadge>
          <Image src={TruekindBraCdn.fitGuarantee} alt={t("policy.badgeAlt")} width={48} height={48} unoptimized />
        </StyledBadge>
        <StyledH2>{t("policy.title")}</StyledH2>
        <StyledBody>
          {t("policy.lineBeforeBold")}
          <StyledStrong>{t("policy.lineBold")}</StyledStrong>
          {t("policy.lineAfterBold")}
        </StyledBody>
      </StyledInner>
    </StyledSection>
  );
};
