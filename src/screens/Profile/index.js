import React, {useState, useEffect} from 'react';
import {
  View,
  Text as DefaultText,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {Loader, ModalRadioButton, Avatar, Text, Title} from '../../components';
import {DATA_LANGUAGE} from '../../constants';
import {moderateScale} from '../../libs/scaling';
import {STORAGE} from '../../actions/types';
import {UI, Colors, Fonts} from '../../themes';
import {Helper} from '../../libs/Helper';
import {API} from '../../libs/api';
import NavigationService from './../../libs/NavigationService';
import ObjStorage from '../../libs/ObjStorage';
import strings from '../../constants/localize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapHeader: {
    alignItems: 'center',
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayShadow,
    paddingTop: moderateScale(3),
    paddingBottom: moderateScale(33),
  },
  txtDescProfile: {
    fontFamily: Fonts.type.regular,
    fontSize: moderateScale(10),
    lineHeight: moderateScale(16),
    color: Colors.textDark,
    opacity: 0.6,
  },
  wrapItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(18),
    paddingVertical: moderateScale(13),
  },
});

export default function Profile(props) {
  const {profile} = props;
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isOpenModalLanguage, setIsOpenModalLanguage] = useState(false);

  useEffect(() => {
    const _loadLanguage = async () => {
      const item = await Helper.getLanguage();
      setSelectedLanguage(item);
    };
    _loadLanguage();
  }, []);

  const dataSource = [
    {
      id: 0,
      name: strings.LANGUAGE,
      image: require('../../assets/images/translate-dark-24.png'),
      onPress: () => {
        _onPressLanguage();
      },
    },
    {
      id: 1,
      name: strings.ABOUT,
      image: require('../../assets/images/about-dark-24.png'),
      onPress: () => {
        _onPressAbout();
      },
    },
    {
      id: 2,
      name: strings.LOGOUT,
      image: null,
      onPress: () => {
        _onPressLogout();
      },
    },
  ];

  function _onPressLanguage() {
    setIsOpenModalLanguage(true);
  }

  function _onPressAbout() {
    Alert.alert('Version', '1.0.0');
  }

  function _onPressLogout() {
    setLoading(true);
    API.singleRequest(API.deviceDelete())
      .then(response => {
        console.log('deviceDelete => Successfully');
      })
      .catch(error => props.showAlert(error))
      .finally(() => {
        Helper.removeToken();
        Helper.removeRefreshToken();
        _resetLoading();
        _gotoLogin();
      });
  }

  function _resetLoading() {
    setLoading(false);
  }

  function _gotoLogin() {
    NavigationService.resetRoot('Login');
  }

  const renderItem = ({item, index}) => {
    let colorName;
    if (item.id === 2) {
      colorName = Colors.red;
    } else {
      colorName = Colors.textDark;
    }
    return (
      <TouchableOpacity style={styles.wrapItem} onPress={item.onPress}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {item.image ? (
            <Image
              style={{marginRight: moderateScale(16)}}
              source={item.image}
            />
          ) : null}
          <Text
            style={{
              color: colorName,
            }}>
            {item.name}
          </Text>
        </View>

        {item.image ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.greyBorder,
              }}>
              {index == 0 && selectedLanguage ? selectedLanguage.name : null}
            </Text>

            <Image
              source={require('../../assets/images/keyboard_arrow_right-dark-24.png')}
            />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  const renderHeader = _ => {
    if (profile) {
      return (
        <View style={styles.wrapHeader}>
          <Avatar
            style={{marginBottom: moderateScale(12)}}
            source={profile.avatar ?? null}
            size={moderateScale(100)}
          />

          <Title
            style={{
              fontSize: moderateScale(16),
              lineHeight: moderateScale(25),
            }}>
            {profile?.name ?? '-'}
          </Title>
          <DefaultText style={styles.txtDescProfile}>
            {profile?.email ?? '-'}
          </DefaultText>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderSeparator = () => {
    return <View style={UI.devider} />;
  };

  function _renderModalLanguage() {
    return (
      <ModalRadioButton
        title={strings.LANGUAGE}
        isOpen={isOpenModalLanguage}
        dataSource={DATA_LANGUAGE}
        selected={selectedLanguage}
        onSave={value => {
          setSelectedLanguage(value);
          Helper.setLanguage(value);
          NavigationService.resetRoot('Splash');
        }}
        onCloseModal={() => setIsOpenModalLanguage(false)}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={styles.container}
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem.bind(this)}
        ItemSeparatorComponent={renderSeparator}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

      {_renderModalLanguage()}

      <Loader visible={loading} />
    </View>
  );
}
