import React from 'react';
import {TextStyle, TextProps, StyleSheet} from 'react-native';
import {HelperText} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';

interface ITextError extends TextProps {
  isError: boolean;
  message: string;
  style?: TextStyle;
}

export default function TextError(props: ITextError) {
  const {isError = false, message, style, ...restProps} = props;
  if (isError) {
    return (
      <HelperText
        testID={'textErrorId'}
        type={'error'}
        visible={true}
        style={[styles.container, style]}
        {...restProps}>
        {message}
      </HelperText>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(-4),
  },
});
