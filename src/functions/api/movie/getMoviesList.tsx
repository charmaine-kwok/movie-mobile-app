export type MovieProps = {
  iD: string;
  title_zh: string;
  title_en: string;
  desc: string;
  location: string;
  date: string;
  rating: string;
  pic: string;
  wiki_url: string;
};
export type MovieListProps = {
  items: MovieProps[];
  totalItem: number;
  totalPage: number;
  currentPage: number;
};

const getMoviesList = async (
  category: string,
  page?: number
): Promise<MovieListProps> => {
  // Retrieving cert id list from API server
  const response = await fetch(
    // `https://mighty-savannah-71565.herokuapp.com/${category}?page=${page}`,
    // `http://localhost:8080/api/movies/${category}?page=${page}`,
    `https://go-crud.fly.dev/api/movies/${category}?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data: MovieListProps = await response.json();

  if (!data) {
    return;
  }
  return data;
};

export default getMoviesList;
