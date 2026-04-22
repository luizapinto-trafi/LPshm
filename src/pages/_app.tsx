import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";
import { appWithTranslation } from "next-i18next/pages";

const App = ({ Component, pageProps }: AppProps) => (
  <SWRConfig value={{}}>
    <ThemeProvider theme={{}}>
      <Component {...pageProps} />
    </ThemeProvider>
  </SWRConfig>
);

export default appWithTranslation(App);
