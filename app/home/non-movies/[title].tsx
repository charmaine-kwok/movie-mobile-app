import { useSearchParams } from "expo-router";
import { useState, useEffect } from "react";

import ListItemDetails from "~components/list/ListItemDetails";
import { NonMovieProps } from "~functions/api/non-movies/getNonMoviesList";
import Loading from "~components/Loading";
import getNonMovieDetails from "~functions/api/non-movies/getNonMovieDetails";

const DetailPage: React.FC = () => {
  const params = useSearchParams();

  const title = params.title as string;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<NonMovieProps | null>(null);

  const fetchData = async (title: string) => {
    try {
      setIsLoading(true);
      const data = await getNonMovieDetails(title);
      if (data) {
        setIsLoading(false);
        setMovieData(data);
      }
    } catch (e) {
      console.log("error:", e);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(title);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {movieData && <ListItemDetails item={movieData} />}
    </>
  );
};

export default DetailPage;
