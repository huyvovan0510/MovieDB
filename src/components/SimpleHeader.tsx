import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { logo } from '@/assets/images';

import { colors } from '@/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SimpleHeader = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const { top } = useSafeAreaInsets();
  const topStyle = { paddingTop: top };
  return (
    <View style={[styles.container, topStyle, style]}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

export { SimpleHeader };

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 18,
  },
  logo: {
    width: 80,
    height: 57,
  },
});
