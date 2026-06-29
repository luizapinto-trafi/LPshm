import styled from "styled-components";
import Image from "next/image";

const StyledFigure = styled.figure`
  margin: 26px 0;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const StyledPlaceholder = styled.div<{ $ratio: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  padding: 24px;
  border-radius: 10px;
  background-color: #f4e8dc;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(198, 72, 68, 0.06) 0,
    rgba(198, 72, 68, 0.06) 1px,
    transparent 1px,
    transparent 11px
  );
  border: 1px solid rgba(150, 0, 0, 0.12);
`;

const StyledCaption = styled.span`
  max-width: 80%;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.2px;
  text-align: center;
  color: #8a6d5b;
`;

type MbraAdvImageSlotProps = {
  /** Cuando exista la imagen real, pasar `src`, `width` y `height`. */
  src?: string;
  width?: number;
  height?: number;
  alt: string;
  /** Descripción del briefing, mostrada en el placeholder mientras no hay imagen. */
  caption?: string;
  /** Proporción ancho/alto del placeholder (por defecto cuadrado). */
  ratio?: number;
  priority?: boolean;
};

export const MbraAdvImageSlot = ({ src, width, height, alt, caption = "", ratio = 1, priority }: MbraAdvImageSlotProps) => (
  <StyledFigure>
    {src && width && height ? (
      <StyledImage src={src} alt={alt} width={width} height={height} priority={priority} sizes="(max-width: 700px) 100vw, 700px" />
    ) : (
      <StyledPlaceholder $ratio={ratio} role="img" aria-label={alt}>
        <StyledCaption>↳ {caption}</StyledCaption>
      </StyledPlaceholder>
    )}
  </StyledFigure>
);
