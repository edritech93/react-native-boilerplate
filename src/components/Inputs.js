import React, {useState, useEffect} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Colors, Fonts} from '../themes';
import strings from '../constants/localize';
import TextError from './TextError';

export default function Inputs(props) {
  const {
    value,
    onChange,
    title,
    containerStyle,
    editable = true,
    textInputStyles,
    titleActiveSize = moderateScale(11.5),
    titleInActiveSize = moderateScale(15),
    titleActiveColor = Colors.primary,
    titleInactiveColor = 'dimgrey',
    isError = false,
    message = strings.NEED_FILL,
    isPassword = false,
    onBlur,
    icon = null,
    ...restProps
  } = props;

  const position = new Animated.Value(value ? 1 : 0);
  const [isFieldActive, setIsFieldActive] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  useEffect(() => {
    setHidePassword(isPassword);
  }, [isPassword]);

  const _handleFocus = () => {
    if (!isFieldActive) {
      setIsFieldActive(true);
      Animated.timing(position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const _handleBlur = () => {
    if (isFieldActive && !value) {
      setIsFieldActive(false);
      Animated.timing(position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    if (onBlur) {
      onBlur();
    }
  };

  function _returnAnimatedTitleStyles() {
    return {
      top: position.interpolate({
        inputRange: [0, 1],
        outputRange: isFieldActive || value ? [0, 0] : [moderateScale(28), 0],
      }),
      fontSize: isFieldActive || value ? titleActiveSize : titleInActiveSize,
      color: isFieldActive || value ? titleActiveColor : titleInactiveColor,
      zIndex: isFieldActive || value ? 1 : 0,
      left: isFieldActive || value ? moderateScale(8) : moderateScale(32),
    };
  }

  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Text style={[styles.titleStyles, _returnAnimatedTitleStyles()]}>
        {title}
      </Animated.Text>
      <View
        style={[
          styles.wrapInput,
          {
            borderColor:
              isFieldActive || value ? Colors.primary : Colors.divider,
          },
        ]}>
        {icon && <Image source={icon} style={styles.iconRight} />}
        <TextInput
          style={[styles.textInput, textInputStyles]}
          value={value}
          underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          onFocus={_handleFocus}
          onBlur={_handleBlur}
          editable={editable}
          onChangeText={text => onChange(text)}
          secureTextEntry={hidePassword}
          autoCorrect={false}
          {...restProps}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.wrapIconPassword}
            onPress={togglePassword}>
            <Image
              source={
                hidePassword
                  ? require('./../assets/images/visibility-dark-24.png')
                  : require('./../assets/images/visibility_off-24px.png')
              }
              style={styles.iconRight}
            />
          </TouchableOpacity>
        )}
      </View>
      <TextError isError={isError} message={message} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: null,
    flexDirection: 'column',
  },
  wrapInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: moderateScale(54),
    padding: moderateScale(8),
    borderRadius: moderateScale(4),
    marginTop: moderateScale(8),
  },
  textInput: {
    width: '100%',
    fontFamily: Fonts.type.regular,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(22),
    color: Colors.textDark,
    marginBottom: Platform.OS === 'android' ? moderateScale(-8) : 0,
  },
  titleStyles: {
    fontFamily: Fonts.type.regular,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: moderateScale(4),
    position: 'absolute',
  },
  wrapIconPassword: {
    position: 'absolute',
    right: moderateScale(8),
    bottom: moderateScale(13),
    backgroundColor: Colors.white,
  },
  iconRight: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
});
