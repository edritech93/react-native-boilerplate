import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Title, Text} from '../../components';
import {ProfileType} from '../../types/ProfileType';
import {moderateScale} from '../../libs/scaling';
import {connect} from 'react-redux';

interface IHeaderProfile {
  profile: ProfileType;
}

function HeaderProfile(props: IHeaderProfile) {
  const {profile} = props;

  return (
    <View style={styles.wrapHeader}>
      <Avatar
        type={'image'}
        style={{marginBottom: moderateScale(12)}}
        source={profile?.avatar ?? null}
        size={moderateScale(100)}
      />
      <Title
        style={{
          fontSize: moderateScale(16),
          lineHeight: moderateScale(25),
        }}>
        {profile?.fullName ?? '-'}
      </Title>
      <Text style={styles.txtDescProfile}>{profile?.email ?? '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapHeader: {
    alignItems: 'center',
    paddingVertical: moderateScale(32),
  },
  txtDescProfile: {
    fontSize: moderateScale(10),
    lineHeight: moderateScale(16),
    opacity: 0.6,
  },
});

const mapStateToProps = (state: any) => {
  const {profile} = state.auth;
  return {profile};
};

const mapDispatchToProps = (_: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderProfile);
