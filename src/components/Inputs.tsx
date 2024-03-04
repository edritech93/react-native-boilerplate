import React, {useState} from 'react';
import {StyleProp, View, ViewStyle, ImageRequireSource} from 'react-native';
import {TextInput, useTheme, TextInputProps} from 'react-native-paper';
import {strings} from '../constants/localize';
import TextError from './TextError';

interface IInputs extends TextInputProps {
  title?: string;
  value: string;
  message?: string;
  error?: any;
  isPassword?: boolean;
  editable?: boolean;
  multiline?: boolean;
  leftIcon?: ImageRequireSource;
  rightIcon?: ImageRequireSource;
  onChangeText?: (args: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function Inputs(props: IInputs) {
  const {
    title = '',
    value = '',
    message = `${title} ${strings.IS_REQ}`,
    error = false,
    isPassword = false,
    editable = true,
    multiline = editable ? false : true,
    leftIcon,
    rightIcon,
    onChangeText,
    containerStyle,
    ...restProps
  } = props;

  const {colors} = useTheme();

  const [hidePassword, setHidePassword] = useState(isPassword);

  function _getRightIcon() {
    if (isPassword) {
      return (
        <TextInput.Icon
          icon={hidePassword ? 'eye' : 'eye-off'}
          onPress={() => setHidePassword(!hidePassword)}
        />
      );
    } else if (rightIcon) {
      return <TextInput.Icon icon={rightIcon} />;
    } else {
      return null;
    }
  }

  return (
    <View style={containerStyle}>
      <TextInput
        label={title}
        testID={'inputId'}
        mode={'outlined'}
        value={value}
        placeholder={`${strings.TYPE} ${title}`}
        placeholderTextColor={colors.onSurfaceDisabled}
        editable={editable}
        autoCorrect={false}
        multiline={multiline}
        secureTextEntry={hidePassword}
        left={leftIcon && <TextInput.Icon icon={leftIcon} />}
        right={_getRightIcon()}
        onChangeText={(e: string) => onChangeText && onChangeText(e)}
        {...restProps}
      />
      <TextError isError={error} message={message} />
    </View>
  );
}
