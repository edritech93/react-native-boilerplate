import React, {useState, useEffect} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {Text} from './Text';
import {useTheme, TextInput, TextInputProps} from 'react-native-paper';
import {LabelValueType} from '../types/LabelValueType';
import {strings} from '../constants/localize';
import {moderateScale} from '../libs/scaling';
import DropDown from 'react-native-paper-dropdown';
import TextError from './TextError';
import Loader from './Loader';

interface IListPicker extends ViewProps {
  title?: string;
  data: LabelValueType[];
  placeholder?: string;
  value: string | number | null;
  message?: string;
  editable?: boolean;
  withModal?: boolean;
  error?: boolean;
  isLoading?: boolean;
  multiSelect?: boolean;
  dropDownStyle?: ViewStyle;
  inputProps?: TextInputProps;
  onChange: (args: string) => void;
  onBlur?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  [rest: string]: any;
}

const styleModal = {
  top: moderateScale(60),
  left: moderateScale(16),
};

const styleNotModal = {
  marginTop: Platform.OS === 'ios' ? moderateScale(10) : moderateScale(55),
};

export default function ListPicker(props: IListPicker) {
  const {
    title,
    data = [],
    placeholder = '',
    value = '',
    message = `${title} ${strings.IS_REQ}`,
    editable = true,
    withModal = false,
    error = false,
    isLoading = false,
    multiSelect = false,
    dropDownStyle = withModal ? styleModal : styleNotModal,
    inputProps,
    onChange,
    onBlur,
    containerStyle,
    ...restProps
  } = props;

  const {colors} = useTheme();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [result, setResult] = useState<any>('');

  useEffect(() => {
    if (result || result === 0) {
      onChange(result);
    }
  }, [result]);

  const _onDismiss = () => {
    if (onBlur) {
      onBlur();
    }
    setIsVisible(false);
  };

  const _getRightIcon = () => {
    if (editable) {
      return (
        <TextInput.Icon icon={isVisible ? 'chevron-up' : 'chevron-down'} />
      );
    } else {
      return null;
    }
  };

  const dropDownTextStyle = {color: colors.onBackground};

  return (
    <View style={[styles.container, containerStyle]}>
      <DropDown
        label={title}
        mode={'outlined'}
        value={value}
        list={data}
        visible={isVisible}
        setValue={setResult}
        showDropDown={() => setIsVisible(true && editable)}
        placeholder={placeholder}
        onDismiss={_onDismiss}
        dropDownStyle={dropDownStyle}
        dropDownItemTextStyle={dropDownTextStyle}
        multiSelect={multiSelect}
        inputProps={{
          placeholderTextColor: colors.onSurfaceDisabled,
          style: {
            height: multiSelect === true ? moderateScale(50) : moderateScale(0),
          },
          right: _getRightIcon(),
          ...inputProps,
        }}
        {...restProps}
      />
      {!data && <Text>{strings.NO_DATA}</Text>}
      {isLoading && <Loader visible={isLoading} />}
      <TextError isError={error} message={message} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
