import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { StraplessB1g1Cdn } from "./straplessB1g1Cdn";

const StyledSection = styled.section`
  background: var(--ink-100);
  box-shadow: inset 0 2px 8px rgba(12, 12, 13, 0.05);
  padding: 60px 0;
`;

const StyledInner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-600);
  text-align: center;
`;

const StyledLogo = styled.div`
  line-height: 0;
  img {
    height: 40px;
    width: auto;
  }
`;

const StyledH = styled.h3`
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 16px;
  color: var(--ink-900);
  margin: 0;
`;

const StyledP = styled.p`
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 18px;
  line-height: 1.55;
  color: var(--ink-900);
  margin: 0 auto;
  max-width: 70ch;
`;

const StyledCols = styled.div`
  margin-top: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  text-align: left;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledColTitle = styled.h4`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  color: var(--ink-900);
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const StyledLink = styled.a`
  display: block;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink-900);
  text-decoration: none;
  padding: 4px 0;
  &:hover {
    text-decoration: underline;
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const colKeys = ["shop", "blog", "topics", "help"] as const;

export const StraplessBrandCardSection = () => {
  const { t } = useTranslation("straplessB1g1GiftLp");
  return (
    <StyledSection aria-labelledby="strapless-brand-title">
      <StyledInner>
        <StyledLogo>
          <Image src={StraplessB1g1Cdn.logo} alt={t("brand.logoAlt")} width={160} height={40} unoptimized />
        </StyledLogo>
        <StyledH id="strapless-brand-title">{t("brand.heading")}</StyledH>
        <StyledP>{t("brand.body")}</StyledP>
        <StyledCols>
          {colKeys.map((col) => {
            const links = t(`brand.cols.${col}.links`, { returnObjects: true }) as string[];
            return (
              <div key={col}>
                <StyledColTitle>{t(`brand.cols.${col}.title`)}</StyledColTitle>
                {links.map((label, i) => (
                  <StyledLink key={i} href="https://shapermint.com">
                    {label}
                  </StyledLink>
                ))}
              </div>
            );
          })}
        </StyledCols>
      </StyledInner>
    </StyledSection>
  );
};
