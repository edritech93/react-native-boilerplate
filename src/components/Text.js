import React from 'react';
import {StyleSheet} from 'react-native';
import {Text as DefaultText} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import {Fonts} from '../themes';

export function Text(props) {
  const {children, style, ...restProps} = props;
  const {colors} = useTheme();
  return (
    <DefaultText
      style={[styles.textStyle, {color: colors.text}, style]}
      {...restProps}>
      {children}
    </DefaultText>
  );
}

export function Title(props) {
  const {children, style, ...restProps} = props;
  return (
    <Text style={[styles.titleStyle, style]} {...restProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.type.regular,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(25),
  },
  titleStyle: {
    fontFamily: Fonts.type.semiBold,
    fontSize: moderateScale(24),
    lineHeight: moderateScale(29),
    fontWeight: '600',
  },
});
