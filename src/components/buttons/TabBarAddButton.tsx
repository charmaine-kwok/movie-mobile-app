import { Stack } from 'expo-router';
import { Text } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';

export default function TabBarAddButton() {
  return (
    <Stack.Screen
      options={{
        headerRight: () => (
          <Text textColor>
            <Ionicons name='ios-add' size={24} style={{ marginRight: 10 }} />
          </Text>
        ),
      }}
    />
  );
}
