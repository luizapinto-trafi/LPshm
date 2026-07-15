import styled from "styled-components";

const StyledWrapper = styled.div`
  margin: 24px 0;
  padding: 20px 22px;
  background-color: #fff6ef;
  border: 1px solid #f0e0d2;
  border-radius: 12px;
`;

const StyledTitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #292929;
  margin-bottom: 12px;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 17px;
  line-height: 1.45;
  color: #292929;
`;

const StyledCheck = styled.span`
  flex-shrink: 0;
  color: #c64844;
  font-weight: 700;
`;

type MbraAdvChecklistProps = {
  title?: string;
  items: string[];
};

export const MbraAdvChecklist = ({ title, items }: MbraAdvChecklistProps) => (
  <StyledWrapper>
    {title ? <StyledTitle>{title}</StyledTitle> : null}
    <StyledList>
      {items.map((item, index) => (
        <StyledItem key={index}>
          <StyledCheck aria-hidden="true">✓</StyledCheck>
          {item}
        </StyledItem>
      ))}
    </StyledList>
  </StyledWrapper>
);
