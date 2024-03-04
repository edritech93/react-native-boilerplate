import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import {Text} from './Text';
import {moderateScale} from '../libs/scaling';
import {strings} from '../constants/localize';
import {Metrics} from '../themes';

interface EmptyStateProps {
  image?: ImageSourcePropType | undefined | null;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

export default function EmptyState(props: EmptyStateProps) {
  const {
    label = strings.NO_DATA,
    image = require('../assets/images/empty-state-no-data.png'),
    style,
    ...restProps
  } = props;

  return (
    <View style={[styles.container, style]} {...restProps}>
      {image && (
        <Image
          testID={'imageEmptyId'}
          style={[styles.imgStyle]}
          source={image}
        />
      )}
      <Text testID={'textEmptyId'} style={styles.textNoData}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(16),
    marginTop: Metrics.screenHeight * 0.1,
  },
  imgStyle: {
    marginBottom: moderateScale(16),
  },
  textNoData: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(16),
    textAlign: 'center',
    opacity: 0.7,
  },
});
