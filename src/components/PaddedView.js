import React from 'react';
import {View, StyleSheet} from 'react-native';
import {moderateScale} from '../libs/scaling';

export default function PaddedView(props) {
  const {children, style, ...restProps} = props;
  return (
    <View style={[styles.container, style]} {...restProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
  },
});
