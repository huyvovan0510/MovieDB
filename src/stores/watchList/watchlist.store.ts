import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Movie } from '@/types';

export interface WatchlistMovie
  extends Pick<
    Movie,
    | 'id'
    | 'title'
    | 'poster_path'
    | 'release_date'
    | 'vote_average'
    | 'overview'
  > {
  addedAt: string; // ISO date string when movie was added to watchlist
}

interface WatchlistState {
  movies: WatchlistMovie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  clearWatchlist: () => void;
  getWatchlistCount: () => number;
  getMovieById: (movieId: number) => WatchlistMovie | undefined;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      movies: [],

      addToWatchlist: (movie: Movie) => {
        const state = get();
        const existingMovie = state.movies.find(m => m.id === movie.id);

        if (!existingMovie) {
          const watchlistMovie: WatchlistMovie = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            overview: movie.overview,
            addedAt: new Date().toISOString(),
          };

          set({
            movies: [watchlistMovie, ...state.movies], // Add to beginning for recent-first order
          });
        }
      },

      removeFromWatchlist: (movieId: number) => {
        const state = get();
        set({
          movies: state.movies.filter(movie => movie.id !== movieId),
        });
      },

      isInWatchlist: (movieId: number) => {
        const state = get();
        return state.movies.some(movie => movie.id === movieId);
      },

      clearWatchlist: () => {
        set({ movies: [] });
      },

      getWatchlistCount: () => {
        const state = get();
        return state.movies.length;
      },

      getMovieById: (movieId: number) => {
        const state = get();
        return state.movies.find(movie => movie.id === movieId);
      },
    }),
    {
      name: 'watchlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        movies: state.movies,
      }),
    },
  ),
);
