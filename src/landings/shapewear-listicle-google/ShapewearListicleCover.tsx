import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { ShapewearListicleCta } from "./ShapewearListicleCta";
import {
  ShapewearListicleCdn,
  ShapewearListicleCollectionUrl,
} from "./shapewearListicleCdn";

const STAR_COLOR = "var(--gold-600)";
const STAR_EMPTY = "var(--ink-200)";

/**
 * Desktop: photo as background + left copy + author + CTA.
 * Mobile: title → author → dek → proof → image → CTA.
 */
const StyledSection = styled.section`
  position: relative;
  overflow: hidden;
  background: var(--coral-050);

  @media (min-width: 901px) {
    min-height: min(560px, 78vh);
    display: flex;
    align-items: flex-end;
    background-color: var(--coral-050);
    background-image: url(${ShapewearListicleCdn.coverDesk});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const StyledInner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(var(--space-600), 8vw, var(--space-1200))
    clamp(var(--space-200), 4vw, var(--space-800))
    clamp(var(--space-500), 6vw, var(--space-1000));
  box-sizing: border-box;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: left;
    padding: var(--space-300) var(--space-250) var(--space-300);
    max-width: 100%;
    background: var(--white);
  }
`;

const StyledCopy = styled.div`
  max-width: 36rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-250);

  @media (min-width: 901px) {
    gap: var(--space-300);
  }

  @media (max-width: 900px) {
    max-width: 100%;
    gap: var(--space-200);
  }
`;

const StyledH1 = styled.h1`
  margin: 0;
  color: var(--ink-900);
  font-family: var(--font-display);
  font-size: clamp(24px, 3.2vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;

  @media (max-width: 900px) {
    font-size: 24px;
    line-height: 1.25;
  }
`;

const StyledByline = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-150);
  margin: 0;
`;

const StyledAvatar = styled(Image)`
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  object-fit: cover;
  flex-shrink: 0;
`;

const StyledBylineBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-050);
`;

const StyledAuthor = styled.span`
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-900);
  line-height: 1.2;
`;

const StyledDate = styled.span`
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--ink-600);
  line-height: 1.2;
`;

const StyledLead = styled.p`
  margin: 0;
  color: var(--ink-800);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.5;
  max-width: 34rem;

  @media (max-width: 900px) {
    font-size: 14px;
    line-height: 22px;
    max-width: 100%;
  }
`;

const StyledProof = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: var(--space-100);
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--ink-900);
    line-height: 1;
  }
`;

const StyledStars = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  line-height: 0;
`;

const StyledDesktopCta = styled.div`
  display: block;
  width: auto;
  margin-top: var(--space-100);

  & > a {
    width: auto;
    min-width: 220px;
    max-width: 100%;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const StyledMobileCta = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    width: 100%;
    justify-content: stretch;
    margin: var(--space-200) 0 0;
    padding: 0;
    box-sizing: border-box;

    & > a {
      width: 100%;
      max-width: none;
    }
  }
`;

const StyledMobileImage = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: block;
    width: calc(100% + 40px);
    margin: 0 -20px;
    line-height: 0;
    overflow: hidden;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }
`;

const StyledMobileImg = styled(Image)`
  width: 100%;
  height: auto;
  display: block;
`;

const Star = ({ fill }: { fill: "full" | "half" }) => {
  if (fill === "half") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
        <defs>
          <linearGradient id="coverHalfStar" x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor={STAR_COLOR} />
            <stop offset="50%" stopColor={STAR_EMPTY} />
          </linearGradient>
        </defs>
        <path
          fill="url(#coverHalfStar)"
          d="M8 1.2l1.76 3.56 3.93.57-2.84 2.77.67 3.91L8 10.96l-3.52 1.85.67-3.91L2.31 5.33l3.93-.57L8 1.2z"
        />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill={STAR_COLOR}
        d="M8 1.2l1.76 3.56 3.93.57-2.84 2.77.67 3.91L8 10.96l-3.52 1.85.67-3.91L2.31 5.33l3.93-.57L8 1.2z"
      />
    </svg>
  );
};

export const ShapewearListicleCover = () => {
  const { t } = useTranslation("shapewearListicleGoogle");
  const cta = (
    <ShapewearListicleCta
      label={t("cover.cta")}
      href={ShapewearListicleCollectionUrl}
    />
  );

  return (
    <StyledSection aria-label={t("cover.title")}>
      <StyledInner>
        <StyledCopy>
          <StyledH1>{t("cover.title")}</StyledH1>

          <StyledByline>
            <StyledAvatar
              src={ShapewearListicleCdn.authorAvatar}
              width={88}
              height={88}
              alt={t("cover.authorAlt")}
            />
            <StyledBylineBody>
              <StyledAuthor>{t("cover.byline")}</StyledAuthor>
              <StyledDate>{t("cover.bylineDate")}</StyledDate>
            </StyledBylineBody>
          </StyledByline>

          <StyledLead>{t("cover.subtitle")}</StyledLead>

          <StyledProof>
            <span>4.5/5</span>
            <StyledStars aria-label="4.5 out of 5 stars">
              <Star fill="full" />
              <Star fill="full" />
              <Star fill="full" />
              <Star fill="full" />
              <Star fill="half" />
            </StyledStars>
            <span>Over 1 million sold</span>
          </StyledProof>

          <StyledDesktopCta>{cta}</StyledDesktopCta>
        </StyledCopy>

        <StyledMobileImage>
          <StyledMobileImg
            src={ShapewearListicleCdn.coverMobile}
            alt={t("cover.title")}
            width={750}
            height={900}
            priority
            unoptimized
          />
        </StyledMobileImage>

        <StyledMobileCta>{cta}</StyledMobileCta>
      </StyledInner>
    </StyledSection>
  );
};
