import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import { Movie } from '@/types';
import { MovieCard } from './MovieCard';
import { colors } from '@/theme/colors';
import { useQuery } from '@tanstack/react-query';
import { getMovieRecommendations } from '@/services/movies.service';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.85;

interface RecommendationsListProps {
  movieId: number;
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({
  movieId,
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['movieRecommendations', movieId],
    queryFn: () => getMovieRecommendations(movieId.toString()),
  });

  const renderRecommendation: ListRenderItem<Movie> = ({ item }) => (
    <View style={styles.cardContainer}>
      <MovieCard movie={item} />
    </View>
  );

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.blueLight} />
          <Text style={styles.loadingText}>Loading recommendations...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error loading recommendations</Text>
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No recommendations available</Text>
      </View>
    );
  };

  if (isLoading || error || data?.results.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        {renderEmpty()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recommendations</Text>
      <FlatList
        data={data?.results}
        renderItem={renderRecommendation}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
        snapToAlignment="start"
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        initialNumToRender={3}
        getItemLayout={(data, index) => ({
          length: CARD_WIDTH + 16,
          offset: (CARD_WIDTH + 16) * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: 16,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.redLight,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export { RecommendationsList };
