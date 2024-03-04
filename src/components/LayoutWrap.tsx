import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, ViewProps} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as ReduxProvider} from 'react-redux';
import {getThemeApp} from '../themes/ThemeApp';
import {connect} from 'react-redux';
import Loader from './Loader';

interface ILayoutWrap extends ViewProps {
  store: any;
  persistor: any;
  themeAppId: number;
  children?: React.ReactNode;
}

function LayoutWrap(props: ILayoutWrap) {
  const {children, themeAppId, store, persistor} = props;

  const themeState = getThemeApp(themeAppId);

  return (
    <SafeAreaView
      style={[
        styles.flex1,
        {backgroundColor: themeState.theme_paper.colors.background},
      ]}>
      <StatusBar
        barStyle={themeState.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={themeState.theme_nav.colors.background}
      />
      <ReduxProvider store={store}>
        <PersistGate loading={<Loader visible={true} />} persistor={persistor}>
          <PaperProvider theme={themeState.theme_paper}>
            <GestureHandlerRootView style={styles.flex1}>
              {children}
            </GestureHandlerRootView>
          </PaperProvider>
        </PersistGate>
      </ReduxProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

const mapStateToProps = (state: any) => {
  const {themeAppId} = state.app;
  return {themeAppId};
};

const mapDispatchToProps = (_: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutWrap);
