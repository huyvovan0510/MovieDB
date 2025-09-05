import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, MovieDetail } from '@/screens';
import WatchList from '@/screens/WatchList';
import { APP_SCREEN, COMMON_SCREEN_OPTIONS } from './navigation.constant';
import { RootStackParamList } from './type';
import { setNavigatorRef } from './navigation.services';
import CustomTabBar from './CustomTabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  const renderCustomTab = (props: BottomTabBarProps) => (
    <CustomTabBar {...props} />
  );
  return (
    <Tab.Navigator
      screenOptions={COMMON_SCREEN_OPTIONS}
      tabBar={renderCustomTab}
    >
      <Tab.Screen name={APP_SCREEN.HOME} component={HomeScreen} />
      <Tab.Screen name={APP_SCREEN.WATCH_LIST} component={WatchList} />
    </Tab.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer<RootStackParamList> ref={ref => setNavigatorRef(ref)}>
      <Stack.Navigator screenOptions={COMMON_SCREEN_OPTIONS}>
        <Stack.Screen name={APP_SCREEN.MAIN_TAB} component={MainTab} />
        <Stack.Screen name={APP_SCREEN.MOVIE_DETAIL} component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
