import { useEffect, useState, type ReactNode } from "react";
import styled from "styled-components";
import { DeniseCtaUrl } from "./deniseCdn";

const StyledWrap = styled.div<{ $padTop: boolean; $padBottom: boolean }>`
  min-height: 100vh;
  padding-top: ${({ $padTop }) => ($padTop ? "60px" : "0")};
  padding-bottom: ${({ $padBottom }) => ($padBottom ? "60px" : "0")};
  transition:
    padding-top 0.28s ease,
    padding-bottom 0.28s ease;
`;

const StyledBar = styled.div<{ $position: "top" | "bottom"; $visible: boolean }>`
  position: fixed;
  ${({ $position }) => ($position === "top" ? "top: 0;" : "bottom: 0;")}
  left: 0;
  right: 0;
  z-index: 100;
  height: 60px;
  background-color: #5f8896;
  color: #ffffff;
  transform: translateY(
    ${({ $position, $visible }) => {
      if ($visible) return "0";
      return $position === "top" ? "-100%" : "100%";
    }}
  );
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition:
    transform 0.28s ease,
    opacity 0.2s ease;

  @media (min-width: 640px) {
    height: auto;
  }
`;

const StyledInner = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 64rem;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;

  @media (min-width: 640px) {
    height: auto;
    gap: 24px;
    padding: 10px 16px;
  }
`;

const StyledOffer = styled.div`
  min-width: 0;
  flex-shrink: 1;
  text-align: left;
  line-height: 1.2;
`;

const StyledOfferLine = styled.p<{ $bold?: boolean }>`
  margin: 0;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: ${({ $bold }) => ($bold ? 700 : 400)};
  line-height: 1.2;
  color: #ffffff;
`;

const StyledButton = styled.a`
  flex-shrink: 0;
  padding: 10px 16px;
  border-radius: 6px;
  background-color: #ffffff;
  color: #000000;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }

  @media (min-width: 640px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

function OfferBar({ position, visible }: { position: "top" | "bottom"; visible: boolean }) {
  return (
    <StyledBar $position={position} $visible={visible} aria-hidden={!visible}>
      <StyledInner>
        <StyledOffer>
          <StyledOfferLine $bold>Buy one, get one free.</StyledOfferLine>
          <StyledOfferLine>Limited time offer!</StyledOfferLine>
        </StyledOffer>
        <StyledButton href={DeniseCtaUrl} target="_blank" rel="noopener noreferrer" tabIndex={visible ? 0 : -1}>
          View Deal
        </StyledButton>
      </StyledInner>
    </StyledBar>
  );
}

/** True once the user has scrolled past halfway through the page. */
function isPastPageMidpoint(): boolean {
  const y = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  if (maxScroll <= 0) return false;
  return y / maxScroll >= 0.5;
}

type DeniseStickyBarsProps = {
  children: ReactNode;
};

/**
 * Top bar for the first half of the page; bottom bar for the second half.
 * Scroll down past midpoint → bottom. Scroll up above midpoint → top.
 */
export const DeniseStickyBars = ({ children }: DeniseStickyBarsProps) => {
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    const sync = () => {
      setShowBottom(isPastPageMidpoint());
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const showTop = !showBottom;

  return (
    <StyledWrap $padTop={showTop} $padBottom={showBottom}>
      <OfferBar position="top" visible={showTop} />
      {children}
      <OfferBar position="bottom" visible={showBottom} />
    </StyledWrap>
  );
};
