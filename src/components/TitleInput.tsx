import React from 'react';
import {StyleProp, StyleSheet, TextStyle, TextProps} from 'react-native';
import {Text} from './Text';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';

interface ITitleInput extends TextProps {
  title?: string;
  isRequired?: boolean;
  style?: StyleProp<TextStyle>;
}

export default function TitleInput(props: ITitleInput) {
  const {title = null, isRequired = true, style, ...restProps} = props;
  if (title) {
    return (
      <Text
        testID={'titleInputId'}
        style={[styles.textTitle, style]}
        {...restProps}>
        {title}
        {isRequired && (
          <Text
            testID={'textRequiredId'}
            style={[styles.textTitle, {color: Colors.red}]}>
            {'*'}
          </Text>
        )}
      </Text>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    color: Colors.primary,
  },
});
