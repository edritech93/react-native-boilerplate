import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

export default function FloatingButton(props) {
  const {
    icon = require('../assets/images/add_icon.png'),
    onPress,
    ...restProps
  } = props;
  return (
    <FAB
      icon={icon}
      onPress={() => onPress()}
      style={styles.fab}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
