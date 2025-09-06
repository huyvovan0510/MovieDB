import { View } from 'react-native';
import React from 'react';
import { Accordion, SimpleHeader } from '@/components';

const HomeScreen = () => {
  return (
    <View>
      <SimpleHeader />
      <Accordion title="Categories" />
    </View>
  );
};

export { HomeScreen };
