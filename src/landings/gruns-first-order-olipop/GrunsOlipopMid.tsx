import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { GrunsOlipopGallery } from "./grunsOlipopCdn";

const StyledTasteSection = styled.section`
  background: var(--coral-100);
  padding: clamp(48px, 8vw, 96px) var(--space-1000) clamp(64px, 10vw, 112px);
  @media (max-width: 800px) {
    padding: var(--space-800) var(--space-400);
  }
`;

const StyledTasteInner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const StyledHead = styled.div`
  text-align: center;
  max-width: 820px;
  margin-bottom: clamp(40px, 6vw, 72px);
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 3.2vw, 2.35rem);
  font-weight: 700;
  color: var(--ink-1000);
  margin: 0 0 var(--space-400) 0;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-align: center;
`;

const StyledLead = styled.p`
  font-family: var(--font-body);
  font-size: clamp(15px, 1.5vw, 18px);
  line-height: 1.55;
  color: var(--ink-900);
  margin: 0;
  text-align: center;
`;

const StyledMark = styled.mark`
  background: rgba(41, 41, 41, 0.08);
  color: inherit;
  padding: 0.08em 0.2em;
  border-radius: 2px;
  font-weight: inherit;
`;

const StyledPillarRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 4vw, 56px);
  width: 100%;
  max-width: 1120px;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: clamp(36px, 6vw, 56px);
  }
`;

const StyledSideCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(40px, 7vh, 80px);
  flex: 1 1 0;
  min-width: 0;
  max-width: 300px;
  @media (max-width: 900px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: none;
    width: 100%;
    gap: clamp(28px, 5vw, 40px);
  }
  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

const StyledFeature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-300);
  max-width: 260px;
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;
`;

const StyledIconCircle = styled.span`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-1000);
  flex-shrink: 0;
`;

const StyledFeatureTitle = styled.h3`
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink-1000);
  margin: 0;
  letter-spacing: 0.01em;
`;

const StyledFeatureBody = styled.p`
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink-900);
  margin: 0;
`;

const StyledCenterVisual = styled.div`
  position: relative;
  flex-shrink: 0;
  width: min(100%, 340px);
  aspect-ratio: 4 / 5;
  max-height: 420px;
  @media (max-width: 900px) {
    order: -1;
    width: min(100%, 300px);
    max-height: 380px;
  }
`;

const StyledCta = styled.a`
  display: inline-flex;
  margin-top: clamp(40px, 6vw, 64px);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  color: var(--gruns-primary);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledStorySection = styled.section`
  background: var(--white);
  padding: var(--space-1200) var(--space-1000);
  @media (max-width: 800px) {
    padding: var(--space-800) var(--space-400);
  }
`;

const StyledStoryInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const StyledStoryH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  color: var(--gruns-dark);
  margin: 0 0 var(--space-400) 0;
  scroll-margin-top: 96px;
`;

const StyledStoryLead = styled.p`
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.55;
  color: var(--gruns-gray);
  margin: 0 0 var(--space-800) 0;
  max-width: 720px;
`;

const StyledBadge = styled.p`
  display: inline-block;
  background: var(--coral-100);
  color: var(--ink-900);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  padding: var(--space-200) var(--space-400);
  border-radius: var(--radius-full);
  margin: 0 0 var(--space-300) 0;
`;

const StyledH3Offer = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
  font-weight: 700;
  color: var(--gruns-dark);
  margin: 0 0 var(--space-600) 0;
`;

const StyledScroller = styled.div`
  display: flex;
  gap: var(--space-400);
  overflow-x: auto;
  padding-bottom: var(--space-200);
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`;

const StyledShot = styled.div`
  flex: 0 0 min(280px, 70vw);
  scroll-snap-align: start;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--ink-200);
  position: relative;
  background: var(--ink-050);
  min-height: 220px;
  aspect-ratio: 4 / 3;
`;

function PillarIcon({ name }: { name: string }) {
  const s = { width: 30, height: 30 } as const;
  switch (name) {
    case "gut":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4C9.5 4 8 6.5 8 9c0 2 1 3.5 2 4.5V19c0 1 .8 2 2 2s2-1 2-2v-5.5c1-1 2-2.5 2-4.5 0-2.5-1.5-5-4-5Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "immunity":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3 5 6v6c0 5 3.5 9 7 10 3.5-1 7-5 7-10V6l-7-3Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <path
            d="M12 9v6M9 12h6"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
      );
    case "energy":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8 11c2-3 5-5 8-6-1 3-1 6 0 9-3-1-6-1-8-3Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <path
            d="M6 20c2-2 4-3 6-3"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
      );
    case "brain":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9.5 4C8 4 6.5 5 6 6.5 5 8 5.5 9.5 7 10c-1 .5-1.5 2-1.5 3.5.5 2 2 3.5 4 3.5h2c2 0 3.5-1.5 4-3.5 0-1.5-.5-3-1.5-3.5 1.5-.5 2-2 2-3.5C14 5 12.5 4 11 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M9 14h6M10 17h4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export const GrunsOlipopMid = () => {
  const { t } = useTranslation("grunsOlipop");
  const pillars = t("taste.pillars", { returnObjects: true }) as Array<{
    title: string;
    body: string;
    icon: string;
  }>;
  const [gut, immunity, energy, brain] = pillars;
  const collabSrc = GrunsOlipopGallery[0];

  return (
    <>
      <StyledTasteSection aria-labelledby="olipop-taste-heading">
        <StyledTasteInner>
          <StyledHead>
            <StyledH2 id="olipop-taste-heading">{t("taste.title")}</StyledH2>
            <StyledLead>
              {t("taste.leadBefore")}
              <StyledMark>{t("taste.leadMark")}</StyledMark>
              {t("taste.leadAfter")}
            </StyledLead>
          </StyledHead>

          <StyledPillarRow>
            <StyledSideCol>
              <StyledFeature>
                <StyledIconCircle>
                  <PillarIcon name={gut.icon} />
                </StyledIconCircle>
                <StyledFeatureTitle>{gut.title}</StyledFeatureTitle>
                <StyledFeatureBody>{gut.body}</StyledFeatureBody>
              </StyledFeature>
              <StyledFeature>
                <StyledIconCircle>
                  <PillarIcon name={energy.icon} />
                </StyledIconCircle>
                <StyledFeatureTitle>{energy.title}</StyledFeatureTitle>
                <StyledFeatureBody>{energy.body}</StyledFeatureBody>
              </StyledFeature>
            </StyledSideCol>

            <StyledCenterVisual>
              <Image
                src={collabSrc}
                alt={t("taste.collabImageAlt")}
                fill
                sizes="(max-width: 900px) 300px, 340px"
                style={{ objectFit: "contain" }}
                priority
              />
            </StyledCenterVisual>

            <StyledSideCol>
              <StyledFeature>
                <StyledIconCircle>
                  <PillarIcon name={immunity.icon} />
                </StyledIconCircle>
                <StyledFeatureTitle>{immunity.title}</StyledFeatureTitle>
                <StyledFeatureBody>{immunity.body}</StyledFeatureBody>
              </StyledFeature>
              <StyledFeature>
                <StyledIconCircle>
                  <PillarIcon name={brain.icon} />
                </StyledIconCircle>
                <StyledFeatureTitle>{brain.title}</StyledFeatureTitle>
                <StyledFeatureBody>{brain.body}</StyledFeatureBody>
              </StyledFeature>
            </StyledSideCol>
          </StyledPillarRow>

          <StyledCta href="#offers">{t("taste.cta")}</StyledCta>
        </StyledTasteInner>
      </StyledTasteSection>

      <StyledStorySection>
        <StyledStoryInner>
          <StyledStoryH2>{t("story.title")}</StyledStoryH2>
          <StyledStoryLead>{t("story.body")}</StyledStoryLead>
          <StyledBadge>{t("story.badge")}</StyledBadge>
          <StyledH3Offer>{t("story.offerTitle")}</StyledH3Offer>
          <StyledScroller aria-label="Product gallery">
            {GrunsOlipopGallery.map((src, i) => (
              <StyledShot key={i}>
                <Image src={src} alt="" fill sizes="280px" style={{ objectFit: "cover" }} />
              </StyledShot>
            ))}
          </StyledScroller>
        </StyledStoryInner>
      </StyledStorySection>
    </>
  );
};
