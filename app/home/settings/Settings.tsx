import { Pressable, FlatList, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useState } from "react";

import {
  fontSizeMap,
  smallerFontSizeMap,
} from "~components/modal/FontSizeModal";
import FontSizeModal from "~components/modal/FontSizeModal";
import { fontSizeAtom } from "~atoms/fontSize";

export default function Settings() {
  const [isVisible, setIsVisible] = useState(false);

  const { t } = useTranslation();
  const router = useRouter();

  const fontSizeData = useAtomValue(fontSizeAtom);

  const settingsList: { name: string; onPress: () => any }[] = [
    {
      name: `${t("Language")}`,
      onPress: () => {
        router.push("/home/settings/language");
      },
    },
    {
      name: `${t("FontSize")}`,
      onPress: () => {
        setIsVisible(true);
      },
    },
    {
      name: `${t("DarkMode")}`,
      onPress: () => {
        router.push("/home/settings/theme");
      },
    },
  ];

  return (
    <>
      <FontSizeModal isVisible={isVisible} setIsVisible={setIsVisible} />

      <FlatList
        data={settingsList}
        ListFooterComponent={
          <View className="mx-2 flex-row justify-between border-b-2 border-slate-300 py-4 opacity-60 ">
            <Text
              textColor
              className={`ml-4 ${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]}`}
            >{`${t("Build")}`}</Text>
            <Text
              textColor
              className={`mr-4 ${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]}`}
            >
              v 1.0.0
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={item.onPress}
            className="mx-2 flex-row justify-between border-b-2 border-slate-300 py-4"
          >
            <Text
              textColor
              className={`ml-4 ${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]}`}
            >
              {item.name}
            </Text>
            <View className="mr-4">
              <Text textColor>
                <AntDesign name="right" size={24} />
              </Text>
            </View>
          </Pressable>
        )}
      />
    </>
  );
}
