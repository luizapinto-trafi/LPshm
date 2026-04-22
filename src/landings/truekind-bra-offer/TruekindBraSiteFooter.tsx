import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import type { FormEventHandler } from "react";
import { TruekindBraCdn } from "./truekindBraCdn";

const StyledFooter = styled.footer`
  background: var(--ink-100);
  color: var(--ink-800);
  padding: var(--space-1000) var(--space-400) var(--space-800);
  border-top: 1px solid var(--ink-200);
`;

const StyledInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-800);
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCol = styled.div``;

const StyledH3 = styled.h3`
  color: var(--ink-1000);
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 var(--space-400) 0;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
`;

const StyledLink = styled.a`
  color: var(--ink-700);
  font-size: 14px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: var(--coral-500);
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
  margin-top: var(--space-200);
`;

const StyledInput = styled.input`
  padding: var(--space-200) var(--space-300);
  border: 1px solid var(--ink-300);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-family: var(--font-body);
`;

const StyledButton = styled.button`
  min-height: 40px;
  background: var(--coral-500);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background: var(--coral-450);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
  }
`;

const StyledBottom = styled.div`
  max-width: 1200px;
  margin: var(--space-800) auto 0;
  padding-top: var(--space-600);
  border-top: 1px solid var(--ink-200);
  text-align: center;
  font-size: 12px;
  color: var(--ink-600);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-200) var(--space-500);
`;

const shapermintLinks: ReadonlyArray<{ href: string; key: string }> = [
  { href: "https://shapermint.com/pages/about-us", key: "infoAbout" },
  { href: "https://shapermint.com/pages/ambassador", key: "infoAmbassador" },
  { href: "https://shapermint.com/blogs/news", key: "infoBlog" },
  { href: "https://shapermint.com/pages/share", key: "infoRefer" },
  { href: "https://shapermint.com/pages/store-locator", key: "infoStore" },
] as const;

const careLinks: ReadonlyArray<{ href: string; key: string }> = [
  { href: "https://help.shapermint.com/hc/en-us", key: "careHelp" },
  { href: "https://shapermint.com/pages/trackorder", key: "careTrack" },
  { href: "https://shapermint.com/pages/exchanges-and-returns", key: "careExchanges" },
  { href: "https://shapermint.com/account/manage-memberships", key: "careSub" },
  { href: "https://help.shapermint.com/hc/en-us/categories/360000369613-Shipping", key: "careShip" },
  { href: "https://shapermint.com/pages/contact-us", key: "careContact" },
  { href: "https://shapermint.com/pages/privacy-policy", key: "carePrivacy" },
] as const;

const legalKeys = ["legalTerms", "legalDns", "legalPress"] as const;
const legalHrefs = [
  "https://shapermint.com/pages/shapermint-terms-and-conditions",
  "https://shapermint.com/pages/do-not-sell-form",
  "https://shapermint.com/cdn-cgi/l/email-protection",
] as const;

export const TruekindBraSiteFooter = () => {
  const { t } = useTranslation("truekindBra");
  const year = new Date().getFullYear();
  const onJoin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <StyledFooter>
      <div style={{ textAlign: "center", marginBottom: "var(--space-800)" }}>
        <Image src={TruekindBraCdn.logo} alt={t("nav.logoHomeAria")} width={160} height={32} unoptimized />
      </div>
      <StyledInner>
        <StyledCol>
          <StyledH3>{t("footer.shapermintInfo")}</StyledH3>
          <StyledList>
            {shapermintLinks.map((l) => (
              <li key={l.key}>
                <StyledLink href={l.href} target="_blank" rel="noopener noreferrer">
                  {t(`footer.${l.key}` as const)}
                </StyledLink>
              </li>
            ))}
          </StyledList>
        </StyledCol>
        <StyledCol>
          <StyledH3>{t("footer.customerCare")}</StyledH3>
          <StyledList>
            {careLinks.map((l) => (
              <li key={l.key}>
                <StyledLink href={l.href} target="_blank" rel="noopener noreferrer">
                  {t(`footer.${l.key}` as const)}
                </StyledLink>
              </li>
            ))}
          </StyledList>
        </StyledCol>
        <StyledCol>
          <StyledH3>{t("footer.joinTitle")}</StyledH3>
          <p style={{ fontSize: 14, lineHeight: 1.4, margin: 0 }}>{t("footer.joinHint")}</p>
          <StyledForm onSubmit={onJoin} aria-label={t("footer.joinTitle")}>
            <label htmlFor="truekind-footer-email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>
              {t("footer.emailLabel")}
            </label>
            <StyledInput
              id="truekind-footer-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t("footer.emailPlaceholder")}
            />
            <StyledButton type="submit">{t("footer.signUp")}</StyledButton>
          </StyledForm>
        </StyledCol>
      </StyledInner>
      <StyledBottom>
        <span>{t("footer.copyright", { year })}</span>
        {legalKeys.map((k, i) => (
          <StyledLink key={k} href={legalHrefs[i]} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12 }}>
            {t(`footer.${k}` as const)}
          </StyledLink>
        ))}
      </StyledBottom>
    </StyledFooter>
  );
};
