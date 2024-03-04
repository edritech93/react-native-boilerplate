import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ViewProps,
} from 'react-native';
import {Text} from './Text';
import {useTheme, HelperText} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import {strings} from '../constants/localize';
import {Colors} from '../themes';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextError from './TextError';
import moment from 'moment';

interface IDateTimePicker extends ViewProps {
  title: string;
  value: string | null;
  mode?: 'date' | 'time' | 'datetime';
  format?: string;
  disabled?: boolean;
  error?: boolean;
  message?: string | undefined;
  onSubmit: (args: string) => void;
  onCancel?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function DateTimePicker(props: IDateTimePicker) {
  const {
    title = null,
    value = null,
    mode = 'date',
    format = 'DD MMM YYYY',
    disabled = false,
    error = false,
    message = `${title} ${strings.IS_REQ}`,
    onSubmit,
    onCancel,
    containerStyle,
  } = props;
  const {colors} = useTheme();

  const [showDate, setShowDate] = React.useState<boolean>(false);

  function _onPressConfirm(date: Date) {
    if (onCancel) {
      onCancel(); //NOTE: trigger setFieldTouched
    }
    setShowDate(false); //NOTE: must be first
    onSubmit(String(date));
  }

  function _onPressCancel() {
    setShowDate(false);
    if (onCancel) {
      onCancel(); //NOTE: trigger setFieldTouched
    }
  }

  function getDateString() {
    if (mode === 'datetime') {
      return moment(value).format('DD MMM YYYY HH:mm').toString();
    } else {
      return moment(value).format(format).toString();
    }
  }

  function _renderModalDatePicker() {
    return (
      <DateTimePickerModal
        date={value ? moment(value).toDate() : new Date()}
        mode={mode}
        isVisible={showDate}
        onConfirm={(date: Date) => _onPressConfirm(date)}
        onCancel={() => _onPressCancel()}
      />
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <HelperText
        type={'info'}
        padding={'none'}
        visible={true}
        style={[styles.textTitle, {backgroundColor: colors.background}]}>
        {title}
      </HelperText>
      <TouchableOpacity
        style={[styles.wrapInput, {backgroundColor: colors.background}]}
        disabled={disabled}
        onPress={() => setShowDate(true)}>
        <Text style={styles.textValue}>
          {value ? getDateString() : `${strings.SELECT} ${title}`}
        </Text>
        <Icon name={'calendar'} size={moderateScale(18)} />
      </TouchableOpacity>
      <TextError isError={error} message={message} />
      {_renderModalDatePicker()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(16),
  },
  wrapInput: {
    flexDirection: 'row',
    height: moderateScale(55),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(4),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  textTitle: {
    zIndex: 1,
    position: 'absolute',
    top: moderateScale(-12),
    left: moderateScale(10),
    paddingHorizontal: moderateScale(2),
    color: Colors.primary,
  },
  textValue: {
    flex: 1,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(21),
  },
});
