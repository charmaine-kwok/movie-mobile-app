import { getValueFor } from "app/(auth)/sign-in";

export type TypeCategory = "movies" | "non-movies";

export type NonMovieProps = {
  title: string;
  desc: string;
  location: string;
  date: string;
  rating: string;
  pic: string;
  id: string;
};

export type MovieProps = NonMovieProps & {
  title_zh: string;
  wiki_url: string;
};

export type TypeItem = MovieProps | NonMovieProps;

export type TypeDetails<TypeItem> = {
  item: TypeItem;
};

export type TypeList<TypeItem> = {
  items: TypeItem[];
  totalItem: number;
  totalPage: number;
  currentPage: number;
};

const getList = async <TypeItem,>(
  type: TypeCategory,
  order: string = "ASC",
  page?: number,
): Promise<TypeList<TypeItem>> => {
  // Retrieving item list from API server
  const response = await fetch(
    `https://go-crud.fly.dev/api/${type}?page=${page}&order_by=${order}`, // production use
    // `http://localhost:8080/api/${type}?page=${page}&order_by=${order}`, // local use
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValueFor("accessToken"),
      },
    },
  );

  const data: TypeList<TypeItem> = await response.json();

  if (!data) {
    return;
  }
  return data;
};

export default getList;
