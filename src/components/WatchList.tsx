import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ChevronUpIcon, ChevronDownIcon } from 'react-native-heroicons/solid';
import {
  useWatchlistStore,
  WatchlistMovie,
} from '@/stores/watchList/watchlist.store';
import { MovieCard } from './MovieCard';
import { colors } from '@/theme/colors';

type SortOption = 'title' | 'rating' | 'release_date';
type SortOrder = 'asc' | 'desc';

interface FilterDropdownData {
  label: string;
  value: SortOption;
}

const filterOptions: FilterDropdownData[] = [
  { label: 'Title (A-Z)', value: 'title' },
  { label: 'Rating', value: 'rating' },
  { label: 'Release Date', value: 'release_date' },
];

const WatchList: React.FC = () => {
  const { movies, removeFromWatchlist } = useWatchlistStore();
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sortedMovies = useMemo(() => {
    const sorted = [...movies].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'rating':
          comparison = a.vote_average - b.vote_average;
          break;
        case 'release_date':
          comparison =
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime();
          break;
        default:
          return 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [movies, sortBy, sortOrder]);
  console.log("\x1b[35;1m' ~ sortedMovies:", sortedMovies);

  const handleRemoveMovie = (movieId: number) => {
    removeFromWatchlist(movieId);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const renderMovieItem = ({ item }: { item: WatchlistMovie }) => {
    const movieData = {
      ...item,
      original_title: item.title,
      backdrop_path: null,
      adult: false,
      genre_ids: [],
      original_language: 'en',
      popularity: 0,
      vote_count: 0,
      video: false,
      status: 'Released',
      genres: [],
      budget: 0,
      belongs_to_collection: {
        id: 0,
        name: '',
        poster_path: null,
        backdrop_path: null,
      },
    };

    return (
      <View style={styles.movieItemContainer}>
        <MovieCard movie={movieData} onPressRemove={handleRemoveMovie} />
      </View>
    );
  };

  const renderFilterSection = () => (
    <View style={styles.filterContainer}>
      <Text style={styles.title}>My Watchlist</Text>

      <View style={styles.filterRow}>
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Filter by:</Text>
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.dropdownText}
              selectedTextStyle={styles.dropdownText}
              data={filterOptions}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="Rating"
              value={sortBy}
              onChange={item => setSortBy(item.value)}
              renderRightIcon={() => (
                <ChevronDownIcon size={16} color={colors.blueLight} />
              )}
              itemTextStyle={styles.dropdownItemText}
              containerStyle={styles.dropdownList}
            />
          </View>
        </View>

        <View style={styles.orderGroup}>
          <Text style={styles.filterLabel}>Order:</Text>
          <Pressable style={styles.orderButton} onPress={toggleSortOrder}>
            {sortOrder === 'asc' ? (
              <ChevronUpIcon size={20} color={colors.text} />
            ) : (
              <ChevronDownIcon size={20} color={colors.text} />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No movies in your watchlist</Text>
      <Text style={styles.emptySubtext}>
        Start adding movies to see them here!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderFilterSection()}
      <FlatList
        data={sortedMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMovieItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        extraData={sortedMovies}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  filterLabel: {
    fontSize: 16,
    color: colors.text,
    marginRight: 12,
    fontWeight: '500',
  },
  dropdownContainer: {
    flex: 1,
    maxWidth: 150,
  },
  dropdown: {
    height: 36,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.blueLight,
    fontWeight: '500',
  },
  dropdownItemText: {
    fontSize: 14,
    color: colors.text,
  },
  dropdownList: {
    borderRadius: 8,
    borderColor: colors.borderColor,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  orderGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 6,
    backgroundColor: colors.white,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  movieItemContainer: {
    marginBottom: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export { WatchList };
