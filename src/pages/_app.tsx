import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@trafilea/afrodita-components";
import { SWRConfig } from "swr";
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps }: AppProps) => (
  <SWRConfig value={{}}>
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  </SWRConfig>
);

export default appWithTranslation(App);
