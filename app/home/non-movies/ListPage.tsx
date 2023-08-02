import getNonMoviesList from "~functions/api/non-movies/getNonMoviesList";
import { NonMovieProps } from "~functions/api/non-movies/getNonMoviesList";
import ListPageTemplate from "~components/list/ListPageTemplate";

const NonMovieListPage = ListPageTemplate(
  getNonMoviesList,
  [] as NonMovieProps[],
  "non-movies",
);
export default NonMovieListPage;
