import styled from "styled-components";

const StyledStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`;

const StyledBox = styled.div<{ $tone: "pros" | "cons" }>`
  padding: 20px;
  border-radius: 6px;
  background-color: ${({ $tone }) => ($tone === "pros" ? "#effaf1" : "#fdeeee")};
`;

const StyledLabel = styled.p<{ $tone: "pros" | "cons" }>`
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 12px;
  font-weight: 700;
  font-style: italic;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $tone }) => ($tone === "pros" ? "#2f7d4a" : "#b3261e")};
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
`;

const StyledItem = styled.li`
  display: flex;
  gap: 10px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 16px;
  line-height: 26px;
  color: #292929;
`;

const StyledMark = styled.span<{ $tone: "pros" | "cons" }>`
  flex-shrink: 0;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  color: ${({ $tone }) => ($tone === "pros" ? "#2f7d4a" : "#b3261e")};
`;

type DeniseProsConsProps = {
  pros: string[];
  cons: string[];
};

export const DeniseProsCons = ({ pros, cons }: DeniseProsConsProps) => (
  <StyledStack>
    <StyledBox $tone="pros">
      <StyledLabel $tone="pros">Pros</StyledLabel>
      <StyledList>
        {pros.map((p) => (
          <StyledItem key={p}>
            <StyledMark $tone="pros" aria-hidden="true">
              ✓
            </StyledMark>
            <span>{p}</span>
          </StyledItem>
        ))}
      </StyledList>
    </StyledBox>
    <StyledBox $tone="cons">
      <StyledLabel $tone="cons">Cons</StyledLabel>
      <StyledList>
        {cons.map((c) => (
          <StyledItem key={c}>
            <StyledMark $tone="cons" aria-hidden="true">
              ✕
            </StyledMark>
            <span>{c}</span>
          </StyledItem>
        ))}
      </StyledList>
    </StyledBox>
  </StyledStack>
);
