import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar as DefaultSearchbar} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import {Fonts, Colors} from '../themes';

let TIME_OUT_SEARCH = null;

export default function Searchbar(props) {
  const {
    style,
    isWaiting = false,
    placeholder = 'Search...',
    textInputStyles,
    value = null,
    onChange,
    ...restProps
  } = props;

  const [search, setSearch] = useState(value);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (TIME_OUT_SEARCH) {
      clearTimeout(TIME_OUT_SEARCH);
    }
    setIsInit(true);
  }, []);

  useEffect(() => {
    if (isInit) {
      setSearch(value);
    }
  }, [value]);

  useEffect(() => {
    if (isInit) {
      if (isWaiting) {
        if (TIME_OUT_SEARCH) {
          clearTimeout(TIME_OUT_SEARCH);
        }
        TIME_OUT_SEARCH = setTimeout(() => {
          onChange(search);
        }, 3000);
      } else {
        onChange(search);
      }
    }
  }, [search]);

  return (
    <DefaultSearchbar
      value={search}
      placeholder={placeholder}
      autoCapitalize={'none'}
      autoCorrect={false}
      autoCompleteType={'off'}
      onChangeText={setSearch}
      inputStyle={styles.textInput}
      style={[styles.container, style]}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  textInput: {
    fontFamily: Fonts.type.regular,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
  },
});
