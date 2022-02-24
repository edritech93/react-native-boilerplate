import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';

export default function TouchableImage(props) {
  const {
    color = Colors.black,
    size = moderateScale(24),
    icon = null,
    onPress,
    style,
    children,
    enabled = true,
    ...restProps
  } = props;

  return (
    <TouchableOpacity
      style={style}
      onPress={() => onPress()}
      disabled={onPress && enabled ? false : true}
      {...restProps}>
      {icon && (
        <Image
          style={{
            width: size,
            height: size,
            tintColor: color,
          }}
          source={icon}
        />
      )}

      {children}
    </TouchableOpacity>
  );
}
