import React from 'react';
import {Text as DefaultText} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Fonts, Colors} from '../themes';

export function Text(props) {
  const {children, style, ...restProps} = props;
  return (
    <DefaultText
      style={[
        {
          fontFamily: Fonts.type.regular,
          fontSize: moderateScale(16),
          lineHeight: moderateScale(25),
          color: Colors.textDark,
        },
        style,
      ]}
      {...restProps}>
      {children}
    </DefaultText>
  );
}

export function Title(props) {
  const {children, style, ...restProps} = props;
  return (
    <Text
      style={[
        {
          fontFamily: Fonts.type.semiBold,
          fontSize: moderateScale(24),
          lineHeight: moderateScale(29),
          fontWeight: '600',
        },
        style,
      ]}
      {...restProps}>
      {children}
    </Text>
  );
}
