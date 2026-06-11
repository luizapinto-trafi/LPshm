import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const FontFaces = createGlobalStyle`
  @font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Regular.woff2") format("opentype"); font-weight: normal; font-display: swap; }
  @font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Demi.otf") format("opentype"); font-weight: 600; font-display: swap; }
  @font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Bold.otf") format("opentype"); font-weight: 700; font-display: swap; }
  @font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Heavy.otf") format("opentype"); font-weight: 800 900; font-display: swap; }
`;

const HERO_IMG = "/shapermint-concept/hero.jpg";
const LOGO = "/shapermint-concept/shapermint-logo.svg";
const PRODUCT_BRA = "/shapermint-concept/product-bra.png";
const PRODUCT_PANTY = "/shapermint-concept/product-panty.png";

const Hero = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background: #e5d8d2;
  overflow: hidden;
  font-family: "AvenirNextLTPro", system-ui, sans-serif;
  color: #292929;
`;

const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: auto;
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 12%,
    #000 88%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 12%,
    #000 88%,
    transparent 100%
  );
`;

const Dim = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(18, 16, 15, 0.68);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
`;

const TopBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 40px;
  z-index: 8;
  font-family: "AvenirNextLTPro", system-ui, sans-serif;
  color: #292929;

  @media (max-width: 640px) {
    padding: 16px 20px;
  }
`;

const Logo = styled.img`
  height: 26px;
  width: auto;
  display: block;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;

  a {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #292929;
    text-decoration: none;
  }

  @media (max-width: 640px) {
    gap: 16px;

    a {
      font-size: 12px;
    }
  }
`;

const ProductCard = styled.div<{ $align: "left" | "right" }>`
  position: absolute;
  top: calc(100% + 14px);
  ${(p) => (p.$align === "left" ? "right: 0;" : "left: 0;")}
  display: flex;
  flex-direction: ${(p) => (p.$align === "left" ? "row-reverse" : "row")};
  align-items: center;
  gap: 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;

  /* no hover on touch — tapping the marker opens the product modal instead */
  @media (max-width: 640px) {
    display: none;
  }
`;

const ProductThumb = styled.div`
  width: 168px;
  height: 168px;
  flex: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.35));
  }
`;

const ProductInfo = styled.div<{ $align: "left" | "right" }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: ${(p) => (p.$align === "left" ? "flex-end" : "flex-start")};
  text-align: ${(p) => (p.$align === "left" ? "right" : "left")};
  font-family: "AvenirNextLTPro", system-ui, sans-serif;
  font-style: normal;
`;

const ProductName = styled.span`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

const Stars = styled.span`
  font-size: 13px;
  letter-spacing: 0.12em;
  color: #f0a13c;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.4s ease, transform 0.4s ease;

  small {
    font-size: 11px;
    letter-spacing: 0;
    color: rgba(255, 255, 255, 0.85);
    margin-left: 6px;
  }
`;

const Prices = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.4s ease, transform 0.4s ease;

  s {
    margin-left: 8px;
    font-weight: 500;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.55);
  }
`;

const Marker = styled.div<{ $top: string; $left?: string; $right?: string }>`
  position: absolute;
  top: ${(p) => p.$top};
  ${(p) => (p.$left ? `left: ${p.$left};` : "")}
  ${(p) => (p.$right ? `right: ${p.$right};` : "")}
  z-index: 4;
  cursor: pointer;
  font-family: ui-serif, Georgia, "Times New Roman", serif;
  font-style: italic;
  font-size: 22px;
  color: #292929;
  padding: 6px;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }

  &:hover ${ProductCard} {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &:hover ${ProductName} {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.12s;
  }

  &:hover ${Stars} {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.26s;
  }

  &:hover ${Prices} {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.4s;
  }

  &:hover ~ ${Dim} {
    opacity: 1;
  }
`;

const ScrollHint = styled.span`
  position: absolute;
  top: 56%;
  right: 40px;
  z-index: 2;
  pointer-events: none;
  font-family: ui-serif, Georgia, "Times New Roman", serif;
  font-style: italic;
  font-size: 16px;
  color: #292929;

  @media (max-width: 640px) {
    right: 16px;
    font-size: 14px;
  }
`;

const Headline = styled.div`
  position: absolute;
  left: 40px;
  bottom: 36px;
  z-index: 2;

  h1,
  p {
    margin: 0;
    font-size: clamp(40px, 4.6vw, 68px);
    font-weight: 700;
    line-height: 1.04;
    letter-spacing: 0.01em;
    text-transform: uppercase;
  }

  h1 {
    color: #292929;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 8px;
        text-decoration-thickness: 4px;
      }
    }
  }

  p {
    color: rgba(41, 41, 41, 0.38);
    max-width: 16ch;
    margin-bottom: 20px;

    s {
      font-size: 0.45em;
      font-weight: 500;
      color: rgba(41, 41, 41, 0.3);
    }
  }

  @media (max-width: 640px) {
    left: 20px;
    bottom: 24px;
    right: 20px;

    h1,
    p {
      font-size: clamp(26px, 8.4vw, 40px);
    }

    p {
      margin-bottom: 14px;
    }
  }
`;

const RevealSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: #e5d8d2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7vw;
  overflow: hidden;
  font-family: "AvenirNextLTPro", system-ui, sans-serif;
`;

const FloatLayer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 5;
`;

// dark circle with outward arrows — shown as the cursor over the products
const EXPAND_CURSOR = `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='19' fill='%23292929'/%3E%3Cpath d='M22 12h6v6M18 28h-6v-6M28 12l-7 7M12 28l7-7' stroke='white' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") 20 20, pointer`;

const FloatImg = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: min(32vh, 300px);
  width: auto;
  opacity: 0;
  filter: drop-shadow(0 30px 50px rgba(41, 41, 41, 0.25));
  will-change: transform, opacity;
  pointer-events: none;
  cursor: ${EXPAND_CURSOR};

  &:hover {
    filter: drop-shadow(0 34px 56px rgba(41, 41, 41, 0.4));
  }

  @media (max-width: 640px) {
    height: min(22vh, 180px);
  }
`;

const RevealHeadline = styled.h2`
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 0;
  opacity: 0;
  pointer-events: none;
  will-change: transform, opacity;
  font-family: "AvenirNextLTPro", system-ui, sans-serif;
  font-size: clamp(28px, 3.4vw, 48px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #292929;
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

const FloatInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0;
  pointer-events: none;
  will-change: transform, opacity;
  font-family: "AvenirNextLTPro", system-ui, sans-serif;
  color: #292929;
  white-space: nowrap;
`;

const InfoName = styled.span`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const InfoStars = styled.span`
  font-size: 16px;
  letter-spacing: 0.1em;
  color: #f0a13c;

  small {
    font-size: 13px;
    letter-spacing: 0;
    color: rgba(41, 41, 41, 0.65);
    margin-left: 6px;
  }
`;

const SizeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 6px;
`;

const Sizes = styled.div`
  display: flex;
  gap: 10px;
`;

const SizeBtn = styled.button<{ $active: boolean }>`
  height: 36px;
  min-width: 62px;
  padding: 10px 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${(p) => (p.$active ? "#292929" : "#a6a6a6")};
  background: ${(p) => (p.$active ? "#292929" : "transparent")};
  color: ${(p) => (p.$active ? "#fff" : "#292929")};
  font-family: "AvenirNextLTPro", system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: #292929;
  }

  @media (max-width: 640px) {
    min-width: 44px;
    padding: 10px 8px;
  }
`;

// checkout bar: bundle summary + totals on the left, CTA on the right;
// on mobile it pins to the bottom edge and stacks the CTA full-width
const CheckoutBar = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  align-items: center;
  gap: 36px;
  padding: 14px 14px 14px 26px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 20px 44px rgba(41, 41, 41, 0.16);
  opacity: 0;
  pointer-events: none;
  will-change: transform, opacity;
  white-space: nowrap;
  font-family: "AvenirNextLTPro", system-ui, sans-serif;
  color: #292929;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 12px;
    border-radius: 14px;
  }
`;

// thumbs + totals row (keeps desktop layout intact, becomes the top row on mobile)
const BarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;

  @media (max-width: 640px) {
    justify-content: space-between;
    gap: 12px;
  }
`;

const BarSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const BarThumbs = styled.div`
  display: flex;
  gap: 16px;
`;

const ThumbWrap = styled.div`
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 10px;
  background: #f3ece8;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 82%;
    height: 82%;
    object-fit: contain;
  }

  @media (max-width: 640px) {
    width: 46px;
    height: 46px;
  }
`;

// notification-style chip on each thumbnail: "?" until a size is picked
const SizeBadge = styled.span<{ $set: boolean }>`
  position: absolute;
  right: -7px;
  bottom: -7px;
  min-width: 22px;
  height: 22px;
  padding: 0 5px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  background: ${(p) => (p.$set ? "#292929" : "#f7a08b")};
  color: ${(p) => (p.$set ? "#fff" : "#1b1b1b")};
  border: 2px solid #fff;
  transition: background 0.2s ease, color 0.2s ease;
`;

const BarTotal = styled.span`
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;

  s {
    font-size: 15px;
    font-weight: 500;
    color: rgba(41, 41, 41, 0.4);
  }

  em {
    font-style: normal;
    font-size: 12px;
    font-weight: 600;
    color: #1d8348;
  }

  @media (max-width: 640px) {
    font-size: 17px;
    gap: 7px;

    s {
      font-size: 13px;
    }

    em {
      font-size: 11px;
    }
  }
`;

// SHM Design System — Button / Primary / Fill / Large (Figma 1256:5212)
// single checkout CTA: counts pending actions until both sizes are picked
const CheckoutBtn = styled.button<{ $ready: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 280px;
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  background: ${(p) => (p.$ready ? "#f7a08b" : "rgba(41, 41, 41, 0.14)")};
  color: ${(p) => (p.$ready ? "#1b1b1b" : "rgba(41, 41, 41, 0.5)")};
  font-family: "AvenirNextLTPro", "Avenir Next", system-ui, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: ${(p) => (p.$ready ? "pointer" : "not-allowed")};
  transition: background 0.25s ease, color 0.25s ease;

  &:hover {
    background: ${(p) => (p.$ready ? "#f58a70" : "rgba(41, 41, 41, 0.14)")};
  }

  @media (max-width: 640px) {
    min-width: 0;
    width: 100%;
    font-size: 15px;
    line-height: 24px;
    padding: 12px 16px;
  }
`;

const ModalDim = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(18, 16, 15, 0.55);
  opacity: ${(p) => (p.$open ? 1 : 0)};
  visibility: ${(p) => (p.$open ? "visible" : "hidden")};
  transition: opacity 0.35s ease, visibility 0.35s;
  z-index: 9;
`;

const ModalPanel = styled.aside<{ $side: "left" | "right"; $open: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  ${(p) => (p.$side === "left" ? "left: 0;" : "right: 0;")}
  width: min(440px, 92vw);
  background: #f3ece8;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 32px 36px 40px;
  overflow-y: auto;
  font-family: "AvenirNextLTPro", system-ui, sans-serif;
  color: #292929;
  box-shadow: 0 0 60px rgba(18, 16, 15, 0.25);
  transform: translateX(
    ${(p) => (p.$open ? "0" : p.$side === "left" ? "-105%" : "105%")}
  );
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 640px) {
    padding: 20px 22px 28px;
    gap: 14px;
  }
`;

const ModalClose = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 26px;
  line-height: 1;
  color: #292929;
  padding: 4px;
`;

const ModalImg = styled.img`
  width: 70%;
  max-height: 240px;
  object-fit: contain;
  align-self: center;
  filter: drop-shadow(0 20px 34px rgba(41, 41, 41, 0.22));
`;

const ModalName = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const ModalPrices = styled.span`
  font-size: 18px;
  font-weight: 700;

  s {
    margin-left: 10px;
    font-weight: 500;
    font-size: 15px;
    color: rgba(41, 41, 41, 0.45);
  }
`;

const ModalDescription = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(41, 41, 41, 0.8);
`;

const ModalFeatures = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(41, 41, 41, 0.8);
`;

const ModalCta = styled.button`
  margin-top: auto;
  height: 52px;
  border: none;
  border-radius: 8px;
  background: #292929;
  color: #fff;
  font-family: "AvenirNextLTPro", system-ui, sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #000;
  }
`;

const PRODUCTS = {
  bra: {
    side: "left" as const,
    name: "Wireless Shaper Bra",
    img: PRODUCT_BRA,
    rating: "4.8 (12,406)",
    ratingLabel: "Rated 4.8 out of 5 stars",
    price: "$24.99",
    oldPrice: "$49.99",
    description:
      "All-day comfort with zero wires. Smooths your back and sides while giving you a natural lift, with soft seamless fabric that disappears under clothes.",
    features: [
      "Wire-free support with removable pads",
      "Smooths back bulge and side spillage",
      "Buttery-soft, breathable seamless fabric",
      "Wide straps that never dig in",
    ],
  },
  panty: {
    side: "right" as const,
    name: "Mid Waist Shaper Panty",
    img: PRODUCT_PANTY,
    rating: "4.7 (8,912)",
    ratingLabel: "Rated 4.7 out of 5 stars",
    price: "$16.99",
    oldPrice: "$32.99",
    description:
      "Light, everyday tummy control that feels like a second skin. Sits comfortably at the mid waist without rolling down, for smooth lines under anything.",
    features: [
      "Targeted tummy-smoothing panel",
      "No-roll waistband stays in place",
      "Invisible under leggings and dresses",
      "Breathable cotton gusset",
    ],
  },
};

export const ShapermintConcept = () => {
  const revealRef = useRef<HTMLElement>(null);
  const braRef = useRef<HTMLImageElement>(null);
  const pantyRef = useRef<HTMLImageElement>(null);
  const braInfoRef = useRef<HTMLDivElement>(null);
  const pantyInfoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const [braSize, setBraSize] = useState<string | null>(null);
  const [pantySize, setPantySize] = useState<string | null>(null);
  const [modal, setModal] = useState<"bra" | "panty" | null>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw <= 640;
      // progress: 0 = hero fully visible, 1 = reveal section fully in view
      const p = Math.min(1, Math.max(0, window.scrollY / vh));
      // easeInOutCubic for the motion path
      const e =
        p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const lerp = (a: number, b: number) => a + (b - a) * e;
      // gentle fade: follows the eased curve, so it starts at 0 and
      // builds gradually instead of popping in
      const opacity = Math.min(1, e * 2);
      // info blocks (name, rating, sizes) fade in at the end of the scroll
      const ip = Math.min(1, Math.max(0, (p - 0.8) / 0.2));
      // products are only clickable once they've settled in place
      const clickable = p > 0.95;

      const halfW = (braRef.current?.offsetWidth ?? 0) / 2;
      const imgH = braRef.current?.offsetHeight ?? 0;
      const halfH = imgH / 2;
      const headH = headlineRef.current?.offsetHeight ?? 0;
      const infoH1 = braInfoRef.current?.offsetHeight ?? 0;
      const infoH2 = pantyInfoRef.current?.offsetHeight ?? 0;
      const barH = checkoutRef.current?.offsetHeight ?? 0;

      const setImg = (
        el: HTMLImageElement | null,
        x: number,
        y: number,
        s: number
      ) => {
        if (!el) return;
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${s})`;
        el.style.opacity = String(opacity);
        el.style.pointerEvents = clickable ? "auto" : "none";
      };
      const placeInfo = (el: HTMLDivElement | null, x: number, y: number) => {
        if (!el) return;
        el.style.transform = `translate(calc(-50% + ${x}px), ${y}px)`;
        el.style.opacity = String(ip);
        el.style.pointerEvents = ip > 0.6 ? "auto" : "none";
      };
      const placeHead = (y: number) => {
        if (!headlineRef.current) return;
        headlineRef.current.style.transform = `translate(-50%, ${y}px)`;
        headlineRef.current.style.opacity = String(ip);
      };

      if (isMobile) {
        // stacked layout: headline / products side by side / bra info /
        // panty info, with the checkout bar pinned to the bottom edge
        const endX = Math.min(0.24 * vw, halfW + 12);
        const stackH = headH + 24 + imgH + 20 + infoH1 + 18 + infoH2;
        const stackTop = -(barH + 24) / 2 - stackH / 2;
        const yImg = stackTop + headH + 24 + halfH;

        placeHead(stackTop - (1 - ip) * 16);
        setImg(
          braRef.current,
          lerp(-0.25 * vw, -endX),
          lerp(-0.05 * vh, yImg),
          lerp(0.4, 1)
        );
        setImg(
          pantyRef.current,
          lerp(0.25 * vw, endX),
          lerp(0.08 * vh, yImg),
          lerp(0.4, 1)
        );

        const yInfo1 = stackTop + headH + 24 + imgH + 20 + (1 - ip) * 16;
        placeInfo(braInfoRef.current, 0, yInfo1);
        placeInfo(pantyInfoRef.current, 0, yInfo1 + infoH1 + 18);

        if (checkoutRef.current) {
          const st = checkoutRef.current.style;
          st.left = "12px";
          st.right = "12px";
          st.top = "auto";
          st.bottom = "12px";
          st.transform = `translateY(${(1 - ip) * 24}px)`;
          st.opacity = String(ip);
          st.pointerEvents = ip > 0.6 ? "auto" : "none";
        }
        return;
      }

      // desktop: products side by side, info under each, bar below
      // final resting offset: half the product width + breathing room,
      // so the two pieces sit side by side without overlapping
      const endX = Math.max(0.18 * vw, halfW + 32);

      // vertical offset so the whole composition (headline → checkout bar)
      // is centered in the viewport, not just the product images
      const infoH = Math.max(infoH1, infoH2);
      const topEdge = -(halfH + 48 + headH);
      const bottomEdge = halfH + 28 + infoH + 36 + barH;
      const centerOff = -(topEdge + bottomEdge) / 2;

      // from the 01/02 hover-card spots to center-left / center-right
      setImg(
        braRef.current,
        lerp(-0.22 * vw, -endX),
        lerp(-0.05 * vh, centerOff),
        lerp(0.4, 1)
      );
      setImg(
        pantyRef.current,
        lerp(0.19 * vw, endX),
        lerp(0.08 * vh, centerOff),
        lerp(0.4, 1)
      );

      const infoY = centerOff + halfH + 28 + (1 - ip) * 20;
      placeInfo(braInfoRef.current, -endX, infoY);
      placeInfo(pantyInfoRef.current, endX, infoY);

      // checkout bar centered below both info blocks
      if (checkoutRef.current) {
        const st = checkoutRef.current.style;
        st.left = "50%";
        st.right = "auto";
        st.top = "50%";
        st.bottom = "auto";
        const ctaY = centerOff + halfH + 28 + infoH + 36 + (1 - ip) * 20;
        st.transform = `translate(-50%, ${ctaY}px)`;
        st.opacity = String(ip);
        st.pointerEvents = ip > 0.6 ? "auto" : "none";
      }

      // headline above the products, same fade as the info blocks
      placeHead(centerOff - halfH - headH - 48 - (1 - ip) * 20);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  const scrollToReveal = (e: React.MouseEvent) => {
    e.preventDefault();
    revealRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const pendingActions = (braSize ? 0 : 1) + (pantySize ? 0 : 1);

  return (
    <>
      <FontFaces />
      <Hero>
      <HeroImage src={HERO_IMG} alt="" />

      <TopBar>
        <a href="#" aria-label="Shapermint home">
          <Logo src={LOGO} alt="Shapermint" />
        </a>
        <Nav>
          <a href="#">Shop Now</a>
          <a href="#">Cart</a>
        </Nav>
      </TopBar>

      <Marker $top="38%" $left="31%" onClick={() => setModal("bra")}>
        01
        <ProductCard $align="left">
          <ProductThumb>
            <img src={PRODUCT_BRA} alt="Wireless Shaper Bra" />
          </ProductThumb>
          <ProductInfo $align="left">
            <ProductName>Wireless Shaper Bra</ProductName>
            <Stars aria-label="Rated 4.8 out of 5 stars">
              ★★★★★<small>4.8 (12,406)</small>
            </Stars>
            <Prices>
              $24.99<s>$49.99</s>
            </Prices>
          </ProductInfo>
        </ProductCard>
      </Marker>
      <Marker $top="51%" $right="33%" onClick={() => setModal("panty")}>
        02
        <ProductCard $align="right">
          <ProductThumb>
            <img src={PRODUCT_PANTY} alt="Mid Waist Shaper Panty" />
          </ProductThumb>
          <ProductInfo $align="right">
            <ProductName>Mid Waist Shaper Panty</ProductName>
            <Stars aria-label="Rated 4.7 out of 5 stars">
              ★★★★★<small>4.7 (8,912)</small>
            </Stars>
            <Prices>
              $16.99<s>$32.99</s>
            </Prices>
          </ProductInfo>
        </ProductCard>
      </Marker>
      <Dim aria-hidden="true" />

      <ScrollHint aria-hidden="true">Scroll</ScrollHint>

      <Headline>
        <p>
          Bra + Panty set for $34.99 <s>$41.98</s>
        </p>
        <h1>
          <a href="#set" onClick={scrollToReveal}>
            Shop Now
          </a>
        </h1>
      </Headline>
      </Hero>

      <RevealSection id="set" ref={revealRef} />

      <FloatLayer>
        <RevealHeadline ref={headlineRef}>Customize Your Bundle</RevealHeadline>
        <FloatImg
          ref={braRef}
          src={PRODUCT_BRA}
          alt="Wireless Shaper Bra — click for details"
          onClick={() => setModal("bra")}
        />
        <FloatImg
          ref={pantyRef}
          src={PRODUCT_PANTY}
          alt="Mid Waist Shaper Panty — click for details"
          onClick={() => setModal("panty")}
        />

        <FloatInfo ref={braInfoRef}>
          <InfoName>Wireless Shaper Bra</InfoName>
          <InfoStars aria-label="Rated 4.8 out of 5 stars">
            ★★★★★<small>4.8 (12,406)</small>
          </InfoStars>
          <SizeBlock>
            <Sizes>
              {["S", "M", "L", "XL"].map((size) => (
                <SizeBtn
                  key={size}
                  $active={braSize === size}
                  onClick={() => setBraSize(size)}
                >
                  {size}
                </SizeBtn>
              ))}
            </Sizes>
          </SizeBlock>
        </FloatInfo>

        <FloatInfo ref={pantyInfoRef}>
          <InfoName>Mid Waist Shaper Panty</InfoName>
          <InfoStars aria-label="Rated 4.7 out of 5 stars">
            ★★★★★<small>4.7 (8,912)</small>
          </InfoStars>
          <SizeBlock>
            <Sizes>
              {["S", "M", "L", "XL"].map((size) => (
                <SizeBtn
                  key={size}
                  $active={pantySize === size}
                  onClick={() => setPantySize(size)}
                >
                  {size}
                </SizeBtn>
              ))}
            </Sizes>
          </SizeBlock>
        </FloatInfo>

        <CheckoutBar ref={checkoutRef}>
          <BarLeft>
            <BarThumbs>
              <ThumbWrap>
                <img src={PRODUCT_BRA} alt="Wireless Shaper Bra" />
                <SizeBadge $set={braSize !== null}>{braSize ?? "?"}</SizeBadge>
              </ThumbWrap>
              <ThumbWrap>
                <img src={PRODUCT_PANTY} alt="Mid Waist Shaper Panty" />
                <SizeBadge $set={pantySize !== null}>
                  {pantySize ?? "?"}
                </SizeBadge>
              </ThumbWrap>
            </BarThumbs>
            <BarSummary>
              <BarTotal>
                $34.99
                <s>$41.98</s>
                <em>You save $6.99</em>
              </BarTotal>
            </BarSummary>
          </BarLeft>
          <CheckoutBtn
            $ready={pendingActions === 0}
            disabled={pendingActions > 0}
            onClick={() => {
              if (pendingActions === 0) window.location.hash = "#checkout";
            }}
          >
            {pendingActions > 0
              ? `Select ${pendingActions} ${
                  pendingActions === 1 ? "size" : "sizes"
                } to continue`
              : "Checkout"}
          </CheckoutBtn>
        </CheckoutBar>
      </FloatLayer>

      <ModalDim $open={modal !== null} onClick={() => setModal(null)} />
      {(["bra", "panty"] as const).map((key) => {
        const product = PRODUCTS[key];
        const size = key === "bra" ? braSize : pantySize;
        const setSize = key === "bra" ? setBraSize : setPantySize;
        return (
          <ModalPanel
            key={key}
            $side={product.side}
            $open={modal === key}
            aria-hidden={modal !== key}
          >
            <ModalClose aria-label="Close" onClick={() => setModal(null)}>
              ×
            </ModalClose>
            <ModalImg src={product.img} alt={product.name} />
            <ModalName>{product.name}</ModalName>
            <InfoStars aria-label={product.ratingLabel}>
              ★★★★★<small>{product.rating}</small>
            </InfoStars>
            <ModalPrices>
              {product.price}
              <s>{product.oldPrice}</s>
            </ModalPrices>
            <ModalDescription>{product.description}</ModalDescription>
            <ModalFeatures>
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ModalFeatures>
            <Sizes>
              {["S", "M", "L", "XL"].map((s) => (
                <SizeBtn key={s} $active={size === s} onClick={() => setSize(s)}>
                  {s}
                </SizeBtn>
              ))}
            </Sizes>
            <ModalCta onClick={() => setModal(null)}>Add to Bundle</ModalCta>
          </ModalPanel>
        );
      })}
    </>
  );
};

export default ShapermintConcept;
