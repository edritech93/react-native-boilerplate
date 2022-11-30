import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import {Fonts} from '../themes';

export function PrimaryButton(props) {
  const {title, ...restProps} = props;
  return (
    <Button
      mode={'contained'}
      uppercase={false}
      labelStyle={styles.textStyle}
      {...restProps}>
      {title}
    </Button>
  );
}

export function SecondaryButton(props) {
  const {title, ...restProps} = props;
  return (
    <Button
      mode={'outlined'}
      uppercase={false}
      labelStyle={styles.textStyle}
      {...restProps}>
      {title}
    </Button>
  );
}

export function AccentButton(props) {
  const {title, ...restProps} = props;
  return (
    <Button
      mode={'text'}
      uppercase={false}
      labelStyle={styles.textStyle}
      {...restProps}>
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.type.medium,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(16),
  },
});
