import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '@/theme/colors';
import { CastCard, CastMember } from './CastCard';

interface CastListProps {
  title?: string;
  castData: CastMember[];
}

const CastList: React.FC<CastListProps> = ({
  title = 'Top Billed Cast',
  castData,
}) => {
  const renderCastItem = ({ item }: { item: CastMember }) => (
    <CastCard cast={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.castContainer}>
        <FlatList
          data={castData}
          renderItem={renderCastItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
  },
  castContainer: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
});

export { CastList };
