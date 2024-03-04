import {AppRegistry, LogBox} from 'react-native';
import {name as appName} from './app.json';
import {decode, encode} from 'base-64';
// import crashlytics from '@react-native-firebase/crashlytics';
// import * as Sentry from '@sentry/react-native';
import App from './src/App';

LogBox.ignoreAllLogs();

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

// if (!__DEV__) {
//   Sentry.init({
//     ignoreErrors: ['Network request failed', 'Failed to fetch', 'NetworkError'],
//     dsn: 'https://21e4aea075b245e69960535c1ccd04bf@o203748.ingest.sentry.io/6743122',
//   });
// }

// if (crashlytics().isCrashlyticsCollectionEnabled === false) {
//   crashlytics()
//     .setCrashlyticsCollectionEnabled(true)
//     .then(() => crashlytics().isCrashlyticsCollectionEnabled);
// }

AppRegistry.registerComponent(appName, () => App);
