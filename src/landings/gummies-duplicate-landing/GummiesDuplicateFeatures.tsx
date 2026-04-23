import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { GummiesDuplicateGallery } from "./gummiesDuplicateCdn";

const StyledSection = styled.section`
  background: var(--white);
  border-top: 1px solid var(--ink-200);
  padding: var(--space-1000) var(--space-400);
  @media (min-width: 801px) {
    padding: var(--space-1200) var(--space-1000);
  }
`;

const StyledInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const StyledHead = styled.div`
  text-align: center;
  margin-bottom: var(--space-800);
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.2vw, 2.5rem);
  font-weight: 800;
  color: var(--ink-1000);
  margin: 0 0 var(--space-400) 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

const StyledLead = styled.p`
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.55;
  color: var(--ink-600);
  font-weight: 500;
  margin: 0;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-800);
  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-400);
  }
`;

const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1000);
  flex: 1;
  width: 100%;
  max-width: 320px;
  @media (max-width: 999px) {
    max-width: 26rem;
  }
`;

const StyledFeature = styled.div<{ $right?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media (min-width: 1000px) {
    text-align: ${(p) => (p.$right ? "left" : "right")};
    align-items: ${(p) => (p.$right ? "flex-start" : "flex-end")};
  }
`;

const StyledIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background: var(--coral-200);
  border: 2px solid var(--ink-1000);
  box-shadow: 2px 2px 0 0 var(--ink-1000);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-1000);
  margin-bottom: var(--space-300);
`;

const StyledH3 = styled.h3`
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gruns-primary);
  margin: 0 0 var(--space-200) 0;
`;

const StyledBody = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink-600);
  font-weight: 500;
  margin: 0;
`;

const StyledCenter = styled.div`
  width: 100%;
  max-width: 400px;
  flex-shrink: 0;
  @media (min-width: 1000px) {
    order: 0;
  }
  order: -1;
`;

const StyledCenterImg = styled.div`
  border-radius: var(--radius-xl);
  border: 2px solid var(--ink-1000);
  box-shadow: 4px 4px 0 0 var(--ink-1000);
  overflow: hidden;
  line-height: 0;
  background: var(--ink-100);
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
        </svg>
      );
    default:
      return null;
  }
}

type Pillar = { title: string; body: string; icon: string };

export const GummiesDuplicateFeatures = () => {
  const { t } = useTranslation("gummiesDuplicate");
  const pillars = t("features.pillars", { returnObjects: true }) as Pillar[];
  const [p0, p1, p2, p3] = pillars;
  return (
    <StyledSection id="reviews">
      <StyledInner>
        <StyledHead>
          <StyledH2>{t("features.title")}</StyledH2>
          <StyledLead>{t("features.lead")}</StyledLead>
        </StyledHead>
        <StyledRow>
          <StyledCol>
            {p0 && (
              <StyledFeature>
                <StyledIcon>
                  <PillarIcon name={p0.icon} />
                </StyledIcon>
                <StyledH3>{p0.title}</StyledH3>
                <StyledBody>{p0.body}</StyledBody>
              </StyledFeature>
            )}
            {p1 && (
              <StyledFeature>
                <StyledIcon>
                  <PillarIcon name={p1.icon} />
                </StyledIcon>
                <StyledH3>{p1.title}</StyledH3>
                <StyledBody>{p1.body}</StyledBody>
              </StyledFeature>
            )}
          </StyledCol>
          <StyledCenter>
            <StyledCenterImg>
              <Image
                src={GummiesDuplicateGallery[1]!}
                alt={t("features.centerImageAlt")}
                width={400}
                height={500}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </StyledCenterImg>
          </StyledCenter>
          <StyledCol>
            {p2 && (
              <StyledFeature $right>
                <StyledIcon>
                  <PillarIcon name={p2.icon} />
                </StyledIcon>
                <StyledH3>{p2.title}</StyledH3>
                <StyledBody>{p2.body}</StyledBody>
              </StyledFeature>
            )}
            {p3 && (
              <StyledFeature $right>
                <StyledIcon>
                  <PillarIcon name={p3.icon} />
                </StyledIcon>
                <StyledH3>{p3.title}</StyledH3>
                <StyledBody>{p3.body}</StyledBody>
              </StyledFeature>
            )}
          </StyledCol>
        </StyledRow>
      </StyledInner>
    </StyledSection>
  );
};
