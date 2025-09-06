export interface MovieCategory {
  id: number;
  label: string;
  value: string;
}

export enum MovieCategoryEnum {
  POPULAR = 'popular',
  NOW_PLAYING = 'now_playing',
  UPCOMING = 'upcoming',
}

export enum ShortEnum {
  AZ = 'original_title.desc',
  RATING = 'vote_count.asc',
  RELEASE_DATE = 'primary_release_date.asc',
}
