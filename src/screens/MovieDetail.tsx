import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';

import {
  SimpleHeader,
  ScoreComponent,
  CastList,
  RecommendationsList,
} from '@/components';
import { RootStackParamList } from '@/navigation/type';
import { RouteProp, useRoute } from '@react-navigation/native';
import { APP_SCREEN } from '@/navigation/navigation.constant';
import { useQuery } from '@tanstack/react-query';
import { getMovieCredits, getMovieDetail } from '@/services/movies.service';
import { colors } from '@/theme/colors';
import { BookmarkIcon, ChevronLeftIcon } from 'react-native-heroicons/solid';
import { goBack } from '@/navigation/navigation.services';
import Keys from 'react-native-keys';
import { converBudget, formatDate } from '@/utils';
const { width: WIDTH_SCREEN } = Dimensions.get('window');

export const LANGUAGE_FILTERS = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
  ru: 'Russian',
  ar: 'Arabic',
};

type MovieDetailRouteProp = RouteProp<
  RootStackParamList,
  typeof APP_SCREEN.MOVIE_DETAIL
>;

const MovieDetail = () => {
  const { params } = useRoute<MovieDetailRouteProp>();
  const { movieId } = params || {};
  const { data, isLoading, error } = useQuery({
    queryKey: ['movieDetail', movieId],
    queryFn: () => getMovieDetail(movieId.toString()),
  });

  const {
    data: creditsData,
    isLoading: creditsLoading,
    error: creditsError,
  } = useQuery({
    queryKey: ['movieCredits', movieId],
    queryFn: () => getMovieCredits(movieId.toString()),
  });

  const title =
    data?.title?.length && data?.title?.length > 16
      ? data?.title.slice(0, 16).concat('...')
      : data?.title;
  const poster = data?.poster_path
    ? `${Keys.IMAGE_URL}${data?.poster_path}`
    : null;

  const genres = data?.genres.map(genre => genre.name).join(', ');

  const language =
    LANGUAGE_FILTERS[data?.original_language as keyof typeof LANGUAGE_FILTERS];

  const director = creditsData?.crew.find(
    crew => crew.department === 'Directing',
  );
  const writer = creditsData?.crew.find(crew => crew.department === 'Writing');

  const budget = data?.budget ? converBudget(data?.budget) : '';
  const relasDate = data?.release_date
    ? formatDate(data?.release_date, 'DD/MM/YYYY')
    : '';
  const displaingDate = `${relasDate} - ${budget}`;

  const loading = isLoading || creditsLoading;
  const isError = error || creditsError;
  if (loading) {
    return (
      <View style={styles.container}>
        <SimpleHeader />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <SimpleHeader />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading movie details</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SimpleHeader />

      <ScrollView style={styles.scrollView}>
        <View style={styles.movieDetailContainer}>
          <View style={styles.headerContainer}>
            <Pressable hitSlop={40} onPress={goBack} style={styles.backButton}>
              <ChevronLeftIcon size={24} color={colors.white} />
            </Pressable>
            <Text style={styles.title}>
              {title}
              <Text style={styles.year}>{` (${data?.release_date.slice(
                0,
                4,
              )})`}</Text>
            </Text>

            <View style={styles.infoContainer}>
              {poster ? (
                <Image source={{ uri: poster }} style={styles.poster} />
              ) : (
                <View style={styles.poster} />
              )}

              <View style={styles.detailContainer}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{`PG13`}</Text>
                </View>
                <Text style={styles.statusText}>{displaingDate}</Text>

                <Text style={styles.statusText}>{genres}</Text>
                <Text style={styles.status}>
                  {'Status: '}
                  <Text style={styles.statusText}>{data?.status}</Text>
                </Text>
                <Text style={styles.status}>
                  {'Original Language: '}
                  <Text style={styles.statusText}>{language}</Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.overviewContainer}>
            <View style={styles.productionContainer}>
              <View style={styles.score}>
                <ScoreComponent
                  score={data?.vote_average || 0}
                  label="User Score"
                />
              </View>
              <View style={styles.authorContainer}>
                <Text style={styles.txtDirector}>{director?.name || ''}</Text>
                <Text style={styles.roleText}>{'Director, Writer '}</Text>
                <View style={styles.space} />
                <Text style={styles.txtDirector}>{writer?.name || ''}</Text>
                <Text style={styles.roleText}>{'Writer '}</Text>
              </View>
            </View>
            <Text style={styles.txtCollection}>
              {data?.belongs_to_collection?.name}
            </Text>
            <Text style={styles.overviewLabel}>{'Overview'}</Text>
            <Text style={styles.overviewText}>{data?.overview}</Text>
            <Pressable style={styles.addWatchlistButton}>
              <BookmarkIcon size={24} color={colors.white} />
              <Text style={styles.txtReadMore}>{'Add to watchlist'}</Text>
            </Pressable>
          </View>
        </View>

        {/* List Cast */}
        <CastList castData={creditsData?.cast || []} />

        {/* List Recommendations */}
        <RecommendationsList movieId={movieId} />
      </ScrollView>
    </View>
  );
};

export { MovieDetail };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  movieDetailContainer: {
    backgroundColor: colors.blueLight,
    paddingBottom: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: colors.black15,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  year: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.white,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  infoContainer: {
    marginTop: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  poster: {
    width: 112,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  tag: {
    borderColor: colors.white70,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  detailContainer: {
    marginLeft: 16,
    flex: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white70,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginTop: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    marginTop: 8,
  },
  productionContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  overviewContainer: {
    paddingHorizontal: 20,
  },
  score: {
    justifyContent: 'center',
    alignItems: 'center',

    width: WIDTH_SCREEN * 0.5,
  },
  txtDirector: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  authorContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: WIDTH_SCREEN * 0.5,
  },
  space: {
    height: 15,
  },
  roleText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blueLight,
  },
  loadingText: {
    fontSize: 18,
    color: colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blueLight,
  },
  errorText: {
    fontSize: 18,
    color: colors.white,
  },
  txtCollection: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.white,
    fontFamily: 'Inter-Italic',
    marginTop: 33,
  },
  overviewLabel: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,

    marginTop: 15,
  },
  overviewText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    marginTop: 10,
  },
  addWatchlistButton: {
    borderColor: colors.white,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 5,
    marginTop: 35,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  txtReadMore: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
  },
});
