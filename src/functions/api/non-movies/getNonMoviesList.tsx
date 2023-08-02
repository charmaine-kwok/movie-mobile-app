export type NonMovieProps = {
  title: string;
  desc: string;
  location: string;
  date: string;
  rating: string;
  pic: string;
};
export type NonMovieListProps = {
  items: NonMovieProps[];
  totalItem: number;
  totalPage: number;
  currentPage: number;
};

const getNonMoviesList = async (page?: number): Promise<NonMovieListProps> => {
  // Retrieving cert id list from API server
  const response = await fetch(
    // `https://mighty-savannah-71565.herokuapp.com/${category}?page=${page}`,
    // `http://localhost:8080/api/non-movies?page=${page}`,
    `https://go-crud.fly.dev/api/non-movies?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data: NonMovieListProps = await response.json();

  if (!data) {
    return;
  }
  return data;
};

export default getNonMoviesList;
