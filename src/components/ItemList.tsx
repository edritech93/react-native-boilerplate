import React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {RadioButton, Divider} from 'react-native-paper';
import {LabelValueType} from '../types/LabelValueType';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';
import FlatList from './FlatList';

interface ItemListProps extends ViewProps {
  data: LabelValueType[];
  selected: LabelValueType[];
  radioColor?: string;
  onPress: (args: LabelValueType) => void;
}

export default function ItemList(props: ItemListProps) {
  const {
    data = [],
    selected = [],
    radioColor = Colors.primary,
    onPress,
    style,
    ...restProps
  } = props;

  const _renderItem = ({item}: any) => {
    const itemFind = selected.find(
      (e: LabelValueType) => e && e.value === item.value,
    );
    const isSelect = itemFind ? true : false;
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
        onPress={() => onPress(item as LabelValueType)}
      />
    );
  };

  function _renderSeparator(): any {
    return <Divider />;
  }

  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      ListFooterComponent={_renderSeparator()}
      ItemSeparatorComponent={_renderSeparator()}
      style={style}
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
