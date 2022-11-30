import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Badge as PaperBadge} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';

export default function Badge(props) {
  const {count = 0, ...restProps} = props;
  if (count > 0) {
    return (
      <View style={styles.wrapBadge}>
        <PaperBadge {...restProps}>{count}</PaperBadge>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  wrapBadge: {
    minWidth: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(4),
    backgroundColor: Colors.red,
    padding: moderateScale(2),
  },
});
