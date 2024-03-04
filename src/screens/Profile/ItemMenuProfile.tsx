import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Card, Text} from '../../components';
import {ItemMenuSettingType} from '../../types/ItemMenuSettingType';
import {moderateScale} from '../../libs/scaling';

interface IItemMenuProfile {
  item: ItemMenuSettingType;
}

export default function ItemMenuProfile(props: IItemMenuProfile) {
  const {item} = props;
  const style = item.id === -1 ? {color: 'red'} : null;
  return (
    <Card style={styles.container} onPress={item.onPress}>
      <View style={styles.wrapItemText}>
        {item.image && <Image source={item.image} style={styles.imageItem} />}
        <Text style={style}>{item.name}</Text>
      </View>
      {item.image && (
        <View style={styles.wrapRight}>
          <Image
            source={require('../../assets/images/keyboard_arrow_right-dark-24.png')}
            style={styles.imageArrow}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
  },
  wrapItemText: {
    flex: 1,
    flexDirection: 'row',
  },
  imageItem: {
    marginRight: moderateScale(16),
  },
  wrapRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageArrow: {},
});
