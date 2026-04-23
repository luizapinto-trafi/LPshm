import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledBlock = styled.section`
  padding: var(--space-1200) var(--space-1000);
  background: var(--white);
  @media (max-width: 800px) {
    padding: var(--space-800) var(--space-400);
  }
`;

const StyledInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const StyledH2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.8vw, 2rem);
  font-weight: 700;
  color: var(--gruns-dark);
  text-align: center;
  margin: 0 0 var(--space-800) 0;
`;

const StyledGrid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-600);
  margin-bottom: var(--space-800);
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const StyledStat = styled.div`
  text-align: center;
  padding: var(--space-600);
  border-radius: var(--radius-xl);
  background: var(--gruns-cream);
  border: 1px solid var(--ink-100);
`;

const StyledBig = styled.p`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 800;
  font-family: var(--font-display);
  color: var(--gruns-primary);
  margin: 0 0 var(--space-300) 0;
`;

const StyledCta = styled.a`
  display: table;
  margin: var(--space-600) auto 0;
  background: var(--gruns-primary);
  color: var(--white);
  font-weight: 600;
  padding: var(--space-400) var(--space-600);
  border-radius: var(--radius-xl);
  text-decoration: none;
  &:hover {
    background: var(--gruns-primary-light);
  }
`;

const StyledSnackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-500);
  margin-top: var(--space-800);
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StyledSnack = styled.div`
  padding: var(--space-500);
  border-radius: var(--radius-lg);
  background: var(--ink-050);
`;

const StyledList = styled.ul`
  margin: var(--space-400) auto 0;
  max-width: 520px;
  padding-left: 1.2rem;
  color: var(--gruns-dark);
  line-height: 1.55;
`;

const StyledReviews = styled.div`
  margin-top: var(--space-1200);
  display: grid;
  gap: var(--space-500);
`;

const StyledReview = styled.article`
  padding: var(--space-500);
  border: 1px solid var(--ink-200);
  border-radius: var(--radius-xl);
  background: var(--white);
`;

const StyledVs = styled.section`
  margin-top: var(--space-1200);
  padding: var(--space-800);
  border-radius: var(--radius-xl);
  background: var(--gruns-primary);
  color: var(--white);
  text-align: center;
`;

const StyledFumble = styled.section`
  margin-top: var(--space-800);
  text-align: center;
  padding: var(--space-800) 0;
`;

const StyledLink = styled.a`
  display: inline-flex;
  margin-top: var(--space-400);
  font-weight: 600;
  color: var(--coral-500);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const GrunsOlipopTrust = () => {
  const { t } = useTranslation("grunsOlipop");
  const snackStats = t("stats.snackStats", { returnObjects: true }) as Array<{
    value: string;
    body: string;
  }>;
  const qualityList = t("stats.qualityList", { returnObjects: true }) as string[];
  const reviews = t("reviews.items", { returnObjects: true }) as Array<{
    headline: string;
    quote: string;
    author: string;
  }>;
  return (
    <StyledBlock>
      <StyledInner>
        <StyledH2>{t("stats.deficientTitle")}</StyledH2>
        <StyledGrid2>
          <StyledStat>
            <StyledBig>{t("stats.stat1")}</StyledBig>
            <p style={{ margin: 0, lineHeight: 1.5 }}>{t("stats.stat1Body")}</p>
          </StyledStat>
          <StyledStat>
            <StyledBig>{t("stats.stat2")}</StyledBig>
            <p style={{ margin: 0, lineHeight: 1.5 }}>{t("stats.stat2Body")}</p>
          </StyledStat>
        </StyledGrid2>
        <StyledCta href="#offers">{t("stats.cta")}</StyledCta>

        <StyledH2 style={{ marginTop: "var(--space-1200)" }}>{t("stats.snackTitle")}</StyledH2>
        <p
          style={{
            textAlign: "center",
            maxWidth: 640,
            margin: "0 auto var(--space-600)",
            lineHeight: 1.55,
            color: "var(--gruns-gray)",
          }}
        >
          {t("stats.snackLead")}
        </p>
        <StyledSnackGrid>
          {snackStats.map((s) => (
            <StyledSnack key={s.value + s.body}>
              <StyledBig style={{ fontSize: "2.25rem", textAlign: "center" }}>{s.value}</StyledBig>
              <p style={{ margin: 0, textAlign: "center", fontSize: 14 }}>{s.body}</p>
            </StyledSnack>
          ))}
        </StyledSnackGrid>
        <p style={{ textAlign: "center", fontSize: 12, marginTop: 24, color: "var(--ink-500)" }}>
          {t("stats.snackFoot")}
        </p>

        <StyledH2 style={{ marginTop: "var(--space-1200)" }}>{t("stats.qualityTitle")}</StyledH2>
        <p style={{ textAlign: "center", color: "var(--gruns-gray)", marginBottom: 16 }}>
          {t("stats.qualityLead")}
        </p>
        <StyledList>
          {qualityList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </StyledList>

        <StyledReviews>
          <StyledH2>{t("reviews.title")}</StyledH2>
          {reviews.map((r) => (
            <StyledReview key={r.author}>
              <div style={{ color: "var(--gruns-gold)", letterSpacing: 2, marginBottom: 8 }}>★★★★★</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 17 }}>{r.headline}</h3>
              <p style={{ margin: "0 0 12px", lineHeight: 1.5, color: "var(--gruns-gray)" }}>{r.quote}</p>
              <footer style={{ fontWeight: 600, fontSize: 14 }}>— {r.author}</footer>
            </StyledReview>
          ))}
          <p style={{ fontSize: 12, color: "var(--ink-500)", textAlign: "center" }}>
            {t("reviews.disclaimer")}
          </p>
        </StyledReviews>

        <StyledVs>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(1.35rem, 3vw, 1.75rem)" }}>
            {t("closing.vsTitle")}
          </h2>
          <p style={{ margin: 0, opacity: 0.95, lineHeight: 1.5 }}>{t("closing.vsBody")}</p>
        </StyledVs>

        <StyledFumble>
          <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-display)" }}>
            {t("closing.fumbleTitle")}
          </h2>
          <p style={{ margin: 0, maxWidth: 520, marginInline: "auto", lineHeight: 1.5 }}>
            {t("closing.fumbleBody")}
          </p>
          <StyledLink href="#offers">{t("closing.fumbleCta")}</StyledLink>
        </StyledFumble>

        <StyledH2>{t("closing.questionsTitle")}</StyledH2>
        <StyledCta href="#offers" style={{ marginTop: 16 }}>
          {t("closing.questionsCta")}
        </StyledCta>
      </StyledInner>
    </StyledBlock>
  );
};
