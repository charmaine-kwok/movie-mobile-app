import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons/";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";

import { DarkThemeAtom } from "~atoms/darkTheme";
import TabBarIcon from "~components/tabBarIcon/tabBarIcon";

export default function Layout1() {
  const { t } = useTranslation();
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: isDarkTheme ? "white" : "black",
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: isDarkTheme ? "black" : "white",
        },
        headerStyle: {
          backgroundColor: isDarkTheme ? "#000" : "#fff",
        },
        headerTintColor: isDarkTheme ? "#fff" : "#000",
      }}
    >
      <Tabs.Screen
        name="movies"
        options={{
          href: "home/",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <MaterialIcons
                name="local-movies"
                size={focused ? 28 : 24}
                color={color}
              />
            </TabBarIcon>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="non-movies"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <FontAwesome
                name="music"
                size={focused ? 28 : 24}
                color={color}
              />
            </TabBarIcon>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="others"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <FontAwesome name="user" size={focused ? 28 : 24} color={color} />
            </TabBarIcon>
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused}>
              <Ionicons
                name="settings-sharp"
                size={focused ? 28 : 24}
                color={color}
              />
            </TabBarIcon>
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
