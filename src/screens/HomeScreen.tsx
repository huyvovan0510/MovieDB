import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import {
  FilterComponent,
  SimpleHeader,
  MovieCard,
  Button,
  ListPlaceholder,
} from '@/components';
import { colors } from '@/theme/colors';
import { useCategoryStore } from '@/stores';
import { useInfiniteMovies } from '@/hooks';
import { Movie } from '@/types';
import {
  MovieCategoryEnum,
  ShortEnum,
} from '@/stores/categories/categories.inteface';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import { ArchiveBoxXMarkIcon } from 'react-native-heroicons/solid';

const HomeScreen = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedShortFilter,
    shortFilters,
    setSelectedShortFilter,
  } = useCategoryStore();

  const {
    movies,
    error,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    canLoadMore,
    refetch,
    isPending,
  } = useInfiniteMovies({
    category: selectedCategory?.value as MovieCategoryEnum,
    language: 'en-US',
    sort_by: selectedShortFilter?.value as ShortEnum,
  });

  const handleMoviePress = (movie: Movie) => {
    console.log('Movie pressed:', movie.title);
  };

  const handleLoadMore = () => {
    if (canLoadMore) {
      fetchNextPage();
    }
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderMovie: ListRenderItem<Movie> = ({ item }) => {
    return <MovieCard movie={item} onPress={handleMoviePress} />;
  };

  const renderFooter = () => {
    if (!movies.length) return null;
    return (
      <View style={styles.footerContainer}>
        {isFetchingNextPage ? (
          <ActivityIndicator size="large" color={colors.blueLight} />
        ) : (
          <Button title="Load More" onPress={handleLoadMore} />
        )}
      </View>
    );
  };
  const renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        {error ? (
          <>
            <ArchiveBoxXMarkIcon size={30} color={colors.textSecondary} />
            <Text style={styles.emptyText}>
              Error loading movies please try again !
            </Text>
          </>
        ) : (
          <>
            <ArchiveBoxXMarkIcon size={30} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No movies found</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SimpleHeader />

      <View style={styles.filterContainer}>
        <FilterComponent
          data={categories}
          onSelect={setSelectedCategory}
          selectedValue={selectedCategory?.value}
          label={selectedCategory?.label || 'Popular'}
        />
        <FilterComponent
          data={shortFilters}
          onSelect={setSelectedShortFilter}
          selectedValue={selectedShortFilter?.value}
          label={selectedShortFilter?.label || 'AZ'}
        />

        {isPending ? (
          <ListPlaceholder />
        ) : (
          <FlashList
            showsVerticalScrollIndicator={false}
            refreshing={isFetching}
            onRefresh={refetch}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            data={movies}
            renderItem={renderMovie}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={renderSeparator}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        )}
      </View>
    </View>
  );
};

export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  filterContainer: {
    paddingHorizontal: 20,
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  separator: {
    height: 15,
  },
  footerContainer: {
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
