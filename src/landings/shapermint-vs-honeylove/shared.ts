/**
 * Shared styling and helpers for the Shapermint vs. Honeylove comparison
 * articles (shapewear and bras variants). Both pages render the same visual
 * template — only the copy/images differ — so the CSS and star-rating helper
 * live here once instead of being duplicated per variant.
 */

export const SHL_CSS = `
/* ---- Brand webfont (Avenir, licensed — graceful fallback) ---- */
@font-face{font-family:"Avenir LT Pro";src:url("https://cdn.prod.website-files.com/66688c9059cf500f6aaddcb8/6689f991d62e8d9e68828ac7_AvenirLTProBook.otf") format("opentype"),url("https://cdn.prod.website-files.com/66688c9059cf500f6aaddcb8/6689f9918fe0f24d541ae740_AvenirLTProRoman.otf") format("opentype");font-weight:400;font-style:normal;font-display:swap;}
@font-face{font-family:"Avenir LT Pro";src:url("https://cdn.prod.website-files.com/66688c9059cf500f6aaddcb8/6689f99157f343512da4ef4c_AvenirLTProMedium.otf") format("opentype");font-weight:500;font-style:normal;font-display:swap;}
@font-face{font-family:"Avenir LT Pro";src:url("https://cdn.prod.website-files.com/66688c9059cf500f6aaddcb8/6689f9917975546548bd80be_AvenirLTProBlack.otf") format("opentype");font-weight:900;font-style:normal;font-display:swap;}

/* ---- Design tokens (real Shapermint palette) ---- */
.shl{
  --brand-font:"Avenir Next LT Pro","Avenir LT Pro","Avenir Next","Avenir","Nunito Sans","Segoe UI",-apple-system,BlinkMacSystemFont,system-ui,Roboto,Helvetica,Arial,sans-serif;
  --coral:#f7a08b;
  --brick:#c64844;
  --wine:#882a2b;
  --ink:#292929;
  --ink-soft:#5a5a5a;
  --ink-faint:#767676;
  --line:#e5e5e5;
  --cream:#fff6ef;
  --cream-2:#faf7f2;
  --peach:#f7ece4;
  --shm-tint:#fdeee8;
  --white:#fff;
  font-family:var(--brand-font);color:var(--ink);background:var(--white);
  font-size:17px;line-height:1.65;-webkit-font-smoothing:antialiased;
}
.shl *,.shl *::before,.shl *::after{box-sizing:border-box;}
.shl img{max-width:100%;display:block;}
.shl a{color:inherit;text-decoration:none;}
.shl h1,.shl h2,.shl h3,.shl h4,.shl p,.shl ul,.shl ol,.shl figure{margin:0;}
.shl button{font-family:inherit;cursor:pointer;}

/* ---- Article shell ---- */
.shl .hero-img{width:100%;height:auto;border-radius:12px;margin:20px 0;}
.shl .wrap{max-width:760px;margin:0 auto;padding:0 24px;}
.shl .breadcrumb{max-width:760px;margin:22px auto 0;padding:0 24px;font-size:12.5px;color:var(--ink-faint);}
.shl .breadcrumb a:hover{color:var(--brick);}
.shl .art-head{padding:26px 0 6px;}
.shl .eyebrow{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--brick);font-weight:700;margin-bottom:14px;}
.shl h1{font-size:40px;line-height:1.15;font-weight:900;letter-spacing:-.01em;margin-bottom:16px;}
.shl .byline{display:flex;align-items:center;gap:12px;color:var(--ink-faint);font-size:14px;padding-bottom:22px;border-bottom:1px solid var(--line);}
.shl .byline .avatar-mini{width:34px;height:34px;border-radius:50%;flex:0 0 auto;overflow:hidden;}
/* Author avatars — circular crop, never squashed */
.shl .avatar-img{width:34px;height:34px;min-width:34px;border-radius:50%;object-fit:cover;flex:0 0 auto;display:block;}
.shl .bio-av-img{width:64px;height:64px;min-width:64px;}

/* ---- TOC ---- */
.shl .toc{background:var(--cream-2);border:1px solid var(--line);border-radius:14px;padding:22px 26px;margin:26px 0;}
.shl .toc h4{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-faint);font-weight:700;margin-bottom:12px;}
.shl .toc ul{list-style:none;padding:0;display:grid;gap:9px;}
.shl .toc a{font-size:15px;color:var(--ink);border-bottom:1px solid transparent;padding-bottom:1px;}
.shl .toc a:hover{color:var(--brick);border-color:var(--coral);}

/* ---- Body copy ---- */
.shl .body-copy p{margin:0 0 18px;}
.shl .body-copy h2{font-size:27px;line-height:1.25;font-weight:900;letter-spacing:-.01em;margin:72px 0 18px;padding-top:8px;}
.shl .body-copy h3{font-size:19px;font-weight:700;margin:48px 0 12px;}
.shl .body-copy strong{font-weight:700;}
.shl .lead p{font-size:19px;line-height:1.6;color:#333;}
.shl .model-line{background:var(--cream);border-left:4px solid var(--coral);border-radius:0 10px 10px 0;padding:14px 18px;margin:0 0 16px;}
.shl .model-line strong{color:var(--wine);}
.shl .tie-note{font-weight:700;color:var(--wine);}

/* ---- Comparison tables ---- */
.shl .cmp{width:100%;border-collapse:collapse;margin:22px 0 8px;font-size:15px;border:1px solid var(--line);border-radius:12px;overflow:hidden;}
.shl .cmp th,.shl .cmp td{padding:13px 15px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top;}
.shl .cmp thead th{background:var(--ink);color:#fff;font-weight:700;font-size:13px;letter-spacing:.04em;text-transform:uppercase;}
.shl .cmp thead th.shm{background:var(--coral);color:var(--wine);}
.shl .cmp-logo{height:15px;width:auto;display:inline-block;vertical-align:middle;}
.shl .cmp tbody td:first-child{font-weight:700;color:var(--ink);width:26%;background:var(--cream-2);}
.shl .cmp td.shm{background:var(--shm-tint);font-weight:600;}
.shl .cmp tbody tr:last-child td{border-bottom:none;}
.shl .tbl-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:22px 0;}
.shl .tbl-scroll .cmp{margin:0;min-width:520px;}

/* ---- Head-to-head cards ---- */
.shl .h2h{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0 8px;}
.shl .card{border:1px solid var(--line);border-radius:14px;padding:20px;background:#fff;color:inherit;text-decoration:none;}
.shl a.card{display:block;transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease;}
.shl .card.win{border-color:var(--coral);box-shadow:0 6px 22px rgba(247,160,139,.18);}
.shl a.card.win:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(247,160,139,.28);border-color:var(--brick);}
.shl .card .kicker{font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--ink-faint);margin-bottom:8px;}
.shl .card.win .kicker{color:var(--brick);}
.shl .card .pname{font-size:16px;font-weight:700;line-height:1.3;margin-bottom:10px;min-height:42px;}
.shl .card.win .pname{text-decoration:underline;text-decoration-color:var(--coral);text-decoration-thickness:2px;text-underline-offset:3px;}
.shl a.card.win:hover .pname{color:var(--brick);text-decoration-color:var(--brick);}
.shl .plink{color:var(--brick);font-weight:600;border-bottom:1px solid var(--coral);transition:border-color .15s ease;}
.shl .plink:hover{border-color:var(--brick);}
.shl .card .price{font-size:24px;font-weight:900;color:var(--ink);}
.shl .card.win .price{color:var(--brick);}
.shl .card .price small{display:block;font-size:12.5px;font-weight:600;color:var(--ink-soft);margin-top:3px;}
.shl .stars{display:inline-flex;align-items:center;gap:2px;margin:10px 0 2px;}
.shl .stars svg{width:15px;height:15px;display:block;}
.shl .rev{font-size:13px;color:var(--ink-soft);font-weight:600;}
.shl .perks{list-style:none;padding:0;margin:12px 0 0;font-size:13px;color:var(--ink-soft);display:grid;gap:5px;}
.shl .perks li::before{content:"\\2713";color:var(--brick);font-weight:900;margin-right:7px;}

/* ---- CTA ---- */
.shl .cta-row{margin:20px 0 6px;}
/* SHM Design System — primary button (default + hover) */
.shl .cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:48px;padding:0 32px;border:0;border-radius:var(--radius-lg,8px);background:var(--coral-300,#F7A08B);color:var(--ink-700,#3A3A3A);font-family:var(--brand-font);font-weight:600;font-size:16px;line-height:20px;transition:background .15s ease,color .15s ease;}
.shl .cta:hover{background:var(--coral-200,#FBD0C7);color:var(--ink-700,#3A3A3A);}
.shl .cta.big{width:100%;}

/* ---- New-launch highlight ---- */
.shl .spotlight{background:linear-gradient(180deg,var(--cream) 0%,var(--peach) 100%);border:1px solid #f0dcc9;border-radius:16px;padding:26px;margin:56px 0;}
.shl .spotlight .badge{display:inline-block;background:var(--brick);color:#fff;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:5px 12px;border-radius:999px;margin-bottom:12px;}
.shl .spotlight h3{margin-top:0;}

/* ---- "Which is right" split ---- */
.shl .pick{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:18px 0;}
.shl .pick .pick-box{border:1px solid var(--line);border-radius:14px;padding:20px;background:var(--cream-2);}
.shl .pick .pick-box.shm{background:var(--shm-tint);border-color:var(--coral);}
.shl .pick h4{font-size:16px;font-weight:800;margin-bottom:8px;}
.shl .pick .pick-box.shm h4{color:var(--brick);}
.shl .pick p{font-size:14.5px;color:var(--ink-soft);margin:0;}
.shl .core{background:var(--ink);color:#fff;border-radius:14px;padding:22px 24px;margin:18px 0;}
.shl .core strong{color:var(--coral);}

/* ---- FAQ ---- */
.shl .faq details{border-bottom:1px solid var(--line);padding:6px 0;}
.shl .faq summary{list-style:none;cursor:pointer;font-size:17px;font-weight:700;padding:16px 34px 16px 0;position:relative;}
.shl .faq summary::-webkit-details-marker{display:none;}
.shl .faq summary::after{content:"+";position:absolute;right:4px;top:14px;font-size:24px;font-weight:400;color:var(--brick);transition:transform .2s ease;}
.shl .faq details[open] summary::after{content:"\\2013";}
.shl .faq .ans{padding:0 0 18px;color:var(--ink-soft);font-size:15.5px;}

/* ---- Author bio ---- */
.shl .bio{display:flex;gap:16px;align-items:center;background:var(--cream-2);border-radius:14px;padding:20px;margin:34px 0;}
.shl .bio .who{font-weight:800;font-size:16px;margin-bottom:3px;}
.shl .bio p{font-size:14px;color:var(--ink-soft);margin:0;}

/* ---- Share ---- */
.shl .share{display:flex;align-items:center;gap:14px;margin:26px 0;padding-top:18px;border-top:1px solid var(--line);}
.shl .share span{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-faint);font-weight:700;}
.shl .share a{width:34px;height:34px;border:1px solid var(--line);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--ink-soft);font-size:13px;font-weight:700;}
.shl .share a:hover{border-color:var(--coral);color:var(--brick);}

/* ---- In the press ---- */
.shl .press{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--cream-2);margin-top:44px;padding:30px 24px;}
.shl .press .press-in{max-width:900px;margin:0 auto;text-align:center;}
.shl .press h4{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-faint);font-weight:700;margin-bottom:20px;}
.shl .press .logos{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:38px;}
.shl .press .logos img{height:26px;width:auto;opacity:.72;filter:grayscale(1);}

/* ---- Image placeholders (designer briefs — NEVER generated) ---- */
.shl .img-ph{width:100%;box-sizing:border-box;background:#f4f1ec;border:2px dashed #648d9c;border-radius:12px;padding:30px 26px;margin:20px 0;display:flex;flex-direction:column;gap:12px;align-items:center;justify-content:center;text-align:center;min-height:300px;}
.shl .img-ph .tag{font-family:var(--brand-font);font-weight:700;text-transform:uppercase;letter-spacing:1.5px;font-size:11px;color:#fff;background:#648d9c;border-radius:999px;padding:5px 14px;}
.shl .img-ph .ttl{font-family:var(--brand-font);font-weight:700;font-size:17px;color:#2a2a2a;line-height:1.35;}
.shl .img-ph .desc{font-family:var(--brand-font);font-size:14.5px;line-height:1.6;color:#4c4c4c;max-width:640px;margin:0;}
.shl .img-ph .desc strong{color:#2a2a2a;}
.shl .img-ph.avatar{width:34px;min-width:34px;height:34px;min-height:34px;border-radius:50%;padding:2px;gap:0;flex:0 0 auto;background:#e7e0d6;}
.shl .img-ph.avatar .tag,.shl .img-ph.avatar .ttl,.shl .img-ph.avatar .desc{display:none;}
.shl .img-ph.bio-av{width:64px;min-width:64px;height:64px;min-height:64px;border-radius:50%;padding:2px;gap:0;flex:0 0 auto;background:#e7e0d6;}
.shl .img-ph.bio-av .tag,.shl .img-ph.bio-av .ttl,.shl .img-ph.bio-av .desc{display:none;}

/* ---- Responsive ---- */
@media screen and (max-width:640px){
  .shl{font-size:16px;}
  .shl h1{font-size:30px;}
  .shl .body-copy h2{font-size:23px;}
  .shl .lead p{font-size:17px;}
  .shl .h2h,.shl .pick{grid-template-columns:1fr;}
  .shl .press .logos{gap:26px;}
  .shl .press .logos img{height:20px;}
  .shl .img-ph{min-height:230px;padding:22px 16px;}
}
`;

// Design-system star (gold #F2D96F "Attention – Sunlight"), path data from the
// TruekindStars DS assets. Built as an HTML string for the injected markup.
const STAR_SOLID =
  "M9.27148 24.7768L2.07669 18.8928C1.12163 18.007 0.739605 16.7417 1.1853 15.4763C1.56732 14.2742 2.64973 13.4517 3.92314 13.3884L13.1554 12.7557C13.3464 12.7557 13.5374 12.6292 13.6011 12.4394L17.1667 3.89807C17.676 2.75923 18.7584 2 20.0318 2C21.3052 2 22.3877 2.69596 22.897 3.89807L26.3352 12.4394C26.3989 12.6292 26.5899 12.7557 26.7809 12.7557L36.0769 13.3884C37.3503 13.4517 38.4327 14.2742 38.8147 15.4763C39.2604 16.7417 38.8784 18.007 37.9233 18.8295L30.7285 24.7135C30.5375 24.8401 30.4738 25.0299 30.5375 25.2197L32.7023 34.1406C32.957 35.0896 32.7023 36.0387 32.1293 36.7979C31.5562 37.4938 30.6648 37.9367 29.7735 37.9367C29.2004 37.9367 28.6274 37.7469 28.118 37.4306L20.2228 32.6221C20.0955 32.4956 19.9045 32.4956 19.7135 32.6221L11.882 37.4938C11.3726 37.8102 10.7996 38 10.2265 38C9.27148 38 8.38009 37.5571 7.80705 36.7979C7.23402 36.0387 7.04301 35.0896 7.29769 34.1406L9.46249 25.283C9.46249 25.0931 9.39882 24.9033 9.27148 24.7768Z";
const STAR_REGULAR =
  "M9.46249 25.283L7.29769 34.1406C7.04301 35.0896 7.23402 36.0387 7.80705 36.7979C8.38009 37.5571 9.27148 38 10.2265 38C10.7996 38 11.3726 37.8102 11.882 37.4938L19.7135 32.6221C19.9045 32.4956 20.0955 32.4956 20.2228 32.6221L28.118 37.4306C28.6274 37.7469 29.2004 37.9367 29.7735 37.9367C30.6648 37.9367 31.5562 37.4938 32.1293 36.7979C32.7023 36.0387 32.957 35.0896 32.7023 34.1406L30.5375 25.2197C30.4738 25.0299 30.5375 24.8401 30.7285 24.7135L37.9233 18.8295C38.8784 18.007 39.2604 16.7417 38.8147 15.4763C38.4327 14.2742 37.3503 13.4517 36.0769 13.3884L26.7809 12.7557C26.5899 12.7557 26.3989 12.6292 26.3352 12.4394L22.897 3.89807C22.3877 2.69596 21.3052 2 20.0318 2C18.7584 2 17.676 2.75923 17.1667 3.89807L13.6011 12.4394C13.5374 12.6292 13.3464 12.7557 13.1554 12.7557L3.92314 13.3884C2.64973 13.4517 1.56732 14.2742 1.1853 15.4763C0.739604 16.7417 1.12163 18.007 2.07669 18.8928L9.27148 24.7768C9.39882 24.9033 9.46249 25.0931 9.46249 25.283ZM3.33486 17.4713L10.5474 23.3699L10.6126 23.4346C11.1781 23.9966 11.3625 24.7152 11.3625 25.283V25.5105L9.13861 34.6099L9.1331 34.6304C9.02906 35.0181 9.10438 35.366 9.32511 35.6585C9.53822 35.9408 9.86677 36.1053 10.2265 36.1053C10.3815 36.1053 10.6112 36.0509 10.8776 35.8855L18.6965 31.0216C19.3132 30.6298 20.4141 30.3643 21.3388 31.0817L29.1154 35.8179L29.1224 35.8222C29.3887 35.9876 29.6184 36.042 29.7735 36.042C30.0513 36.042 30.4013 35.8916 30.6366 35.624C30.8943 35.2656 30.9447 34.9204 30.8669 34.6304L30.861 34.6084L28.7032 25.7164C28.4227 24.7373 28.8134 23.771 29.5714 23.2094L36.696 17.3829C37.0675 17.0545 37.1986 16.6053 37.0221 16.1042L37.0123 16.0766L37.0035 16.0487C36.8653 15.6139 36.4771 15.3054 35.9823 15.2808L35.9649 15.2799L26.6894 14.6486C25.7835 14.6126 24.9052 14.0442 24.559 13.1129L21.1414 4.62285C20.9314 4.13857 20.5459 3.89474 20.0318 3.89474C19.5678 3.89474 19.1384 4.15729 18.9098 4.65239L15.3715 13.1285C15.0213 14.0503 14.1482 14.6125 13.2476 14.6486L4.03555 15.2799L4.01769 15.2808C3.52292 15.3054 3.13468 15.6139 2.99652 16.0487L2.98766 16.0766L2.97793 16.1042C2.80988 16.5813 2.91132 17.0584 3.33486 17.4713Z";

// Each star fills by the fractional remainder of the rating (e.g. 4.2 → the
// 5th star is painted 20% wide via a clip rect), so the row matches the score.
export const starRow = (rating: number, uid = "") =>
  Array.from({ length: 5 }, (_, i) => {
    const f = Math.max(0, Math.min(1, rating - i));
    if (f >= 1)
      return `<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="${STAR_SOLID}" fill="#F2D96F"/></svg>`;
    if (f <= 0)
      return `<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="${STAR_REGULAR}" fill="#ece8e1"/></svg>`;
    const id = `star-${uid}-${i}`;
    return `<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="${STAR_REGULAR}" fill="#ece8e1"/><clipPath id="${id}"><rect x="0" y="0" width="${(
      40 * f
    ).toFixed(2)}" height="40"/></clipPath><path d="${STAR_SOLID}" fill="#F2D96F" clip-path="url(#${id})"/></svg>`;
  }).join("");
