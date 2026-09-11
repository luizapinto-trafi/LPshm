import styled from "styled-components";
import Image from "next/image";

const StyledFigure = styled.figure`
  position: absolute;
  inset: 0;
  margin: 0;
  overflow: hidden;
  background: var(--coral-050);
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  object-position: center;
`;

type ShapewearListicleImageSlotProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

/** Fills parent (absolute). Parent sets rectangular aspect-ratio. */
export const ShapewearListicleImageSlot = ({
  src,
  alt,
  priority,
}: ShapewearListicleImageSlotProps) => (
  <StyledFigure>
    <StyledImage
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 900px) 100vw, 50vw"
      unoptimized
    />
  </StyledFigure>
);
