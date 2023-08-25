import { Dispatch } from "react";
import { Text, TouchableOpacity, View, Checkbox } from "react-native-ui-lib";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { TOrder } from "~components/list/ListPageTemplate";
import {
  fontSizeMap,
  smallerFontSizeMap,
} from "~components/modal/FontSizeModal";
import { fontSizeAtom } from "~atoms/fontSize";
import { Modal } from "~components/modal/Modal";

type FontSizeModalProps = {
  isVisible: boolean;
  setIsVisible: Dispatch<boolean>;
  fetchData: (
    order: string,
    currentPage: number,
    clearData?: boolean,
  ) => Promise<void>;
  order: string;
  setOrder: Dispatch<TOrder>;
  setCurrentPage: Dispatch<number>;
  clearData?: boolean;
};

export const SortModal: React.FC<FontSizeModalProps> = ({
  isVisible,
  setIsVisible,
  fetchData,
  order,
  setOrder,
  setCurrentPage,
  clearData,
}) => {
  const { t } = useTranslation();

  const fontSizeData = useAtomValue(fontSizeAtom);

  const toAsc = () => {
    setIsVisible(false);
    setOrder("ASC");
    setCurrentPage(1);
    fetchData("ASC", 1, true);
  };

  const toDesc = () => {
    setIsVisible(false);
    setOrder("DESC");
    setCurrentPage(1);
    fetchData("DESC", 1, true);
  };

  return (
    <Modal
      justifyContent={"flex-end"}
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
      }}
    >
      <Modal.Container>
        <View bg-screenBG className="rounded-xl">
          <Modal.Header>
            <Text
              textColor
              center
              className={`font-bold ${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]}`}
            >
              {t("Sort")}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <View className="mx-4 mb-12 space-y-4">
              <TouchableOpacity
                className="flex flex-row items-center border-b-2 border-slate-300 py-4 "
                onPress={order === "ASC" ? null : toAsc}
              >
                <Text textColor className="mr-4">
                  <Checkbox
                    color="#11b329"
                    iconColor="white"
                    value={order === "ASC" ? true : false}
                    onValueChange={order === "ASC" ? null : toAsc}
                  />
                </Text>
                <Text
                  textColor
                  className={`${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]}`}
                >
                  {t("Oldest to Newest")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-row items-center border-b-2 border-slate-300 py-4"
                onPress={order === "DESC" ? null : toDesc}
              >
                <Text textColor className="mr-4">
                  <Checkbox
                    color="#11b329"
                    iconColor="white"
                    value={order === "DESC" ? true : false}
                    onValueChange={order === "DESC" ? null : toDesc}
                  />
                </Text>
                <Text
                  textColor
                  className={`${fontSizeMap[fontSizeData]} sm : ${smallerFontSizeMap[fontSizeData]}`}
                >
                  {t("Newest to Oldest")}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal.Body>
        </View>
      </Modal.Container>
    </Modal>
  );
};

export default SortModal;
