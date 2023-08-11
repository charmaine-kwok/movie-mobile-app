import { Text, View, Button, DateTimePicker } from "react-native-ui-lib";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import NumericInput from "react-native-numeric-input";
import { useAtomValue } from "jotai";

import { DarkThemeAtom } from "~atoms/darkTheme";
import InputItem from "~components/input/InputItem";
import postItem from "~functions/api/postItem";
import Loading from "~components/Loading";
import ItemAddedModal from "./modal/ItemAddedModal";
import { TypeItem, TypeCategory } from "~functions/api/getList";

const formatDate = (date: Date) => {
  const day = ("0" + date.getDate()).slice(-2); // get the day and prepend "0" if less than 10
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // get the month, add 1 (because it's 0 indexed), and prepend "0" if less than 10
  const year = date.getFullYear(); // get the full year

  return `${day}-${month}-${year}`; // return in "DD-MM-YYYY" format
};

const AddItemPageTemplate = <T extends TypeItem>(type: TypeCategory) => {
  return () => {
    const isDarkTheme = useAtomValue(DarkThemeAtom);
    const [ratingValue, setRatingValue] = useState(8);
    const { t } = useTranslation();

    const [date, setDate] = useState(new Date());
    const [isCreated, setIsCreated] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [defaultValue, setDefaultValue] = useState(
      type === "non-movies"
        ? {
            title: "",
            desc: "",
            location: "",
            date: formatDate(date),
            rating: "8",
            pic: "",
          }
        : {
            title_zh: "",
            title: "",
            desc: "",
            location: "",
            date: formatDate(date),
            rating: "8",
            pic: "",
            wiki_url: "",
          },
    );

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      defaultValues: {
        ...defaultValue,
      },
    });

    function clearAll() {
      reset(defaultValue);
      setRatingValue(8);
    }

    const onSubmit = async (data: T) => {
      console.log(data);
      setIsCreating(true);
      await postItem<T>(type, data);
      setIsCreating(false);
      setIsCreated(true);
    };
    return (
      <>
        {isCreating && <Loading />}
        <ItemAddedModal
          isVisible={isCreated}
          setIsCreated={setIsCreated}
          clearAll={clearAll}
        />

        <View bg-screenBG className="h-full px-4 py-4">
          <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View className="pb-8">
              {type !== "non-movies" && (
                <>
                  <InputItem
                    name="title_zh"
                    label="Chinese Title"
                    control={control}
                    errors={errors}
                  />
                  <InputItem
                    name="title"
                    label="English Title"
                    control={control}
                    errors={errors}
                  />
                </>
              )}
              {type === "non-movies" && (
                <InputItem
                  name="title"
                  label="Title"
                  control={control}
                  errors={errors}
                />
              )}
              <InputItem
                name="desc"
                label="Description"
                control={control}
                errors={errors}
              />
              <InputItem
                name="location"
                label="Location"
                control={control}
                errors={errors}
              />
              <Controller
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <>
                    <Text textColor className="mb-[5px]">
                      {t("Date")}
                    </Text>
                    <DateTimePicker
                      textColor
                      fieldStyle={{
                        backgroundColor: "white",
                      }}
                      themeVariant="light"
                      value={date}
                      mode={"date"}
                      onChange={(selectedDate) => {
                        // Update the state variable when the date changes
                        setDate(selectedDate);
                        // Also update the form data
                        onChange(formatDate(selectedDate));
                      }}
                      dateFormatter={formatDate}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="rating"
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <View className="mb-5">
                    <Text textColor className="mb-[5px]">
                      {t("Rating")}
                    </Text>
                    <NumericInput
                      step={0.5}
                      minValue={0}
                      maxValue={10}
                      initValue={ratingValue}
                      valueType="real"
                      textColor={isDarkTheme ? "#fff" : "#000"}
                      onChange={(newValue) => {
                        setRatingValue(newValue);
                        onChange(newValue);
                      }}
                    />
                  </View>
                )}
              />
              <InputItem
                name="pic"
                label="Pic url"
                control={control}
                errors={errors}
              />
              {type !== "non-movies" && (
                <InputItem
                  name="wiki_url"
                  label="Wiki url"
                  control={control}
                  errors={errors}
                />
              )}
            </View>

            <Button
              bg-textColor
              className="w-[50vw] self-center"
              onPress={handleSubmit(onSubmit)}
            >
              <Text screenBG center className="text-lg">
                {t("Add")}
              </Text>
            </Button>
          </ScrollView>
        </View>
      </>
    );
  };
};

export default AddItemPageTemplate;
