import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import {Colors, Fonts} from '../themes';

type ButtonType = Omit<React.ComponentProps<typeof Button>, 'children'>;

interface IButton extends ButtonType {
  title: string;
  onPress: () => void;
}

export function PrimaryButton(props: IButton) {
  const {title, onPress, ...restProps} = props;
  return (
    <Button
      testID={'btnPrimaryId'}
      mode={'contained'}
      uppercase={false}
      labelStyle={[styles.textStyle, {color: Colors.white}]}
      onPress={() => onPress()}
      {...restProps}>
      {title}
    </Button>
  );
}

export function SecondaryButton(props: IButton) {
  const {title, onPress, ...restProps} = props;
  return (
    <Button
      testID={'btnSecondaryId'}
      mode={'outlined'}
      uppercase={false}
      labelStyle={styles.textStyle}
      onPress={() => onPress()}
      {...restProps}>
      {title}
    </Button>
  );
}

export function AccentButton(props: IButton) {
  const {title, onPress, ...restProps} = props;
  return (
    <Button
      testID={'btnAccentId'}
      mode={'text'}
      uppercase={false}
      labelStyle={styles.textStyle}
      onPress={() => onPress()}
      {...restProps}>
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.type.medium,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
  },
});
