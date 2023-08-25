import { useEffect } from "react";
import { Image, Alert } from "react-native";
import { View, Text, Button, TouchableOpacity } from "react-native-ui-lib";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Dash from "react-native-dash";
import { Stack, useRouter } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import * as Google from "expo-auth-session/providers/google";

import { WEBCLIENT_ID, IOSCLIENT_ID } from "@env";
import googleSignIn from "../../assets/pics/btn_google_signin_light_normal_web.png";
import LanguagePicker from "~components/LanguagePicker";
import DismissKeyboard from "~components/DismissKeyboard";
import CustomInput from "~components/input/CustomInput";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
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
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: WEBCLIENT_ID,
    expoClientId: WEBCLIENT_ID,
    iosClientId: IOSCLIENT_ID,
  });

  useEffect(() => {
    googleSignInHandler();
  }, [response]);

  async function googleSignInHandler() {
    if (response?.type === "success") {
      // store tokens in ExpoSecureStore
      save("googleAccessToken", response.authentication.accessToken);
      save("googleRefreshToken", response.authentication.refreshToken);
      console.log("Google Access Token:", response.authentication.accessToken);
      await getUserInfo(response.authentication.accessToken);
    }
  }

  const getUserInfo = async (token: string) => {
    try {
      const response = await fetch(
        "https://go-crud.fly.dev/api/userInfo", // production use
        // "http://localhost:8080/api/userInfo", // local use
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: token,
          },
        },
      );

      const userData: {
        Email: string;
        Name: string;
      } = await response.json();
      const email = userData.Email;
      console.log("User Data:", userData);
      console.log("Email:", email);
      loginEmailHandler(email);
    } catch (error) {
      console.log(error);
    }
  };

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

  const loginEmailHandler = async (email: string) => {
    try {
      const response = await fetch(
        "https://go-crud.fly.dev/api/loginWithEmail", // production use
        // "http://localhost:8080/api/loginWithEmail", // local use
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        },
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.text();

      // store tokens in ExpoSecureStore
      save("accessToken", data);
      console.log("accessToken", data);

      // redirect to MainScreen
      router.replace("/home/movies");
    } catch (error) {
      console.error(error);
      Alert.alert(
        t("Login failed"),
        t("Please check your email and try again."),
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

          <View className="my-4 flex flex-row items-center space-x-8 ">
            <Dash
              style={{ width: "35%" }}
              dashGap={10}
              dashLength={10}
              dashThickness={1}
            />
            <Text black>{t("Or")}</Text>
            <Dash
              style={{ width: "35%" }}
              dashGap={10}
              dashLength={10}
              dashThickness={1}
            />
          </View>
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
            className="my-2"
          >
            <Image source={googleSignIn} />
          </TouchableOpacity>

          <LanguagePicker />
        </View>
      </DismissKeyboard>
    </>
  );
}
