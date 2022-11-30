import React, {useEffect} from 'react';
import {Image, StyleSheet, View, Platform} from 'react-native';
import {PaddedView, Loader} from '../../components';
import {moderateScale} from '../../libs/scaling';
import {Helper} from '../../libs/Helper';
import {API} from '../../libs/api';
import NavigationService from '../../libs/NavigationService';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

const packageName = DeviceInfo.getBundleId();
const appVersion = DeviceInfo.getVersion();

export default function Splash(props) {
  useEffect(() => {
    function _loadVersion() {
      const body = {
        package: packageName,
        version: `${appVersion}.0`,
        platform: Platform.OS,
      };
      API.singleRequest(API.getVersionCheck(body))
        .then(response => {
          const dataVersion = response.data;
          if (dataVersion && dataVersion.requireForceUpdate) {
            NavigationService.resetRoot('ForceUpdate');
          } else {
            _loadToken();
          }
        })
        .catch(() => _loadToken());
    }
    _loadVersion();
  }, []);

  async function _loadToken() {
    const token = await Helper.getToken();
    if (token) {
      messaging()
        .getInitialNotification()
        .then(message => {
          if (message) {
            const dataParse = JSON.parse(message.data.custom_notification);
            _handleClick({data: dataParse}, token);
          } else {
            _loadProfile();
          }
        })
        .catch(() => _loadProfile());
    } else {
      _gotoLogin();
    }
  }

  async function _loadProfile() {
    const token = await Helper.getToken();
    if (token) {
      API.singleRequest(API.getProfile())
        .then(response => props.profileChange(response.data))
        .catch(error => props.showAlert(error))
        .finally(() => _gotoDashboard());
    } else {
      _gotoLogin();
    }
  }

  function _gotoLogin() {
    setTimeout(() => {
      NavigationService.resetRoot('Login');
    }, 3000);
  }

  async function _gotoDashboard() {
    const message = await messaging()
      .getInitialNotification()
      .catch(() => null);
    if (message) {
      const objMessage = JSON.parse(message.data.custom_notification);
      _handleClick({data: objMessage});
    } else {
      NavigationService.resetRoot('Dashboard');
    }
  }

  function _handleClick(message) {
    if (message && message.data) {
      const {screen, itemId} = message.data;
      if (message && screen && itemId) {
        NavigationService.resetRoot('Dashboard');
        NavigationService.navigate(screen, {
          Id: itemId,
        });
      }
    }
  }

  return (
    <PaddedView style={styles.container}>
      <Image
        source={require('../../assets/images/arrow_left.png')}
        style={styles.imageStyle}
      />
      <View style={styles.wrapLoader}>
        <Loader visible={true} size={'small'} />
      </View>
    </PaddedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: moderateScale(220),
    height: moderateScale(60),
  },
  wrapLoader: {
    position: 'absolute',
    bottom: moderateScale(32),
  },
});
