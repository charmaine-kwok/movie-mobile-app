import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import TabBarAddButton from "~components/buttons/TabBarAddButton";
import Loading from "~components/Loading";
import List from "~components/list/List";
import { NonMovieProps } from "~functions/api/non-movies/getNonMoviesList";
import { MovieProps } from "~functions/api/movie/getMoviesList";

const ListPageTemplate = (
  getDataFunc,
  defaultData: NonMovieProps[] | MovieProps[],
  type: string,
) => {
  return () => {
    const router = useRouter();
    const [dataList, setDataList] = useState(defaultData);
    const [totalItem, setTotalItem] = useState<number | null>(null);
    const [showLoadMoreButton, setShowLoadMoreButton] =
      useState<boolean>(false);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (currentPage: number) => {
      try {
        setIsLoading(true);
        const data = await getDataFunc(currentPage);
        if (data) {
          setDataList((prev) => [...prev, ...data.items]);
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
        <TabBarAddButton
          onPress={() => {
            router.push({
              pathname: `/home/${type}/AddItemPage`,
            });
          }}
        />

        {isLoading && <Loading />}
        <List
          data={dataList}
          totalItem={totalItem}
          showLoadMoreButton={showLoadMoreButton}
          loadMoreData={loadMoreData}
        />
      </>
    );
  };
};

export default ListPageTemplate;
