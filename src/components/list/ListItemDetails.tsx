import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Text, View } from "react-native-ui-lib";
import { openBrowserAsync } from "expo-web-browser";
import i18next from "i18next";

import { DarkThemeAtom } from "~atoms/darkTheme";
import { MovieProps } from "~functions/api/movie/getMoviesList";
import { NonMovieProps } from "~functions/api/non-movies/getNonMoviesList";
import { fontSizeAtom } from "~atoms/fontSize";
import getColor from "~functions/getColor";

function isMovieProps(item: MovieProps | NonMovieProps): item is MovieProps {
  return (item as MovieProps).title_en !== undefined;
}

const _handlePressButtonAsync = async (link: string) => {
  let result = await openBrowserAsync(link);
};

type ListItemDetailsProps = {
  item: MovieProps | NonMovieProps;
};
const titleLanguageMapping = {
  English: "title_en",
  繁體中文: "title_zh",
};
const ListItemDetails: React.FC<ListItemDetailsProps> = ({ item }) => {
  const isDarkTheme = useAtomValue(DarkThemeAtom);

  const fontSizeData = useAtomValue(fontSizeAtom);
  const title = isMovieProps(item) ? item.title_en : item.title;
  console.log(item);
  const currentLanguage = i18next.language;

  const { t } = useTranslation();
  return (
    <View flex>
      <View centerH>
        <Text textColor className={`text-${fontSizeData + 1}xl my-2`}>
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
              <Text textColor className={`text-${fontSizeData + 1}xl ml mr-4`}>
                {item.rating}
              </Text>
            </View>
            {isMovieProps(item) && (
              <Text
                textColor
                className={`text-${fontSizeData + 0}xl `}
                onPress={() => _handlePressButtonAsync(item.wiki_url)}
                style={{ textAlign: "center" }}
              >
                More Info
              </Text>
            )}
          </View>
        </View>
      </View>

      <View className="ml-2 flex-row items-center justify-start">
        <View>
          <View className="my-2 flex-row items-center">
            <Fontisto
              name="film"
              size={(fontSizeData + 1) * 8}
              color={`${getColor(isDarkTheme)}`}
            />
            <Text textColor className={`text-${fontSizeData + 0}xl ml-2`}>
              {item.location}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Fontisto
              name="date"
              size={(fontSizeData + 1) * 8}
              color={`${getColor(isDarkTheme)}`}
            />
            <Text textColor className={`text-${fontSizeData + 0}xl ml-2`}>
              {item.date}
            </Text>
          </View>
        </View>
      </View>
      <View className=" ml-2 mt-8">
        <Text textColor className={`text-${fontSizeData + 1}xl `}>
          {item.desc}
        </Text>
      </View>
    </View>
  );
};

export default ListItemDetails;
