import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';
import {moderateScale} from '../../libs/scaling';
import {Fonts} from '../../themes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../../containers/Home';
import Notification from '../../containers/Notification';

const Tab = createBottomTabNavigator();

export default function Dashboard(props) {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={() => ({
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        headerTitleAlign: 'center',
        tabBarStyle: [
          {
            display: 'flex',
            backgroundColor: colors.background,
          },
          null,
        ],
        tabBarLabelStyle: {
          fontFamily: Fonts.type.regular,
          fontSize: moderateScale(10),
          lineHeight: moderateScale(14),
        },
      })}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Icon
              name={'home'}
              size={size}
              color={focused ? colors.primary : colors.text}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Notification'}
        component={Notification}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Icon
              name={'bell'}
              size={size}
              color={focused ? colors.primary : colors.text}
            />
          ),
          tabBarBadge: 1,
        }}
      />
    </Tab.Navigator>
  );
}
