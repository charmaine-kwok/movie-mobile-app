import { NonMovieProps } from "./getNonMoviesList";

export type NonMovieDetailsProps = {
  item: NonMovieProps;
};

const getNonMovieDetails = async (title: string): Promise<NonMovieProps> => {
  // Retrieving cert id list from API server
  const response = await fetch(
    // `https://mighty-savannah-71565.herokuapp.com/${category}?page=${page}`,
    // `http://localhost:8080/api/non-movies/details/${title}`,
    `https://go-crud.fly.dev/api/non-movies/details/${title}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data: NonMovieDetailsProps = await response.json();

  if (!data) {
    return;
  }
  return data.item;
};

export default getNonMovieDetails;
