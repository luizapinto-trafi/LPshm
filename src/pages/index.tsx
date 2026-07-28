import Link from "next/link";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticProps } from "next";

/**
 * Design-lab index — a visual catalog of every landing/screen in this repo.
 * Each card is a live, scaled-down iframe preview (always current, no captured
 * thumbnails to maintain) wrapped in a link to the full page.
 */
type Landing = { href: string; title: string };

const LANDINGS: Landing[] = [
  { href: "/pages/truekind/supportive-comfort-wireless-shaping-bra", title: "Truekind — Supportive Comfort PDP" },
  { href: "/pages/truekind", title: "Truekind — Black Friday in July" },
  { href: "/pages/truekind-supportive-comfort-wireless-shaping-bra-offer-page-1", title: "Truekind Bra — Offer Page 1" },
  { href: "/pages/gruns-first-order", title: "Grüns — First Order" },
  { href: "/pages/gruns-first-order-olipop", title: "Grüns — First Order · Olipop" },
  { href: "/pages/gummies-duplicate-landing", title: "Gummies — Duplicate Landing" },
  { href: "/pages/strapless-landing", title: "Strapless — Landing" },
  { href: "/pages/strapless-b1g1-gift-lp", title: "Strapless — B1G1 + Gift LP" },
  { href: "/pages/weddings", title: "Weddings" },
  { href: "/pages/the-spa-dr-listcicle", title: "The Spa Dr — Listicle" },
  { href: "/pages/hairserum/tsd-hair-quiz", title: "The Spa Dr — Hair Quiz" },
  { href: "/pages/hairserum/lp1-lead-offershort-list-tox-v2", title: "Hair Serum — LP1 Lead Offer" },
  { href: "/pages/ebra-quiz-v1", title: "eBra — Fit Quiz V1 (Shop)" },
  { href: "/pages/ebra-quiz-v2", title: "eBra — Fit Quiz V2 (Email gate + Shop)" },
  { href: "/pages/ebra-box-quiz-v1", title: "eBra — Box Quiz V1 (TBYB)" },
  { href: "/pages/box-quiz-v2", title: "ShaperBox — Preference Quiz V2" },
  { href: "/pages/shapermint-upsell", title: "Shapermint — Cami Upsell" },
  { href: "/pages/shapermint-upsell-v2", title: "Shapermint — Cami Upsell V2" },
  { href: "/pages/shapermint-concept", title: "Shapermint — Concept" },
  { href: "/pages/shapermint-vs-honeylove-shapewear", title: "Shapermint vs. Honeylove — Shapewear" },
  { href: "/pages/shapermint-vs-honeylove-bras", title: "Shapermint vs. Honeylove — Bras" },
  { href: "/pages/quiz", title: "Quiz" },
  { href: "/pages/gamification", title: "Gamification" },
  { href: "/pages/new-landing", title: "New Landing · blank canvas" },
  { href: "/pages/blank", title: "Blank page" },
];

const StyledMain = styled.main`
  min-height: 100vh;
  max-width: 76rem;
  margin: 0 auto;
  padding: var(--space-800) clamp(12px, 4vw, var(--space-500)) var(--space-1200);
  color: var(--ink-900);
  font-family: var(--font-body);
  overflow-x: hidden;
`;

const StyledH1 = styled.h1`
  color: var(--ink-1000);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 var(--space-200) 0;
`;

const StyledP = styled.p`
  color: var(--ink-700);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 var(--space-700) 0;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 340px);
  justify-content: center;
  gap: var(--space-600);
`;

const StyledCard = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--ink-200);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--white);
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: var(--ink-400);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

/* Virtual viewport 1360x850 scaled by 0.25 → a 340x212.5 thumbnail. */
const StyledThumb = styled.div`
  position: relative;
  width: 340px;
  height: 213px;
  overflow: hidden;
  background: var(--ink-050);
  border-bottom: 1px solid var(--ink-200);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 1360px;
    height: 850px;
    border: 0;
    transform: scale(0.25);
    transform-origin: top left;
    pointer-events: none;
  }

  /* Transparent overlay so the whole card is clickable and mini-page inert. */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
  }
`;

const StyledMeta = styled.div`
  padding: var(--space-400) var(--space-400) var(--space-450);
`;

const StyledTitle = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  line-height: 1.3;
  color: var(--ink-1000);
`;

const StyledPath = styled.p`
  margin: var(--space-100) 0 0 0;
  font-size: 12px;
  line-height: 1.4;
  color: var(--ink-500);
  word-break: break-all;
`;

export const HomePage = () => {
  const { t } = useTranslation("common");
  return (
    <StyledMain>
      <StyledH1>{t("home.title", { defaultValue: "Landing Pages Design Lab" })}</StyledH1>
      <StyledP>
        {t("home.lead", {
          defaultValue: `${LANDINGS.length} screens. Each card is a live preview — click to open the full page.`,
        })}
      </StyledP>

      <StyledGrid>
        {LANDINGS.map((l) => (
          <StyledCard key={l.href} href={l.href} aria-label={l.title}>
            <StyledThumb>
              <iframe src={l.href} title={l.title} loading="lazy" scrolling="no" tabIndex={-1} aria-hidden />
            </StyledThumb>
            <StyledMeta>
              <StyledTitle>{l.title}</StyledTitle>
              <StyledPath>{l.href}</StyledPath>
            </StyledMeta>
          </StyledCard>
        ))}
      </StyledGrid>
    </StyledMain>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default HomePage;
