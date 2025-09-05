import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';
import { Keyboard } from 'react-native';
import { RootStackParamList } from './type';

const RootNavigatorConfig: {
  current?: NavigationContainerRef<RootStackParamList>;
} = {
  current: undefined,
};

const setNavigatorRef = (
  navigationRef: NavigationContainerRef<RootStackParamList> | null,
) => {
  if (navigationRef) {
    RootNavigatorConfig.current = navigationRef;
  }
};

const navigate = <RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?:
    | RootStackParamList[RouteName]
    | {
        screen?: RouteName;
        params?: RootStackParamList[RouteName];
      },
  key?: string,
) => {
  if (RootNavigatorConfig.current) {
    const options: any = { name };
    //
    if (params) {
      options.params = params;
    }
    if (key) {
      options.key = key;
    }
    //
    RootNavigatorConfig.current.dispatch(CommonActions.navigate(options));
  }
};

const goBack = () => {
  if (RootNavigatorConfig.current && canGoBack()) {
    Keyboard.dismiss();
    RootNavigatorConfig.current.goBack();
  }
};

const canGoBack = () => {
  return (
    !!RootNavigatorConfig.current && RootNavigatorConfig.current.canGoBack()
  );
};

export { goBack, canGoBack, navigate, setNavigatorRef, RootNavigatorConfig };
