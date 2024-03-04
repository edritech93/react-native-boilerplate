import React, {useState, useLayoutEffect} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {
  PaddedView,
  DateTimePicker,
  Title,
  ListPicker,
  Avatar,
  TextLink,
} from '../../components';
import {showLocalNotification} from '../../libs/NotificationService';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ShowAlertType} from '../../types/ShowAlertType';
import {RootStackType} from '../../types/RootStackType';
import {ProfileType} from '../../types/ProfileType';
import {moderateScale} from '../../libs/scaling';

interface IHome extends BottomTabScreenProps<RootStackType, 'Home'> {
  profile: ProfileType;
  showAlert: (args: ShowAlertType) => void;
}

export default function Home(props: IHome) {
  const {profile, navigation} = props;

  const [date, setDate] = useState<string | null>(null);
  const [select, setSelect] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: moderateScale(12)}}
          onPress={() => navigation.navigate('Profile')}>
          <Avatar
            source={profile?.avatar ?? null}
            type={'image'}
            size={moderateScale(32)}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, profile]);

  function _onShowNotification() {
    showLocalNotification('Title Local Notif', 'Description Local Notif');
  }

  return (
    <PaddedView>
      <Title style={styles.textTitle}>HOME</Title>
      <DateTimePicker
        title={'Check Time'}
        mode={'datetime'}
        format={'DD-MM-YYYY HH:mm'}
        value={date}
        onSubmit={(value: string) => setDate(value)}
        containerStyle={{marginBottom: moderateScale(16)}}
      />
      <ListPicker
        title={'Title ListPicker'}
        data={[{label: 'Item 1', value: 0}]}
        editable={true}
        value={select}
        onChange={(e: string) => setSelect(e)}
        onBlur={() => {}}
        error={true}
        message={'Message ListPicker'}
        containerStyle={{marginBottom: moderateScale(16)}}
      />
      <TextLink
        title={'Local Notification, '}
        link={'Test'}
        onPress={() => _onShowNotification()}
      />
    </PaddedView>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    marginTop: moderateScale(100),
    textAlign: 'center',
  },
});
