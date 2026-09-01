import styled from "styled-components";
import { useEffect, useId, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { handleKeyDown } from "@/shared/utils/KeyEvent";

type SizeId = "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL";
type Unit = "in" | "cm";

type ChartRow = { dress: string; bust: string; waist: string; hips: string };

const SIZES: SizeId[] = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const CHART_IN: Record<SizeId, ChartRow> = {
  S: { dress: "0-2", bust: "30-31", waist: "23-25.5", hips: "32-34.5" },
  M: { dress: "4-6", bust: "31.5-34", waist: "26-29.5", hips: "35-38.5" },
  L: { dress: "8-10", bust: "34.5-37.5", waist: "30-34.5", hips: "39-42.5" },
  XL: { dress: "12-14", bust: "38-42", waist: "35-38", hips: "43-48" },
  "2XL": { dress: "16-18", bust: "42.5-45", waist: "38.5-41.5", hips: "48.5-50.5" },
  "3XL": { dress: "20-22", bust: "45.5-48", waist: "42-44.5", hips: "51-54" },
  "4XL": { dress: "24", bust: "48.5-52", waist: "45-48.5", hips: "54.5-57" },
};

const CHART_CM: Record<SizeId, ChartRow> = {
  S: { dress: "0-2", bust: "76-79", waist: "58-65", hips: "81-88" },
  M: { dress: "4-6", bust: "80-86", waist: "66-75", hips: "89-98" },
  L: { dress: "8-10", bust: "88-95", waist: "76-88", hips: "99-108" },
  XL: { dress: "12-14", bust: "97-107", waist: "89-97", hips: "109-122" },
  "2XL": { dress: "16-18", bust: "108-114", waist: "98-105", hips: "123-128" },
  "3XL": { dress: "20-22", bust: "116-122", waist: "107-113", hips: "130-137" },
  "4XL": { dress: "24", bust: "123-132", waist: "114-123", hips: "138-145" },
};

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledDialog = styled.div`
  position: relative;
  width: min(640px, 100%);
  max-height: 85vh;
  overflow-y: auto;
  background: var(--white);
  border-radius: 16px;
  padding: 28px;
  box-sizing: border-box;
`;

const StyledHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 4px;
`;

const StyledTitle = styled.h3`
  font-family: var(--font-body);
  font-size: 21px;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0;
`;

const StyledClose = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: var(--ink-500);
  line-height: 1;
  padding: 0;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledLead = styled.p`
  color: var(--ink-500);
  font-size: 14px;
  margin: 6px 0 14px;
  max-width: 40ch;
  line-height: 1.45;
`;

const StyledUnitToggle = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
`;

const StyledUnitBtn = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--ink-900);
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const StyledUnitDot = styled.span<{ $active?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid var(--ink-900);
  position: relative;
  flex-shrink: 0;
  &::after {
    content: "";
    position: absolute;
    inset: 3px;
    border-radius: 999px;
    background: ${({ $active }) => ($active ? "var(--ink-900)" : "transparent")};
  }
`;

const StyledTableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
  font-size: 13px;
  font-family: var(--font-body);
`;

const StyledTh = styled.th`
  text-align: center;
  padding: 12px 8px;
  font-weight: 800;
  border-bottom: 1px solid var(--ink-200);
  color: var(--ink-900);
`;

const StyledTd = styled.td`
  text-align: center;
  padding: 11px 8px;
  color: var(--ink-900);
`;

const StyledTr = styled.tr<{ $alt?: boolean }>`
  background: ${({ $alt }) => ($alt ? "#FBF1E9" : "transparent")};
`;

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SweetheartSizeGuideModal = ({ open, onClose }: Props) => {
  const { t } = useTranslation("sweetheartCami");
  const titleId = useId();
  const [unit, setUnit] = useState<Unit>("in");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const chart = unit === "in" ? CHART_IN : CHART_CM;
  const colBust = unit === "in" ? t("sizeGuide.colBustIn") : t("sizeGuide.colBustCm");
  const colWaist = unit === "in" ? t("sizeGuide.colWaistIn") : t("sizeGuide.colWaistCm");
  const colHips = unit === "in" ? t("sizeGuide.colHipsIn") : t("sizeGuide.colHipsCm");

  return (
    <StyledOverlay
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <StyledDialog role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <StyledHead>
          <StyledTitle id={titleId}>{t("sizeGuide.title")}</StyledTitle>
          <StyledClose type="button" aria-label={t("sizeGuide.close")} onClick={onClose}>
            ×
          </StyledClose>
        </StyledHead>
        <StyledLead>{t("sizeGuide.lead")}</StyledLead>

        <StyledUnitToggle role="radiogroup" aria-label={t("sizeGuide.unitAria")}>
          <StyledUnitBtn
            type="button"
            role="radio"
            aria-checked={unit === "in"}
            $active={unit === "in"}
            onClick={() => setUnit("in")}
            onKeyDown={(e) => handleKeyDown(e, () => setUnit("in"), ["Enter", " "])}
          >
            <StyledUnitDot $active={unit === "in"} aria-hidden />
            {t("sizeGuide.unitIn")}
          </StyledUnitBtn>
          <StyledUnitBtn
            type="button"
            role="radio"
            aria-checked={unit === "cm"}
            $active={unit === "cm"}
            onClick={() => setUnit("cm")}
            onKeyDown={(e) => handleKeyDown(e, () => setUnit("cm"), ["Enter", " "])}
          >
            <StyledUnitDot $active={unit === "cm"} aria-hidden />
            {t("sizeGuide.unitCm")}
          </StyledUnitBtn>
        </StyledUnitToggle>

        <StyledTableWrap>
          <StyledTable>
            <thead>
              <tr>
                <StyledTh scope="col">{t("sizeGuide.colSize")}</StyledTh>
                <StyledTh scope="col">{t("sizeGuide.colDress")}</StyledTh>
                <StyledTh scope="col">{colBust}</StyledTh>
                <StyledTh scope="col">{colWaist}</StyledTh>
                <StyledTh scope="col">{colHips}</StyledTh>
              </tr>
            </thead>
            <tbody>
              {SIZES.map((size, i) => (
                <StyledTr key={size} $alt={i % 2 === 1}>
                  <StyledTd>
                    <strong>{size}</strong>
                  </StyledTd>
                  <StyledTd>{chart[size].dress}</StyledTd>
                  <StyledTd>{chart[size].bust}</StyledTd>
                  <StyledTd>{chart[size].waist}</StyledTd>
                  <StyledTd>{chart[size].hips}</StyledTd>
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>
        </StyledTableWrap>
      </StyledDialog>
    </StyledOverlay>
  );
};
