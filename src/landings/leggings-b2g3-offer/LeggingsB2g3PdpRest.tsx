import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { PDP_YMAL } from "./leggingsB2g3Content";
import { LeggingsB2g3Reviews } from "./LeggingsB2g3Reviews";

/** Below the product grid: YMAL + Stamped-style reviews. */

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--white);
`;

const StyledSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px;
  box-sizing: border-box;
  width: 100%;
  @media (min-width: 900px) {
    padding: 56px 24px;
  }
`;

const StyledYmalTitle = styled.h2`
  margin: 0 0 24px;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  color: var(--ink-900);
`;

const StyledYmalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  @media (min-width: 700px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
  }
`;

const StyledYmalCard = styled.a`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  font-family: var(--font-body);
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledYmalImg = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--ink-150);
`;

const StyledYmalName = styled.span`
  font-size: 13px;
  line-height: 1.35;
  font-weight: 600;
  color: var(--ink-900);
`;

export const LeggingsB2g3PdpRest = () => {
  const { t } = useTranslation("leggingsB2g3");

  return (
    <StyledWrap>
      <StyledSection aria-labelledby="ymal-title">
        <StyledYmalTitle id="ymal-title">{t("pdp.ymalTitle", { defaultValue: "You Will Also Love" })}</StyledYmalTitle>
        <StyledYmalGrid>
          {PDP_YMAL.map((item) => (
            <StyledYmalCard key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
              <StyledYmalImg>
                <Image src={item.image} alt={item.title} fill unoptimized sizes="200px" style={{ objectFit: "cover" }} />
              </StyledYmalImg>
              <StyledYmalName>{item.title}</StyledYmalName>
            </StyledYmalCard>
          ))}
        </StyledYmalGrid>
      </StyledSection>

      <LeggingsB2g3Reviews />
    </StyledWrap>
  );
};
