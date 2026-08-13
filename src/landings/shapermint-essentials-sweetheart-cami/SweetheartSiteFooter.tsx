import Image from "next/image";
import styled from "styled-components";
import { FormEvent } from "react";
import { useTranslation } from "next-i18next/pages";
import { SweetheartCdn } from "./sweetheartCamiCdn";

const StyledFooter = styled.footer`
  background: var(--ink-050);
  padding: 40px 0 calc(40px + 72px + env(safe-area-inset-bottom));
  @media (min-width: 900px) {
    padding: 60px 0 calc(40px + 80px);
  }
`;

const StyledCols = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1.2fr;
    gap: 40px;
    padding: 0 clamp(16px, 4vw, 60px);
  }
`;

const StyledColTitle = styled.h4`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-900);
  margin: 0 0 12px;
`;

const StyledBrand = styled.div`
  margin-bottom: 24px;
  line-height: 0;
  img {
    height: 36px;
    width: auto;
  }
`;

const StyledLink = styled.a`
  display: block;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink-900);
  text-decoration: none;
  padding: 6px 0;
  &:hover {
    text-decoration: underline;
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledNewsP = styled.p`
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.45;
  color: var(--ink-900);
  margin: 0 0 16px;
`;

const StyledForm = styled.form`
  display: flex;
  gap: 0;
  border: 1px solid var(--ink-300);
  border-radius: 4px;
  overflow: hidden;
  max-width: 360px;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 0;
  background: transparent;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink-900);
  outline: none;
`;

const StyledSubmit = styled.button`
  background: var(--ink-900);
  color: #fff;
  padding: 10px 18px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 0;
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid var(--coral-500);
    outline-offset: 2px;
  }
`;

const StyledSocialLink = styled.a`
  padding: 4px;
  color: var(--ink-900);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledSocial = styled.div`
  display: flex;
  gap: 18px;
  margin: 16px 0;
`;

const StyledAppTitle = styled.h4`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-900);
  margin: 20px 0 12px;
`;

const StyledAppBtns = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const StyledAppBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--ink-900);
  color: #fff;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 600;
  text-decoration: none;
  line-height: 1.1;
  strong {
    font-size: 13px;
    font-weight: 700;
  }
  &:focus-visible {
    outline: 2px solid var(--coral-500);
    outline-offset: 2px;
  }
`;

const StyledBottom = styled.div`
  max-width: 1160px;
  margin: 30px auto 0;
  padding: 20px clamp(16px, 4vw, 60px) 0;
  border-top: 1px solid var(--ink-200);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-700);
  span {
    white-space: nowrap;
  }
`;

const StyledDivider = styled.span`
  color: var(--ink-300);
`;

const StyledBottomLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const SweetheartSiteFooter = () => {
  const { t } = useTranslation("sweetheartCami");
  const col1 = t("footer.col1.links", { returnObjects: true }) as string[];
  const col2 = t("footer.col2.links", { returnObjects: true }) as string[];

  const onNewsletter = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <StyledFooter>
      <StyledCols>
        <div>
          <StyledBrand>
            <Image src={SweetheartCdn.logo} alt={t("footer.logoAlt")} width={140} height={36} unoptimized />
          </StyledBrand>
          <StyledColTitle>{t("footer.col1.title")}</StyledColTitle>
          {col1.map((label, i) => (
            <StyledLink key={i} href="https://shapermint.com">
              {label}
            </StyledLink>
          ))}
        </div>
        <div>
          <StyledColTitle>{t("footer.col2.title")}</StyledColTitle>
          {col2.map((label, i) => (
            <StyledLink key={i} href="https://shapermint.com">
              {label}
            </StyledLink>
          ))}
        </div>
        <div>
          <StyledColTitle>{t("footer.news.title")}</StyledColTitle>
          <StyledNewsP>{t("footer.news.body")}</StyledNewsP>
          <StyledForm onSubmit={onNewsletter}>
            <StyledInput type="email" name="email" placeholder={t("footer.news.placeholder")} required />
            <StyledSubmit type="submit">{t("footer.news.submit")}</StyledSubmit>
          </StyledForm>
          <StyledSocial>
            <StyledSocialLink href="https://shapermint.com" aria-label={t("footer.social.instagram")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </StyledSocialLink>
            <StyledSocialLink href="https://shapermint.com" aria-label={t("footer.social.facebook")}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13.5 9V7c0-.9.3-1.5 1.5-1.5H17V2h-2.5C11.8 2 10 4 10 7v2H7v3h3v10h3v-10h2.6l.4-3H13.5z" />
              </svg>
            </StyledSocialLink>
            <StyledSocialLink href="https://shapermint.com" aria-label={t("footer.social.youtube")}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 7.5c-.2-1.5-.9-2.2-2.3-2.4C17.5 4.8 12 4.8 12 4.8s-5.5 0-7.7.3C2.9 5.3 2.2 6 2 7.5 1.8 9 1.8 12 1.8 12s0 3 .2 4.5c.2 1.5.9 2.2 2.3 2.4 2.2.3 7.7.3 7.7.3s5.5 0 7.7-.3c1.4-.2 2.1-.9 2.3-2.4.2-1.5.2-4.5.2-4.5s0-3-.2-4.5zM10 15V9l5 3-5 3z" />
              </svg>
            </StyledSocialLink>
            <StyledSocialLink href="https://shapermint.com" aria-label={t("footer.social.twitter")}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 5.8c-.8.4-1.6.6-2.5.7.9-.5 1.6-1.4 1.9-2.4-.8.5-1.8.9-2.7 1.1-.8-.9-2-1.4-3.3-1.4-2.5 0-4.5 2-4.5 4.5 0 .4 0 .7.1 1-3.7-.2-7-2-9.2-4.7-.4.7-.6 1.4-.6 2.3 0 1.6.8 3 2 3.8-.7 0-1.4-.2-2-.5 0 2.2 1.6 4 3.6 4.4-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.8 2.2 3.1 4.2 3.1-1.5 1.2-3.4 1.9-5.5 1.9H2c2 1.3 4.3 2 6.8 2 8.2 0 12.7-6.8 12.7-12.7V7c.8-.6 1.5-1.3 2-2.1z" />
              </svg>
            </StyledSocialLink>
            <StyledSocialLink href="https://shapermint.com" aria-label={t("footer.social.pinterest")}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3-.1-.8-.2-2 0-2.8.2-.8 1.3-5.4 1.3-5.4s-.3-.6-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.4-4.5-4.4-3 0-4.8 2.3-4.8 4.6 0 .9.3 1.9.8 2.4.1.1.1.2.1.3l-.3 1.2c-.1.2-.2.3-.4.1-1.2-.6-2-2.4-2-3.9 0-3.2 2.3-6.1 6.6-6.1 3.5 0 6.2 2.5 6.2 5.8 0 3.5-2.2 6.2-5.2 6.2-1 0-2-.5-2.3-1.2 0 0-.5 2-.6 2.4-.2.9-.9 2-1.3 2.6.9.3 1.9.5 2.9.5 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
              </svg>
            </StyledSocialLink>
          </StyledSocial>
          <StyledAppTitle>{t("footer.app.title")}</StyledAppTitle>
          <StyledAppBtns>
            <StyledAppBtn href="https://shapermint.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.5 12.5c0-2.8 2.3-4.1 2.4-4.2-1.3-1.9-3.3-2.2-4-2.2-1.7-.2-3.3 1-4.1 1-.9 0-2.2-1-3.6-1-1.9 0-3.6 1.1-4.5 2.8-1.9 3.3-.5 8.3 1.4 11 .9 1.3 2 2.8 3.5 2.7 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.2.9 3.6.9 1.5 0 2.5-1.3 3.4-2.6.5-.8 1-1.7 1.3-2.6-3-1.1-3-4.4-3-4.9zm-3-8.1c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.5-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.5 3-1.4z" />
              </svg>
              <div>
                <span style={{ fontSize: 9 }}>{t("footer.app.storeKicker")}</span>
                <br />
                <strong>{t("footer.app.storeName")}</strong>
              </div>
            </StyledAppBtn>
            <StyledAppBtn href="https://shapermint.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3.6 20.6c.3.2.7.3 1.1.2l12-7c.4-.2.6-.5.7-.9L5.2 3.2c-.8.1-1.4.8-1.4 1.7v14.2c0 .6.2 1.1.6 1.4zM14.5 13L6.5 21l8-4.7 1.8-1.1-1.8-2.2zM18 9.2c.5.3.7.8.7 1.3 0 .5-.3 1-.7 1.3l-1.9 1.1-2.1-2.4 2.1-2.4L18 9.2zM15.6 7.4l-2 2.3L5.2 2.1l10.4 5.3z" />
              </svg>
              <div>
                <span style={{ fontSize: 9 }}>{t("footer.app.playKicker")}</span>
                <br />
                <strong>{t("footer.app.playName")}</strong>
              </div>
            </StyledAppBtn>
          </StyledAppBtns>
        </div>
      </StyledCols>
      <StyledBottom>
        <span>{t("footer.bottom.copy")}</span>
        <StyledDivider aria-hidden>|</StyledDivider>
        <StyledBottomLink href="https://shapermint.com">{t("footer.bottom.terms")}</StyledBottomLink>
        <StyledDivider aria-hidden>|</StyledDivider>
        <StyledBottomLink href="https://shapermint.com">{t("footer.bottom.privacy")}</StyledBottomLink>
        <StyledDivider aria-hidden>|</StyledDivider>
        <StyledBottomLink href="https://shapermint.com">{t("footer.bottom.press")}</StyledBottomLink>
      </StyledBottom>
    </StyledFooter>
  );
};
