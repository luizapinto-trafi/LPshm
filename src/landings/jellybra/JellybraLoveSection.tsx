import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { JellybraCdn } from "./jellybraCdn";
import { JellybraPrimaryButton } from "./JellybraPrimaryButton";

/**
 * Viral ebra whyLoveIt: image + checklist in one row, coral CTA centered below.
 */
const StyledSection = styled.section`
  width: 100%;
  padding: var(--space-800) 0 var(--space-800);
  background: var(--white);
  @media (max-width: 899px) {
    padding: var(--space-600) 0;
  }
`;

const StyledInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--space-400);
`;

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: var(--space-1000);
  align-items: center;
  @media (max-width: 899px) {
    grid-template-columns: 1fr;
    gap: var(--space-600);
  }
`;

const StyledMedia = styled.div`
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--coral-050);
  line-height: 0;
`;

const StyledCopy = styled.div`
  padding: var(--space-200) 0;
  @media (max-width: 899px) {
    padding: 0;
  }
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(26px, 4vw, 34px);
  line-height: 1.15;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0 0 var(--space-500);
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
`;

const StyledItem = styled.li`
  display: flex;
  gap: var(--space-300);
  align-items: flex-start;
`;

const StyledText = styled.span`
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.55;
  color: var(--ink-900);
`;

const StyledCtaWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--space-800);
`;

const StyledCta = styled(JellybraPrimaryButton)``;

type LoveItem = { title: string; body: string };

export const JellybraLoveSection = () => {
  const { t } = useTranslation("jellybra");
  const items = t("love.items", { returnObjects: true }) as LoveItem[];

  return (
    <StyledSection aria-labelledby="jellybra-love-title">
      <StyledInner>
        <StyledContent>
          <StyledMedia>
            <Image
              src={JellybraCdn.beforeAfter}
              alt={t("love.imageAlt")}
              width={640}
              height={800}
              unoptimized
              style={{ width: "100%", height: "auto" }}
            />
          </StyledMedia>
          <StyledCopy>
            <StyledH2 id="jellybra-love-title">{t("love.title")}</StyledH2>
            <StyledList>
              {items.map((item) => (
                <StyledItem key={item.title}>
                  <Image
                    src={JellybraCdn.checkmark}
                    alt=""
                    width={20}
                    height={20}
                    unoptimized
                    style={{ flex: "0 0 auto", marginTop: 3 }}
                  />
                  <StyledText>
                    <strong>{item.title}</strong> {item.body}
                  </StyledText>
                </StyledItem>
              ))}
            </StyledList>
          </StyledCopy>
        </StyledContent>
        <StyledCtaWrap>
          <StyledCta href="#offer">{t("love.cta")}</StyledCta>
        </StyledCtaWrap>
      </StyledInner>
    </StyledSection>
  );
};
