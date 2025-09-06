import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MovieCategory } from './categories.inteface';
import { MOVIE_CATEGORIES } from '@/constants';

interface CategoryState {
  categories: MovieCategory[];
  selectedCategory: MovieCategory | null;
  setSelectedCategory: (category: MovieCategory) => void;
  initializeStore: () => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      categories: MOVIE_CATEGORIES,
      selectedCategory: MOVIE_CATEGORIES[0] || null,
      setSelectedCategory: (category: MovieCategory) => {
        set({ selectedCategory: category });
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
