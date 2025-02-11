"use client";

import { Box, createTheme, ThemeProvider } from "@mui/material";
import { store } from "../../_redux/store";
import { Provider } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  direction: "rtl",
});
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="rtl">
      <body>
        <Box>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={darkTheme}>
              <Provider store={store}>{children}</Provider>
            </ThemeProvider>
          </CacheProvider>
        </Box>
      </body>
    </html>
  );
}
