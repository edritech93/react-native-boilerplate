import React from 'react';
import {
  ImageRequireSource,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';

interface IFloatingButton extends ViewProps {
  icon?: ImageRequireSource;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function FloatingButton(props: IFloatingButton) {
  const {
    icon = require('../assets/images/add_icon.png'),
    onPress,
    containerStyle,
    ...restProps
  } = props;

  return (
    <FAB
      testID={'fabId'}
      icon={icon}
      color={'white'}
      onPress={() => onPress()}
      style={[styles.fab, containerStyle]}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: moderateScale(16),
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
  },
});
