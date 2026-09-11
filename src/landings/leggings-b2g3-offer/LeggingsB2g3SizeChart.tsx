import { useState } from "react";
import styled from "styled-components";
import { PDP_SIZE_CHART } from "./leggingsB2g3Content";

type Unit = "in" | "cm";

const StyledWrap = styled.div`
  margin-top: 0;
  padding-top: 0;
`;

const StyledTitle = styled.h2`
  margin: 0 0 8px;
  font-family: var(--font-body);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.25;
  color: #292929;
`;

const StyledLead = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.45;
  color: #292929;
  max-width: 42ch;
`;

const StyledUnitRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  margin-bottom: 10px;
`;

const StyledUnitBtn = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  color: #292929;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
`;

const StyledRadio = styled.span<{ $active?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid #292929;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $active }) => ($active ? "#292929" : "transparent")};
  }
`;

const StyledTableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  line-height: 1.35;
  color: #292929;
  th,
  td {
    padding: 10px 8px;
    text-align: center;
    border-bottom: 1px solid #e8e8e8;
    white-space: nowrap;
  }
  th {
    font-weight: 700;
    background: #f7f1eb;
  }
  td:first-child {
    font-weight: 700;
  }
  tbody tr:nth-child(even) {
    background: #fbf7f3;
  }
  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const StyledFaq = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  color: #292929;
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
`;

const StyledFaqIcon = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #e8a39a;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex: none;
`;

const FAQ_HREF = "https://shapermint.com/pages/faq";

export const LeggingsB2g3SizeChart = () => {
  const [unit, setUnit] = useState<Unit>("in");
  const chart = PDP_SIZE_CHART;

  return (
    <StyledWrap>
      <StyledTitle>Unsure of your size?</StyledTitle>
      <StyledLead>
        Use our size chart to ensure the perfect fit for every body type, petite to plus-size.
      </StyledLead>

      <StyledUnitRow role="radiogroup" aria-label="Measurement unit">
        <StyledUnitBtn type="button" role="radio" aria-checked={unit === "in"} $active={unit === "in"} onClick={() => setUnit("in")}>
          <StyledRadio $active={unit === "in"} aria-hidden />
          By Inches
        </StyledUnitBtn>
        <StyledUnitBtn type="button" role="radio" aria-checked={unit === "cm"} $active={unit === "cm"} onClick={() => setUnit("cm")}>
          <StyledRadio $active={unit === "cm"} aria-hidden />
          By cm
        </StyledUnitBtn>
      </StyledUnitRow>

      <StyledTableWrap>
        <StyledTable>
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">Pant Size (US)</th>
              <th scope="col">{unit === "in" ? "Waist (in)" : "Waist (cm)"}</th>
              <th scope="col">{unit === "in" ? "Hips (in)" : "Hips (cm)"}</th>
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row) => (
              <tr key={row.size}>
                <td>{row.size}</td>
                <td>{row.pant}</td>
                <td>{unit === "in" ? row.waistIn : row.waistCm}</td>
                <td>{unit === "in" ? row.hipsIn : row.hipsCm}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </StyledTableWrap>

      <StyledFaq href={FAQ_HREF} target="_blank" rel="noopener noreferrer">
        <StyledFaqIcon aria-hidden>?</StyledFaqIcon>
        Need more help? Here are some FAQ
      </StyledFaq>
    </StyledWrap>
  );
};
