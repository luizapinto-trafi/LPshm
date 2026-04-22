import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { TruekindBraCtaLink } from "./TruekindBraCtaLink";
import { TruekindBraShopPdp } from "./truekindBraCdn";
import { handleKeyDown } from "@/shared/utils/KeyEvent";

const DEFAULT_VARIANT = "40278561292422";

const REVIEWS_ANCHOR = "reviews-scroll";

const StyledRegion = styled.section`
  background: var(--coral-050);
  padding: var(--space-1000) var(--space-400) var(--space-1000);
`;

const StyledH2 = styled.h2`
  color: var(--ink-1000);
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0 0 var(--space-1000) 0;
  text-transform: none;
`;

const StyledInner = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const StyledArticle = styled.article`
  border-bottom: 1px solid var(--ink-200);
  padding: var(--space-500) 0;
  &:first-of-type {
    border-top: 1px solid var(--ink-200);
  }
`;

const StyledH3 = styled.h3`
  color: var(--ink-1000);
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 var(--space-300) 0;
  text-transform: none;
`;

const StyledAnswer = styled.p`
  color: var(--ink-800);
  font-size: 15px;
  line-height: 1.55;
  margin: 0;
`;

const StyledCtaBlock = styled.div`
  text-align: center;
  margin-top: var(--space-800);
`;

const StyledScroll = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  background: none;
  border: none;
  color: var(--ink-800);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: underline;
  margin-top: var(--space-600);
  margin-bottom: var(--space-400);
  padding: var(--space-200) 0;
  cursor: pointer;
  font-family: var(--font-body);
  &:hover {
    color: var(--coral-500);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
  }
`;

const qas = [
  { q: "q1" as const, a: "a1" as const },
  { q: "q2" as const, a: "a2" as const },
  { q: "q3" as const, a: "a3" as const },
  { q: "q4" as const, a: "a4" as const },
];

type TruekindBraFaqSectionProps = { shopVariantId?: string };

export const TruekindBraFaqSection = ({ shopVariantId = DEFAULT_VARIANT }: TruekindBraFaqSectionProps) => {
  const { t } = useTranslation("truekindBra");
  const href = TruekindBraShopPdp.withVariant(shopVariantId);
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div id={REVIEWS_ANCHOR} tabIndex={-1} style={{ scrollMarginTop: 80 }} />
      <StyledRegion id="faqs" aria-label={t("faq.title")}>
        <StyledH2>{t("faq.title")}</StyledH2>
        <StyledInner>
          {qas.map((item) => (
            <StyledArticle key={item.q}>
              <StyledH3>{t(`faq.${item.q}` as const)}</StyledH3>
              <StyledAnswer>{t(`faq.${item.a}` as const)}</StyledAnswer>
            </StyledArticle>
          ))}
        </StyledInner>
        <StyledCtaBlock>
          <TruekindBraCtaLink href={href}>{t("faq.shop")}</TruekindBraCtaLink>
          <StyledScroll
            type="button"
            onClick={toTop}
            onKeyDown={(e) => handleKeyDown(e, toTop, ["Enter", " "])}
          >
            {t("faq.scrollTop")}
          </StyledScroll>
        </StyledCtaBlock>
      </StyledRegion>
    </>
  );
};
