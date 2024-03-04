import React, {useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Loader, ModalRadioButton, PaddedView, FlatList} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ItemMenuSettingType} from '../../types/ItemMenuSettingType';
import {strings, DATA_LANGUAGE} from '../../constants/localize';
import {LabelValueType} from '../../types/LabelValueType';
import {RootStackType} from '../../types/RootStackType';
import {ShowAlertType} from '../../types/ShowAlertType';
import {DATA_THEME} from '../../themes/ThemeApp';
import {moderateScale} from '../../libs/scaling';
import NavigationService from '../../libs/NavigationService';
import DeviceInfo from 'react-native-device-info';
import ItemMenuProfile from './ItemMenuProfile';
import HeaderProfile from './HeaderProfile';

interface IProfile extends NativeStackScreenProps<RootStackType, 'Profile'> {
  languageAppId: string;
  themeAppId: number;
  languageAppIdChange: (args: string) => void;
  themeAppIdChange: (args: number) => void;
  showAlert: (args: ShowAlertType) => void;
}

const appVersion = DeviceInfo.getVersion();

export default function Profile(props: IProfile) {
  const {languageAppId, themeAppId, languageAppIdChange, themeAppIdChange} =
    props;

  const [isOpenLanguage, setIsOpenLanguage] = useState<boolean>(false);
  const [isOpenTheme, setIsOpenTheme] = useState<boolean>(false);

  const DATA_MENU: ItemMenuSettingType[] = [
    {
      id: 0,
      name: strings.LANGUAGE,
      image: require('../../assets/images/translate-dark-24.png'),
      onPress: () => setIsOpenLanguage(true),
    },
    {
      id: 1,
      name: strings.THEME,
      image: require('../../assets/images/translate-dark-24.png'),
      onPress: () => setIsOpenTheme(true),
    },
    {
      id: 2,
      name: strings.ABOUT,
      image: require('../../assets/images/about-dark-24.png'),
      onPress: () => _onPressAbout(),
    },
    {
      id: -1,
      name: strings.LOGOUT,
      image: null,
      onPress: () => _onPressLogout(),
    },
  ];

  function _onPressAbout() {
    props.showAlert({message: `Version${appVersion}`});
  }

  function _onPressLogout() {
    Alert.alert('Confirmation', 'Are you sure to logout ?', [
      {text: 'No', onPress: () => {}},
      {text: 'Yes', onPress: () => _onLogout()},
    ]);
  }

  function _onLogout() {
    _gotoLogin();
  }

  function _gotoLogin() {
    NavigationService.resetRoot('Login');
  }

  function _onSaveLanguage(obj: LabelValueType) {
    languageAppIdChange(obj.value);
    NavigationService.resetRoot('Splash');
  }

  const _renderItem = ({item}: any) => <ItemMenuProfile item={item} />;

  function _renderHeader() {
    return <HeaderProfile />;
  }

  function _renderModalLanguage() {
    const selected = DATA_LANGUAGE.find(e => e.value === languageAppId);
    return (
      <ModalRadioButton
        title={strings.LANGUAGE}
        isOpen={isOpenLanguage}
        dataSource={DATA_LANGUAGE}
        selected={selected}
        onSave={(obj: LabelValueType) => _onSaveLanguage(obj)}
        onClose={() => setIsOpenLanguage(false)}
        containerStyle={styles.wrapLanguage}
      />
    );
  }

  function _renderModalTheme() {
    const selected = DATA_THEME.find(e => e.value === themeAppId);
    return (
      <ModalRadioButton
        title={strings.THEME}
        isOpen={isOpenTheme}
        dataSource={DATA_THEME}
        selected={selected}
        onSave={(obj: LabelValueType) => themeAppIdChange(obj.value)}
        onClose={() => setIsOpenTheme(false)}
        containerStyle={styles.wrapTheme}
      />
    );
  }

  return (
    <PaddedView>
      <FlatList
        data={DATA_MENU}
        renderItem={_renderItem}
        ListHeaderComponent={_renderHeader()}
      />
      <Loader visible={false} />
      {_renderModalLanguage()}
      {_renderModalTheme()}
    </PaddedView>
  );
}

const styles = StyleSheet.create({
  wrapLanguage: {
    height: moderateScale(250),
  },
  wrapTheme: {
    height: moderateScale(320),
  },
});
