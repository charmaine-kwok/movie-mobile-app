import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { AntDesign } from "@expo/vector-icons";
import i18next from "i18next";

import { fontSizeAtom } from "~atoms/fontSize";
import { MovieProps } from "~functions/api/movie/getMoviesList";

type certListItemProps = { item: MovieProps; index: number };

const titleLanguageMapping = {
  English: "title_en",
  繁體中文: "title_zh",
};

const certListItem: React.FC<certListItemProps> = ({ item, index }) => {
  const fontSizeData = useAtomValue(fontSizeAtom);

  const currentLanguage = i18next.language;
  // console.log("Current language:", currentLanguage);
  const router = useRouter();
  return (
    <TouchableOpacity bg-screenBG className="border-b-2 border-slate-300">
      <View className="flex-row items-center">
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: item.pic,
            }}
            resizeMode="contain"
            style={{ width: 100, height: 200 }}
          />
        </View>

        <View style={{ flex: 3 }}>
          <View className="justify-center pl-8">
            <Text textColor className={`text-${fontSizeData + 1}xl`}>
              {index + 1}. {item.title}{" "}
              {item[titleLanguageMapping[currentLanguage]]}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1 }} className="flex-row items-center">
          <AntDesign
            name="star"
            size={(fontSizeData + 2) * 8}
            color={"#f5ea1c"}
          />
          <Text textColor className={`text-${fontSizeData + 1}xl ml`}>
            {item.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default certListItem;
