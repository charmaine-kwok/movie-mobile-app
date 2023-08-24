import { FlatList } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Dispatch } from "react";

import ListTopBar from "./ListTopBar";
import { TypeItem } from "~functions/api/getList";
import ListItem from "./ListItem";

type ListProps<TypeItem> = {
  data: TypeItem[];
  totalItem: number;
  showLoadMoreButton: boolean;
  loadMoreData: any;
  setIsVisible: Dispatch<boolean>;
};

const List: React.FC<ListProps<TypeItem>> = ({
  data,
  totalItem,
  showLoadMoreButton,
  loadMoreData,
  setIsVisible,
}) => {
  const { t } = useTranslation();

  const renderFooter = () => {
    return (
      <View className="my-4">
        <Button
          bg-textColor
          label={t("Load More")}
          screenBG
          iconOnRight
          iconSource={() => (
            <View className="ml-2">
              <Text screenBG>
                <AntDesign name="caretdown" size={12} />
              </Text>
            </View>
          )}
          onPress={loadMoreData}
        ></Button>
      </View>
    );
  };

  return (
    <>
      <ListTopBar totalItem={totalItem} setIsVisible={setIsVisible} />
      <View className="mb-12 px-4">
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <ListItem item={item} index={index} />
          )}
          keyExtractor={(_, index) => index.toString()}
          ListFooterComponent={() =>
            showLoadMoreButton ? renderFooter() : null
          }
        />
      </View>
    </>
  );
};

export default List;
