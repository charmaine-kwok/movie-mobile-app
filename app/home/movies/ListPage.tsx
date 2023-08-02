import getMoviesList from "~functions/api/movie/getMoviesList";
import { MovieProps } from "~functions/api/movie/getMoviesList";
import ListPageTemplate from "~components/list/ListPageTemplate";

const MovieListPage = ListPageTemplate(
  (page: number) => getMoviesList("movies", page),
  [] as MovieProps[],
);
export default MovieListPage;
