import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";

import { DarkThemeAtom } from "~atoms/darkTheme";

export default function Layout() {
  const { t } = useTranslation();

  const isDarkTheme = useAtomValue(DarkThemeAtom);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkTheme ? "#000" : "#fff",
        },
        headerTintColor: isDarkTheme ? "#fff" : "#000",
        contentStyle: { backgroundColor: isDarkTheme ? "#000" : "#fff" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: `${t("MovieList")}` }}
      />
      <Stack.Screen name="ListPage" />
      <Stack.Screen name="[title]" options={{ headerTitle: `${t("Info")}` }} />
    </Stack>
  );
}
