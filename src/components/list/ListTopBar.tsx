import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";
import { useAtomValue } from "jotai";

import {
  fontSizeMap,
  smallerFontSizeMap,
} from "~components/modal/FontSizeModal";
import { fontSizeAtom } from "~atoms/fontSize";
import NumberOfSelectedResults from "~components/numberOfResults/NumberOfSelectedResults";

type ListProps = {
  totalItem: number;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};

const ListTopBar: React.FC<ListProps> = ({ totalItem, setIsVisible }) => {
  const { t } = useTranslation();

  const fontSizeData = useAtomValue(fontSizeAtom);

  return (
    <View
      bg-screenBG
      className="h-[50] flex-row items-center justify-between border-b-2 border-slate-300 px-4"
    >
      <NumberOfSelectedResults totalItem={totalItem} />
      <View className="flex flex-row items-center space-x-4">
        <TouchableOpacity
          className="flex flex-row items-center"
          onPress={() => setIsVisible(true)}
        >
          <Text textColor className="mr-2">
            <FontAwesome name="sort" size={24} />
          </Text>
          <Text
            textColor
            className={`${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]}`}
          >
            {t("Sort")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListTopBar;
