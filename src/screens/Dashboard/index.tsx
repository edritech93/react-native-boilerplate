import React, {useEffect} from 'react';
import notifee, {
  EventType,
  Notification as PayloadNotification,
} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {showLocalNotification} from '../../libs/NotificationService';
import {RootStackType} from '../../types/RootStackType';
import {CHANNEL_TRANSACTION} from '../../constants';
import {moderateScale} from '../../libs/scaling';
import {useTheme} from 'react-native-paper';
import {Helper} from '../../libs/Helper';
import {Fonts} from '../../themes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../../containers/Home';
import Notification from '../../containers/Notification';

const Tab = createBottomTabNavigator<RootStackType>();

interface IDashboard
  extends NativeStackScreenProps<RootStackType, 'Dashboard'> {
  badge: number;
}

export default function Dashboard(props: IDashboard) {
  const {badge, navigation} = props;
  const {colors} = useTheme();

  useEffect(() => {
    async function _setupNotification() {
      await notifee.requestPermission();
      await notifee.createChannel(CHANNEL_TRANSACTION);
      messaging().onMessage((message: FirebaseMessagingTypes.RemoteMessage) => {
        if (message.notification) {
          const {title, body} = message.notification;
          showLocalNotification(title, body, message.data);
        }
      });
      messaging().setBackgroundMessageHandler(async () => {});
      const foreground = notifee.onForegroundEvent(({type, detail}) => {
        switch (type) {
          case EventType.DISMISSED:
            break;
          case EventType.PRESS:
            if (detail?.notification?.data?.custom_notification) {
              const {data} = detail.notification as any;
              _handleClickForeground({
                data: JSON.parse(data.custom_notification),
              });
            }
            break;
          default:
            break;
        }
      });
      return () => {
        foreground();
      };
    }
    _setupNotification();
  }, []);

  async function _handleClickForeground(message: PayloadNotification) {
    if (message && message.data) {
      const token = await Helper.getToken();
      const {Id, Screen, isApprover} = message.data;
      if (token && Screen && Screen === typeof 'string') {
        navigation.navigate(Screen as any, {
          Id: Id,
          isApprover: isApprover,
        });
      }
    }
  }

  return (
    <Tab.Navigator
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
        headerBackImageSource: require('../../assets/images/back-dark-24.png'),
        headerTitleStyle: {
          color: colors.onBackground,
        },
        headerTintColor: colors.primary,
        tabBarLabelStyle: {
          fontFamily: Fonts.type.regular,
          fontSize: moderateScale(10),
          lineHeight: moderateScale(14),
        },
      })}
      sceneContainerStyle={{
        backgroundColor: colors.background,
      }}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Icon
              name={'home'}
              size={size}
              color={focused ? colors.primary : colors.onBackground}
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
              color={focused ? colors.primary : colors.onBackground}
            />
          ),
          tabBarBadge: badge,
        }}
      />
    </Tab.Navigator>
  );
}
