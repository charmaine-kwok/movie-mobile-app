import { Text, View, TextField } from "react-native-ui-lib";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

const InputItem: React.FC<{
  name: string;
  label: string;
  control: Control<any>;
  errors: FieldErrors;
}> = ({ name, label, control, errors }) => {
  const { t } = useTranslation();

  return (
    <View>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            textColor
            placeholder={t(label)}
            placeholderTextColor="rgba(172,169,169,0.7)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label={t(label)}
            migrate
            fieldStyle={{
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginTop: 5,
              paddingBottom: 5,
            }}
          />
        )}
        name={name}
      />
      {errors[name] ? (
        <View className="h-[30px]">
          <Text red40 className="mt-1 font-semibold">
            {t("This field is required.")}
          </Text>
        </View>
      ) : (
        <View className="h-[30px]" />
      )}
    </View>
  );
};

export default InputItem;
