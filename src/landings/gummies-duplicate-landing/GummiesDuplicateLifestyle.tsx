import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { GummiesDuplicateGallery } from "./gummiesDuplicateCdn";

const StyledSection = styled.section`
  background: var(--ink-100);
  border-top: 1px solid var(--ink-200);
  padding: var(--space-1000) var(--space-400);
  @media (min-width: 801px) {
    padding: var(--space-1200) var(--space-1000);
  }
`;

const StyledRow = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-800);
  @media (min-width: 801px) {
    flex-direction: row;
    gap: var(--space-1000);
  }
`;

const StyledMedia = styled.div`
  width: 100%;
  max-width: 28rem;
  @media (min-width: 801px) {
    width: 50%;
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledImg = styled.div`
  border-radius: var(--radius-xl);
  border: 2px solid var(--ink-1000);
  box-shadow: 4px 4px 0 0 var(--ink-1000);
  overflow: hidden;
  line-height: 0;
  background: var(--white);
`;

const StyledCopy = styled.div`
  width: 100%;
  text-align: center;
  @media (min-width: 801px) {
    width: 50%;
    text-align: left;
  }
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.2vw, 2.75rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--ink-1000);
  margin: 0 0 var(--space-500) 0;
  letter-spacing: -0.02em;
`;

const StyledAccent = styled.span`
  color: var(--gruns-primary);
`;

const StyledP = styled.p`
  font-size: 17px;
  line-height: 1.55;
  color: var(--ink-700);
  font-weight: 500;
  margin: 0;
  max-width: 32rem;
  margin-inline: auto;
  @media (min-width: 801px) {
    margin-inline: 0;
  }
`;

export const GummiesDuplicateLifestyle = () => {
  const { t } = useTranslation("gummiesDuplicate");
  return (
    <StyledSection>
      <StyledRow>
        <StyledMedia>
          <StyledImg>
            <Image
              src={GummiesDuplicateGallery[1]!}
              alt={t("lifestyle.imageAlt")}
              width={500}
              height={500}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </StyledImg>
        </StyledMedia>
        <StyledCopy>
          <StyledH2>
            {t("lifestyle.title")}
            <br />
            <StyledAccent>{t("lifestyle.titleAccent")}</StyledAccent>
          </StyledH2>
          <StyledP>{t("lifestyle.body")}</StyledP>
        </StyledCopy>
      </StyledRow>
    </StyledSection>
  );
};
