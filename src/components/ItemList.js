import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {Text} from './Text';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';
import FlatList from './FlatList';
import Devider from './Devider';

export default function ItemList(props) {
  const {
    onPress,
    onPressChild,
    selected = [],
    iconActive,
    iconInactive,
    data = [],
    ...restProps
  } = props;

  const _renderItem = ({item}) => {
    const isSelect = selected.find(e => e && e.id === item.id) ? true : false;
    if (item.children && item.children.length > 0) {
      return (
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.wrapItem}
            onPress={() => onPress(item)}>
            {isSelect ? (
              <Image
                style={[styles.imgStyle, {tintColor: Colors.primary}]}
                source={iconActive}
              />
            ) : (
              <Image style={styles.imgStyle} source={iconInactive} />
            )}
            <Text style={isSelect ? styles.textSelect : {}}>{item.name}</Text>
          </TouchableOpacity>

          {item.children.map((itemChild, indexChild) => {
            const isSelectChild = selected.find(e => e.id === itemChild.id)
              ? true
              : false;
            return (
              <View key={indexChild} style={{flex: 1}}>
                {_renderSeparator()}
                <TouchableOpacity
                  style={[styles.wrapItem, {marginLeft: moderateScale(32)}]}
                  onPress={() => onPressChild(item, itemChild)}>
                  {isSelectChild ? (
                    <Image
                      style={[styles.imgStyle, {tintColor: Colors.primary}]}
                      source={iconActive}
                    />
                  ) : (
                    <Image style={styles.imgStyle} source={iconInactive} />
                  )}
                  <Text style={isSelect ? styles.textSelect : {}}>
                    {itemChild.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.wrapItem} onPress={() => onPress(item)}>
          {isSelect ? (
            <Image
              style={[styles.imgStyle, {tintColor: Colors.primary}]}
              source={iconActive}
            />
          ) : (
            <Image style={styles.imgStyle} source={iconInactive} />
          )}
          <Text style={isSelect ? styles.textSelect : {}}>{item.name}</Text>
        </TouchableOpacity>
      );
    }
  };

  const _renderSeparator = () => {
    return <Devider />;
  };

  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      ListFooterComponent={_renderSeparator}
      ItemSeparatorComponent={_renderSeparator}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  wrapItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
  },
  imgStyle: {
    marginRight: moderateScale(20),
  },
  wrapButton: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateScale(16),
  },
  textSelect: {
    fontWeight: '800',
  },
});
