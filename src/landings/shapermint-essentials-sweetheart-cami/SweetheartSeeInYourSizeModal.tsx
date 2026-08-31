import Image from "next/image";
import styled from "styled-components";
import { useEffect, useId, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { handleKeyDown } from "@/shared/utils/KeyEvent";

export type SweetheartSiysSize = "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL";

type ModelDetail = {
  size: SweetheartSiysSize;
  modelName: string;
  modelHeight: string;
  colorWorn: string;
  imageUrl: string;
};

/** From live PDP `product.models_details` for Sweetheart Built-In Bra Shaper Cami. */
export const SWEETHEART_SIYS_MODELS: ModelDetail[] = [
  {
    size: "S",
    modelName: "Lyn",
    modelHeight: "5' 2\"",
    colorWorn: "White",
    imageUrl:
      "https://cdn.shapermint.com/products/images/535fcc24-dc4c-4579-adba-f4cecdb620fc_0198effc-1e2b-76aa-9e7d-78d9a35f48c8_Shapermint-Essentials-Sweetheart-Built-In-Bra-Shaper-Cami.jpg",
  },
  {
    size: "M",
    modelName: "Natalia",
    modelHeight: "5' 5\"",
    colorWorn: "Chai",
    imageUrl:
      "https://cdn.shapermint.com/products/images/535fcc24-dc4c-4579-adba-f4cecdb620fc_0198effd-8b0b-75ab-b7f2-c8ad850b92f5_Shapermint-Essentials-Sweetheart-Built-In-Bra-Shaper-Cami.jpg",
  },
  {
    size: "L",
    modelName: "Brenda",
    modelHeight: "5' 5\"",
    colorWorn: "White",
    imageUrl:
      "https://cdn.shapermint.com/products/images/535fcc24-dc4c-4579-adba-f4cecdb620fc_0198effd-c91a-7608-85b5-343bc19db5be_Shapermint-Essentials-Sweetheart-Built-In-Bra-Shaper-Cami.jpg",
  },
  {
    size: "XL",
    modelName: "Jorgelina",
    modelHeight: "5' 7\"",
    colorWorn: "White",
    imageUrl:
      "https://cdn.shapermint.com/products/images/535fcc24-dc4c-4579-adba-f4cecdb620fc_0198effe-0dc8-769f-a936-7e8da35a3fbe_Shapermint-Essentials-Sweetheart-Built-In-Bra-Shaper-Cami.jpg",
  },
  {
    size: "2XL",
    modelName: "Kenyah",
    modelHeight: "5' 10\"",
    colorWorn: "Chai",
    imageUrl:
      "https://cdn.shapermint.com/products/images/535fcc24-dc4c-4579-adba-f4cecdb620fc_0198effe-394a-7274-ba45-dbe813bb3928_Shapermint-Essentials-Sweetheart-Built-In-Bra-Shaper-Cami.jpg",
  },
  {
    size: "3XL",
    modelName: "Krista",
    modelHeight: "5' 9\"",
    colorWorn: "Black",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/62206_3XL.jpg?v=1756808508",
  },
  {
    size: "4XL",
    modelName: "Jessie",
    modelHeight: "5' 7\"",
    colorWorn: "White",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/62206_4XL_08b7ce16-1f51-4eb1-a51b-a3d9503ac889.jpg?v=1756801905",
  },
];

const SIZES = SWEETHEART_SIYS_MODELS.map((m) => m.size);

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
`;

const StyledDialog = styled.div`
  position: relative;
  width: min(920px, 100%);
  max-height: min(92vh, 820px);
  overflow: auto;
  background: var(--white);
  border-radius: 12px;
  box-sizing: border-box;
  padding: 20px 16px 24px;
  @media (min-width: 768px) {
    padding: 28px 32px 32px;
  }
`;

const StyledClose = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
  color: var(--ink-900);
  display: grid;
  place-items: center;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledTitle = styled.h2`
  margin: 0 28px 8px 0;
  font-family: var(--font-display);
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--ink-900);
  text-align: center;
`;

const StyledLead = styled.p`
  margin: 0 0 20px;
  text-align: center;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.4;
  color: var(--ink-600);
`;

const StyledBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media (min-width: 768px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: 28px;
    align-items: start;
  }
`;

const StyledImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 8px;
  overflow: hidden;
  background: var(--ink-100);
`;

const StyledControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

const StyledCaption = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.4;
  color: var(--ink-900);
`;

const StyledSizes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledSizeChip = styled.button<{ $selected?: boolean }>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  height: 40px;
  padding: 0 12px;
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: ${({ $selected }) => ($selected ? "var(--ink-900)" : "var(--white)")};
  color: ${({ $selected }) => ($selected ? "var(--white)" : "var(--ink-900)")};
  border: 1px solid ${({ $selected }) => ($selected ? "var(--ink-900)" : "var(--ink-300)")};
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledSelectCta = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 48px;
  padding: 0.75rem 1.5rem;
  border: 0;
  border-radius: var(--radius-lg);
  background: var(--coral-300);
  color: var(--ink-900);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background var(--dur-base) var(--ease-out);
  &:hover {
    background: var(--coral-250);
  }
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

type Props = {
  open: boolean;
  initialSize: SweetheartSiysSize;
  onClose: () => void;
  onSelect: (size: SweetheartSiysSize) => void;
};

export const SweetheartSeeInYourSizeModal = ({ open, initialSize, onClose, onSelect }: Props) => {
  const { t } = useTranslation("sweetheartCami");
  const titleId = useId();
  const [previewSize, setPreviewSize] = useState<SweetheartSiysSize>(initialSize);

  useEffect(() => {
    if (open) setPreviewSize(initialSize);
  }, [open, initialSize]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const model =
    SWEETHEART_SIYS_MODELS.find((m) => m.size === previewSize) ?? SWEETHEART_SIYS_MODELS[0];

  return (
    <StyledOverlay
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <StyledDialog
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <StyledClose type="button" aria-label={t("siys.close", { defaultValue: "Close" })} onClick={onClose}>
          ×
        </StyledClose>
        <StyledTitle id={titleId}>{t("siys.title", { defaultValue: "SEE IN YOUR SIZE" })}</StyledTitle>
        <StyledLead>
          {t("siys.lead", { defaultValue: "Select your size below to see the closest size available" })}
        </StyledLead>

        <StyledBody>
          <StyledImageWrap>
            <Image
              src={model.imageUrl}
              alt={t("siys.imageAlt", {
                name: model.modelName,
                size: model.size,
                color: model.colorWorn,
                defaultValue: `${model.modelName} wearing size ${model.size} in ${model.colorWorn}`,
              })}
              fill
              sizes="(min-width: 768px) 440px, 90vw"
              style={{ objectFit: "cover" }}
            />
          </StyledImageWrap>

          <StyledControls>
            <StyledCaption>
              {t("siys.caption", {
                name: model.modelName,
                height: model.modelHeight,
                size: model.size,
                color: model.colorWorn,
                defaultValue: `${model.modelName} is ${model.modelHeight} and wears ${model.size} in ${model.colorWorn}`,
              })}
            </StyledCaption>

            <StyledSizes role="radiogroup" aria-label={t("siys.sizesAria", { defaultValue: "Select a size" })}>
              {SIZES.map((s) => (
                <StyledSizeChip
                  key={s}
                  type="button"
                  role="radio"
                  $selected={previewSize === s}
                  aria-checked={previewSize === s}
                  onClick={() => setPreviewSize(s)}
                  onKeyDown={(e) => handleKeyDown(e, () => setPreviewSize(s), ["Enter", " "])}
                >
                  {s}
                </StyledSizeChip>
              ))}
            </StyledSizes>

            <StyledSelectCta type="button" onClick={() => onSelect(previewSize)}>
              {t("siys.selectCta", {
                size: previewSize,
                defaultValue: `SELECT SIZE ${previewSize}`,
              })}
            </StyledSelectCta>
          </StyledControls>
        </StyledBody>
      </StyledDialog>
    </StyledOverlay>
  );
};
