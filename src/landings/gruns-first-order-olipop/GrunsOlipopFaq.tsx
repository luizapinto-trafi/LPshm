import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { handleKeyDown } from "@/shared/utils/KeyEvent";

const StyledSection = styled.section`
  background: var(--gruns-cream);
  padding: var(--space-1200) var(--space-1000) var(--space-800);
  @media (max-width: 800px) {
    padding: var(--space-800) var(--space-400);
  }
`;

const StyledInner = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const StyledH2 = styled.h2`
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin: 0 0 var(--space-800) 0;
  color: var(--gruns-dark);
`;

const StyledItem = styled.div`
  border-bottom: 1px solid rgba(0, 88, 45, 0.12);
`;

const StyledBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-400);
  padding: var(--space-500) 0;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: var(--gruns-dark);
  cursor: pointer;
  text-align: left;
  &:hover {
    color: var(--gruns-primary);
  }
`;

const StyledIcon = styled.span<{ $open: boolean }>`
  flex-shrink: 0;
  font-size: 20px;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? "rotate(45deg)" : "none")};
`;

const StyledPanel = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "400px" : "0")};
  overflow: hidden;
  transition: max-height 0.28s ease;
`;

const StyledAns = styled.p`
  margin: 0;
  padding: 0 0 var(--space-500) 0;
  font-size: 15px;
  line-height: 1.55;
  color: var(--gruns-gray);
`;

export const GrunsOlipopFaq = () => {
  const { t } = useTranslation("grunsOlipop");
  const items = t("faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <StyledSection aria-labelledby="olipop-faq-heading">
      <StyledInner>
        <StyledH2 id="olipop-faq-heading">{t("faq.title")}</StyledH2>
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <StyledItem key={item.q}>
              <StyledBtn
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) =>
                  handleKeyDown(e, () => setOpen(isOpen ? null : i), ["Enter", " "])
                }
              >
                {item.q}
                <StyledIcon $open={isOpen} aria-hidden>
                  +
                </StyledIcon>
              </StyledBtn>
              <StyledPanel $open={isOpen}>
                <StyledAns>{item.a}</StyledAns>
              </StyledPanel>
            </StyledItem>
          );
        })}
      </StyledInner>
    </StyledSection>
  );
};
