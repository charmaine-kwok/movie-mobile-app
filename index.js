import "expo-router/entry";

import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
import { useEffect } from "react";
import { Colors } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import { useSetAtom, useAtom } from "jotai";

import colorsTheme from "assets/colors/colorsTheme";
import setTheme from "~functions/setTheme";
import getFontSizeData from "~functions/storage/getFontSizeData";
import getLanguageData from "~functions/storage/getLanguageData";
import getIsDarkMode from "~functions/storage/getIsDarkMode";
import { DarkThemeAtom } from "~atoms/darkTheme";
import { fontSizeAtom } from "~atoms/fontSize";

// FOR TRANSLATION
import i18next from "./assets/languages/i18n-js";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

Colors.loadSchemes(colorsTheme);

export function App() {
  const [isDarkTheme, setIsDarkTheme] = useAtom(DarkThemeAtom);

  const ctx = require.context("./app");
  const { i18n } = useTranslation();

  const setFontSizeData = useSetAtom(fontSizeAtom);
  useEffect(() => {
    getFontSizeData(setFontSizeData);
    getLanguageData(i18n);
    getIsDarkMode(setIsDarkTheme, setTheme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ExpoRoot context={ctx} />
      <StatusBar style={isDarkTheme ? "light" : "dark"} />
    </QueryClientProvider>
  );
}

registerRootComponent(App);
