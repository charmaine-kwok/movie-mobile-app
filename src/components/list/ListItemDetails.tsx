import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { Text } from "react-native-ui-lib";

import { MovieProps } from "~functions/api/movie/getMoviesList";
import { NonMovieProps } from "~functions/api/non-movies/getNonMoviesList";
import { fontSizeAtom } from "~atoms/fontSize";

function isMovieProps(item: MovieProps | NonMovieProps): item is MovieProps {
  return (item as MovieProps).title_en !== undefined;
}

type ListItemDetailsProps = {
  item: MovieProps | NonMovieProps;
};

const ListItemDetails: React.FC<ListItemDetailsProps> = ({ item }) => {
  const fontSizeData = useAtomValue(fontSizeAtom);
  const title = isMovieProps(item) ? item.title_en : item.title;

  const { t } = useTranslation();
  console.log(item);
  return (
    <Text textColor className={`text-${fontSizeData + 1}xl `}>
      {title}
    </Text>
  );
};

export default ListItemDetails;
