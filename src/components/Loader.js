import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Colors} from '../themes';

export default function Loader(props) {
  const {
    visible = false,
    size = 'small',
    color = Colors.primary,
    style,
  } = props;

  if (visible) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator animating={visible} size={size} color={color} />
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
