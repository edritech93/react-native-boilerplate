import React from 'react';
import {
  TouchableOpacity as DefaultTouchableOpacity,
  View as DefaultView,
} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';

export function Card(props) {
  const {children, style, ...restProps} = props;
  return (
    <DefaultTouchableOpacity
      style={[
        {
          flex: 1,
          borderRadius: moderateScale(4),
          shadowColor: '#0000004C',
          elevation: moderateScale(1),
          shadowOffset: {
            width: 0,
            height: moderateScale(1),
          },
          borderWidth: moderateScale(1),
          borderColor: '#F1F4FB',
          shadowRadius: moderateScale(1),
          backgroundColor: Colors.white,
          shadowOpacity: moderateScale(1),
        },
        style,
      ]}
      {...restProps}>
      {children}
    </DefaultTouchableOpacity>
  );
}

export function CardView(props) {
  const {children, style, ...restProps} = props;
  return (
    <DefaultView
      style={[
        {
          flex: 1,
          borderRadius: moderateScale(4),
          shadowColor: '#0000004C',
          elevation: moderateScale(1),
          shadowOffset: {
            width: 0,
            height: moderateScale(1),
          },
          borderWidth: moderateScale(1),
          borderColor: '#F1F4FB',
          shadowRadius: moderateScale(1),
          backgroundColor: Colors.white,
          shadowOpacity: moderateScale(1),
        },
        style,
      ]}
      {...restProps}>
      {children}
    </DefaultView>
  );
}
