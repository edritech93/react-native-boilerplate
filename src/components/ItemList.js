import React from 'react';
import {StyleSheet} from 'react-native';
import {RadioButton, Divider} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';
import FlatList from './FlatList';

export default function ItemList(props) {
  const {
    selected = [],
    data = [],
    radioColor = Colors.primary,
    onPress,
    ...restProps
  } = props;

  const _renderItem = ({item}) => {
    const isSelect = selected.find(e => e && e.value === item.value)
      ? true
      : false;
    return (
      <RadioButton.Item
        style={styles.wrapItem}
        labelStyle={
          isSelect ? [styles.textSelect, styles.textItem] : styles.textItem
        }
        color={radioColor}
        label={item.label}
        value={item.value}
        status={isSelect ? 'checked' : 'unchecked'}
        onPress={() => onPress(item)}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      ListFooterComponent={<Divider />}
      ItemSeparatorComponent={<Divider />}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  wrapItem: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingVertical: moderateScale(12),
  },
  textItem: {
    marginLeft: moderateScale(10),
  },
  textSelect: {
    fontWeight: '800',
  },
});
