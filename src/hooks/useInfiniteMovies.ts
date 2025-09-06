import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from '@/services/movies.service';
import { PopularMoviesResponse, PaginationParams, Movie } from '@/types';

import { MovieCategoryEnum } from '@/stores/categories/categories.inteface';
interface UseInfiniteMoviesOptions extends Omit<PaginationParams, 'page'> {
  category:
    | MovieCategoryEnum.POPULAR
    | MovieCategoryEnum.NOW_PLAYING
    | MovieCategoryEnum.UPCOMING;
  enabled?: boolean;
}

const movieServiceMap = {
  popular: getPopularMovies,
  now_playing: getNowPlayingMovies,
  upcoming: getUpcomingMovies,
};

export const useInfiniteMovies = (options: UseInfiniteMoviesOptions) => {
  const {
    category,
    language = 'en-US',
    region,
    enabled = true,
    sort_by,
  } = options;

  const queryFn = movieServiceMap[category];

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['movies', category, { language, region, sort_by }],
    queryFn: ({ pageParam = 1 }) =>
      queryFn({
        page: pageParam,
        language,
        region,
        sort_by,
      }),
    getNextPageParam: (lastPage: PopularMoviesResponse) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  const movies: Movie[] = data?.pages.flatMap(page => page.results) ?? [];

  const totalResults = data?.pages[0]?.total_results ?? 0;
  const totalPages = data?.pages[0]?.total_pages ?? 0;
  const currentPage = data?.pages[data.pages.length - 1]?.page ?? 0;

  return {
    movies,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
    totalResults,
    totalPages,
    currentPage,
    canLoadMore: hasNextPage && !isFetchingNextPage,
    isPending,
  };
};

export const usePopularMovies = (
  options: Omit<UseInfiniteMoviesOptions, 'category'> = {},
) => {
  return useInfiniteMovies({ ...options, category: MovieCategoryEnum.POPULAR });
};

export const useNowPlayingMovies = (
  options: Omit<UseInfiniteMoviesOptions, 'category'> = {},
) => {
  return useInfiniteMovies({
    ...options,
    category: MovieCategoryEnum.NOW_PLAYING,
  });
};

export const useUpcomingMovies = (
  options: Omit<UseInfiniteMoviesOptions, 'category'> = {},
) => {
  return useInfiniteMovies({
    ...options,
    category: MovieCategoryEnum.UPCOMING,
  });
};
