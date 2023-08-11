import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { AntDesign } from "@expo/vector-icons";
import i18next from "i18next";
import { usePathname } from "expo-router";

import { TypeItem } from "~functions/api/getList";
import {
  fontSizeMap,
  smallerFontSizeMap,
} from "~components/modal/FontSizeModal";
import { fontSizeAtom } from "~atoms/fontSize";
import { MovieProps } from "~functions/api/getList";

type ListItemProps = { item: TypeItem; index: number };

const titleLanguageMapping = {
  English: "title",
  繁體中文: "title_zh",
};

function isMovieProps(item: TypeItem): item is MovieProps {
  return (item as MovieProps).title_zh !== undefined;
}

const ListItem: React.FC<ListItemProps> = ({ item, index }) => {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const path = usePathname();

  const currentLanguage = i18next.language;

  const router = useRouter();

  return (
    <TouchableOpacity
      flex
      bg-screenBG
      className="border-b-2 border-slate-300"
      onPress={() => {
        router.push({
          pathname: `${path}/${item.id}`,
        });
      }}
    >
      <View className="flex-row items-center">
        <View className="mr-4 flex w-1/4">
          <Image
            source={{
              uri: item.pic,
            }}
            resizeMode="contain"
            style={{ width: 100, height: 200 }}
          />
        </View>

        <View className="flex w-1/2 px-2">
          <View className="justify-center">
            <Text
              textColor
              className={`${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]}`}
            >
              {index + 1}.{" "}
              {isMovieProps(item)
                ? item[titleLanguageMapping[currentLanguage]]
                : item.title}
            </Text>
          </View>
        </View>

        <View className="w-1/4 flex-1 flex-row items-center">
          <AntDesign
            name="star"
            size={(fontSizeData + 2) * 8}
            color={"#f5ea1c"}
          />
          <Text
            textColor
            className={`${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]} ml`}
          >
            {item.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ListItem;
