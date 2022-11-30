import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from './Text';
import {Colors} from '../themes';

export default function TextLink(props) {
  const {title, link, onPress, style, textStyle} = props;
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.textTitleLink, textStyle]}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.textLink, textStyle]}>{link}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitleLink: {},
  textLink: {
    color: Colors.secondary,
  },
});
