import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { TruekindBraCdn, TruekindBraShopPdp } from "./truekindBraCdn";
import { handleKeyDown } from "@/shared/utils/KeyEvent";

const DEFAULT_VARIANT = "40278561292422";

const StyledSection = styled.section`
  background: var(--white);
  padding: var(--space-1000) var(--space-400) var(--space-1200);
`;

const StyledInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-800);
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const StyledGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
`;

const StyledH1 = styled.h1`
  color: var(--ink-1000);
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2vw, 1.5rem);
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 var(--space-200) 0;
  text-transform: none;
`;

const StyledMeta = styled.p`
  color: var(--ink-600);
  font-size: 14px;
  margin: 0 0 var(--space-400) 0;
  & a {
    color: var(--blue-700);
    text-decoration: underline;
  }
`;

const StyledP = styled.p`
  color: var(--ink-800);
  font-size: 15px;
  line-height: 1.4;
  margin: 0 0 var(--space-400) 0;
`;

const StyledFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
`;

const StyledLabel = styled.span`
  display: block;
  color: var(--ink-800);
  font-size: 13px;
  margin-bottom: 6px;
  font-weight: 500;
`;

const StyledAddToCart = styled.button`
  display: block;
  width: 100%;
  max-width: 320px;
  min-height: 48px;
  background: var(--coral-500);
  color: var(--white);
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: var(--space-200);
  &:hover {
    background: var(--coral-450);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const REVIEW_ANCHOR = "reviews-scroll";
const REVIEW_COUNT = 18_595;

type TruekindBraProductPdpSectionProps = {
  shopVariantIdOverride?: string;
};

export const TruekindBraProductPdpSection = ({ shopVariantIdOverride }: TruekindBraProductPdpSectionProps) => {
  const { t } = useTranslation("truekindBra");
  const { query } = useRouter();
  const v = (typeof query.variant === "string" && query.variant) || shopVariantIdOverride || DEFAULT_VARIANT;
  const shop = TruekindBraShopPdp.withVariant(v);

  const onAdd = () => {
    window.open(shop, "_self");
  };

  return (
    <StyledSection>
      <StyledInner>
        <StyledGallery>
          <div style={{ position: "relative", width: "100%" }}>
            <Image
              src={TruekindBraCdn.productBlack}
              alt={t("product.title")}
              width={500}
              height={620}
              unoptimized
              style={{ width: "100%", height: "auto", borderRadius: "var(--radius-xl)" }}
              priority
            />
          </div>
          <Image
            src={TruekindBraCdn.pdpCami}
            alt=""
            width={200}
            height={240}
            unoptimized
            style={{ objectFit: "cover", borderRadius: "var(--radius-md)" }}
          />
        </StyledGallery>
        <div>
          <StyledH1 id="pdp-title">{t("product.title")}</StyledH1>
          <StyledMeta>
            <a href={`#${REVIEW_ANCHOR}`}>{t("product.reviews", { count: REVIEW_COUNT.toLocaleString("en-US") })}</a>
          </StyledMeta>
          <StyledP id="pdp-savings-hint" aria-live="polite">
            {t("product.savings")} {t("product.colorLabel")}
          </StyledP>
          <StyledP>
            {t("variantNote", { id: v })}
          </StyledP>
          <Image
            src={TruekindBraCdn.productBlack}
            alt={t("product.colorSwatchBlackAlt")}
            width={200}
            height={240}
            unoptimized
            style={{ objectFit: "cover", borderRadius: "var(--radius-md)" }}
          />
          <StyledFields>
            <div>
              <StyledLabel as="span">{t("product.sizeLabel")}</StyledLabel>
            </div>
          </StyledFields>
          <StyledAddToCart type="button" onClick={onAdd} onKeyDown={(e) => handleKeyDown(e, onAdd, ["Enter", " "])}>
            {t("product.addToCart")}
          </StyledAddToCart>
        </div>
      </StyledInner>
    </StyledSection>
  );
};
