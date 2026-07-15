import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";

const StyledWrapper = styled.div`
  margin: 26px 0;
  padding: 24px;
  background-color: #fff6ef;
  border: 1px solid #f0e0d2;
  border-radius: 14px;
  text-align: center;
`;

const StyledTitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 19px;
  color: #292929;
  margin-bottom: 4px;
`;

const StyledSubtitle = styled.p`
  font-family: Georgia, "Times New Roman", serif;
  font-size: 15px;
  color: #5a5a5a;
  margin-bottom: 18px;
`;

const StyledFields = styled.div`
  display: flex;
  gap: 14px;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const StyledField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
  flex: 1;
  max-width: 200px;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #292929;

  @media (max-width: 480px) {
    max-width: none;
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  width: 100%;
  padding: 12px 14px;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  color: #292929;
  background-color: #ffffff;
  border: 1px solid #d8c9ba;
  border-radius: 8px;
  cursor: pointer;
`;

const StyledResult = styled.p`
  margin-top: 18px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #c64844;
`;

const StyledNote = styled.p`
  margin-top: 14px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 14px;
  line-height: 1.45;
  color: #5a5a5a;
`;

const bands = ["32", "34", "36", "38", "40", "42", "44"];
const cups = ["A", "B", "C", "D", "DD", "DDD"];

export const MbraAdvSizeSelector = () => {
  const { t } = useTranslation("mbraAdv");
  const [band, setBand] = useState("");
  const [cup, setCup] = useState("");

  return (
    <StyledWrapper>
      <StyledTitle>{t("article.sizeSelector.title")}</StyledTitle>
      <StyledSubtitle>{t("article.sizeSelector.subtitle")}</StyledSubtitle>

      <StyledFields>
        <StyledField>
          {t("article.sizeSelector.bandLabel")}
          <StyledSelect value={band} onChange={(event) => setBand(event.target.value)}>
            <option value="">{t("article.sizeSelector.placeholder")}</option>
            {bands.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </StyledSelect>
        </StyledField>

        <StyledField>
          {t("article.sizeSelector.cupLabel")}
          <StyledSelect value={cup} onChange={(event) => setCup(event.target.value)}>
            <option value="">{t("article.sizeSelector.placeholder")}</option>
            {cups.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </StyledSelect>
        </StyledField>
      </StyledFields>

      <StyledResult aria-live="polite">
        {band && cup
          ? `${t("article.sizeSelector.resultPrefix")} ${band}${cup}`
          : t("article.sizeSelector.resultEmpty")}
      </StyledResult>

      <StyledNote>{t("article.sizeSelector.note")}</StyledNote>
    </StyledWrapper>
  );
};
