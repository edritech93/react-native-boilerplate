import React, {useState, useEffect} from 'react';
import {LayoutWrap} from './components';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {getThemeApp, THEME_ID} from './themes/ThemeApp';
import {connectionChange} from './actions/app';
import {StoreApp} from './libs/configureStore';
import StackNavigation from './Router';

const {store, persistor} = StoreApp.initialStore();

let prevThemeAppId: number;

export default function App() {
  const [themeState, setThemeState] = useState(getThemeApp(THEME_ID.SYSTEM));

  useEffect(() => {
    function _setupNetwork() {
      NetInfo.fetch().then(({isConnected}: NetInfoState) => {
        store.dispatch(connectionChange(isConnected ?? false));
      });
      NetInfo.addEventListener(({isConnected}: NetInfoState) => {
        store.dispatch(connectionChange(isConnected ?? false));
      });
    }
    _setupNetwork();
  }, []);

  useEffect(() => {
    const _listenerState = async () => {
      const {themeAppId} = store.getState().app;
      if (prevThemeAppId !== themeAppId) {
        prevThemeAppId = themeAppId;
        setThemeState(getThemeApp(themeAppId));
      }
    };
    setTimeout(() => {
      store.subscribe(_listenerState);
    }, 3000);
  }, []);

  return (
    <LayoutWrap store={store} persistor={persistor}>
      <StackNavigation theme={themeState} />
    </LayoutWrap>
  );
}
