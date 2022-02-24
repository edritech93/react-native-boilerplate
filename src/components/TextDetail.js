import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Title} from './Text';
import {moderateScale} from '../libs/scaling';

export default function TextDetail(props) {
  const {title, description, style} = props;
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.textTitle}>{title}</Text>
      <Title style={styles.textDesc}>{description ?? '-'}</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: null,
  },
  textTitle: {
    opacity: 0.5,
  },
  textDesc: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },
});
