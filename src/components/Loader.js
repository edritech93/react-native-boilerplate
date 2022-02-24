import React from 'react';
import {View as DefaultView, ActivityIndicator, StyleSheet} from 'react-native';
import {Colors} from '../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Loader(props) {
  const {visible = false, color = Colors.primary, style} = props;

  if (visible) {
    return (
      <DefaultView style={[styles.container, style]}>
        <ActivityIndicator size={'large'} color={color} />
      </DefaultView>
    );
  } else {
    return null;
  }
}
