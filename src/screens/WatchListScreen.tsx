import { View, StyleSheet } from 'react-native';
import React from 'react';
import { SimpleHeader, WatchList, ProfileSection } from '@/components';

const WatchListScreen = () => {
  return (
    <View style={styles.container}>
      <SimpleHeader />
      <ProfileSection />
      <WatchList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { WatchListScreen };
