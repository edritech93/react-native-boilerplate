import React, {useRef, useEffect} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {moderateScale} from './libs/scaling';
import NavigationService from './libs/NavigationService';
import Splash from './containers/Splash';
import Login from './containers/Login';
import Forgot from './containers/Forgot';
import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';

const Stack = createNativeStackNavigator();

export default function StackNavigation(props) {
  const {theme} = props;
  const REF_NAV = useRef();

  useEffect(() => {
    if (REF_NAV && REF_NAV.current) {
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
          contentStyle: {
            backgroundColor: theme.theme_paper.colors.background,
          },
          headerBackImage: () => (
            <Image
              source={require('./assets/images/arrow_left.png')}
              style={{
                width: moderateScale(24),
                height: moderateScale(24),
                tintColor: theme.theme_paper.colors.text,
              }}
            />
          ),
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
          options={{title: null}}
        />
        <Stack.Screen
          name={'Dashboard'}
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Profile'}
          component={Profile}
          options={{title: null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
