import { NonMovieProps } from "./getNonMoviesList";
import { NonMovieDetailsProps } from "./getNonMovieDetails";

// create a non-movie item
const postNonMovie = async (item: NonMovieProps): Promise<NonMovieProps> => {
  const response = await fetch(
    // `http://localhost:8080/api/movies`,
    `https://go-crud.fly.dev/api/non-movies`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    },
  );

  const data: NonMovieDetailsProps = await response.json();

  if (!data) {
    return;
  }
  return data.item;
};

export default postNonMovie;
