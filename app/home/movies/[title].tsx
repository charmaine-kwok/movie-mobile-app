import { MovieProps } from '~functions/api/movie/getMoviesList';
import getMovieDetail from '~functions/api/movie/getMovieDetails';
import DetailPageTemplate from '~components/list/DetailPageTemplate';

const MovieDetailPage = DetailPageTemplate(
  (title: string) => getMovieDetail('movies', title),
  {} as MovieProps
);
export default MovieDetailPage;
