import styled from "styled-components";
import Image from "next/image";
import { DENISE_IMAGE_SLOTS } from "./deniseCdn";

const StyledFigure = styled.figure`
  margin: 28px 0 0;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
`;

const StyledPlaceholder = styled.div<{ $ratio: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  padding: 24px;
  border-radius: 4px;
  background-color: #f0ebe6;
  border: 1px dashed rgba(95, 136, 150, 0.35);
`;

const StyledCaption = styled.span`
  max-width: 90%;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  color: #8a8a8a;
`;

type DeniseImageSlotProps = {
  n: number;
  priority?: boolean;
};

export const DeniseImageSlot = ({ n, priority }: DeniseImageSlotProps) => {
  const slot = DENISE_IMAGE_SLOTS[n];
  if (!slot) return null;

  if (slot.src && slot.width && slot.height) {
    return (
      <StyledFigure>
        <StyledImage
          src={slot.src}
          alt={slot.alt}
          width={slot.width}
          height={slot.height}
          data-slot={String(n)}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 48rem"
        />
      </StyledFigure>
    );
  }

  return (
    <StyledFigure>
      <StyledPlaceholder $ratio={slot.ratio} data-slot={String(n)} role="img" aria-label={slot.label}>
        <StyledCaption>{slot.label}</StyledCaption>
      </StyledPlaceholder>
    </StyledFigure>
  );
};
