import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { ShapewearListicleCta } from "./ShapewearListicleCta";
import { ShapewearListicleImageSlot } from "./ShapewearListicleImageSlot";
import { ShapewearListiclePrice } from "./ShapewearListiclePrice";
import { ShapewearListicleSocialProof } from "./ShapewearListicleSocialProof";
import {
  ShapewearListicleItemId,
  ShapewearListicleProducts,
} from "./shapewearListicleCdn";

const ITEM_ORDER: ShapewearListicleItemId[] = [
  "cami",
  "leggings",
  "sweetheart",
  "shorts",
  "empower",
];

const StyledArticle = styled.article`
  background: var(--white);
  color: var(--ink-1000);
  padding: 0 0 var(--space-800);
`;

const StyledInner = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 clamp(24px, 6vw, 64px);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const StyledItem = styled.section`
  display: grid;
  grid-template-columns: minmax(240px, 320px) minmax(0, 28rem);
  justify-content: center;
  align-items: stretch;
  column-gap: clamp(40px, 5vw, 72px);
  padding: clamp(48px, 7vw, 80px) 0;
  border-top: 1px solid var(--ink-200);

  &:first-of-type {
    border-top: none;
    padding-top: clamp(40px, 6vw, 64px);
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 28px 0;
    align-items: stretch;
  }
`;

const StyledMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  align-self: start;
  overflow: hidden;
  border-radius: 8px;
  background: var(--coral-050);

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    margin: 0;
    aspect-ratio: 4 / 5;
    max-height: 380px;
    order: 2;
  }
`;

const StyledCopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding-top: 6px;
  max-width: 28rem;
  min-height: 100%;

  @media (max-width: 768px) {
    display: contents;
    padding-top: 0;
    max-width: none;
    min-height: 0;
  }
`;

const StyledTitle = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.2vw, 1.5rem);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--ink-1000);

  @media (max-width: 768px) {
    order: 1;
    font-size: 20px;
    line-height: 1.3;
  }
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    margin: 0;
    font-family: var(--font-body);
    font-size: 15px;
    line-height: 1.6;
    color: var(--ink-800);
    overflow-wrap: break-word;
  }

  @media (max-width: 768px) {
    order: 4;
    gap: 8px;
    margin-top: 0;

    p {
      font-size: 15px;
      line-height: 1.55;
    }
  }
`;

const StyledFacts = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  width: 100%;

  @media (max-width: 768px) {
    order: 5;
  }
`;

const StyledFact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StyledFactLabel = styled.dt`
  margin: 0;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--ink-1000);
  line-height: 1.3;
`;

const StyledFactValue = styled.dd`
  margin: 0;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.45;
  color: var(--ink-700);
`;

const StyledOffer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  margin-top: auto;
  padding-top: 20px;
  width: 100%;

  @media (max-width: 768px) {
    display: contents;
    margin-top: 0;
    padding-top: 0;
  }
`;

const StyledMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    order: 6;
    margin-top: 4px;
    gap: 10px;
    width: 100%;
    align-items: flex-start;
    text-align: left;
  }
`;

const StyledCtaWrap = styled.div`
  width: auto;

  & > a {
    width: auto;
    min-width: 200px;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    order: 7;
    margin-top: 0;
    width: 100%;

    & > a {
      width: 100%;
      min-width: 0;
      padding: 14px 20px;
      font-size: 13px;
    }
  }
`;

export const ShapewearListicleArticle = () => {
  const { t } = useTranslation("shapewearListicleGoogle");

  return (
    <StyledArticle>
      <StyledInner>
        {ITEM_ORDER.map((id) => {
          const product = ShapewearListicleProducts[id];
          const body = t(`article.items.${id}.body`);

          return (
            <StyledItem key={id} id={id}>
              <StyledMedia>
                <ShapewearListicleImageSlot
                  src={product.image}
                  alt={t(`article.items.${id}.imageAlt`)}
                />
              </StyledMedia>
              <StyledCopy>
                <StyledTitle>
                  {t(`article.items.${id}.number`)}.{" "}
                  {t(`article.items.${id}.heading`)}
                </StyledTitle>
                <StyledBody>
                  <p>{body}</p>
                </StyledBody>
                <StyledFacts>
                  <StyledFact>
                    <StyledFactLabel>{t("article.bestForLabel")}</StyledFactLabel>
                    <StyledFactValue>
                      {t(`article.items.${id}.bestFor`)}
                    </StyledFactValue>
                  </StyledFact>
                  <StyledFact>
                    <StyledFactLabel>{t("article.problemLabel")}</StyledFactLabel>
                    <StyledFactValue>
                      {t(`article.items.${id}.problem`)}
                    </StyledFactValue>
                  </StyledFact>
                </StyledFacts>
                <StyledOffer>
                  <StyledMeta>
                    <ShapewearListiclePrice
                      value={product.price}
                      compareAt={product.compareAt}
                      discountLabel={product.discountLabel}
                    />
                    <ShapewearListicleSocialProof
                      id={id}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      href={`${product.url}#reviews`}
                    />
                  </StyledMeta>
                  <StyledCtaWrap>
                    <ShapewearListicleCta
                      label={t(`article.items.${id}.cta`)}
                      href={product.url}
                    />
                  </StyledCtaWrap>
                </StyledOffer>
              </StyledCopy>
            </StyledItem>
          );
        })}
      </StyledInner>
    </StyledArticle>
  );
};
