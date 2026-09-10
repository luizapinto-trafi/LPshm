import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { ShapewearListicleCta } from "./ShapewearListicleCta";
import { ShapewearListicleImageSlot } from "./ShapewearListicleImageSlot";
import { ShapewearListiclePrice } from "./ShapewearListiclePrice";
import { ShapewearListicleSocialProof } from "./ShapewearListicleSocialProof";
import {
  ShapewearListicleCollectionUrl,
  ShapewearListicleProducts,
  type ShapewearListicleItemId,
} from "./shapewearListicleCdn";

const ITEM_ORDER: ShapewearListicleItemId[] = [
  "cami",
  "leggings",
  "sweetheart",
  "shorts",
  "empower",
];

const StyledArticle = styled.article`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(40px, 6vw, 72px) clamp(16px, 4vw, 64px) clamp(48px, 6vw, 80px);
  box-sizing: border-box;
  color: var(--ink-900);
  font-family: var(--font-body);
  background: var(--white);
`;

const StyledIntro = styled.div`
  width: 100%;
  max-width: none;
  margin: 0 0 clamp(48px, 7vw, 80px);
  text-align: left;
`;

const StyledParagraph = styled.p`
  margin: 0 0 var(--space-500);
  font-size: 17px;
  line-height: 1.65;
  color: var(--ink-800);
`;

/**
 * Desktop Z-pattern: odd = image left, even = image right.
 * Image height is driven by the text column (absolute cover fill).
 */
const StyledItem = styled.section<{ $reversed: boolean }>`
  display: flex;
  flex-direction: ${({ $reversed }) => ($reversed ? "row-reverse" : "row")};
  align-items: stretch;
  gap: clamp(28px, 4vw, 56px);
  margin: 0 0 clamp(48px, 7vw, 88px);
  padding: 0;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: var(--space-500);
  }
`;

const StyledMedia = styled.div`
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  /* Image does not set row height — text does. Absolute child fills this. */
  align-self: stretch;

  @media (max-width: 900px) {
    order: -1;
    flex: none;
    width: 100%;
    aspect-ratio: 1 / 1;
    min-height: 240px;
  }
`;

const StyledCopy = styled.div`
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  padding: 0;
`;

const StyledHeading = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.35rem, 2.2vw, 1.85rem);
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--ink-1000);
`;

const StyledBody = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.45;
  color: var(--ink-800);
`;

const StyledMetaList = styled.dl`
  margin: 2px 0 0;
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 12px;
  row-gap: 6px;
  align-items: start;
  font-size: 14px;
  line-height: 1.4;
`;

const StyledMetaRow = styled.div`
  display: contents;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2px;
  }
`;

const StyledMetaLabel = styled.dt`
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--ink-1000);
  white-space: nowrap;
`;

const StyledMetaValue = styled.dd`
  margin: 0;
  color: var(--ink-700);
`;

const StyledCtaWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: stretch;
  margin-top: 4px;

  & > a {
    width: 100%;
    max-width: none;
  }
`;

const StyledClose = styled.section`
  width: 100%;
  margin: var(--space-400) 0 0;
  padding-top: var(--space-800);
  border-top: 1px solid var(--ink-200);
  text-align: left;

  & > a {
    width: auto;
    min-width: 220px;
    max-width: 100%;
  }
`;

export const ShapewearListicleArticle = () => {
  const { t } = useTranslation("shapewearListicleGoogle");

  return (
    <StyledArticle>
      <StyledIntro>
        <StyledParagraph>{t("article.intro1")}</StyledParagraph>
        <StyledParagraph>{t("article.intro2")}</StyledParagraph>
      </StyledIntro>

      {ITEM_ORDER.map((id, index) => {
        const product = ShapewearListicleProducts[id];
        const number = t(`article.items.${id}.number`);
        const heading = t(`article.items.${id}.heading`);
        const reversed = index % 2 === 1;

        return (
          <StyledItem
            key={id}
            $reversed={reversed}
            aria-labelledby={`item-${id}-heading`}
          >
            <StyledMedia>
              <ShapewearListicleImageSlot
                src={product.image}
                alt={t(`article.items.${id}.imageAlt`)}
                priority={index === 0}
              />
            </StyledMedia>

            <StyledCopy>
              <StyledHeading id={`item-${id}-heading`}>
                {number}. {heading}
              </StyledHeading>
              <StyledBody>{t(`article.items.${id}.body`)}</StyledBody>
              <StyledMetaList>
                <StyledMetaRow>
                  <StyledMetaLabel>{t("article.bestForLabel")}:</StyledMetaLabel>
                  <StyledMetaValue>{t(`article.items.${id}.bestFor`)}</StyledMetaValue>
                </StyledMetaRow>
                <StyledMetaRow>
                  <StyledMetaLabel>{t("article.problemLabel")}:</StyledMetaLabel>
                  <StyledMetaValue>{t(`article.items.${id}.problem`)}</StyledMetaValue>
                </StyledMetaRow>
              </StyledMetaList>
              <ShapewearListiclePrice value={product.price} />
              <ShapewearListicleSocialProof
                id={id}
                rating={product.rating}
                reviewCount={product.reviewCount}
                href={product.url}
              />
              <StyledCtaWrap>
                <ShapewearListicleCta
                  label={t(`article.items.${id}.cta`)}
                  href={product.url}
                />
              </StyledCtaWrap>
            </StyledCopy>
          </StyledItem>
        );
      })}

      <StyledClose>
        <StyledParagraph>{t("article.close")}</StyledParagraph>
        <ShapewearListicleCta
          label={t("article.closeCta")}
          href={ShapewearListicleCollectionUrl}
        />
      </StyledClose>
    </StyledArticle>
  );
};
