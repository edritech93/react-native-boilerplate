import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  LayoutAnimation,
} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Colors, Fonts} from '../themes';
import {Card} from './Card';
import Loader from './Loader';

export function PrimaryButton(props) {
  const {title, onPress, disabled, style, textStyle, icon} = props;
  const buttonBg = disabled ? styles.disabledButton : styles.primaryButton;
  const textStyling = disabled ? styles.disabledButtonText : styles.txtStyle;
  return (
    <TouchableOpacity
      style={[styles.container, buttonBg, style]}
      disabled={disabled}
      onPress={() => onPress()}>
      {icon && <IconLeft icon={icon} />}
      <Text style={[textStyling, textStyle, {color: Colors.white}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function PrimaryButtonLoading(props) {
  const {loading, title, onPress, disabled, style} = props;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [loading]);

  const buttonBg =
    loading || disabled ? styles.disabledButton : styles.primaryButton;
  const textStyling = loading ? styles.disabledButtonText : styles.txtStyle;

  return (
    <TouchableOpacity
      style={[styles.container, buttonBg, style]}
      disabled={disabled || loading}
      onPress={() => onPress()}>
      <Text style={[textStyling, {color: Colors.white}]}>{title}</Text>
      <Loader
        visible={loading}
        loaderSize={moderateScale(20)}
        containerStyle={{flex: 0, marginLeft: 10}}
      />
    </TouchableOpacity>
  );
}

export function SecondaryButton(props) {
  const {title, onPress, disabled, style, icon, txtStyle} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      style={[styles.container, styles.secondaryButton, style]}>
      {icon && <IconLeft icon={icon} />}
      <Text style={[styles.txtStyle, {color: Colors.primary}, txtStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function AccentButton(props) {
  const {title, onPress, disabled, style, txtStyle, icon} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      style={[styles.container, styles.accentButton, style]}>
      {icon && <IconLeft icon={icon} />}
      <Text style={[styles.txtStyle, {color: Colors.primary}, txtStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function GrayButton(props) {
  const {title, onPress, disabled, style, txtStyle, icon} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      style={[styles.container, styles.grayButton, style]}>
      {icon && <IconLeft icon={icon} />}
      <Text style={[styles.txtStyle, {color: Colors.textDark}, txtStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function IconLeft(props) {
  const {icon} = props;
  return (
    <Image source={icon} style={{width: 16, height: 16, marginRight: 4}} />
  );
}

export function FloatingButton(props) {
  const {
    onPress,
    style,
    icon = require('../assets/images/add_icon.png'),
  } = props;
  return (
    <TouchableOpacity
      style={[styles.containerCircle, style]}
      onPress={() => onPress()}>
      {icon && (
        <Image
          style={{
            width: moderateScale(40),
            height: moderateScale(40),
          }}
          source={icon}
        />
      )}
    </TouchableOpacity>
  );
}

export function CircleButton(props) {
  const {icon, onPress, containerStyle} = props;
  return (
    <Card style={[styles.wrapCircle, containerStyle]} onPress={() => onPress()}>
      <Image source={icon} style={styles.iconCircle} />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    height: moderateScale(36),
    flexDirection: 'row',
    borderRadius: moderateScale(4),
    paddingHorizontal: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCircle: {
    position: 'absolute',
    bottom: moderateScale(10),
    right: moderateScale(10),
    backgroundColor: Colors.primary,
    padding: moderateScale(5),
    borderRadius: moderateScale(30),
    shadowColor: 'rgba(69, 91, 99, 0.16)',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  accentButton: {
    backgroundColor: Colors.white,
  },
  disabledButton: {
    backgroundColor: Colors.divider,
  },
  grayButton: {
    height: moderateScale(29),
    paddingHorizontal: moderateScale(8),
    backgroundColor: Colors.grayButton,
  },
  txtStyle: {
    fontFamily: Fonts.type.medium,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(21),
    textAlign: 'center',
  },
  wrapCircle: {
    flex: 0,
    height: moderateScale(54),
    width: moderateScale(54),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(54 * 0.5),
  },
  iconCircle: {
    width: moderateScale(37),
    height: moderateScale(37),
  },
});
