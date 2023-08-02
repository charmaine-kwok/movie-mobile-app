import { MovieProps } from "./getMoviesList";
import { MovieDetailsProps } from "./getMovieDetails";

// create a movie item
const postMovie = async (
  category: "movies" | "others",
  item: MovieProps,
): Promise<MovieProps> => {
  const response = await fetch(
    // `http://localhost:8080/api/movies/${category}`,
    `https://go-crud.fly.dev/api/movies/${category}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    },
  );

  const data: MovieDetailsProps = await response.json();

  if (!data) {
    return;
  }
  return data.item;
};

export default postMovie;
