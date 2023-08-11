import { getValueFor } from "app/(auth)/sign-in";
import { TypeItem, TypeDetails, TypeCategory } from "./getList";

// create a movie item
const postItem = async <T extends TypeItem>(
  type: TypeCategory,
  item: T,
): Promise<T> => {
  const response = await fetch(
    `https://go-crud.fly.dev/api/${type}`, // production use
    // `http://localhost:8080/api/${type}`, // local use
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValueFor("accessToken"),
      },
      body: JSON.stringify(item),
    },
  );

  const data: TypeDetails<T> = await response.json();

  if (!data) {
    return;
  }
  return data.item;
};

export default postItem;
