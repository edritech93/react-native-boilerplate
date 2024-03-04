import React from 'react';
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import {moderateScale} from '../libs/scaling';

interface ITouchableImage extends TouchableOpacityProps {
  color?: any;
  size?: number;
  icon: ImageSourcePropType;
  children?: React.ReactNode;
  enabled?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  [rest: string]: any;
}

export default function TouchableImage(props: ITouchableImage) {
  const {
    color = null,
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
      testID={'touchTouchableImageId'}
      style={style}
      disabled={enabled ? false : true}
      onPress={() => onPress()}
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
