import React, {useState, useEffect} from 'react';
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import {Loader} from './components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {showLocalNotification} from './libs/NotificationService';
import {PersistGate} from 'redux-persist/integration/react';
import {getThemeApp, THEME_ID} from './themes/theme_app';
import {NOTIF_CHANNEL_TRANSACTION} from './constants';
import {connectionChange} from './actions/app';
import {strings} from './constants/localize';
import {Provider} from 'react-redux';
import {Helper} from './libs/Helper';
import {Provider as PaperProvider} from 'react-native-paper';
import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import NavigationService from './libs/NavigationService';
import NetInfo from '@react-native-community/netinfo';
import configureStore from './libs/configureStore';
import StackNavigation from './router';

const {store, persistor} = configureStore();

export default function App(props) {
  const [themeState, setThemeState] = useState(getThemeApp(THEME_ID.SYSTEM));

  useEffect(() => {
    function _setupNetwork() {
      NetInfo.fetch().then(state => {
        store.dispatch(connectionChange(state.isConnected));
      });
      NetInfo.addEventListener(state => {
        console.log(`Type: ${state.type}, Status: ${state.isConnected}`);
        store.dispatch(connectionChange(state.isConnected));
      });
    }
    _setupNetwork();
  }, []);

  useEffect(() => {
    function _setupNotification() {
      messaging().onMessage(message => {
        const {title, body, custom_notification} = message.notification;
        showLocalNotification(title, body, custom_notification);
      });
      messaging().setBackgroundMessageHandler(async () => {});
      messaging().onNotificationOpenedApp(message =>
        _handleClick({data: JSON.parse(message.data.custom_notification)}),
      );
    }
    _setupNotification();
  }, []);

  useEffect(() => {
    async function _setupChannel() {
      await notifee.requestPermission();
      await notifee.createChannel(NOTIF_CHANNEL_TRANSACTION);
    }
    _setupChannel();
  }, []);

  useEffect(() => {
    function _setNotifeeListener() {
      notifee.onForegroundEvent(objAction => {
        // NOTE: for handle event
        switch (objAction.type) {
          case EventType.DISMISSED:
            console.log('User Dismissed Notification', objAction.detail);
            break;
          case EventType.PRESS:
            console.log('User Press Notification', objAction.detail);
            break;
          default:
            break;
        }
        _handleClick(objAction.detail);
      });
    }
    _setNotifeeListener();
  }, []);

  useEffect(() => {
    const _listenerState = () => {
      const {themeAppId, languageAppId} = Object.fromEntries(
        store.getState().app.entries(),
      );
      setThemeState(getThemeApp(themeAppId));
      strings.setLanguage(languageAppId);
    };
    store.subscribe(_listenerState);
  }, []);

  async function _handleClick(message) {
    if (message && message.data) {
      const token = await Helper.getToken();
      const {Id, Screen, isApprover} = message.data;
      if (token && Screen) {
        NavigationService.navigate(Screen, {
          Id: Id,
          isApprover: isApprover,
        });
      }
    }
  }

  return (
    <SafeAreaView style={styles.flex1} forceInset={{bottom: 'always'}}>
      <StatusBar
        barStyle={themeState.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={themeState.theme_nav.colors.background}
      />
      <Provider store={store}>
        <PersistGate loading={<Loader visible={true} />} persistor={persistor}>
          <PaperProvider theme={themeState.theme_paper}>
            <GestureHandlerRootView style={styles.flex1}>
              <StackNavigation theme={themeState} />
            </GestureHandlerRootView>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
