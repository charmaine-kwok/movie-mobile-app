import { useSearchParams } from "expo-router";
import { useState, useEffect } from "react";

import ListItemDetails from "~components/list/ListItemDetails";
import Loading from "~components/Loading";

const DetailPageTemplate = (getDetailsFunc, defaultData) => {
  return () => {
    const params = useSearchParams();

    const title = params.title as string;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [detailsData, setDetailsData] = useState(defaultData);

    const fetchData = async (title: string) => {
      try {
        setIsLoading(true);
        const data = await getDetailsFunc(title);
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
      fetchData(title);
    }, []);

    return (
      <>
        {isLoading && <Loading />}
        {detailsData && <ListItemDetails item={detailsData} />}
      </>
    );
  };
};

export default DetailPageTemplate;
