import React from 'react';
import {StyleSheet} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';
import {Text} from './Text';

export default function TextError(props) {
  const {isError = false, message, style} = props;
  if (isError) {
    return <Text style={[styles.txtStyle, style]}>{message}</Text>;
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  txtStyle: {
    fontSize: moderateScale(10),
    lineHeight: moderateScale(16),
    color: Colors.red,
  },
});
