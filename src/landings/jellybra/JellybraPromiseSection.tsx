import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { JellybraCdn } from "./jellybraCdn";
import { JellybraPrimaryButton } from "./JellybraPrimaryButton";

/**
 * Viral ebra Our Promise: text column + lifestyle image.
 * Mobile: text → image → CTA. Desktop: text left / image right.
 */
const StyledSection = styled.section`
  background: var(--white);
  padding: var(--space-800) 0;
  @media (max-width: 899px) {
    padding: var(--space-600) 0;
  }
`;

const StyledGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-400);
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: var(--space-1000);
  align-items: center;
  @media (max-width: 899px) {
    grid-template-columns: 1fr;
    gap: var(--space-600);
  }
`;

const StyledText = styled.div`
  min-width: 0;
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 700;
  line-height: 1.2;
  color: var(--ink-900);
  margin: 0 0 var(--space-600);
`;

const StyledH3 = styled.h3`
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--ink-900);
  margin: 0 0 var(--space-300);
`;

const StyledBlock = styled.div`
  & + & {
    margin-top: var(--space-600);
  }
`;

const StyledList = styled.ul`
  margin: 0;
  padding-left: 20px;
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.65;
  color: var(--ink-900);
  li + li {
    margin-top: 10px;
  }
`;

const StyledMobileMedia = styled.div`
  display: none;
  @media (max-width: 899px) {
    display: block;
    margin: var(--space-600) 0;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--coral-050);
    line-height: 0;
  }
`;

const StyledDesktopMedia = styled.div`
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--coral-050);
  line-height: 0;
  @media (max-width: 899px) {
    display: none;
  }
`;

const StyledCta = styled(JellybraPrimaryButton)`
  margin-top: var(--space-800);
  @media (max-width: 899px) {
    width: 100%;
  }
`;
type RightItem = { title: string; body: string };

export const JellybraPromiseSection = () => {
  const { t } = useTranslation("jellybra");
  const leftItems = t("promise.leftItems", { returnObjects: true }) as string[];
  const rightItems = t("promise.rightItems", { returnObjects: true }) as RightItem[];

  return (
    <StyledSection aria-labelledby="jellybra-promise-title">
      <StyledGrid>
        <StyledText>
          <StyledH2 id="jellybra-promise-title">{t("promise.title")}</StyledH2>
          <StyledBlock>
            <StyledH3>{t("promise.leftTitle")}</StyledH3>
            <StyledList>
              {leftItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </StyledList>
          </StyledBlock>
          <StyledBlock>
            <StyledH3>{t("promise.rightTitle")}</StyledH3>
            <StyledList>
              {rightItems.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong> {item.body}
                </li>
              ))}
            </StyledList>
          </StyledBlock>
          <StyledMobileMedia>
            <Image
              src={JellybraCdn.promiseJelly}
              alt={t("promise.imageAlt")}
              width={560}
              height={700}
              unoptimized
              style={{ width: "100%", height: "auto" }}
            />
          </StyledMobileMedia>
          <StyledCta href="#offer">{t("promise.cta")}</StyledCta>
        </StyledText>
        <StyledDesktopMedia>
          <Image
            src={JellybraCdn.promiseJelly}
            alt={t("promise.imageAlt")}
            width={560}
            height={700}
            unoptimized
            style={{ width: "100%", height: "auto" }}
          />
        </StyledDesktopMedia>
      </StyledGrid>
    </StyledSection>
  );
};
