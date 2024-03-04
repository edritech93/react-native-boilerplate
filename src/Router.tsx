import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackType} from './types/RootStackType';
import {useTheme} from 'react-native-paper';
import NavigationService from './libs/NavigationService';
import Splash from './containers/Splash';
import Login from './containers/Login';
import Forgot from './containers/Forgot';
import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';

const Stack = createNativeStackNavigator<RootStackType>();

interface IStackNav {
  theme: any;
}

export default function StackNavigation(props: IStackNav) {
  const {theme} = props;
  const {colors} = useTheme();
  const REF_NAV = React.useRef<any>();

  useEffect(() => {
    if (REF_NAV.current) {
      NavigationService.initial(REF_NAV.current);
    }
  }, [REF_NAV]);

  return (
    <NavigationContainer ref={REF_NAV} theme={theme.theme_nav}>
      <Stack.Navigator
        initialRouteName={'Splash'}
        screenOptions={() => ({
          shadowColor: 'transparent',
          borderBottomWidth: 0,
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerBackImageSource: require('./assets/images/back-dark-24.png'),
          headerTitleStyle: {
            color: colors.onBackground,
          },
          headerTintColor: colors.primary,
        })}>
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Forgot'}
          component={Forgot}
          options={{title: ''}}
        />
        <Stack.Screen
          name={'Dashboard'}
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Profile'}
          component={Profile}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
