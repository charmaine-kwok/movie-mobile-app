import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import Loading from "~components/Loading";
import getMoviesList from "~functions/api/movie/getMoviesList";
import List from "~components/list/List";
import { MovieProps } from "~functions/api/movie/getMoviesList";

const ListPage: React.FC = () => {
  const router = useRouter();
  const [movieList, setMovieList] = useState<MovieProps[]>([]);
  const [totalItem, setTotalItem] = useState<number | null>(null);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(false);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (currentPage: number) => {
    try {
      setIsLoading(true);
      const data = await getMoviesList("movies", currentPage);
      if (data) {
        setIsLoading(false);

        setMovieList((prev) => [...prev, ...data.items]);
        // only need to do once
        setTotalItem(data.totalItem);
        setShowLoadMoreButton(data.totalPage > data.currentPage);
      }
    } catch (e) {
      console.log("error:", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const loadMoreData = () => {
    setCurrentPage((prev) => prev + 1);
    fetchData(currentPage + 1);
  };

  return (
    <>
      {isLoading && <Loading />}
      <List
        data={movieList}
        totalItem={totalItem}
        showLoadMoreButton={showLoadMoreButton}
        loadMoreData={loadMoreData}
      />
    </>
  );
};

export default ListPage;
