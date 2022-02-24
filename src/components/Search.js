import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Fonts, Colors, Metrics} from '../themes';
import TouchableImage from './TouchableImage';
import strings from '../constants/localize';

let dataTimeout = null;

export default function Search(props) {
  const {
    containerStyle,
    isWaiting = false,
    placeholder = strings.SEARCH,
    textInputStyles,
    value = null,
  } = props;

  const [dataSearch, setDataSearch] = useState(value);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (dataTimeout) {
      clearTimeout(dataTimeout);
    }
    setIsInit(true);
  }, []);

  useEffect(() => {
    if (isInit) {
      setDataSearch(value);
    }
  }, [value]);

  useEffect(() => {
    if (isInit) {
      if (isWaiting) {
        if (dataTimeout) {
          clearTimeout(dataTimeout);
        }
        dataTimeout = setTimeout(() => {
          props.onChange(dataSearch);
        }, 3000);
      } else {
        props.onChange(dataSearch);
      }
    }
  }, [dataSearch]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.textInput, textInputStyles]}
        value={dataSearch}
        placeholder={placeholder}
        underlineColorAndroid={'transparent'}
        onChangeText={text => setDataSearch(text)}
      />
      <TouchableImage
        icon={require('../assets/images/search-24.png')}
        size={moderateScale(24)}
        onPress={() => props.onChange(dataSearch)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: moderateScale(35),
    width: Metrics.screenWidth * 0.7,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.type.regular,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(18),
    color: Colors.textDark,
    marginBottom: moderateScale(-4),
  },
});
