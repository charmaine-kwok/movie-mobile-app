import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import SortModal from "~components/modal/SortModal";
import getList from "~functions/api/getList";
import TabBarAddButton from "~components/buttons/TabBarAddButton";
import Loading from "~components/Loading";
import List from "~components/list/List";
import { TypeList, TypeItem, TypeCategory } from "~functions/api/getList";

export type TOrder = "ASC" | "DESC";

const ListPageTemplate = <T extends TypeItem>(type: TypeCategory) => {
  return () => {
    const router = useRouter();
    const [dataList, setDataList] = useState([] as T[]);
    const [totalItem, setTotalItem] = useState<number | null>(null);
    const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [order, setOrder] = useState<TOrder>("ASC");

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (
      order: string,
      currentPage: number,
      clearData?: boolean,
    ) => {
      try {
        if (clearData) {
          setShowLoadMoreButton(false);
          setDataList(() => []);
        }
        setIsLoading(true);
        const data: TypeList<T> = await getList<T>(type, order, currentPage);
        if (data) {
          if (clearData) {
            setDataList(() => [...data.items]);
          } else {
            setDataList((prev) => [...prev, ...data.items]);
          }
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
      fetchData(order, currentPage);
    }, []);

    const loadMoreData = () => {
      setCurrentPage((prev) => prev + 1);
      fetchData(order, currentPage + 1);
    };

    return (
      <>
        <SortModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          fetchData={fetchData}
          order={order}
          setOrder={setOrder}
          setCurrentPage={setCurrentPage}
        />
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
          setIsVisible={setIsVisible}
        />
      </>
    );
  };
};

export default ListPageTemplate;
