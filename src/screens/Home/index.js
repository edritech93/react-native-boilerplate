import React, {useLayoutEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {moderateScale} from '../../libs/scaling';
import {Colors} from '../../themes';
import Avatar from '../../components/Avatar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.green,
    paddingHorizontal: moderateScale(16),
  },
});

export default function Home(props) {
  const {profile} = props;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={{marginLeft: moderateScale(12)}}
            onPress={_onPressProfile}>
            <Avatar source={profile?.avatar ?? null} size={moderateScale(28)} />
          </TouchableOpacity>
        );
      },
    });
  }, [props.navigation, profile]);

  function _onPressProfile() {
    props.navigation.navigate('Profile');
  }

  return <View style={styles.container} />;
}
