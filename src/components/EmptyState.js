import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text} from './Text';
import {moderateScale} from '../libs/scaling';
import {strings} from '../constants/localize';
import {Metrics} from '../themes';

export default function EmptyState(props) {
  const {image = null, label = strings.NO_DATA, style} = props;
  return (
    <View style={[styles.container, style]}>
      {image && <Image style={styles.imgStyle} source={image} />}
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.screenHeight * 0.4,
  },
  imgStyle: {
    marginBottom: moderateScale(16),
  },
});
