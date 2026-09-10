import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import type { FormEventHandler } from "react";
import { ShapewearListicleCdn } from "./shapewearListicleCdn";

const StyledFooter = styled.footer`
  background: var(--ink-100);
  color: var(--ink-800);
  padding: var(--space-1000) clamp(16px, 4vw, 64px) calc(var(--space-1000) + 72px);
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

const StyledLogo = styled.div`
  margin-bottom: var(--space-500);
`;

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

const StyledHint = styled.p`
  margin: 0 0 var(--space-300);
  font-size: 13px;
  line-height: 1.45;
  color: var(--ink-600);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
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
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background: var(--coral-450);
  }
`;

const StyledCopyright = styled.p`
  max-width: 1200px;
  margin: var(--space-800) auto 0;
  padding-top: var(--space-600);
  border-top: 1px solid var(--ink-200);
  font-size: 12px;
  color: var(--ink-500);
`;

const infoLinks = [
  { key: "about", href: "https://shapermint.com/pages/about-us" },
  { key: "ambassador", href: "https://shapermint.com/pages/ambassador" },
  { key: "blog", href: "https://shapermint.com/blogs/news" },
] as const;

const careLinks = [
  { key: "help", href: "https://shapermint.com/pages/faq" },
  { key: "track", href: "https://shapermint.com/apps/tracktor" },
  { key: "returns", href: "https://shapermint.com/pages/exchanges-returns" },
  { key: "shipping", href: "https://shapermint.com/pages/shipping-policy" },
  { key: "contact", href: "https://shapermint.com/pages/contact" },
  { key: "privacy", href: "https://shapermint.com/pages/privacy-policy" },
  { key: "terms", href: "https://shapermint.com/pages/terms-of-service" },
] as const;

export const ShapewearListicleFooter = () => {
  const { t } = useTranslation("shapewearListicleGoogle");
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <StyledFooter>
      <StyledInner>
        <StyledCol>
          <StyledLogo>
            <Image
              src={ShapewearListicleCdn.logo}
              alt={t("brand")}
              width={140}
              height={24}
              unoptimized
            />
          </StyledLogo>
          <StyledH3>{t("footer.info")}</StyledH3>
          <StyledList>
            {infoLinks.map(({ key, href }) => (
              <li key={key}>
                <StyledLink href={href}>{t(`footer.links.${key}`)}</StyledLink>
              </li>
            ))}
          </StyledList>
        </StyledCol>

        <StyledCol>
          <StyledH3>{t("footer.care")}</StyledH3>
          <StyledList>
            {careLinks.map(({ key, href }) => (
              <li key={key}>
                <StyledLink href={href}>{t(`footer.links.${key}`)}</StyledLink>
              </li>
            ))}
          </StyledList>
        </StyledCol>

        <StyledCol>
          <StyledH3>{t("footer.newsletter")}</StyledH3>
          <StyledHint>{t("footer.newsletterHint")}</StyledHint>
          <StyledForm onSubmit={onSubmit}>
            <StyledInput
              type="email"
              name="email"
              placeholder={t("footer.emailPlaceholder")}
              aria-label={t("footer.emailPlaceholder")}
              required
            />
            <StyledButton type="submit">{t("footer.signUp")}</StyledButton>
          </StyledForm>
        </StyledCol>
      </StyledInner>
      <StyledCopyright>{t("footer.copyright")}</StyledCopyright>
    </StyledFooter>
  );
};
