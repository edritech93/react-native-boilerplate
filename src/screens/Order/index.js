import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {moderateScale} from '../../libs/scaling';
import {Colors} from '../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.accent,
    paddingHorizontal: moderateScale(16),
  },
});

export default class Order extends Component {
  render() {
    return <View style={styles.container} />;
  }
}
