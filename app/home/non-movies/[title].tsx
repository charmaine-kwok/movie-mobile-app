import { NonMovieProps } from '~functions/api/non-movies/getNonMoviesList';
import getNonMovieDetails from '~functions/api/non-movies/getNonMovieDetails';
import DetailPageTemplate from '~components/list/DetailPageTemplate';

const NonMoviesDetailPage = DetailPageTemplate(
  getNonMovieDetails,
  {} as NonMovieProps
);

export default NonMoviesDetailPage;
