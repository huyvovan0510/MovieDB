import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MovieCategory } from './categories.inteface';
import { MOVIE_CATEGORIES, SHORT_FILTERS } from '@/constants';

interface CategoryState {
  shortFilters: MovieCategory[];
  selectedShortFilter: MovieCategory | null;
  categories: MovieCategory[];
  selectedCategory: MovieCategory | null;
  setSelectedCategory: (category: MovieCategory) => void;
  initializeStore: () => void;
  setSelectedShortFilter: (shortFilter: MovieCategory) => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      shortFilters: SHORT_FILTERS,
      selectedShortFilter: SHORT_FILTERS[0] || null,
      categories: MOVIE_CATEGORIES,
      selectedCategory: MOVIE_CATEGORIES[0] || null,
      setSelectedCategory: (category: MovieCategory) => {
        set({ selectedCategory: category });
      },
      setSelectedShortFilter: (shortFilter: MovieCategory) => {
        set({ selectedShortFilter: shortFilter });
      },
      initializeStore: () => {
        const state = get();
        if (!state.selectedCategory && state.categories.length > 0) {
          set({ selectedCategory: state.categories[0] });
        }
      },
    }),
    {
      name: 'category-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        selectedCategory: state.selectedCategory,
      }),
    },
  ),
);
