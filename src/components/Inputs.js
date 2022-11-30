import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {strings} from '../constants/localize';
import TextError from './TextError';

export default function Inputs(props) {
  const {
    title,
    error = false,
    message = `${title} ${strings.IS_REQ}`,
    isPassword = false,
    containerStyle,
    leftIcon = null,
    rightIcon = null,
    ...restProps
  } = props;

  const [hidePassword, setHidePassword] = useState(false);

  useEffect(() => {
    setHidePassword(isPassword);
  }, [isPassword]);

  function _getRightIcon() {
    if (isPassword) {
      return (
        <TextInput.Icon
          onPress={() => setHidePassword(!hidePassword)}
          name={hidePassword ? 'eye' : 'eye-off'}
        />
      );
    } else if (rightIcon) {
      return <TextInput.Icon name={rightIcon} />;
    } else {
      return null;
    }
  }

  return (
    <View style={containerStyle}>
      <TextInput
        label={title}
        mode={'outlined'}
        placeholder={`Type ${title}`}
        secureTextEntry={hidePassword}
        autoCorrect={false}
        left={leftIcon && <TextInput.Icon name={leftIcon} />}
        right={_getRightIcon()}
        {...restProps}
      />
      <TextError visible={error} message={message} />
    </View>
  );
}
