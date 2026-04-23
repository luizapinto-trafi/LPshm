import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessCdn } from "./straplessCdn";
import { StraplessPrimaryButton } from "./StraplessPrimaryButton";

const StyledSection = styled.section`
  padding: clamp(50px, 7vw, 90px) 0;
  background: var(--white);
`;

const StyledWrap = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 60px);
`;

const StyledInner = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr 1fr 1fr;
  gap: var(--space-600);
  align-items: stretch;
  @media (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const StyledIntroCtaWrap = styled.div`
  align-self: flex-start;
  width: 100%;
  max-width: 331px;
  @media (max-width: 1023px) {
    max-width: 400px;
  }
`;

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  padding-top: 8px;
  @media (max-width: 1023px) {
    grid-column: 1 / -1;
  }
`;

const StyledIntroH2 = styled.h2`
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(30px, 3.2vw, 42px);
  line-height: 1.12;
  color: #000;
  margin: 0 0 var(--space-600);
  text-wrap: balance;
`;

const StyledBenefits = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

const StyledBenefit = styled.div`
  padding: 14px 0;
  border-top: 1px solid var(--ink-200);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  color: #000;
  &:last-child {
    border-bottom: 1px solid var(--ink-200);
  }
`;

const StyledCol = styled.div`
  background: #f6f6f1;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const StyledBrand = styled.div`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.14em;
  text-align: center;
  color: var(--ink-900);
  padding-bottom: 4px;
`;

const StyledProductImg = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1.2;
  border-radius: 20px;
  overflow: hidden;
  background: #ddd;
  img {
    object-fit: cover;
  }
`;

const StyledQuote = styled.p`
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.45;
  color: #000;
  margin: 0;
  flex: 1;
`;

const StyledName = styled.div`
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-700);
  margin-top: 4px;
`;

const StyledRows = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

const StyledRow = styled.div<{ $tone?: "ok" | "no" | "neutral"; $mark?: boolean }>`
  padding: 12px 0;
  border-top: 1px solid var(--ink-200);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: ${({ $mark }) => ($mark ? 20 : 16)}px;
  text-align: center;
  color: ${({ $tone }) =>
    $tone === "ok" ? "var(--success-700)" : $tone === "no" ? "var(--error-500)" : "var(--ink-900)"};
  min-height: 42px;
  &:last-child {
    border-bottom: 1px solid var(--ink-200);
  }
`;

export const StraplessCompareSection = () => {
  const { t } = useTranslation("strapless");
  return (
    <StyledSection aria-labelledby="strapless-compare-title">
      <StyledWrap>
        <StyledInner>
          <StyledIntro>
            <div>
              <StyledIntroH2 id="strapless-compare-title">{t("compare.title")}</StyledIntroH2>
              <StyledIntroCtaWrap>
                <StraplessPrimaryButton href="#buy" $wide>
                  {t("compare.cta")}
                </StraplessPrimaryButton>
              </StyledIntroCtaWrap>
            </div>
            <StyledBenefits>
              <StyledBenefit>{t("compare.benefit0")}</StyledBenefit>
              <StyledBenefit>{t("compare.benefit1")}</StyledBenefit>
              <StyledBenefit>{t("compare.benefit2")}</StyledBenefit>
            </StyledBenefits>
          </StyledIntro>

          <StyledCol>
            <StyledBrand>{t("compare.colUsBrand")}</StyledBrand>
            <StyledProductImg>
              <Image src={StraplessCdn.colorNude} alt={t("compare.colUsImageAlt")} fill sizes="280px" />
            </StyledProductImg>
            <StyledQuote>{t("compare.colUsQuote")}</StyledQuote>
            <StyledName>{t("compare.colUsName")}</StyledName>
            <StyledRows>
              <StyledRow>{t("compare.rowLabel")}</StyledRow>
              <StyledRow $mark $tone="ok">
                ✓
              </StyledRow>
              <StyledRow $mark $tone="ok">
                ✓
              </StyledRow>
              <StyledRow $mark $tone="ok">
                ✓
              </StyledRow>
              <StyledRow $mark $tone="ok">
                ✓
              </StyledRow>
            </StyledRows>
          </StyledCol>

          <StyledCol>
            <StyledBrand>{t("compare.colOtherBrand")}</StyledBrand>
            <StyledProductImg>
              <Image src={StraplessCdn.competitor1} alt={t("compare.col1ImageAlt")} fill sizes="280px" />
            </StyledProductImg>
            <StyledQuote>{t("compare.col1Quote")}</StyledQuote>
            <StyledName>{t("compare.col1Name")}</StyledName>
            <StyledRows>
              <StyledRow>{t("compare.rowBad1")}</StyledRow>
              <StyledRow $mark $tone="no">
                ✗
              </StyledRow>
              <StyledRow $mark $tone="no">
                ✗
              </StyledRow>
              <StyledRow $mark $tone="no">
                ✗
              </StyledRow>
              <StyledRow $mark $tone="no">
                ✗
              </StyledRow>
            </StyledRows>
          </StyledCol>

          <StyledCol>
            <StyledBrand>{t("compare.colOtherBrand")}</StyledBrand>
            <StyledProductImg>
              <Image src={StraplessCdn.competitor2} alt={t("compare.col2ImageAlt")} fill sizes="280px" />
            </StyledProductImg>
            <StyledQuote>{t("compare.col2Quote")}</StyledQuote>
            <StyledName>{t("compare.col2Name")}</StyledName>
            <StyledRows>
              <StyledRow>{t("compare.rowBad2")}</StyledRow>
              <StyledRow $mark $tone="no">
                ✗
              </StyledRow>
              <StyledRow $mark $tone="no">
                ✗
              </StyledRow>
              <StyledRow $mark $tone="no">
                ✗
              </StyledRow>
              <StyledRow $mark $tone="no">
                ✗
              </StyledRow>
            </StyledRows>
          </StyledCol>
        </StyledInner>
      </StyledWrap>
    </StyledSection>
  );
};
