import { useSearchParams } from "expo-router";
import { View } from "react-native";

const CertIDPage: React.FC = () => {
  const params = useSearchParams();

  const UUID = params.UUID as string;

  console.log(UUID);
  return <View className="justify-center items-center"></View>;
};

export default CertIDPage;
