import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Movie } from '@/types';
import { colors } from '@/theme/colors';
import Keys from 'react-native-keys';
import { formatDate } from '@/utils';

interface MovieCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const imageUri = movie.poster_path
    ? `${Keys.IMAGE_URL}${movie.poster_path}`
    : null;

  const handlePress = () => onPress?.(movie);

  return (
    <View style={styles.shadow}>
      <Pressable style={styles.container} onPress={handlePress}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.poster} />
        ) : (
          <View style={styles.poster} />
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>

          <Text style={styles.releaseDate}>
            {formatDate(movie.release_date)}
          </Text>

          <Text style={styles.txtOverview} numberOfLines={2}>
            {movie.overview}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  poster: {
    width: 95,
    height: 141,
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.grayLight,
  },

  infoContainer: {
    marginHorizontal: 14,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  txtOverview: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 18,
  },
});

export { MovieCard };
