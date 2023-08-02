import getMoviesList from "~functions/api/movie/getMoviesList";
import { MovieProps } from "~functions/api/movie/getMoviesList";
import ListPageTemplate from "~components/list/ListPageTemplate";

const OthersListPage = ListPageTemplate(
  (page: number) => getMoviesList("others", page),
  [] as MovieProps[],
  "others",
);
export default OthersListPage;
