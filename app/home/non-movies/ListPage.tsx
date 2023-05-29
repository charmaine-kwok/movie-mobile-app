import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import Loading from "~components/Loading";
import getNonMoviesList from "~functions/api/non-movies/getNonMoviesList";
import List from "~components/list/List";
import { NonMovieProps } from "~functions/api/non-movies/getNonMoviesList";

const ListPage: React.FC = () => {
  const router = useRouter();

  const [movieList, setMovieList] = useState<NonMovieProps[]>([]);
  const [totalItem, setTotalItem] = useState<number | null>(null);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(false);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (currentPage: number) => {
    try {
      setIsLoading(true);
      const data = await getNonMoviesList(currentPage);
      if (data) {
        setMovieList((prev) => [...prev, ...data.items]);
        // only need to do once
        setTotalItem(data.totalItem);
        setShowLoadMoreButton(data.totalPage > data.currentPage);
      }
      setIsLoading(false);
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
