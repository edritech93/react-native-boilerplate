import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {strings} from '../constants/localize';
import DropDown from 'react-native-paper-dropdown';
import TextError from './TextError';

export default function ListPicker(props) {
  const {
    title,
    data = [],
    value = '',
    onChange,
    onBlur,
    containerStyle,
    withModal = false,
    error = false,
    message = `${title} ${strings.IS_REQ}`,
    ...restProps
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    onChange(result);
  }, [result]);

  const _onDismiss = () => {
    onBlur();
    setIsVisible(false);
  };

  const dropDownStyle = withModal
    ? {
        top: moderateScale(60),
        left: moderateScale(16),
      }
    : {};

  return (
    <View style={[styles.container, containerStyle]}>
      <DropDown
        label={title}
        mode={'outlined'}
        value={value}
        list={data}
        visible={isVisible}
        setValue={setResult}
        showDropDown={() => setIsVisible(true)}
        onDismiss={_onDismiss}
        dropDownStyle={dropDownStyle}
        {...restProps}
      />
      <TextError visible={error} message={message} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
