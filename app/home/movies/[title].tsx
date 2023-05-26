import { useSearchParams } from "expo-router";
import { View } from "react-native";

const DetailPage: React.FC = () => {
  const params = useSearchParams();

  const title = params.title as string;

  console.log(title);
  return <View className="items-center justify-center"></View>;
};

export default DetailPage;
