import { MovieProps } from "~functions/api/getList";
import ListPageTemplate from "~components/list/ListPageTemplate";

const MovieListPage = ListPageTemplate<MovieProps>("movies");

export default MovieListPage;
