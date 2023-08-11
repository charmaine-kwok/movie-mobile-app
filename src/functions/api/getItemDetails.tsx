import { getValueFor } from "app/(auth)/sign-in";
import { TypeDetails, TypeItem, TypeCategory } from "./getList";

const getItemDetails = async <T extends TypeItem>(
  type: TypeCategory,
  item_id: string,
): Promise<T> => {
  // Retrieving item details from API server
  const response = await fetch(
    `https://go-crud.fly.dev/api/${type}/${item_id}`, // production use
    // `http://localhost:8080/api/${type}/${item_id}`, // local use
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValueFor("accessToken"),
      },
    },
  );

  const data: TypeDetails<T> = await response.json();

  if (!data) {
    return;
  }
  return data.item;
};

export default getItemDetails;
