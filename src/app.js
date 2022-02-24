import React, {useEffect} from 'react';
import {StatusBar, SafeAreaView, Platform, LogBox} from 'react-native';
import {connectionChange} from './actions/app';
import {DATA_LANGUAGE} from './constants';
import {STORAGE} from './actions/types';
import {Provider} from 'react-redux';
import {Helper} from './libs/Helper';
import {Colors} from './themes';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NotificationService from './libs/NotificationService';
import messaging from '@react-native-firebase/messaging';
import NavigationService from './libs/NavigationService';
import NetInfo from '@react-native-community/netinfo';
import configureStore from './libs/configureStore';
import ObjStorage from './libs/ObjStorage';
import strings from './constants/localize';
import StackNavigation from './router';

const PushNotification = require('react-native-push-notification');
const store = configureStore();
LogBox.ignoreAllLogs();

export default function App(props) {
  useEffect(() => {
    async function _loadLanguage() {
      const languageStorage = await ObjStorage.get(STORAGE.LANGUAGE);
      if (languageStorage) {
        strings.setLanguage(languageStorage.id);
      } else {
        ObjStorage.set(STORAGE.LANGUAGE, DATA_LANGUAGE[0]);
        strings.setLanguage(DATA_LANGUAGE[0].id);
      }
    }
    _loadLanguage();
  }, []);

  useEffect(() => {
    function _setupNetwork() {
      NetInfo.fetch().then(state => {
        store.dispatch(connectionChange(state.isConnected));
      });
      NetInfo.addEventListener(state => {
        console.log(
          `Network type: ${state.type}, status: ${state.isConnected}`,
        );
        store.dispatch(connectionChange(state.isConnected));
      });
    }
    _setupNetwork();
  }, []);

  useEffect(() => {
    function _setupNotification() {
      messaging().onMessage(message => {
        const {title, body} = message.notification;
        NotificationService.showLocalNotification(
          title,
          body,
          message.data.custom_notification,
        );
      });
      messaging().setBackgroundMessageHandler(async message => {
        console.log('Message handled in the background!', message);
      });
      PushNotification.createChannel(
        {
          channelId: 'notification_channel',
          channelName: 'BBACommunicator Notification',
          channelDescription: 'BBACommunicator Notification channel',
        },
        created => {},
      );
      PushNotification.configure({
        onRegister: function (token) {},
        onNotification: function (message) {
          try {
            if (message.foreground || message.userInteraction) {
              _handleClick({data: message.data});
            }
            if (Platform.OS === 'ios') {
              message.finish(PushNotificationIOS.FetchResult.NoData);
            }
          } catch (error) {
            console.log('error', error);
          }
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
    }
    _setupNotification();
  }, []);

  async function _handleClick(message) {
    if (message && message.data) {
      const {screen, itemId} = message.data;
      const token = await Helper.getToken();
      if (message && token && screen && itemId) {
        NavigationService.navigate(screen, {
          Id: itemId,
        });
      }
    }
  }

  return (
    <SafeAreaView style={{flex: 1}} forceInset={{bottom: 'always'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Provider store={store}>
        <StackNavigation
          stackRef={ref => NavigationService.initial(ref.current)}
        />
      </Provider>
    </SafeAreaView>
  );
}
