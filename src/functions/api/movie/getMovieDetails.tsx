import { MovieProps } from "./getMoviesList";

export type MovieDetailsProps = {
  item: MovieProps;
};

const getMovieDetails = async (
  category: string,
  title: string
): Promise<MovieProps> => {
  // Retrieving cert id list from API server
  const response = await fetch(
    // `https://mighty-savannah-71565.herokuapp.com/${category}?page=${page}`,
    // `http://localhost:8080/api/movies/${category}/details/${title}`,
    `https://go-crud.fly.dev/api/movies/${category}/details/${title}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data: MovieDetailsProps = await response.json();

  if (!data) {
    return;
  }
  return data.item;
};

export default getMovieDetails;
