import React from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import { Movie } from '@/types';
import { MovieCard } from './MovieCard';
import { colors } from '@/theme/colors';

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  loadingMore: boolean;
  canLoadMore: boolean;
  onLoadMore: () => void;
  onRefresh: () => void;
  refreshing?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  numColumns?: number;
  onMoviePress?: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  loading,
  loadingMore,
  canLoadMore,
  onLoadMore,
  onRefresh,
  refreshing = false,
  error,
  emptyMessage = 'No movies found',
  numColumns = 2,
  onMoviePress,
}) => {
  const renderMovie: ListRenderItem<Movie> = ({ item, index }) => (
    <View style={[styles.movieContainer, { width: `${100 / numColumns}%` }]}>
      <MovieCard movie={item} onPress={onMoviePress} />
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading more movies...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading movies...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error loading movies</Text>
          <Text style={styles.errorSubtext}>{error.message}</Text>
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  };

  const handleEndReached = () => {
    if (canLoadMore && !loadingMore) {
      onLoadMore();
    }
  };

  return (
    <FlatList
      data={movies}
      renderItem={renderMovie}
      keyExtractor={item => item.id.toString()}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
      contentContainerStyle={[
        styles.container,
        movies.length === 0 && styles.emptyContainer,
      ]}
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={6}
      updateCellsBatchingPeriod={50}
      // Consistent item layout for better performance
      getItemLayout={(data, index) => ({
        length: 280, // Estimated item height
        offset: 280 * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.error,
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export { MovieList };
