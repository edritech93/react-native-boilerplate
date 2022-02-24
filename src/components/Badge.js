import React from 'react';
import {View as DefaultView, StyleSheet} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';
import {Text} from './Text';

const styles = StyleSheet.create({
  wrapBadge: {
    minWidth: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(4),
    backgroundColor: Colors.red,
    padding: moderateScale(2),
  },
});

export default function Badge(props) {
  const {count} = props;

  if (count) {
    return (
      <DefaultView style={[styles.wrapBadge, props.style]}>
        <Text
          style={{
            fontSize: moderateScale(12),
            lineHeight: moderateScale(18),
            color: Colors.white,
          }}>
          {count}
        </Text>
      </DefaultView>
    );
  } else {
    return null;
  }
}
