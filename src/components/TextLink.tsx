import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Text} from './Text';
import {Colors} from '../themes';

interface TextLinkProps {
  title: string;
  link: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const TextLink = (props: TextLinkProps) => {
  const {title, link, onPress, style, textStyle} = props;
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.textTitleLink, textStyle]}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.textLink, textStyle]}>{link}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextLink;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitleLink: {},
  textLink: {
    color: Colors.accent,
  },
});
