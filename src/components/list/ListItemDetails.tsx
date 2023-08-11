import { useAtomValue } from "jotai";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Text, View } from "react-native-ui-lib";
import { openBrowserAsync } from "expo-web-browser";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import {
  fontSizeMap,
  smallerFontSizeMap,
} from "~components/modal/FontSizeModal";
import { TypeItem, MovieProps } from "~functions/api/getList";
import { fontSizeAtom } from "~atoms/fontSize";

function isMovieProps(item: TypeItem): item is MovieProps {
  return (item as MovieProps).title_zh !== undefined;
}

const _handlePressButtonAsync = async (link: string) => {
  let result = await openBrowserAsync(link);
};

type ListItemDetailsProps = {
  item: TypeItem;
};
const titleLanguageMapping = {
  English: "title",
  繁體中文: "title_zh",
};
const ListItemDetails: React.FC<ListItemDetailsProps> = ({ item }) => {
  const { t } = useTranslation();
  const fontSizeData = useAtomValue(fontSizeAtom);
  const title = isMovieProps(item) ? item.title_zh : item.title;
  console.log(item);
  const currentLanguage = i18next.language;

  return (
    <View flex>
      <View centerH>
        <Text
          textColor
          className={`${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]} my-2`}
        >
          {isMovieProps(item)
            ? item[titleLanguageMapping[currentLanguage]]
            : title}
        </Text>
        <View centerH className="items-center justify-center">
          <Image
            source={{
              uri: item.pic,
            }}
            resizeMode="contain"
            style={{ width: 150, height: 220 }}
          />
          <View className="mt-2 flex-row items-center">
            <View className="flex-row items-center">
              <AntDesign
                name="star"
                size={(fontSizeData + 2) * 8}
                color={"#f5ea1c"}
              />
              <Text
                textColor
                className={`${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]} ml mr-4`}
              >
                {item.rating}
              </Text>
            </View>
            {isMovieProps(item) && item.wiki_url && (
              <Text
                textColor
                className={`${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]}`}
                onPress={() => _handlePressButtonAsync(item.wiki_url)}
                style={{ textAlign: "center" }}
              >
                {t("More Info")}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View className="ml-2 flex-row items-center justify-start">
        <View>
          <View className="my-2 flex-row items-center">
            <Text textColor>
              <Fontisto name="film" size={(fontSizeData + 1) * 8} />
            </Text>
            <Text
              textColor
              className={`${fontSizeMap[fontSizeData - 2]} sm : ${
                smallerFontSizeMap[fontSizeData - 2]
              } ml-2`}
            >
              {item.location}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text textColor>
              <Fontisto name="date" size={(fontSizeData + 1) * 8} />
            </Text>
            {item?.date && (
              <Text
                textColor
                className={`${fontSizeMap[fontSizeData - 2]} sm : ${
                  smallerFontSizeMap[fontSizeData - 2]
                } ml-2`}
              >
                {item.date.split("T")[0]}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View className=" mx-2 mt-8">
        <Text
          textColor
          className={`${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]} `}
        >
          {item.desc}
        </Text>
      </View>
    </View>
  );
};

export default ListItemDetails;
