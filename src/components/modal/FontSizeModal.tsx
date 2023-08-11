import { Dispatch, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import Slider from "@react-native-community/slider";
import { useAtomValue, useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import { fontSizeAtom } from "~atoms/fontSize";
import { DarkThemeAtom } from "~atoms/darkTheme";
import { Modal } from "~components/modal/Modal";

type FontSizeModalProps = {
  setIsVisible: Dispatch<boolean>;
  isVisible: boolean;
};

export const fontSizeMap = {
  "-2": "text-sm",
  "-1": "text-base",
  0: "text-lg",
  1: "text-2xl",
  2: "text-3xl",
};

export const smallerFontSizeMap = {
  "-2": "text-xs",
  "-1": "text-sm",
  0: "text-base",
  1: "text-lg",
  2: "text-2xl",
};

export const FontSizeModal: React.FC<FontSizeModalProps> = (props) => {
  const { t } = useTranslation();

  const isDarkTheme = useAtomValue(DarkThemeAtom);
  const [storedValue, setStoredValue] = useState<null | number>(null);
  const [valueInModal, setValue] = useState<number>(storedValue ?? 1);
  const [fontSizeData, setFontSizeData] = useAtom(fontSizeAtom);
  const [tempFontSize, setTempFontSize] = useState<number>(fontSizeData);

  const valueChangeHandler: (fontSize: number) => void = (fontSize) => {
    setValue(fontSize);
    setTempFontSize(fontSize);
  };

  return (
    <Modal
      justifyContent={"flex-end"}
      isVisible={props.isVisible}
      onBackdropPress={() => {
        props.setIsVisible(false);
        setValue(valueInModal);
        setFontSizeData(valueInModal);
        AsyncStorage.setItem("fontSize", fontSizeData.toString());
      }}
    >
      <Modal.Container>
        <View bg-screenBG className="rounded-xl">
          <Modal.Header>
            <Text textColor center className="text-lg">
              {t("AdjustFontSize")}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <View className="mx-4">
              <Slider
                minimumValue={0}
                maximumValue={2}
                minimumTrackTintColor={isDarkTheme ? "#fff" : "#000000"}
                maximumTrackTintColor={isDarkTheme ? "#847e7e" : "#c7bdbdbd"}
                step={1}
                thumbTintColor={isDarkTheme ? "#fff" : "#000000"}
                tapToSeek={true}
                value={fontSizeData}
                onValueChange={valueChangeHandler}
              />
              <View className="top-[-25] -z-[1] flex-row justify-between">
                {[...Array(3).keys()].map((index) => {
                  const dotColor =
                    index < tempFontSize
                      ? isDarkTheme
                        ? "#fff"
                        : "#000"
                      : isDarkTheme
                      ? "#847e7e"
                      : "#c7bdbdbd";
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: dotColor,
                        width: 10,
                        height: 10,
                        borderRadius: 99,
                        marginHorizontal: 3,
                      }}
                    />
                  );
                })}
              </View>

              <View className="flex-row justify-between">
                <Text textColor className="text-lg">
                  A
                </Text>
                <Text textColor className="text-3xl">
                  A
                </Text>
              </View>

              <View className="h-[60px]">
                <Text
                  textColor
                  className={`${fontSizeMap[tempFontSize]} sm : ${smallerFontSizeMap[tempFontSize]}`}
                >
                  {t("SampleText")}
                </Text>
              </View>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <View className="mb-8">
              <TouchableOpacity
                onPress={() => {
                  props.setIsVisible(false);
                  setValue(valueInModal);
                  setFontSizeData(valueInModal);
                  AsyncStorage.setItem("fontSize", fontSizeData.toString());
                }}
              >
                <Text textColor className="text-lg">
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </Modal.Footer>
        </View>
      </Modal.Container>
    </Modal>
  );
};

export default FontSizeModal;
