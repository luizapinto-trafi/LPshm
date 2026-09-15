import Image from "next/image";
import styled from "styled-components";
import { useEffect, useId, useState } from "react";
import { handleKeyDown } from "@/shared/utils/KeyEvent";
import type { SizeId } from "./leggingsB2g3Config";

type ModelDetail = {
  size: SizeId;
  modelName: string;
  modelHeight: string;
  colorWorn: string;
  imageUrl: string;
};

/** From live PDP `product.models_details` — High-Waisted Shaping Leggings. */
export const LEGGINGS_B2G3_SIYS_MODELS: ModelDetail[] = [
  {
    size: "S",
    modelName: "Natalia",
    modelHeight: "5' 4\"",
    colorWorn: "Black",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/NATALIA_HWL___S_24b89be1-359f-4bda-a29e-2a318c3feace.webp?v=1740498695",
  },
  {
    size: "M",
    modelName: "Angie",
    modelHeight: "5' 4\"",
    colorWorn: "Black",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/ANGIE_HWL2.webp?v=1740497072",
  },
  {
    size: "L",
    modelName: "Gabi",
    modelHeight: "5' 4\"",
    colorWorn: "Black",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/GABI_HWL__L_1b60f083-1e25-4631-8989-23f083c51810.jpg?v=1739258173",
  },
  {
    size: "XL",
    modelName: "Silvina",
    modelHeight: "5' 4\"",
    colorWorn: "Black",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/SILVINA_HWL___XL_8a85f4c0-64ec-4a09-b25e-e6631bbe5a54.webp?v=1740498613",
  },
  {
    size: "2XL",
    modelName: "Michelle",
    modelHeight: "5' 8\"",
    colorWorn: "Black",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/MICHELLE_HWL___2XL_3XL_5318ae75-6dff-442a-b567-2d042c755856.webp?v=1740498612",
  },
  {
    size: "3XL",
    modelName: "Florencia",
    modelHeight: "5' 3\"",
    colorWorn: "Black",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/FLORENCIA_HWL___3XL_36836742-2abe-4ba3-95c9-b1bbbca802ff.webp?v=1740498612",
  },
  {
    size: "4XL",
    modelName: "Amanda",
    modelHeight: "5' 1\"",
    colorWorn: "Black",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/AMANDA_HWL___4XL_ddb329ea-8cda-48ee-811e-463d1f056870.webp?v=17404986120",
  },
];

const SIZES = LEGGINGS_B2G3_SIYS_MODELS.map((m) => m.size);

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
  initialSize: SizeId;
  onClose: () => void;
  onSelect: (size: SizeId) => void;
};

export const LeggingsB2g3SeeInYourSizeModal = ({ open, initialSize, onClose, onSelect }: Props) => {
  const titleId = useId();
  const [previewSize, setPreviewSize] = useState<SizeId>(initialSize);

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
    LEGGINGS_B2G3_SIYS_MODELS.find((m) => m.size === previewSize) ?? LEGGINGS_B2G3_SIYS_MODELS[0];

  return (
    <StyledOverlay
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <StyledDialog role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={(e) => e.stopPropagation()}>
        <StyledClose type="button" aria-label="Close" onClick={onClose}>
          ×
        </StyledClose>
        <StyledTitle id={titleId}>SEE IN YOUR SIZE</StyledTitle>
        <StyledLead>Select your size below to see the closest size available</StyledLead>

        <StyledBody>
          <StyledImageWrap>
            <Image
              src={model.imageUrl}
              alt={`${model.modelName} wearing size ${model.size} in ${model.colorWorn}`}
              fill
              unoptimized
              sizes="(min-width: 768px) 440px, 90vw"
              style={{ objectFit: "cover" }}
            />
          </StyledImageWrap>

          <StyledControls>
            <StyledCaption>
              {model.modelName} is {model.modelHeight} and wears {model.size} in {model.colorWorn}.
            </StyledCaption>

            <StyledSizes role="radiogroup" aria-label="Select a size">
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
              SELECT SIZE {previewSize}
            </StyledSelectCta>
          </StyledControls>
        </StyledBody>
      </StyledDialog>
    </StyledOverlay>
  );
};
