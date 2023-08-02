import { Stack } from "expo-router";
import { Text } from "react-native-ui-lib";
import { Ionicons } from "@expo/vector-icons";

const TabBarAddButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <Stack.Screen
      options={{
        headerRight: () => (
          <Text textColor onPress={onPress}>
            <Ionicons name="ios-add" size={24} style={{ marginRight: 10 }} />
          </Text>
        ),
      }}
    />
  );
};

export default TabBarAddButton;
