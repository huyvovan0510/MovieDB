import clientNetwork from './ClientNework';
import {
  PopularMoviesResponse,
  PaginationParams,
  Movie,
  MovieCredits,
} from '@/types';

const API_ROUTES = {
  GET_NOW_PLAYING_MOVIES: '/movie/now_playing',
  GET_UPCOMING_MOVIES: '/movie/upcoming',
  GET_POPULAR_MOVIES: '/movie/popular',
  GET_MOVIE_DETAIL: '/movie/{movie_id}',
  GET_MOVIE_CREDITS: '/movie/{movie_id}/credits',
  GET_MOVIE_RECOMMENDATIONS: '/movie/{movie_id}/recommendations',
};

export const getPopularMovies = async (
  params: PaginationParams = {},
): Promise<PopularMoviesResponse> => {
  const { page = 1, language = 'en-US', region, sort_by } = params;

  const queryParams: Record<string, string | number> = {
    page,
    language,
  };

  if (region) {
    queryParams.region = region;
  }

  if (sort_by) {
    queryParams.sort_by = sort_by;
  }

  const response = await clientNetwork.get<PopularMoviesResponse>(
    API_ROUTES.GET_POPULAR_MOVIES,
    { params: queryParams },
  );

  return response.data;
};

export const getNowPlayingMovies = async (
  params: PaginationParams = {},
): Promise<PopularMoviesResponse> => {
  const { page = 1, language = 'en-US', region, sort_by } = params;

  const queryParams: Record<string, string | number> = {
    page,
    language,
  };

  if (region) {
    queryParams.region = region;
  }

  if (sort_by) {
    queryParams.sort_by = sort_by;
  }

  const response = await clientNetwork.get<PopularMoviesResponse>(
    API_ROUTES.GET_NOW_PLAYING_MOVIES,
    { params: queryParams },
  );

  return response.data;
};

export const getUpcomingMovies = async (
  params: PaginationParams = {},
): Promise<PopularMoviesResponse> => {
  const { page = 1, language = 'en-US', region, sort_by } = params;

  const queryParams: Record<string, string | number> = {
    page,
    language,
  };

  if (region) {
    queryParams.region = region;
  }

  if (sort_by) {
    queryParams.sort_by = sort_by;
  }

  const response = await clientNetwork.get<PopularMoviesResponse>(
    API_ROUTES.GET_UPCOMING_MOVIES,
    { params: queryParams },
  );

  return response.data;
};

export const getMovieDetail = async (movieId: string): Promise<Movie> => {
  const response = await clientNetwork.get<Movie>(
    API_ROUTES.GET_MOVIE_DETAIL.replace('{movie_id}', movieId),
  );

  return response.data;
};

export const getMovieCredits = async (
  movieId: string,
): Promise<MovieCredits> => {
  const response = await clientNetwork.get<MovieCredits>(
    API_ROUTES.GET_MOVIE_CREDITS.replace('{movie_id}', movieId),
  );

  return response.data;
};

export const getMovieRecommendations = async (
  movieId: string,
): Promise<PopularMoviesResponse> => {
  const response = await clientNetwork.get<PopularMoviesResponse>(
    API_ROUTES.GET_MOVIE_RECOMMENDATIONS.replace('{movie_id}', movieId),
  );

  return response.data;
};
