import { Text, View, Button, DateTimePicker } from "react-native-ui-lib";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "expo-router";

import InputItem from "~components/input/InputItem";
import postMovie from "~functions/api/movie/postMovie";
import postNonMovie from "~functions/api/non-movies/postNonMovie";
import Loading from "~components/Loading";
import { Modal } from "~components/modal/Modal";

const formatDate = (date: Date) => {
  const day = ("0" + date.getDate()).slice(-2); // get the day and prepend "0" if less than 10
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // get the month, add 1 (because it's 0 indexed), and prepend "0" if less than 10
  const year = date.getFullYear(); // get the full year

  return `${day}-${month}-${year}`; // return in "DD-MM-YYYY" format
};

const AddItemPage = () => {
  const params = useSearchParams();

  const type = params.type as "movies" | "others" | "non-movies";

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
          rating: "",
          pic: "",
        }
      : {
          title_zh: "",
          title_en: "",
          desc: "",
          location: "",
          date: formatDate(date),
          rating: "",
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
  }

  const onSubmit = async (data) => {
    console.log(data);
    setIsCreating(true);
    if (type === "non-movies") {
      await postNonMovie(data);
    } else {
      await postMovie(type, data);
    }
    setIsCreating(false);
    setIsCreated(true);
  };

  return (
    <>
      {isCreating && <Loading />}

      <Modal isVisible={isCreated} justifyContent={"center"}>
        <Modal.Container>
          <View bg-screenBG className="mx-8 rounded-xl">
            <Modal.Body>
              <View center paddingV-20 className="space-y-4">
                <Text className="text-3xl">Item created!</Text>
                <Button
                  bg-textColor
                  size={Button.sizes.small}
                  onPress={() => {
                    setIsCreated(false);
                    clearAll();
                  }}
                >
                  <Text screenBG center className="text-lg">
                    OK
                  </Text>
                </Button>
              </View>
            </Modal.Body>
          </View>
        </Modal.Container>
      </Modal>

      <View bg-screenBG className="h-full px-4 pb-2 pt-4">
        <View>
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
                  name="title_en"
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
              render={({ field: { onChange, value } }) => (
                <>
                  <Text textColor className="mb-1">
                    Date
                  </Text>
                  <DateTimePicker
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

            <InputItem
              name="rating"
              label="Rating"
              control={control}
              errors={errors}
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
              Add
            </Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default AddItemPage;
