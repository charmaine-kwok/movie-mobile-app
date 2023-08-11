import { View, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { Text } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";

type CustomInputProps = {
  placeholder: string;
  icon?: React.ReactElement;
  password?: boolean;
  widthPerct?: string;
  control: any;
  name: string;
  errors: any;
};

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  icon,
  password = false,
  widthPerct,
  control,
  name,
  errors,
}) => {
  const [hidePass, setHidePass] = useState(true);
  const { t } = useTranslation();

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              widthPerct ? { width: widthPerct } : {},
              // addStyle ? addStyle : {},
            ]}
            className="w-[70%] flex-row rounded-md border border-[#e8e8e8] bg-white px-2"
          >
            {icon ? (
              <View className="w-[10%] items-center justify-center ">
                {icon}
              </View>
            ) : null}
            <View className="flex-1 flex-row items-center p-2.5">
              <TextInput
                className="mr-2 w-[90%]"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                secureTextEntry={password ? (hidePass ? true : false) : false}
                autoCorrect={false}
                autoCapitalize={"none"}
                keyboardType="default"
              ></TextInput>
              <View>
                {password && (
                  <Icon
                    name={hidePass ? "eye-slash" : "eye"}
                    onPress={() => setHidePass(!hidePass)}
                  />
                )}
              </View>
            </View>
          </View>
        )}
      />
      {errors[name] ? (
        <View className="flex h-[30px] w-[70%] justify-start">
          <Text red40 className="mt-1 font-semibold">
            {t(`${name.charAt(0).toUpperCase() + name.slice(1)} is required.`)}
          </Text>
        </View>
      ) : (
        <View className="h-[30px]" />
      )}
    </>
  );
};

export default CustomInput;
