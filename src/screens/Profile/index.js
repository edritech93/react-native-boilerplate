import React, {useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Loader, ModalRadioButton, PaddedView, FlatList} from '../../components';
import {strings, DATA_LANGUAGE} from '../../constants/localize';
import {moderateScale} from '../../libs/scaling';
import {API} from '../../libs/api';
import NavigationService from './../../libs/NavigationService';
import ItemMenuProfile from './ItemMenuProfile';
import HeaderProfile from './HeaderProfile';

export default function Profile(props) {
  const {languageAppId} = props;

  const [loading, setLoading] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);

  const DATA_MENU = [
    {
      id: 0,
      name: strings.LANGUAGE,
      image: require('../../assets/images/translate-dark-24.png'),
      onPress: () => setIsOpenLanguage(true),
    },
    {
      id: 1,
      name: strings.ABOUT,
      image: require('../../assets/images/about-dark-24.png'),
      onPress: () => _onPressAbout(),
    },
    {
      id: 2,
      name: strings.LOGOUT,
      image: null,
      onPress: () => _onPressLogout(),
    },
  ];

  function _onPressAbout() {
    Alert.alert('Version', '1.0.0');
  }

  function _onPressLogout() {
    Alert.alert('Confirmation', 'Are you sure to logout ?', [
      {text: 'No', onPress: () => {}},
      {text: 'Yes', onPress: () => _onLogout()},
    ]);
  }

  function _onLogout() {
    // NOTE: for testing only
    _gotoLogin();

    // setLoading(true);
    // API.singleRequest(API.deviceDelete())
    //   .then(() => {})
    //   .catch(error => props.showAlert(error))
    //   .finally(() => _gotoLogin());
  }

  function _gotoLogin() {
    NavigationService.resetRoot('Login');
  }

  function _onSaveLanguage(obj) {
    props.languageAppIdChange(obj.value);
    NavigationService.resetRoot('Splash');
  }

  const _renderItem = ({item}) => <ItemMenuProfile item={item} />;

  const _renderHeader = () => <HeaderProfile />;

  function _renderModalLanguage() {
    const language = DATA_LANGUAGE.find(e => e.value === languageAppId);
    return (
      <ModalRadioButton
        title={strings.LANGUAGE}
        isOpen={isOpenLanguage}
        dataSource={DATA_LANGUAGE}
        selected={language}
        onSave={obj => _onSaveLanguage(obj)}
        onClose={() => setIsOpenLanguage(false)}
        containerStyle={styles.wrapLanguage}
      />
    );
  }

  return (
    <PaddedView>
      <FlatList
        data={DATA_MENU}
        renderItem={_renderItem}
        ListHeaderComponent={_renderHeader}
      />
      <Loader visible={loading} />
      {_renderModalLanguage()}
    </PaddedView>
  );
}

const styles = StyleSheet.create({
  wrapLanguage: {
    height: moderateScale(250),
  },
});
