import { useSearchParams } from "expo-router";
import { useState, useEffect } from "react";

import getDetails from "~functions/api/getItemDetails";
import ListItemDetails from "~components/list/ListItemDetails";
import Loading from "~components/Loading";
import { TypeItem, TypeCategory } from "~functions/api/getList";

const DetailPageTemplate = <T extends TypeItem>(type: TypeCategory) => {
  return () => {
    const params = useSearchParams();

    const item_id = params.item_id as string;
    console.log(item_id, "id");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [detailsData, setDetailsData] = useState({} as T);

    const fetchData = async (item_id: string) => {
      try {
        setIsLoading(true);
        const data = await getDetails<T>(type, item_id);
        if (data) {
          setIsLoading(false);
          setDetailsData(data);
        }
      } catch (e) {
        console.log("error:", e);
        setIsLoading(false);
      }
    };
    useEffect(() => {
      fetchData(item_id);
    }, []);
    return (
      <>
        {isLoading && <Loading />}
        {!isLoading && detailsData && <ListItemDetails item={detailsData} />}
      </>
    );
  };
};

export default DetailPageTemplate;
