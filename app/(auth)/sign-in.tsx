import { Image, Alert } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import { Stack } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import * as SecureStore from "expo-secure-store";

import LanguagePicker from "~components/LanguagePicker";
import DismissKeyboard from "~components/DismissKeyboard";
import CustomInput from "~components/input/CustomInput";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log(result);
    return result;
  } else {
    console.log("No values stored under that key.");
  }
}

export async function removeJWT(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export default function SignIn() {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginHandler = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch(
        "https://go-crud.fly.dev/api/login", // production use
        // "http://localhost:8080/api/login", // local use
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.text();

      // store tokens in ExpoSecureStore
      save("accessToken", data);
      console.log(data, "login");

      // redirect to MainScreen
      router.replace("/home/movies");
    } catch (error) {
      console.error(error);
      Alert.alert(
        t("Login failed"),
        t("Please check your username and password and try again."),
      );
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <DismissKeyboard>
        <View className="flex-1 items-center bg-[#d3d3d3]">
          <View className="mb-8 flex h-[40%] flex-row items-end">
            <Image
              className={"h-[50%] w-[50%]"}
              resizeMode="contain"
              source={require("../../assets/pics/movie-icon.png")}
            ></Image>
          </View>
          <Text black className="mb-4 text-2xl">
            {t("Hello")}
          </Text>
          <Text black className="mb-4">
            {t("Please Login to Your Account")}
          </Text>

          <CustomInput
            placeholder={t("Username")}
            icon={<FontAwesome name="user" size={24} color="darkgrey" />}
            password={false}
            name="username"
            control={control}
            errors={errors}
          />
          <CustomInput
            placeholder={t("Password")}
            icon={<Entypo name="lock" size={24} color="darkgrey" />}
            password={true}
            name="password"
            control={control}
            errors={errors}
          />

          <Button
            bg-black
            onPress={handleSubmit(loginHandler)}
            className="my-2 w-[70%]"
          >
            <Text white className="font-bold">
              {t("Sign In")}
            </Text>
          </Button>
          <LanguagePicker />
        </View>
      </DismissKeyboard>
    </>
  );
}
