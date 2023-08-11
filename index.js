import "expo-router/entry";

import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
import { useEffect, useCallback, useState } from "react";
import { Colors } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import { useSetAtom, useAtom } from "jotai";

import { isLoggedInAtom } from "~atoms/isLoggedIn";
import colorsTheme from "assets/colors/colorsTheme";
import setTheme from "~functions/setTheme";
import getFontSizeData from "~functions/storage/getFontSizeData";
import getLanguageData from "~functions/storage/getLanguageData";
import getIsDarkMode from "~functions/storage/getIsDarkMode";
import { DarkThemeAtom } from "~atoms/darkTheme";
import { fontSizeAtom } from "~atoms/fontSize";
import * as SplashScreen from "expo-splash-screen";
import validateJWT from "~functions/api/validateJWT";

// FOR TRANSLATION
import i18next from "./assets/languages/i18n-js";
import { useTranslation } from "react-i18next";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

Colors.loadSchemes(colorsTheme);

export function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useAtom(DarkThemeAtom);
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const ctx = require.context("./app");
  const { i18n } = useTranslation();

  const setFontSizeData = useSetAtom(fontSizeAtom);
  useEffect(() => {
    async function preload() {
      try {
        validateJWT(setIsLoggedIn);
        getFontSizeData(setFontSizeData);
        getLanguageData(i18n);
        getIsDarkMode(setIsDarkTheme, setTheme);
      } catch (e) {
        console.log(e);
      } finally {
        // Tell the application to render
        setTimeout(() => setAppIsReady(true), 100);
      }
    }
    preload();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ExpoRoot context={ctx} onLayout={onLayoutRootView} />
      <StatusBar style={isDarkTheme ? "light" : "dark"} />
    </QueryClientProvider>
  );
}

registerRootComponent(App);
