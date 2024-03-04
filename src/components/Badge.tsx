import React from 'react';
import {View, StyleSheet, ViewProps, StyleProp, ViewStyle} from 'react-native';
import {Badge as PaperBadge} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';

interface BadgeProps extends ViewProps {
  count: number;
  style?: StyleProp<ViewStyle>;
}

export default function Badge(props: BadgeProps) {
  const {count = 0, style, ...restProps} = props;
  if (count > 0) {
    return (
      <View
        testID={'viewBadgeId'}
        style={[styles.container, style]}
        {...restProps}>
        <PaperBadge {...restProps}>{count}</PaperBadge>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(4),
    backgroundColor: Colors.red,
    padding: moderateScale(2),
  },
});
