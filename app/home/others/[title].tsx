import { MovieProps } from '~functions/api/movie/getMoviesList';
import getMovieDetail from '~functions/api/movie/getMovieDetails';
import DetailPageTemplate from '~components/list/DetailPageTemplate';

const OthersDetailPage = DetailPageTemplate(
  (title: string) => getMovieDetail('others', title),
  {} as MovieProps
);
export default OthersDetailPage;
