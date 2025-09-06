import { APP_SCREEN } from './navigation.constant';

export type RootStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.MOVIE_DETAIL]: { movieId: number };
  [APP_SCREEN.WATCH_LIST]: undefined;
  [APP_SCREEN.SEARCH]: undefined;
};
