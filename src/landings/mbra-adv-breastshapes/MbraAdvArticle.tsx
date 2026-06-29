import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import Image from "next/image";
import { MbraAdvAssets } from "./mbraAdvCdn";
import { MbraAdvCtaButton } from "./MbraAdvCtaButton";
import { MbraAdvImageSlot } from "./MbraAdvImageSlot";
import { MbraAdvShapeCards } from "./MbraAdvShapeCards";
import { MbraAdvSizeSelector } from "./MbraAdvSizeSelector";
import { MbraAdvChecklist } from "./MbraAdvChecklist";
import { MbraAdvReviews } from "./MbraAdvReviews";
import { renderRich } from "./richText";

const StyledArticle = styled.article`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 8px 20px 40px;
  color: #292929;
  font-family: Georgia, "Times New Roman", serif;
`;

const StyledTitle = styled.h1`
  margin: 8px 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.3;
  color: #292929;

  @media (max-width: 600px) {
    font-size: 25px;
  }
`;

const StyledByline = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
`;

const StyledAvatar = styled(Image)`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const StyledBylineBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const StyledAuthor = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #292929;
`;

const StyledDate = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  color: #8a8a8a;
`;

const StyledHeading = styled.h2`
  margin: 36px 0 16px;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.35;
  color: #292929;

  @media (max-width: 600px) {
    font-size: 21px;
  }
`;

const StyledParagraph = styled.p`
  margin: 0 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  line-height: 31px;
  color: #292929;

  strong {
    font-weight: 700;
  }
`;

const StyledDuoRow = styled.div`
  display: flex;
  gap: 10px;
  margin: 24px 0;

  & > figure {
    flex: 1;
    margin: 0;
    aspect-ratio: 0.86;
    overflow: hidden;
    border-radius: 10px;
  }

  & img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    object-position: top center;
    border-radius: 0;
  }
`;

const StyledWarning = styled.div`
  margin: 28px auto 0;
  max-width: 480px;
  padding: 14px 18px;
  background-color: #f2d96f;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
  color: #2b2b2b;
`;

export const MbraAdvArticle = () => {
  const { t } = useTranslation("mbraAdv");

  const shipsWithItems = [
    t("article.shipsWith.item1"),
    t("article.shipsWith.item2"),
    t("article.shipsWith.item3"),
    t("article.shipsWith.item4"),
  ];
  const changesItems = [
    t("article.changes.item1"),
    t("article.changes.item2"),
    t("article.changes.item3"),
    t("article.changes.item4"),
  ];

  return (
    <StyledArticle>
      <StyledTitle>{t("article.title")}</StyledTitle>

      <StyledByline>
        <StyledAvatar
          src={MbraAdvAssets.authorAvatar}
          width={82}
          height={82}
          alt={t("article.authorAlt")}
        />
        <StyledBylineBody>
          <StyledAuthor>{t("article.byline")}</StyledAuthor>
          <StyledDate>{t("article.bylineDate")}</StyledDate>
        </StyledBylineBody>
      </StyledByline>

      <StyledParagraph>{renderRich(t("article.intro1"))}</StyledParagraph>

      <MbraAdvImageSlot
        src={MbraAdvAssets.expertMeasure}
        width={1080}
        height={1080}
        alt={t("article.imgLifestyle1")}
        caption={t("article.imgLifestyle1")}
        priority
      />

      <StyledParagraph>{renderRich(t("article.intro2"))}</StyledParagraph>
      <StyledParagraph>{renderRich(t("article.intro3"))}</StyledParagraph>
      <StyledParagraph>{renderRich(t("article.intro4"))}</StyledParagraph>

      <MbraAdvImageSlot
        src={MbraAdvAssets.productBox}
        width={2701}
        height={2739}
        alt={t("article.imgProduct")}
        caption={t("article.imgProduct")}
      />

      <StyledHeading>{t("article.s1Heading")}</StyledHeading>
      <StyledParagraph>{renderRich(t("article.s1p1"))}</StyledParagraph>
      <StyledParagraph>{renderRich(t("article.s1p2"))}</StyledParagraph>

      <MbraAdvShapeCards />

      <StyledParagraph>{renderRich(t("article.s1p3"))}</StyledParagraph>
      <StyledParagraph>{renderRich(t("article.s1p4"))}</StyledParagraph>
      <MbraAdvCtaButton label={t("cta.buy")} />

      <StyledHeading>{t("article.s2Heading")}</StyledHeading>
      <StyledParagraph>{renderRich(t("article.s2p1"))}</StyledParagraph>
      <StyledParagraph>{renderRich(t("article.s2p2"))}</StyledParagraph>

      <MbraAdvSizeSelector />
      <MbraAdvChecklist title={t("article.shipsWithTitle")} items={shipsWithItems} />

      <StyledParagraph>{renderRich(t("article.s2p3"))}</StyledParagraph>
      <StyledParagraph>{renderRich(t("article.s2p4"))}</StyledParagraph>
      <MbraAdvCtaButton label={t("cta.buy")} />

      <StyledDuoRow>
        <MbraAdvImageSlot
          src={MbraAdvAssets.lifestyleFront}
          width={441}
          height={509}
          alt={t("article.imgLifestyle2")}
        />
        <MbraAdvImageSlot
          src={MbraAdvAssets.lifestyleBack}
          width={369}
          height={507}
          alt={t("article.imgLifestyle2")}
        />
      </StyledDuoRow>

      <StyledHeading>{t("article.s3Heading")}</StyledHeading>
      <StyledParagraph>{renderRich(t("article.s3p1"))}</StyledParagraph>
      <StyledParagraph>{renderRich(t("article.s3p2"))}</StyledParagraph>

      <MbraAdvReviews />

      <StyledParagraph>{renderRich(t("article.s3p3"))}</StyledParagraph>

      <StyledHeading>{t("article.s4Heading")}</StyledHeading>
      <StyledParagraph>{renderRich(t("article.s4p1"))}</StyledParagraph>
      <StyledParagraph>{renderRich(t("article.s4p2"))}</StyledParagraph>

      <MbraAdvImageSlot
        src={MbraAdvAssets.lifestyle3Duo}
        width={1064}
        height={766}
        alt={t("article.imgLifestyle3")}
        caption={t("article.imgLifestyle3")}
      />
      <MbraAdvChecklist title={t("article.changesTitle")} items={changesItems} />
      <MbraAdvImageSlot
        src={MbraAdvAssets.comparison}
        width={1012}
        height={734}
        alt={t("article.imgComparison")}
        caption={t("article.imgComparison")}
      />

      <StyledHeading>{t("article.s5Heading")}</StyledHeading>
      <StyledParagraph>{renderRich(t("article.s5p1"))}</StyledParagraph>
      <StyledParagraph>{renderRich(t("article.s5p2"))}</StyledParagraph>
      <StyledParagraph>{renderRich(t("article.s5p3"))}</StyledParagraph>
      <StyledParagraph>{renderRich(t("article.s5p4"))}</StyledParagraph>
      <MbraAdvCtaButton label={t("cta.buy")} />

      <StyledWarning>{t("article.warning")}</StyledWarning>
    </StyledArticle>
  );
};
