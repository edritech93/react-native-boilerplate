import React, {useState, useEffect} from 'react';
import {StyleProp, StyleSheet, ViewProps, ViewStyle} from 'react-native';
import {Searchbar as DefaultSearchbar} from 'react-native-paper';
import {strings} from '../constants/localize';
import {moderateScale} from '../libs/scaling';
import {Fonts} from '../themes';

let TIME_OUT_SEARCH: any = null;

interface ISearch extends ViewProps {
  isWaiting?: boolean;
  placeholder?: string;
  value?: string;
  onChange: (args: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function Search(props: ISearch) {
  const {
    isWaiting = false,
    placeholder = `${strings.SEARCH}...`,
    value = '',
    onChange,
    containerStyle,
    ...restProps
  } = props;

  const [search, setSearch] = useState<string>(value);
  const [isInit, setIsInit] = useState<boolean>(false);

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
      testID={'searchId'}
      value={search}
      placeholder={placeholder}
      autoCapitalize={'none'}
      autoCorrect={false}
      autoComplete={'off'}
      onChangeText={setSearch}
      inputStyle={styles.textInput}
      style={[styles.container, containerStyle]}
      {...restProps}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(16),
    borderWidth: 1,
  },
  textInput: {
    fontFamily: Fonts.type.regular,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(21),
  },
});
