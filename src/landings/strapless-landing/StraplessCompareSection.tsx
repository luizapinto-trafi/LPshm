import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessCdn } from "./straplessCdn";
import { StraplessPrimaryButton } from "./StraplessPrimaryButton";
import { straplessSectionH2Typography } from "./straplessSectionH2Typography";

/* Frame 2350:2675 + DS: intro 264px, columnas producto fluidas 1fr; gaps --space-*; CTA #f7a08b */

const INTRO_W = 264;
/** Ancho mínimo de tarjeta en carrusel móvil (legibilidad + scroll si no caben 3). */
const MOBILE_CARD_MIN = 156;
/** Dimensiones intrínsecas de assets compare / Mask group (308×370). */
const COMPARE_PRODUCT_W = 308;
const COMPARE_PRODUCT_H = 370;

/** `<img>` nativo: evita fallos del wrapper de `next/image` en columnas flex (p. ej. 3ª card). */
const CompareProductPhoto = styled.img`
  display: block;
  width: 100%;
  max-width: ${COMPARE_PRODUCT_W}px;
  height: auto;
  object-fit: contain;
  border-radius: 17px;
  background: #fff;
  flex-shrink: 0;
  align-self: center;
`;

const CompareCta = styled(StraplessPrimaryButton)`
  width: 100%;
  max-width: ${INTRO_W}px;
  background: #f7a08b;
  color: #292929;
  border-radius: 8px;
  min-height: 48px;
  font-weight: 600;
  @media (max-width: 1100px) {
    max-width: none;
  }
  &:hover {
    background: #e8957a;
    color: #292929;
  }
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 0;
  width: 100%;
  padding: clamp(var(--space-600), 7vw, var(--space-1000)) 0;
  background: #fff;
`;

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1512px;
  margin: 0 auto;
  padding: 0 clamp(var(--space-200), 4vw, var(--space-800));
`;

/**
 * Móvil: ancho del contenedor de landing (márgenes vía `StyledWrap` + DS), scroll horizontal si hace falta.
 * Desktop: sin overflow horizontal.
 */
const StyledHScroll = styled.div`
  display: block;
  width: 100%;
  min-width: 0;
  @media (max-width: 1100px) {
    width: 100%;
    max-width: 100%;
    margin: 0;
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    padding: 0 0 var(--space-075) 0;
    touch-action: pan-x;
  }
`;

/** Grilla 4 col desktop: intro fija + 3 columnas reparten el ancho restante. */
const StyledInner = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: ${INTRO_W}px repeat(3, minmax(0, 1fr));
  align-items: stretch;
  column-gap: var(--space-300);
  row-gap: 0;
  & > *:first-child {
    margin-right: var(--space-050);
  }
`;

/** Móvil: 3 columnas `1fr` dentro del ancho útil; si el mínimo no cabe, el bloque supera el 100% y hay scroll. */
const MOBILE_THREE_COLS_MIN = MOBILE_CARD_MIN * 3;
const StyledInnerMobile = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(${MOBILE_CARD_MIN}px, 1fr));
  box-sizing: border-box;
  width: 100%;
  min-width: max(100%, calc(${MOBILE_THREE_COLS_MIN}px + 2 * var(--space-100)));
  gap: var(--space-100);
  align-items: stretch;
  & > * {
    scroll-snap-align: start;
    min-width: 0;
  }
`;

const StyledLayoutDesktop = styled.div`
  @media (max-width: 1100px) {
    display: none;
  }
`;

const StyledLayoutMobile = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: stretch;
    gap: var(--space-300);
  }
`;

const StyledMobileHeader = styled.div`
  @media (max-width: 1100px) {
    width: 100%;
    padding: 0 0 var(--space-100) 0;
    box-sizing: border-box;
  }
`;

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-250);
  min-height: 100%;
  height: 100%;
  padding-bottom: var(--space-300);
  @media (max-width: 1100px) {
    max-width: 100%;
    min-height: 0;
    height: auto;
  }
`;

/** Empuja la lista de beneficios hasta alinear su inicio con el de ✅/❌ en las cards (misma altura de fila en grilla). */
const StyledIntroPreBenefitsSpacer = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
`;

const StyledIntroH2 = styled.h2`
  ${straplessSectionH2Typography}
  text-align: left;
  margin: 0;
  white-space: pre-line;
  flex-shrink: 0;
`;

/** Título solo móvil: máximo 2 líneas (los \\n del copy se colapsan y el wrap es por palabras). */
const StyledIntroH2Mobile = styled.h2`
  ${straplessSectionH2Typography}
  line-height: 1.22;
  margin: 0;
  text-align: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  white-space: normal;
  overflow-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

/** CTA solo desktop; en móvil se usa `StyledCtaMobile` bajo el scroll. */
const StyledCtaBlock = styled.div`
  flex-shrink: 0;
  @media (max-width: 1100px) {
    display: none;
  }
`;

/** CTA ancho completo bajo el carrusel (Figma móvil). */
const StyledCtaMobile = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: var(--space-300) 0 var(--space-050) 0;
  }
`;

const StyledBenefits = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${INTRO_W}px;
  flex-shrink: 0;
  @media (max-width: 1100px) {
    display: none;
  }
`;

/** Misma caja de fila que `StyledMarkRow` (líneas alineadas entre intro y cards). */
const COMPARE_ROW_MIN = `calc(var(--space-600) + var(--space-100))`;

const StyledBenefit = styled.div`
  box-sizing: border-box;
  min-height: ${COMPARE_ROW_MIN};
  display: flex;
  align-items: center;
  padding: 0;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.35;
  color: #000;
  border-top: 1px solid var(--ink-200);
  &:last-child {
    border-bottom: 1px solid var(--ink-200);
  }
`;

const StyledShmCol = styled.div`
  background: #f6f6f1;
  border-radius: 4px;
  padding: var(--space-250) var(--space-200) var(--space-300);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-250);
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  @media (max-width: 1100px) {
    max-width: 100%;
  }
`;

const StyledCompCol = styled.div`
  background: #fff;
  border: 1px solid var(--ink-200);
  border-radius: 4px;
  padding: var(--space-250) var(--space-200) var(--space-300);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-250);
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  @media (max-width: 1100px) {
    max-width: 100%;
  }
`;

/** Ocupa el espacio sobrante bajo la imagen para alinear subcabecera + tabla entre las 3 cards. */
const StyledQuoteBlock = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-100);
  justify-content: flex-start;
`;

const StyledLogoWrap = styled.a`
  display: block;
  line-height: 0;
  text-align: center;
  align-self: center;
  flex-shrink: 0;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

const StyledCompLabel = styled.div`
  font-family: var(--font-body);
  font-weight: 900;
  font-size: 18px;
  line-height: 1.3;
  text-align: center;
  color: #000;
  width: 100%;
  flex-shrink: 0;
`;

const StyledQuote = styled.p`
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.18;
  color: #000;
  margin: 0;
  width: 100%;
  text-align: left;
  @media (max-width: 1100px) {
    font-size: 14px;
    line-height: 1.14;
  }
`;

const StyledName = styled.div`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 800;
  color: #000;
  text-align: left;
  width: 100%;
`;

const StyledSubhead = styled.div`
  width: 100%;
  text-align: center;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 900;
  line-height: 1.2;
  color: #000;
  margin: 0;
  min-height: 2.6em;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/** Reserva la misma altura que la subcabecera de las cards para alinear la tabla de beneficios con ✅/❌. */
const StyledIntroSubheadPhantom = styled(StyledSubhead)`
  visibility: hidden;
  color: transparent;
  pointer-events: none;
  user-select: none;
`;

const StyledMarks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const StyledMarkRow = styled.div`
  box-sizing: border-box;
  min-height: ${COMPARE_ROW_MIN};
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--ink-200);
  font-size: 18px;
  line-height: 1.35;
  &:last-child {
    border-bottom: 1px solid var(--ink-200);
  }
`;

const BENEFIT_KEYS = ["benefit0", "benefit1", "benefit2", "benefit3"] as const;
const US_MARKS = [true, true, true, true] as const;
const COMP1_MARKS = [true, false, false, false] as const;
const COMP2_MARKS = [false, true, false, false] as const;

export const StraplessCompareSection = () => {
  const { t } = useTranslation("strapless");
  const titleAria = t("compare.title").replace(/\n/g, " ");
  const productColumns = (
    <>
      <StyledShmCol>
        <StyledLogoWrap href="https://shapermint.com" aria-label="Shapermint home">
          <Image src={StraplessCdn.logo} alt="" width={164} height={28} unoptimized />
        </StyledLogoWrap>
        <CompareProductPhoto
          src={StraplessCdn.compareUsProduct}
          alt={t("compare.colUsImageAlt")}
          width={COMPARE_PRODUCT_W}
          height={COMPARE_PRODUCT_H}
          loading="eager"
          decoding="async"
        />
        <StyledQuoteBlock>
          <StyledQuote>{t("compare.colUsQuote")}</StyledQuote>
          <StyledName>{t("compare.colUsName")}</StyledName>
        </StyledQuoteBlock>
        <StyledSubhead>{t("compare.colUsSub")}</StyledSubhead>
        <StyledMarks>
          {US_MARKS.map((ok, i) => (
            <StyledMarkRow key={i} aria-hidden>
              {ok ? "✅" : "❌"}
            </StyledMarkRow>
          ))}
        </StyledMarks>
      </StyledShmCol>

      <StyledCompCol>
        <StyledCompLabel>{t("compare.compBrand")}</StyledCompLabel>
        <CompareProductPhoto
          src={StraplessCdn.competitor1}
          alt={t("compare.col1ImageAlt")}
          width={COMPARE_PRODUCT_W}
          height={COMPARE_PRODUCT_H}
          loading="eager"
          decoding="async"
        />
        <StyledQuoteBlock>
          <StyledQuote>{t("compare.col1Quote")}</StyledQuote>
          <StyledName>{t("compare.col1Name")}</StyledName>
        </StyledQuoteBlock>
        <StyledSubhead>{t("compare.col1Sub")}</StyledSubhead>
        <StyledMarks>
          {COMP1_MARKS.map((ok, i) => (
            <StyledMarkRow key={i} aria-hidden>
              {ok ? "✅" : "❌"}
            </StyledMarkRow>
          ))}
        </StyledMarks>
      </StyledCompCol>

      <StyledCompCol>
        <StyledCompLabel>{t("compare.compBrand")}</StyledCompLabel>
        <CompareProductPhoto
          src={StraplessCdn.competitor2}
          alt={t("compare.col2ImageAlt")}
          width={COMPARE_PRODUCT_W}
          height={COMPARE_PRODUCT_H}
          loading="eager"
          decoding="async"
        />
        <StyledQuoteBlock>
          <StyledQuote>{t("compare.col2Quote")}</StyledQuote>
          <StyledName>{t("compare.col2Name")}</StyledName>
        </StyledQuoteBlock>
        <StyledSubhead>{t("compare.col2Sub")}</StyledSubhead>
        <StyledMarks>
          {COMP2_MARKS.map((ok, i) => (
            <StyledMarkRow key={i} aria-hidden>
              {ok ? "✅" : "❌"}
            </StyledMarkRow>
          ))}
        </StyledMarks>
      </StyledCompCol>
    </>
  );

  return (
    <StyledSection aria-label={titleAria}>
      <StyledWrap>
        <StyledLayoutDesktop>
          <StyledHScroll role="region" aria-label={t("compare.hScrollLabel")}>
            <StyledInner>
              <StyledIntro>
                <StyledIntroH2 id="strapless-compare-title">{t("compare.title")}</StyledIntroH2>
                <StyledCtaBlock>
                  <CompareCta href="#buy" $wide>
                    {t("compare.cta")}
                  </CompareCta>
                </StyledCtaBlock>
                <StyledIntroPreBenefitsSpacer aria-hidden />
                <StyledIntroSubheadPhantom aria-hidden>&nbsp;</StyledIntroSubheadPhantom>
                <StyledBenefits>
                  {BENEFIT_KEYS.map((k) => (
                    <StyledBenefit key={k}>{t(`compare.${k}` as const)}</StyledBenefit>
                  ))}
                </StyledBenefits>
              </StyledIntro>
              {productColumns}
            </StyledInner>
          </StyledHScroll>
        </StyledLayoutDesktop>

        <StyledLayoutMobile>
          <StyledMobileHeader>
            <StyledIntroH2Mobile id="strapless-compare-title-mobile">
              {t("compare.title")}
            </StyledIntroH2Mobile>
          </StyledMobileHeader>
          <StyledHScroll role="region" aria-label={t("compare.hScrollLabel")}>
            <StyledInnerMobile>{productColumns}</StyledInnerMobile>
          </StyledHScroll>
        </StyledLayoutMobile>

        <StyledCtaMobile>
          <CompareCta href="#buy" $wide>
            {t("compare.cta")}
          </CompareCta>
        </StyledCtaMobile>
      </StyledWrap>
    </StyledSection>
  );
};
