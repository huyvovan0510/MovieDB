import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '@/theme/colors';
import { BookmarkIcon, HomeIcon } from 'react-native-heroicons/solid';
import { APP_SCREEN } from './navigation.constant';

import { navigate } from './navigation.services';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const TAB_ICON = {
  [APP_SCREEN.HOME]: HomeIcon,
  [APP_SCREEN.WATCH_LIST]: BookmarkIcon,
};

const CustomTabBar = ({ state }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  const renderTab = (route: any, index: number) => {
    const isFocused = state.index === index;
    const onPress = () => {
      if (!isFocused) {
        navigate(route.name);
      }
    };
    const TabIcon = TAB_ICON[route.name as keyof typeof TAB_ICON] || HomeIcon;

    return (
      <Pressable key={index} onPress={onPress} style={styles.tab}>
        <TabIcon
          size={24}
          color={isFocused ? colors.white : colors.grayLight}
        />
      </Pressable>
    );
  };
  const bottomStyle = { paddingBottom: bottom };
  return (
    <View style={[styles.container, bottomStyle]}>
      {state.routes.map(renderTab)}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    backgroundColor: colors.darkBlue,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
