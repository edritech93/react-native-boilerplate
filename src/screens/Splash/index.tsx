import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {PaddedView, Text} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackType} from '../../types/RootStackType';
import {ShowAlertType} from '../../types/ShowAlertType';
import {ActivityIndicator} from 'react-native-paper';
import {moderateScale} from '../../libs/scaling';
import {Colors} from '../../themes';
import DeviceInfo from 'react-native-device-info';

interface ISplash extends NativeStackScreenProps<RootStackType, 'Splash'> {
  loadingSlash: boolean;
  showAlert: (args: ShowAlertType) => void;
  splashRequest: () => void;
}

const appVersion = DeviceInfo.getVersion();
const buildNumber = DeviceInfo.getBuildNumber();

export default function Splash(props: ISplash) {
  const {loadingSlash} = props;

  useEffect(() => {
    props.splashRequest();
  }, []);

  return (
    <PaddedView style={styles.container}>
      <Image
        source={require('../../assets/images/profile_placeholder-100.png')}
        style={styles.imageSplash}
      />
      <View style={styles.wrapLoader}>
        <ActivityIndicator color={Colors.primary} animating={loadingSlash} />
        <Text
          style={styles.textVersion}>{`V ${appVersion} (${buildNumber})`}</Text>
      </View>
    </PaddedView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSplash: {
    width: moderateScale(128),
    height: moderateScale(128),
  },
  wrapLoader: {
    position: 'absolute',
    bottom: moderateScale(16),
    left: 0,
    right: 0,
  },
  textVersion: {
    fontSize: moderateScale(10),
    lineHeight: moderateScale(14),
    opacity: 0.7,
    alignSelf: 'flex-end',
    marginRight: moderateScale(4),
  },
});
