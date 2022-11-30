import React from 'react';
import {StyleSheet} from 'react-native';
import {HelperText} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';

export default function TextError(props) {
  const {visible = false, message, style, type = 'error', ...restProps} = props;

  return (
    <HelperText
      type={type}
      visible={visible}
      padding={'normal'}
      style={[style, styles.container]}
      {...restProps}>
      {message}
    </HelperText>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(-8),
    marginTop: moderateScale(-2),
  },
});
