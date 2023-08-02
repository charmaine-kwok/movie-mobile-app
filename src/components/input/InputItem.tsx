import { Text, View, TextField } from "react-native-ui-lib";
import { Controller } from "react-hook-form";

const InputItem: React.FC<{
  name: string;
  label: string;
  control: any;
  errors: any;
}> = ({ name, label, control, errors }) => {
  return (
    <View>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="space-y-2">
            <TextField
              textColor
              placeholder={label}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label={label}
              migrate
            />
          </View>
        )}
        name={name}
      />
      {errors[name] ? (
        <View className="h-[30px]">
          <Text red40 className="mt-1 font-semibold">
            This is required.
          </Text>
        </View>
      ) : (
        <View className="h-[30px]"></View>
      )}
    </View>
  );
};

export default InputItem;
