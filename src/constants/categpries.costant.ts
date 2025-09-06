import {
  MovieCategory,
  MovieCategoryEnum,
  ShortEnum,
} from '@/stores/categories/categories.inteface';

export const MOVIE_CATEGORIES: MovieCategory[] = [
  { id: 1, label: 'Now Playing', value: MovieCategoryEnum.NOW_PLAYING },
  { id: 2, label: 'Upcoming', value: MovieCategoryEnum.UPCOMING },
  { id: 3, label: 'Popular', value: MovieCategoryEnum.POPULAR },
];

export const SHORT_FILTERS: MovieCategory[] = [
  { id: 1, label: 'By alphabetical order', value: ShortEnum.AZ },
  { id: 2, label: 'By rating', value: ShortEnum.RATING },
  { id: 3, label: 'By release date', value: ShortEnum.RELEASE_DATE },
];
