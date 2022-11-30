import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Surface} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';

export function Card(props) {
  const {children, style, onPress, ...restProps} = props;
  return (
    <TouchableOpacity style={styles.flex0} onPress={onPress}>
      <Surface style={[styles.container, style]} elevation={1} {...restProps}>
        {children}
      </Surface>
    </TouchableOpacity>
  );
}

export function CardView(props) {
  const {children, style, ...restProps} = props;
  return (
    <Surface style={[styles.container, style]} elevation={1} {...restProps}>
      {children}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: moderateScale(8),
    marginBottom: 1,
  },
  flex0: {
    flex: 0,
  },
});
