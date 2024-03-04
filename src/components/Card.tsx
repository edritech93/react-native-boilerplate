import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Surface, SurfaceProps} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';

interface ICard extends SurfaceProps {
  disabled?: boolean;
  onPress: () => void;
}

export function Card(props: ICard) {
  const {children, disabled, onPress, style, ...restProps} = props;
  return (
    <TouchableOpacity
      testID={'cardId'}
      style={styles.flex1}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={-1}>
      <Surface style={[styles.container, style]} {...restProps}>
        {children}
      </Surface>
    </TouchableOpacity>
  );
}

interface ICardView extends SurfaceProps {}

export function CardView(props: ICardView) {
  const {children, style, ...restProps} = props;
  return (
    <Surface
      testID={'cardViewId'}
      style={[styles.container, style]}
      {...restProps}>
      {children}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: moderateScale(8),
  },
  flex1: {
    flex: 1,
  },
});
