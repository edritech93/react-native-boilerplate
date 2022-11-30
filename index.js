import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
