/* eslint-disable @next/next/no-img-element */
/**
 * Shapermint checkout upsell — native, editable React port of the page scraped
 * via Firecrawl (Buy One Cami, Get One Free). The original design-system CSS is
 * embedded verbatim (SHM_UPSELL_CSS) and the markup is reproduced as JSX using
 * the same class names, so it renders faithfully but stays fully editable.
 * Source: https://checkout.shapermint.com/hc/upselling/a8d0ce48-ddca-40a7-914f-7f0a3a0d3fed/540/2162
 */
import React from "react";

const CDN = {
  logo: "https://cdn.shapermint.com/assets/shapermint/images/shapermint_logo_black.svg",
  star: "https://cdn.shapermint.com/assets/common/icons/star.png",
  product:
    "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/camis-tanks-black-m-offer-shapermint-essentials-2-pack-scoop-neck-cami-65-percent-off-32464605479046.jpg?v=1762182904",
  reviewsSummary: "https://cdn.shapermint.com/assets/common/images/reviews-summary.svg?format=svg",
  guarantee: "https://cdn.shapermint.com/assets/shapermint/images/sixtydaysGuarantee.webp",
  review1: "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/cami-1.png?v=1732122117",
  review2: "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/cami-2.png?v=1732122117",
  review3: "https://cdn.shopify.com/s/files/1/0021/4889/2732/files/cami-3.png?v=1732122117",
};

const COLORS = [
  { id: "black", name: "Black", kind: "solid", fill: "#000000" },
  { id: "chai", name: "Chai", kind: "solid", fill: "#E7D3C8" },
  { id: "white", name: "White", kind: "solid", fill: "#FFFFFF" },
  { id: "chocolate", name: "Chocolate", kind: "solid", fill: "#553c36" },
  { id: "black-chai", name: "Black / Chai", kind: "split", a: "#000000", b: "#E7D3C8" },
  { id: "black-white", name: "Black / White", kind: "split", a: "#000000", b: "#FFFFFF" },
  { id: "chai-white", name: "Chai / White", kind: "split", a: "#E7D3C8", b: "#FFFFFF" },
] as const;

const SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"] as const;

const REVIEWS = [
  {
    img: CDN.review1,
    buyer: "Amber M.",
    text:
      "Absolutely amazing! I have purchased just about every Rand of Shape Ware out there and there is not even a comparison! I cannot believe I\u2019m saying that, but 100% truth!! Additionally, ABSOLUTELY BEST CUSTOMER SERVICE I EVER EXPERIENCED!! Thank you Shaperment!!",
  },
  {
    img: CDN.review2,
    buyer: "Danielle W.",
    text:
      "Comfy, supportive, quality material! Comfy, supportive, nice material, great quality, and helpful customer service!",
  },
  {
    img: CDN.review3,
    buyer: "Cailey O.",
    text:
      "It fits size 28! I\u2019m a size 28 I was surprised it fitted.. the material is superior it really hold you in smooths you",
  },
];

function Spacer({ size }: { size: number }) {
  return <div style={{ width: size, height: size, display: "block" }} />;
}

function Stars({ size = 14, count = 5 }: { size?: number; count?: number }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <img key={i} src={CDN.star} alt="" height={size} width={size} style={{ height: size, width: size, marginRight: 2 }} />
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div className="css-cx73rv">
      <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9166 7.08547L11.4933 5.45797L11.6916 3.30548L9.58581 2.82714L8.48331 0.966309L6.49998 1.81798L4.51665 0.966309L3.41415 2.82714L1.30831 3.29964L1.50665 5.45797L0.083313 7.08547L1.50665 8.71298L1.30831 10.8713L3.41415 11.3496L4.51665 13.2163L6.49998 12.3588L8.48331 13.2105L9.58581 11.3496L11.6916 10.8713L11.4933 8.71881L12.9166 7.08547ZM10.6125 7.94881L10.2858 8.32797L10.3325 8.82381L10.4375 9.96131L8.83915 10.323L8.58248 10.7546L8.00498 11.7346L6.96665 11.2855L6.49998 11.0871L6.03915 11.2855L5.00081 11.7346L4.42331 10.7605L4.16665 10.3288L2.56831 9.96714L2.67331 8.82381L2.71998 8.32797L2.39331 7.94881L1.64081 7.09131L2.39331 6.22798L2.71998 5.84881L2.66748 5.34714L2.56248 4.21548L4.16081 3.85381L4.41748 3.42214L4.99498 2.44214L6.03331 2.89131L6.49998 3.08964L6.96081 2.89131L7.99915 2.44214L8.57665 3.42214L8.83331 3.85381L10.4316 4.21548L10.3266 5.35298L10.28 5.84881L10.6066 6.22798L11.3591 7.08547L10.6125 7.94881Z" fill="black" />
        <path d="M5.38581 8.11214L4.03248 6.75297L3.16915 7.62214L5.38581 9.84464L9.66748 5.55131L8.80415 4.68214L5.38581 8.11214Z" fill="black" />
      </svg>
      Verified Buyer
    </div>
  );
}

function ColorSwatch({ color, selected }: { color: (typeof COLORS)[number]; selected: boolean }) {
  const ring = selected ? "#3a3a3a" : "none";
  if (color.kind === "solid") {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}>
        <circle cx="16" cy="16" r="12" fill={color.fill} stroke="#9E9E9E" strokeWidth="0.5" />
        <circle cx="16" cy="16" r="15.5" stroke={ring} />
      </svg>
    );
  }
  const maskId = `mask-${color.id}`;
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}>
      <mask id={maskId} maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
        <circle cx="16" cy="16" r="12" transform="rotate(-90 16 16)" fill="black" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect x="4" y="34" width="35" height="12" transform="rotate(-90 4 34)" fill={color.a} />
        <rect x="16" y="34" width="35" height="12" transform="rotate(-90 16 34)" fill={color.b} />
      </g>
      <circle cx="16" cy="16" r="12" transform="rotate(-90 16 16)" stroke="#9E9E9E" strokeWidth="0.5" />
      <circle cx="16" cy="16" r="15.5" stroke={ring} />
    </svg>
  );
}

export const ShapermintUpsell = () => {
  const [selectedColor, setSelectedColor] = React.useState<string>("black");
  const [selectedSize, setSelectedSize] = React.useState<string>("M");
  const [seconds, setSeconds] = React.useState(5 * 60 + 13);

  React.useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  const currentColor = COLORS.find((c) => c.id === selectedColor) || COLORS[0];

  return (
    <div className="shm-upsell">
      <style dangerouslySetInnerHTML={{ __html: SHM_UPSELL_CSS }} />

      <div className="Offer_offerWrapper">
        <div className="Offer_wrapper">
          <header className="css-1rpe5gu">
            <img src={CDN.logo} loading="lazy" decoding="async" alt="Shapermint Logo" height={40} width={210} />
          </header>

          <div className="css-6corth">
            <Spacer size={10} />

            {/* Stepper */}
            <div style={{ textAlign: "center" }} className="css-1qicnhk">
              <div className="css-l66t5u">
                <span className="css-k6nmjj">
                  <span style={{ display: "block" }}>One last step! Your order is almost complete.</span>
                </span>
              </div>
              <Spacer size={10} />
              <div className="css-l66t5u">
                <div className="css-1powa6r" />
              </div>
            </div>

            <Spacer size={24} />
            <div className="css-l66t5u">
              <span className="css-1gzdh5r">
                <span style={{ display: "block" }}>Semi-Annual Sale!</span>
              </span>
            </div>

            <Spacer size={8} />
            <div className="css-l66t5u">
              <span className="css-ktibo8">
                <span style={{ display: "block" }}>The deal everyone&apos;s been waiting for is finally here!!</span>
              </span>
            </div>

            <Spacer size={16} />
            <div className="css-l66t5u">
              <span className="css-42km96">
                <span style={{ display: "block" }}>Only during our Semi-Annual Sale event!</span>
              </span>
            </div>

            <Spacer size={2} />
            <div className="css-l66t5u">
              <div className="css-88l97a">
                <span>
                  <span className="css-1neuu07" style={{ fontSize: 14, display: "inline", textTransform: "uppercase" }}>
                    ONE-TIME-ONLY SPECIAL DEAL
                  </span>
                </span>
              </div>
            </div>

            <Spacer size={24} />
            <div className="css-l66t5u" style={{ width: "100%" }}>
              <hr style={{ background: "#D1D1D1", height: 1, border: 0, margin: 0 }} />
            </div>

            <Spacer size={24} />
            <div className="css-l66t5u">
              <span className="css-1i41lyz">
                <span style={{ display: "block" }}>
                  <b style={{ fontWeight: 700 }}>Buy One Shaper Cami, Get One FREE</b>
                  <br />2 camis have a retail value of $90
                  <br />Today you&rsquo;re not just getting 2 for the price of 1
                  <br />You&rsquo;re also getting an Extra 20% OFF
                </span>
              </span>
            </div>

            <Spacer size={20} />
            {/* Rating */}
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, width: 400 }}>
              <Stars size={14} />
              <a href="#reviews" style={{ marginTop: 6, whiteSpace: "nowrap" }}>
                <span className="css-1e1vb50">
                  <u>4.7 Excellent | 6,300+ Reviews</u>
                </span>
              </a>
            </div>

            <Spacer size={12} />
            <div className="css-1dgld9d">
              <div className="css-pro6ij">
                <div className="css-cssveg">
                  <img src={CDN.product} alt="productImage" className="css-yzjo1i" style={{ width: "100%" }} />
                </div>
              </div>
            </div>

            <Spacer size={6} />
            <button className="css-qwrh7m" type="button">
              See in your size
            </button>

            <Spacer size={32} />
            {/* Hurry timer */}
            <div className="css-l66t5u">
              <div className="HurryTimerCard">
                <div className="HurryTimerCard_content">
                  <svg fill="#C64844" height="1.125rem" width="1.125rem" viewBox="0 0 24 24" className="css-1oows55">
                    <path
                      fill="#C64844"
                      d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4a9 9 0 1 0 9 9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
                    />
                  </svg>
                  <label className="css-1833n3f">
                    <span>
                      <span className="css-gtu3t2">
                        <span>Hurry! This Semi-Annual Sale ends in </span>
                        <span>
                          <span className="css-1g1av1p">
                            {mm}m {ss}s
                          </span>
                        </span>
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <Spacer size={20} />
            <div className="css-l66t5u">
              <span className="css-g2gzzp">
                <span style={{ display: "block" }}>
                  Retail Price: <del>$90.00</del>
                </span>
              </span>
            </div>
            <div className="css-l66t5u">
              <span className="css-1i41lyz" style={{ color: "#2F806A", textTransform: "uppercase" }}>
                <span style={{ display: "block" }}>You&apos;re Saving: $54.01</span>
              </span>
            </div>
            <div className="css-l66t5u">
              <span className="css-rshggl">
                <span style={{ display: "block" }}>Total Price with an Extra 20% OFF: $35.99</span>
              </span>
            </div>

            <Spacer size={20} />
            {/* Color selector */}
            <div className="css-l66t5u">
              <div className="css-idfpol">
                <div className="css-1b87r7a" role="radiogroup">
                  <p className="css-15i2ie" style={{ fontWeight: "bold" }}>
                    Color <span className="css-66vicj">{currentColor.name}</span>
                  </p>
                  <div className="css-6ge9ub">
                    {COLORS.map((c) => (
                      <div
                        key={c.id}
                        className="css-1v4za92"
                        role="radio"
                        aria-checked={selectedColor === c.id}
                        tabIndex={selectedColor === c.id ? 0 : -1}
                        onClick={() => setSelectedColor(c.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <ColorSwatch color={c} selected={selectedColor === c.id} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Size selector */}
            <div className="css-1bl9j3">
              <div className="css-ohugnc">
                <p className="css-1x3nzhy">
                  Size<label className="css-15mwo5u">{selectedSize}</label>
                </p>
                <div className="css-1cuxo2b">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      className={selectedSize === s ? "css-9h70c9" : "css-l1lbca"}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <br />
          </div>

          <Spacer size={10} />
          {/* Warnings */}
          <div className="css-14zkqqe">
            <span className="css-rrj6tb" style={{ textAlign: "left" }}>
              <span style={{ display: "block" }}>
                <b style={{ fontWeight: 700 }}>Warnings! </b>
                <br />
                <ul>
                  <li>You won&apos;t find this offer anywhere else. If you leave, it disappears.</li>
                  <li>If you come back later, you will pay $21.99 each, plus shipping.</li>
                </ul>
              </span>
            </span>
          </div>

          <div className="css-pro6ij">
            <div className="css-ab6uec">
              <Spacer size={24} />
              <button className="css-cfsman" type="button">
                Yes, I LOVE SAVING MONEY!
              </button>
              <Spacer size={36} />
              <div className="css-rhfh1r">
                <button className="css-37asyd" type="button">
                  No thanks, I&apos;d rather pay full price later
                </button>
              </div>
              <Spacer size={22} />
              <div className="css-1t3451x">
                <img src={CDN.guarantee} loading="lazy" decoding="async" alt="" width={104} />
                <div className="css-l66t5u">
                  <span className="css-rrj6tb">
                    <span style={{ display: "block" }}>
                      <b style={{ fontWeight: 700 }}>60-Day Hassle-Free Guarantee</b> <br />
                      <ul>
                        <li>Keep what you love and exchange the rest for free.</li>
                        <li>
                          Not the perfect fit? No worries! <br />
                          Exchanges are free until you find the right one.
                        </li>
                      </ul>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Spacer size={20} />
          <div className="css-l66t5u">
            <span className="css-1w8rzwn" style={{ fontSize: 12 }}>
              <span style={{ display: "block" }}>
                Click <b style={{ fontWeight: 700 }}>YES</b> to add this product to your order. Taxes not included; the final amount will be shown on your Order Confirmation.
              </span>
            </span>
          </div>

          <Spacer size={30} />
          {/* Reviews */}
          <div id="reviews" className="css-12s7qd9">
            <div className="css-79f6d9">
              <div className="css-ohckqn">
                <h3 style={{ textAlign: "left" }} className="css-1opxbfx">
                  What Happy Customers Are Saying
                </h3>
                <img src={CDN.reviewsSummary} loading="lazy" decoding="async" alt="reviews-summary" width={200} className="css-hijjut" />
                <span style={{ textAlign: "left" }} className="css-kujqpr">
                  Based on +75,000 Reviews
                </span>
              </div>
              <div className="css-w4e1m7">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="css-105tskd">
                    <img src={r.img} loading="lazy" decoding="async" alt="" className="css-10bzf9b" width={120} />
                    <div className="css-1fhajq2">
                      <span className="css-1gzlh3w">{r.buyer}</span>
                      <span style={{ fontWeight: 400, fontSize: 13, color: "#222", marginTop: -4 }}>United States</span>
                      <div>
                        <Stars size={16} />
                      </div>
                      <VerifiedBadge />
                    </div>
                    <div className="css-1xr8i6">{r.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Spacer size={10} />
          {/* 60-day banner */}
          <div className="css-pro6ij">
            <div className="SixtyDaysBanner_image">
              <img src={CDN.guarantee} loading="lazy" decoding="async" alt="" height={129} width={155} className="css-f6w10v" />
            </div>
            <div className="SixtyDaysBanner_container">
              <h5 className="css-1p9uc83">
                <span style={{ color: "#C48E1B" }}>60-Day</span> Hassle-Free Guarantee
              </h5>
              <Spacer size={8} />
              <p className="css-15i2ie">Free Exchange &amp; No-Hassle Returns</p>
              <Spacer size={20} />
              <div className="css-l66t5u">
                <span className="css-rrj6tb">
                  <span style={{ display: "block" }}>
                    Love your products or get your money back, no questions asked. Feel confident and comfortable, guaranteed!
                  </span>
                </span>
              </div>
            </div>
          </div>

          <Spacer size={30} />
          {/* Scroll to top */}
          <div className="ScrollToTop_container">
            <button
              className="ScrollToTop_button"
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <p className="css-kk5u6o">Scroll to top</p>
              <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12.6271 8.05494L12.6271 17.4342C12.6271 17.8548 12.2432 18.1492 11.8594 18.1071C11.5608 18.023 11.3476 17.7706 11.3476 17.4762L11.3476 8.097L8.83115 10.5364C8.6179 10.7467 8.27669 10.7888 8.02078 10.6206C7.80752 10.4944 7.72222 10.2841 7.72222 10.0738C7.72222 9.90555 7.76487 9.73731 7.89283 9.61114L11.5182 6.07816C11.7741 5.8258 12.1579 5.8258 12.4138 6.07816L16.0818 9.61114C16.3804 9.86349 16.3378 10.3682 15.9539 10.5785C15.698 10.7467 15.3568 10.7047 15.1435 10.4944L12.6271 8.05494Z"
                  fill="var(--colors-pallete-primary-color)"
                />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className="css-5v8zhh">
            <div className="css-l66t5u" style={{ width: "100%" }}>
              <hr style={{ background: "#D1D1D1", height: 1, border: 0, margin: 0 }} />
            </div>
            <Spacer size={20} />
            <div className="css-l66t5u">
              <span className="css-rrj6tb">
                <span style={{ display: "block" }}>© 2026 Shapermint. All rights reserved.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapermintUpsell;

// Original Shapermint design-system CSS captured from the page (scripts removed),
// scoped under `.shm-upsell` so it renders faithfully without leaking globally.
const SHM_UPSELL_CSS = `
.shm-upsell { --colors-pallete-primary-color: #f7a08b; --colors-pallete-primary-soft-color: #fcd9d1; --colors-shades-white-color: #fff; --colors-shades-700-color: #292929; --colors-shades-250-color: #a6a6a6; --colors-shades-200-color: #bbbbbb; --colors-shades-550-color: #3a3a3a; --colors-shades-50-color: #efefef; --colors-shades-100-color: #e5e5e5; --colors-semantic-urgent-color: #c64844; --colors-semantic-positive-color: #2f806a; --colors-semantic-attention-color: #f2d96f; --radius-regular: 8px; --component-banner-fontColor: #fff; background: #f0f0f0; color: #292929; min-height: 100vh; }
@font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Regular.woff2") format("opentype"); font-weight: normal; }
@font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Demi.otf") format("opentype"); font-weight: 600; }
@font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Bold.otf") format("opentype"); font-weight: 700; }
@font-face { font-family: AvenirNextLTPro; src: url("https://cdn.shapermint.com/assets/fonts/shapermint/AvenirNextLTPro-Heavy.otf") format("opentype"); font-weight: 800 900; }
.shm-upsell, .shm-upsell input, .shm-upsell button { font-family: AvenirNextLTPro, system-ui, sans-serif; }
.shm-upsell * { box-sizing: border-box; }
.shm-upsell .Offer_offerWrapper { width: 100%; }
.shm-upsell .Offer_wrapper { width: 100%; max-width: 480px; margin: 0 auto; background: #fff; min-height: 100vh; }
.shm-upsell .css-1rpe5gu { display: flex; align-items: center; justify-content: center; padding: 18px 24px; box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px 1px; position: relative; z-index: 1; }
.shm-upsell .css-6corth { padding: 0px; text-align: center; margin: 0px auto; display: flex; flex-direction: column; align-items: center; }
.shm-upsell .css-1qicnhk { border-bottom: 1px solid rgb(229, 229, 229); width: 100%; padding: 6px 15px 16px; }
@media (max-width: 640px) { .shm-upsell .css-1qicnhk { text-align: left; } .shm-upsell .css-1qicnhk br { display: none; } }
.shm-upsell .css-l66t5u { max-width: 420px; width: 100%; margin: 0px auto; border-radius: 12px; }
@media (max-width: 425px) { .shm-upsell .css-l66t5u { padding: 0px 12.5px; } }
.shm-upsell .css-k6nmjj { margin: 0px; color: rgb(41, 41, 41); font-size: 14px; line-height: 22px; font-weight: 600; }
.shm-upsell .css-1powa6r { width: 100%; height: 7px; background: rgb(229, 229, 229); border-radius: 60px; position: relative; }
.shm-upsell .css-1powa6r::after { content: ""; width: 50%; height: 100%; position: absolute; left: 0px; top: 0px; border-radius: 60px; background-color: rgb(76, 190, 164); }
.shm-upsell .css-1gzdh5r { margin: 0px; color: rgb(41, 41, 41); font-size: 24px; line-height: 32px; font-weight: 700; }
.shm-upsell .css-ktibo8 { margin: 0px; color: rgb(41, 41, 41); font-size: 16px; line-height: 24px; font-weight: 600; }
.shm-upsell .css-42km96 { margin: 0px; font-size: 16px; line-height: 24px; font-weight: 700; color: rgb(198, 72, 68); }
.shm-upsell .css-88l97a { display: flex; min-width: 220px; flex-direction: column; justify-content: center; align-items: center; border-radius: 0px; flex: 0 0 auto; margin: auto; background: rgb(198, 72, 68); padding: 4px 8px; }
.shm-upsell .css-88l97a span { font-weight: 700; color: #fff; }
.shm-upsell .css-1neuu07 { margin: 0px; font-size: 14px; line-height: 1; color: rgb(255, 255, 255) !important; }
.shm-upsell .css-rrj6tb { margin: 0px; color: rgb(41, 41, 41); font-size: 14px; line-height: 22px; font-weight: 400; }
.shm-upsell .css-1i41lyz { margin: 0px; color: rgb(41, 41, 41); font-size: 18px; line-height: 28px; font-weight: 700; }
.shm-upsell .css-m2edo8 { height: 14px; width: 14px; }
.shm-upsell .css-1e1vb50 { color: rgb(41, 41, 41); font-size: 14px; line-height: 22px; font-weight: 600; }
.shm-upsell .css-1dgld9d { position: relative; display: inline-block; }
.shm-upsell .css-pro6ij { max-width: 420px; width: 100%; margin: 0px auto; border-radius: 12px; padding: 0px 16px; }
@media (max-width: 425px) { .shm-upsell .css-pro6ij { padding: 0px 12.5px; } }
.shm-upsell .css-cssveg { position: relative; }
.shm-upsell .css-yzjo1i { border-radius: 20px; }
.shm-upsell .css-qwrh7m { display: flex; justify-content: center; align-items: center; text-decoration: none; text-transform: uppercase; box-sizing: border-box; font-size: 0.875rem; padding: 0.688rem 2rem; font-weight: 600; border-radius: 0.5rem; cursor: pointer; background-color: rgb(255, 255, 255); color: rgb(41, 41, 41); border: 1px solid rgb(41, 41, 41); font-family: inherit; margin: auto; width: 390px; max-width: calc(100% - 20px); }
.shm-upsell .css-qwrh7m:hover { background-color: rgb(41, 41, 41); color: rgb(255, 255, 255); }
.shm-upsell .css-gtu3t2 { color: rgb(198, 72, 68); }
.shm-upsell .css-1g1av1p { color: rgb(41, 41, 41); }
.shm-upsell .css-1833n3f { margin: 0px; font-size: 14px; line-height: 18px; font-weight: 600; color: rgb(41, 41, 41) !important; }
.shm-upsell .HurryTimerCard { background-color: #F7ECE4; border-radius: 8px; padding: 12px 16px; }
.shm-upsell .HurryTimerCard_content { display: flex; align-items: center; justify-content: center; gap: 6px; }
.shm-upsell .css-1oows55 { width: 1.125rem; height: 1.125rem; color: rgb(198, 72, 68); display: inline-block; vertical-align: middle; flex: 0 0 auto; }
.shm-upsell .css-g2gzzp { margin: 0px; color: rgb(41, 41, 41); font-size: 20px; line-height: 28px; font-weight: 400; }
.shm-upsell .css-rshggl { margin: 0px; color: rgb(41, 41, 41); font-size: 20px; line-height: 28px; font-weight: 600; }
.shm-upsell .css-idfpol { margin-bottom: 1rem; }
.shm-upsell .css-idfpol div { align-items: center; }
.shm-upsell .css-1b87r7a { display: flex; flex-direction: column; align-items: start; }
.shm-upsell .css-15i2ie { margin: 0px; color: rgb(41, 41, 41); font-size: 14px; line-height: 22px; font-weight: 400; }
.shm-upsell .css-66vicj { font-weight: 600; }
.shm-upsell .css-6ge9ub { display: flex; flex-wrap: wrap; margin-top: 0.5rem; margin-left: 0px; }
.shm-upsell .css-1v4za92 { margin-right: 8px; }
.shm-upsell .css-1v4za92 svg { cursor: pointer; }
.shm-upsell .css-1bl9j3 { display: inline-flex; }
.shm-upsell .css-ohugnc { display: flex; flex-direction: column; align-items: start; width: 400px; }
.shm-upsell .css-1x3nzhy { margin: 0px; color: rgb(41, 41, 41); font-size: 14px; line-height: 22px; font-weight: 400; align-self: inherit; padding: 0px; }
.shm-upsell .css-15mwo5u { margin: 0px; font-size: 14px; line-height: 18px; font-weight: 600; color: rgb(41, 41, 41) !important; margin-left: 4px; }
.shm-upsell .css-1cuxo2b { display: flex; flex-flow: wrap; margin: 8px 0px 0px; }
.shm-upsell .css-l1lbca { display: flex; justify-content: center; align-items: center; text-transform: uppercase; cursor: pointer; border-radius: 0.375rem; width: 4rem; box-sizing: border-box; font-size: 0.75rem; font-weight: 600; white-space: nowrap; padding: 0.75rem 1rem 0.625rem; margin: 0px 0.5rem 0.625rem 0px; min-width: 4rem; background: rgb(255, 255, 255); color: rgb(41, 41, 41); border: 0.063rem solid var(--colors-shades-250-color); }
.shm-upsell .css-l1lbca:hover { background: rgb(41, 41, 41); color: rgb(255, 255, 255); }
.shm-upsell .css-9h70c9 { display: flex; justify-content: center; align-items: center; text-transform: uppercase; cursor: pointer; border-radius: 0.375rem; width: 4rem; box-sizing: border-box; font-size: 0.75rem; background: rgb(41, 41, 41); color: rgb(255, 255, 255); border: none; font-weight: 600; white-space: nowrap; padding: 0.75rem 1rem 0.625rem; margin: 0px 0.5rem 0.625rem 0px; min-width: 4rem; }
.shm-upsell .css-14zkqqe { max-width: 420px; width: 100%; margin: 0px auto; border-radius: 12px; padding: 0px 20px !important; }
@media (max-width: 425px) { .shm-upsell .css-14zkqqe { padding: 0px 12.5px; } }
.shm-upsell .css-14zkqqe ul, .shm-upsell .css-rrj6tb ul { margin: 0px; padding: 0px 18px; }
.shm-upsell .css-ab6uec { display: flex; flex-direction: column; justify-content: center; align-items: center; }
.shm-upsell .css-cfsman { display: flex; justify-content: center; align-items: center; text-transform: uppercase; box-sizing: border-box; width: 100%; font-size: 1rem; padding: 0.875rem 2rem; font-weight: 600; border-radius: 0.5rem; cursor: pointer; border: none; font-family: inherit; white-space: nowrap; background-color: rgb(41, 41, 41); color: rgb(255, 255, 255); }
@media (hover: hover) and (pointer: fine) { .shm-upsell .css-cfsman:hover { background-color: rgb(252, 217, 209); color: rgb(41, 41, 41); } }
.shm-upsell .css-37asyd { display: flex; justify-content: center; text-decoration: underline; box-sizing: border-box; cursor: pointer; border: none; background: transparent; padding: 0px; color: rgb(58, 58, 58); align-items: center; font-family: AvenirNextLTPro; font-weight: 500; font-size: 1rem; }
.shm-upsell .css-1t3451x { display: flex; align-items: center; text-align: left; gap: 8px; }
.shm-upsell .css-1w8rzwn { margin: 0px; color: rgb(41, 41, 41); line-height: 22px; font-weight: 400; font-size: 12px; }
.shm-upsell .css-12s7qd9 { max-width: 420px; width: 100%; margin: 0px auto; border-radius: 12px; }
.shm-upsell .css-79f6d9 { background-color: rgb(247, 247, 247); padding: 1rem; border-radius: 8px; }
.shm-upsell .css-ohckqn { padding: 1rem; background-color: rgb(255, 255, 255); border-radius: 8px; display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem; margin-bottom: 30px; }
.shm-upsell .css-1opxbfx { font-weight: 700; font-size: 24px; line-height: 32px; margin: 0px; }
.shm-upsell .css-hijjut { width: 200px; }
.shm-upsell .css-kujqpr { font-weight: 600; font-size: 16px; line-height: 22px; }
.shm-upsell .css-w4e1m7 { display: flex; flex-direction: column; gap: 1rem; }
.shm-upsell .css-105tskd { padding: 1rem; background-color: rgb(255, 255, 255); border-radius: 8px; display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
.shm-upsell .css-10bzf9b { border-radius: 8px; flex-shrink: 0; width: 120px; }
.shm-upsell .css-1fhajq2 { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; width: 100%; }
.shm-upsell .css-1gzlh3w { font-weight: 700; font-size: 14px; line-height: 22px; }
.shm-upsell .css-155aox4 { height: 16px; width: 16px; }
.shm-upsell .css-cx73rv { display: flex; align-items: center; gap: 4px; padding: 2px 8px; background-color: rgb(224, 239, 231); border-radius: 2px; font-weight: 700; font-size: 10px; line-height: 14px; }
.shm-upsell .css-1xr8i6 { font-weight: 400; font-size: 16px; line-height: 24px; text-align: left; }
.shm-upsell .css-f6w10v { height: 129px; width: 155px; }
.shm-upsell .css-1p9uc83 { margin: 0px; color: rgb(41, 41, 41); font-size: 20px; line-height: 28px; font-weight: 700; }
.shm-upsell .css-kk5u6o { margin: 0px; color: rgb(41, 41, 41); font-size: 16px; line-height: 24px; font-weight: 700; }
.shm-upsell .SixtyDaysBanner_image { text-align: center; }
.shm-upsell .SixtyDaysBanner_container { text-align: center; }
.shm-upsell .ScrollToTop_container { display: flex; justify-content: center; }
.shm-upsell .ScrollToTop_button { display: flex; align-items: center; gap: 6px; background: transparent; border: none; cursor: pointer; }
.shm-upsell .css-5v8zhh { max-width: 100%; width: 100%; margin: 0px auto; border-radius: 12px; background-color: rgb(247, 247, 247); padding: 20px !important; }
`;
