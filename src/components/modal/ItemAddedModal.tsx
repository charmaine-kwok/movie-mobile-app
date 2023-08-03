import { Text, View, Button } from "react-native-ui-lib";
import { useTranslation } from "react-i18next";

import { Modal } from "./Modal";
import { Dispatch, SetStateAction } from "react";

const ItemAddedModal: React.FC<{
  isVisible: boolean;
  setIsCreated: Dispatch<SetStateAction<boolean>>;
  clearAll: () => void;
}> = ({ isVisible, setIsCreated, clearAll }) => {
  const { t } = useTranslation();

  return (
    <Modal isVisible={isVisible} justifyContent={"center"}>
      <Modal.Container>
        <View bg-screenBG className="mx-8 rounded-xl">
          <Modal.Body>
            <View center paddingV-20 className="space-y-4">
              <Text className="text-3xl">{t("Item added")}!</Text>
              <Button
                bg-textColor
                size={Button.sizes.small}
                onPress={() => {
                  setIsCreated(false);
                  clearAll();
                }}
              >
                <Text screenBG center className="text-lg">
                  OK
                </Text>
              </Button>
            </View>
          </Modal.Body>
        </View>
      </Modal.Container>
    </Modal>
  );
};

export default ItemAddedModal;
