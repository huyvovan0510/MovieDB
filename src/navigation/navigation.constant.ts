export const APP_SCREEN = {
  MAIN_TAB: 'MAIN_TAB',
  HOME: 'HOME',
  MOVIE_DETAIL: 'MOVIE_DETAIL',
  WATCH_LIST: 'WATCH_LIST',
  SEARCH: 'SEARCH',
} as const;

export type AppScreen = keyof typeof APP_SCREEN;

export const APP_SCREEN_ROUTES = Object.values(APP_SCREEN);

export const APP_SCREEN_TABS = Object.values(APP_SCREEN);
export const COMMON_SCREEN_OPTIONS = { headerShown: false };
