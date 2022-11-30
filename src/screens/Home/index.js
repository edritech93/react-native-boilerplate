import React, {useState, useLayoutEffect} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {
  PaddedView,
  Text,
  DateTimePicker,
  PrimaryButton,
  SecondaryButton,
  Inputs,
  TouchableImage,
  ModalRadioButton,
} from '../../components';
import {DATA_THEME} from '../../themes/theme_app';
import {moderateScale} from '../../libs/scaling';
import Avatar from '../../components/Avatar';

export default function Home(props) {
  const {profile, navigation, themeAppId} = props;

  const [date, setDate] = useState(null);
  const [isOpenTheme, setIsOpenTheme] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: moderateScale(12)}}
          onPress={() => _onPressProfile()}>
          <Avatar
            source={profile?.avatar ?? null}
            type={'Image'}
            size={moderateScale(28)}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableImage
          icon={'adjust'}
          onPress={_onPressTheme}
          style={{marginRight: moderateScale(16)}}
        />
      ),
    });
  }, [navigation, profile]);

  function _onPressProfile() {
    props.navigation.navigate('Profile');
  }

  const _onPressTheme = () => setIsOpenTheme(true);

  const _saveProfile = () => {
    const body = {
      name: 'User Test',
      email: 'test@user.com',
    };
    props.profileChange(body);
  };

  const _deleteProfile = () => {
    props.profileChange(null);
  };

  function _onSaveTheme(obj) {
    props.themeAppIdChange(obj.value);
  }

  function _renderModalLanguage() {
    const theme = DATA_THEME.find(e => e.value === themeAppId);
    return (
      <ModalRadioButton
        title={'Change Theme'}
        isOpen={isOpenTheme}
        dataSource={DATA_THEME}
        selected={theme}
        onSave={obj => _onSaveTheme(obj)}
        onClose={() => setIsOpenTheme(false)}
        containerStyle={styles.wrapLanguage}
      />
    );
  }

  return (
    <PaddedView style={styles.container}>
      <DateTimePicker
        title={'Check Time'}
        mode={'datetime'}
        format={'DD-MM-YYYY HH:mm'}
        value={date}
        onSubmit={value => setDate(value)}
      />
      <Inputs title={'Title'} />
      <Text>{JSON.stringify(profile)}</Text>
      <PrimaryButton
        title={'Save Profile'}
        onPress={_saveProfile}
        style={{
          marginBottom: moderateScale(16),
        }}
      />
      <SecondaryButton title={'Delete Profile'} onPress={_deleteProfile} />
      {_renderModalLanguage()}
    </PaddedView>
  );
}

const styles = StyleSheet.create({
  container: {},
  wrapLanguage: {
    height: moderateScale(300),
  },
});
