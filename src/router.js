import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {moderateScale} from './libs/scaling';
import {IconWithBadge} from './components';
import {connect} from 'react-redux';
import {Colors} from './themes';
import Splash from './containers/Splash';
import Login from './containers/Login';
import Forgot from './containers/Forgot';
import Home from './containers/Home';
import Order from './containers/Order';
import Notification from './containers/Notification';
import Profile from './containers/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const defaultStyle = {
  headerStyle: {
    borderBottomWidth: 0, //for ios
    shadowOpacity: 0, //for ios
    elevation: 0, //for android
  },
  shadowColor: 'transparent',
  borderBottomWidth: 0,
  headerBackTitle: ' ',
  headerTitleAlign: 'center',
};

function DashboardApp(props) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          const homeBadge = props.badge;
          let badgeTotal = 0;

          if (homeBadge && route.name == 'Notification') {
            badgeTotal = homeBadge;
          }
          return (
            <IconWithBadge
              name={route.name}
              color={color}
              focused={focused}
              badgeCount={badgeTotal}
            />
          );
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.divider,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}>
      <Tab.Screen name={'Home'} component={Home} />
      <Tab.Screen name={'Order'} component={Order} />
      <Tab.Screen name={'Notification'} component={Notification} />
    </Tab.Navigator>
  );
}

const mapStateToProps = (state, ownProps) => {
  const {badge} = state.app;
  return {badge};
};

const mapDispatchToProps = dispatch => {
  return {};
};

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardApp);

export default function StackNavigation(props) {
  const REF_NAV = useRef();

  useEffect(() => {
    if (REF_NAV && REF_NAV.current) {
      props.stackRef(REF_NAV);
    }
  }, [REF_NAV]);

  return (
    <NavigationContainer ref={REF_NAV}>
      <Stack.Navigator
        initialRouteName={'Splash'}
        screenOptions={({navigation}) => ({
          ...defaultStyle,
          headerBackImage: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: moderateScale(8)}}>
                <Image source={require('./assets/images/arrow_left.png')} />
              </TouchableOpacity>
            );
          },
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
