import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { PRODUCT } from "./leggingsB2g3Config";
import { PDP_REVIEW_PHOTOS, PDP_REVIEWS } from "./leggingsB2g3Content";

/** Stamped-style reviews block — visual parity with live BOGO widget. */

const StyledSection = styled.section`
  max-width: 980px;
  margin: 0 auto;
  padding: 40px 16px 56px;
  box-sizing: border-box;
  width: 100%;
  @media (min-width: 900px) {
    padding: 56px 24px 72px;
  }
`;

const StyledHeading = styled.h2`
  margin: 0 0 28px;
  text-align: center;
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  color: var(--ink-900);
`;

const StyledSummaryRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  align-items: start;
  margin-bottom: 28px;
  @media (min-width: 720px) {
    grid-template-columns: 180px minmax(0, 1fr);
    gap: 28px;
  }
`;

const StyledRatingBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const StyledRatingValue = styled.div`
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  color: var(--ink-900);
`;

const StyledStars = styled.div<{ $size?: number }>`
  display: inline-flex;
  gap: 2px;
  color: var(--gold-600);
  font-size: ${({ $size }) => ($size ? `${$size}px` : "18px")};
  letter-spacing: 1px;
  line-height: 1;
`;

const StyledReviewCount = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 22px;
  color: var(--ink-600);
`;

const StyledPhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 4px;
`;

const StyledPhotoCell = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--ink-150);
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
`;

const StyledActionBtn = styled.button<{ $primary?: boolean }>`
  min-width: 160px;
  height: 44px;
  padding: 0 20px;
  border-radius: var(--radius-md);
  border: 1px solid var(--ink-900);
  background: ${({ $primary }) => ($primary ? "var(--ink-900)" : "var(--white)")};
  color: ${({ $primary }) => ($primary ? "var(--white)" : "var(--ink-900)")};
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledTabsRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid var(--ink-200);
  margin-bottom: 8px;
`;

const StyledTabs = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledTab = styled.button<{ $active?: boolean }>`
  margin: 0;
  padding: 12px 0 10px;
  border: none;
  border-bottom: 3px solid ${({ $active }) => ($active ? "var(--coral-500)" : "transparent")};
  background: transparent;
  color: var(--ink-900);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;
  margin-bottom: -1px;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledSort = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding-bottom: 10px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-900);
  select {
    border: none;
    background: transparent;
    font: inherit;
    color: inherit;
    cursor: pointer;
    padding: 0;
  }
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledReview = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid var(--ink-200);
  @media (min-width: 720px) {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 24px;
    align-items: start;
  }
`;

const StyledReviewMain = styled.div`
  min-width: 0;
`;

const StyledReviewHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`;

const StyledAuthor = styled.span`
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--ink-900);
`;

const StyledDate = styled.span`
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink-600);
  white-space: nowrap;
`;

const StyledReviewTitle = styled.h3`
  margin: 8px 0 6px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: var(--ink-900);
`;

const StyledReviewBody = styled.p`
  margin: 0 0 14px;
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 24px;
  color: var(--ink-900);
  white-space: pre-line;
`;

const StyledHelpful = styled.button`
  height: 28px;
  padding: 0 12px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--ink-900);
  color: var(--white);
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid var(--ink-900);
    outline-offset: 2px;
  }
`;

const StyledReviewMedia = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  @media (min-width: 720px) {
    width: 120px;
  }
`;

const StyledReviewThumbs = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const StyledReviewThumb = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  overflow: hidden;
  background: var(--ink-150);
  @media (min-width: 720px) {
    width: 120px;
    height: 120px;
  }
`;

const StyledVariant = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--ink-600);
`;

const formatDate = (iso: string) => {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const Stars = ({ value, size }: { value: number; size?: number }) => {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.25 && value - full < 0.75;
  return (
    <StyledStars $size={size} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && hasHalf) {
          return (
            <span key={i} style={{ position: "relative", display: "inline-block", width: "1em" }}>
              <span style={{ color: "#ddd" }}>★</span>
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "50%",
                  overflow: "hidden",
                  color: "var(--gold-600)",
                }}
              >
                ★
              </span>
            </span>
          );
        }
        return (
          <span key={i} style={{ color: "#ddd" }}>
            ★
          </span>
        );
      })}
    </StyledStars>
  );
};

export const LeggingsB2g3Reviews = () => {
  const [tab, setTab] = useState<"reviews" | "questions">("reviews");
  const countLabel = PRODUCT.reviewCount.toLocaleString("en-US");

  return (
    <StyledSection id="reviews" aria-labelledby="reviews-heading">
      <StyledHeading id="reviews-heading">Reviews</StyledHeading>

      <StyledSummaryRow>
        <StyledRatingBlock>
          <StyledRatingValue>
            {Number.isInteger(PRODUCT.rating) ? PRODUCT.rating : PRODUCT.rating.toFixed(1)}
          </StyledRatingValue>
          <Stars value={PRODUCT.rating} size={20} />
          <StyledReviewCount>{countLabel} reviews</StyledReviewCount>
        </StyledRatingBlock>

        <StyledPhotoGrid>
          {PDP_REVIEW_PHOTOS.map((src) => (
            <StyledPhotoCell key={src}>
              <Image src={src} alt="" fill unoptimized sizes="80px" style={{ objectFit: "cover" }} />
            </StyledPhotoCell>
          ))}
        </StyledPhotoGrid>
      </StyledSummaryRow>

      <StyledActions>
        <StyledActionBtn type="button">Ask a question</StyledActionBtn>
        <StyledActionBtn type="button" $primary>
          Write a review
        </StyledActionBtn>
      </StyledActions>

      <StyledTabsRow>
        <StyledTabs role="tablist" aria-label="Reviews and questions">
          <StyledTab type="button" role="tab" $active={tab === "reviews"} aria-selected={tab === "reviews"} onClick={() => setTab("reviews")}>
            Reviews ({countLabel})
          </StyledTab>
          <StyledTab type="button" role="tab" $active={tab === "questions"} aria-selected={tab === "questions"} onClick={() => setTab("questions")}>
            Questions
          </StyledTab>
        </StyledTabs>
        <StyledSort>
          <label htmlFor="reviews-sort">Sort</label>
          <select id="reviews-sort" defaultValue="newest" aria-label="Sort reviews">
            <option value="newest">Newest</option>
            <option value="highest">Highest rating</option>
            <option value="lowest">Lowest rating</option>
          </select>
        </StyledSort>
      </StyledTabsRow>

      {tab === "reviews" ? (
        <StyledList>
          {PDP_REVIEWS.map((r, i) => (
            <StyledReview key={`${r.author}-${r.date}-${i}`}>
              <StyledReviewMain>
                <StyledReviewHead>
                  <StyledAuthor>{r.author}</StyledAuthor>
                  <StyledDate>{formatDate(r.date)}</StyledDate>
                </StyledReviewHead>
                <Stars value={r.rating} size={14} />
                {r.title ? <StyledReviewTitle>{r.title}</StyledReviewTitle> : null}
                <StyledReviewBody>{r.body}</StyledReviewBody>
                <StyledHelpful type="button">Helpful</StyledHelpful>
              </StyledReviewMain>
              {r.images?.length ? (
                <StyledReviewMedia>
                  <StyledReviewThumbs>
                    {r.images.map((src) => (
                      <StyledReviewThumb key={src}>
                        <Image src={src} alt="" fill unoptimized sizes="120px" style={{ objectFit: "cover" }} />
                      </StyledReviewThumb>
                    ))}
                  </StyledReviewThumbs>
                  {r.variant ? <StyledVariant>{r.variant}</StyledVariant> : null}
                </StyledReviewMedia>
              ) : r.variant ? (
                <StyledReviewMedia>
                  <StyledVariant>{r.variant}</StyledVariant>
                </StyledReviewMedia>
              ) : null}
            </StyledReview>
          ))}
        </StyledList>
      ) : (
        <StyledReviewBody style={{ padding: "24px 0" }}>No questions yet.</StyledReviewBody>
      )}
    </StyledSection>
  );
};
