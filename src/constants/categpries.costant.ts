import { MovieCategory } from '@/stores/categories/categories.inteface';

export const CATEGORIES = {
  NOW_PLAYING: 'now_playing',
  ADVENTURE: 'adventure',
  POPULAR: 'popular',
  TOP_RATED: 'top_rated',
  UPCOMING: 'upcoming',
};
export const MOVIE_CATEGORIES: MovieCategory[] = [
  { id: 1, label: 'Now Playing', value: CATEGORIES.NOW_PLAYING },
  { id: 2, label: 'Upcoming', value: CATEGORIES.UPCOMING },
  { id: 3, label: 'Popular', value: CATEGORIES.POPULAR },
];
