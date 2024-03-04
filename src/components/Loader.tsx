import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, ViewProps} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {Colors} from '../themes';

interface ILoader extends ViewProps {
  visible: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Loader(props: ILoader) {
  const {visible = false, style} = props;

  const {colors} = useTheme();

  if (visible) {
    return (
      <View
        testID={'viewLoaderId'}
        style={[styles.container, {backgroundColor: colors.background}, style]}>
        <ActivityIndicator
          testID={'indicatorId'}
          animating={true}
          color={Colors.primary}
        />
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
