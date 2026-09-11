import Head from "next/head";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { LeggingsB2g3AnnouncementBar } from "./LeggingsB2g3AnnouncementBar";
import { LeggingsB2g3SiteHeader } from "./LeggingsB2g3SiteHeader";
import { LeggingsB2g3OfferSection } from "./LeggingsB2g3OfferSection";
import { LeggingsB2g3PdpRest } from "./LeggingsB2g3PdpRest";
import { LeggingsB2g3SiteFooter } from "./LeggingsB2g3SiteFooter";
import type { AnchorId, LayoutId } from "./leggingsB2g3Config";

const StyledSkip = styled.a`
  position: absolute;
  left: -10000px;
  top: 0;
  z-index: 200;
  padding: var(--space-200) var(--space-400);
  background: var(--coral-500);
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  border-radius: var(--radius-md);
  &:focus {
    left: var(--space-400);
    top: var(--space-200);
  }
`;

const StyledSticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--white);
`;

type LeggingsB2g3PageShellProps = {
  layout: LayoutId;
  anchor: AnchorId;
  canonicalPath: string;
  variantLabel: string;
};

export const LeggingsB2g3PageShell = ({
  layout,
  anchor,
  canonicalPath,
  variantLabel,
}: LeggingsB2g3PageShellProps) => {
  const { t } = useTranslation("leggingsB2g3");

  return (
    <>
      <Head>
        <title>
          {t("metaTitle")} — {variantLabel} | Shapermint
        </title>
        <meta name="description" content={t("metaDescription")} />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href={`https://shapermint.com${canonicalPath}`} />
      </Head>
      <StyledSticky>
        <LeggingsB2g3AnnouncementBar />
        <LeggingsB2g3SiteHeader />
      </StyledSticky>
      <StyledSkip href="#main-content">{t("a11y.skipToMain")}</StyledSkip>
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <LeggingsB2g3OfferSection layout={layout} anchor={anchor} />
        <LeggingsB2g3PdpRest />
      </main>
      <LeggingsB2g3SiteFooter />
    </>
  );
};
