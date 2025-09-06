import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';

interface ListPlaceholderProps {
  count?: number;
}

const SkeletonItem: React.FC = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.8, { duration: 800 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <Animated.View style={[styles.poster, animatedStyle]} />

        <View style={styles.infoContainer}>
          <Animated.View style={[styles.titleSkeleton, animatedStyle]} />
          <Animated.View style={[styles.dateSkeleton, animatedStyle]} />
          <Animated.View style={[styles.overviewSkeleton1, animatedStyle]} />
          <Animated.View style={[styles.overviewSkeleton2, animatedStyle]} />
        </View>
      </View>
    </View>
  );
};

const ListPlaceholder: React.FC<ListPlaceholderProps> = ({ count = 5 }) => {
  return (
    <View style={styles.listContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    gap: 12,
    paddingHorizontal: 16,
  },
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
    overflow: 'hidden',
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  poster: {
    width: 95,
    height: 141,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.grayLight,
  },
  infoContainer: {
    marginHorizontal: 14,
    justifyContent: 'center',
    flex: 1,
  },
  titleSkeleton: {
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
    width: '80%',
    backgroundColor: colors.grayLight,
  },
  dateSkeleton: {
    height: 16,
    borderRadius: 4,
    marginBottom: 12,
    width: '40%',
    backgroundColor: colors.grayLight,
  },
  overviewSkeleton1: {
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
    width: '100%',
    backgroundColor: colors.grayLight,
  },
  overviewSkeleton2: {
    height: 14,
    borderRadius: 4,
    width: '75%',
    backgroundColor: colors.grayLight,
  },
});

export { ListPlaceholder };
