import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

/**
 * Per-page stylesheets that MUST live in the Document <Head>.
 *
 * Why not in the page's `next/head`?
 * In Next 16, `<link rel="stylesheet">` inside `next/head` is not guaranteed
 * to land in the initial SSR response (see "no-stylesheets-in-head-component")
 * — it can be deferred behind Suspense boundaries, which makes external CSS
 * (Webflow bundle, Google Fonts) race the first paint and end up applying
 * after the user already saw the fallback font/layout.
 *
 * Document is the only place where we can guarantee the link tags are part
 * of the initial HTML the browser parses.
 */
type PageStylesheet = {
  href: string;
  integrity?: string;
  crossOrigin?: "anonymous";
};

// Mirrors WebFont.load() on the published Webflow page — without these
// families the buybox renders in the system sans-serif fallback.
const SPA_DR_GOOGLE_FONTS: PageStylesheet = {
  href:
    "https://fonts.googleapis.com/css2" +
    "?family=Inter:wght@300;400;500;600;700" +
    "&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900" +
    "&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900" +
    "&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900" +
    "&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800" +
    "&family=Playfair+Display:wght@300;400;500;600;700" +
    "&family=Poppins:wght@300;400;500;600;700" +
    "&display=swap",
};

const SPA_DR_LISTCICLE_WEBFLOW_CSS: PageStylesheet = {
  href: "https://cdn.prod.website-files.com/6581a4ebeea456b4072fe120/css/the-spa-dr.webflow.shared.fd8c5ed7c.min.css",
  integrity:
    "sha384-/Yxe18GKiGW8dlwpF1BdAFQ/PzGr12yhsH6ug/sE3X/hh619SUEx0GUFsBBP1VhZ",
  crossOrigin: "anonymous",
};

// LP1 v2 (PDP-style page) ships with a different Webflow bundle fingerprint
// than the listicle. The fonts are identical, so we reuse SPA_DR_GOOGLE_FONTS.
const SPA_DR_LP1_V2_WEBFLOW_CSS: PageStylesheet = {
  href: "https://cdn.prod.website-files.com/6581a4ebeea456b4072fe120/css/the-spa-dr.webflow.shared.23bc7a576.min.css",
  integrity:
    "sha384-I7x6V2RNtSPAa+J6GedHd2hfHMr08B6wn12Knr5i2CLm4WSmjX7ZwxwXle8KyIY3",
  crossOrigin: "anonymous",
};

const SPA_DR_LISTCICLE_STYLESHEETS: ReadonlyArray<PageStylesheet> = [
  SPA_DR_GOOGLE_FONTS,
  SPA_DR_LISTCICLE_WEBFLOW_CSS,
];

const SPA_DR_LP1_V2_STYLESHEETS: ReadonlyArray<PageStylesheet> = [
  SPA_DR_GOOGLE_FONTS,
  SPA_DR_LP1_V2_WEBFLOW_CSS,
];

const PAGE_STYLESHEETS: Record<string, ReadonlyArray<PageStylesheet>> = {
  "/hairserum/bty-7459-lp1-lead-offershort-list-tox": SPA_DR_LISTCICLE_STYLESHEETS,
  "/pages/hairserum/lp1-lead-offershort-list-tox-v2": SPA_DR_LP1_V2_STYLESHEETS,
};

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const locale = this.props.__NEXT_DATA__.locale ?? "en";
    const page = this.props.__NEXT_DATA__.page;
    const pageStylesheets = PAGE_STYLESHEETS[page] ?? [];
    return (
      <Html lang={locale}>
        <Head>
          {pageStylesheets.map((sheet) => (
            <link
              key={sheet.href}
              rel="stylesheet"
              href={sheet.href}
              integrity={sheet.integrity}
              crossOrigin={sheet.crossOrigin}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
