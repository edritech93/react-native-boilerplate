import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function TouchableImage(props) {
  const {colors} = useTheme();
  const {
    color = colors.text,
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
      {icon && <Icon name={icon} size={size} color={color} />}
      {children}
    </TouchableOpacity>
  );
}
