import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {Text, Title} from './Text';
import {moderateScale} from '../libs/scaling';
import {Colors, Metrics} from '../themes';
import TouchableImage from './TouchableImage';
import ModalBox from 'react-native-modalbox';
import strings from '../constants/localize';
import TextError from './TextError';
import FlatList from './FlatList';
import Search from './Search';

export default function ListPicker(props) {
  const {
    title,
    containerStyle,
    nullLabel = title,
    editable = true,
    isError = false,
    dataSourceType,
    onChange,
    showSearch = true,
    message = strings.NEED_FILL,
    value,
    onCloseModal,
    options = [],
  } = props;

  const [dataSource, setDataSource] = useState(options);
  const [dataSourceTemp, setDataSourceTemp] = useState(options);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dataValue, setDataValue] = useState(null);

  const REF_MODAL = useRef();

  useEffect(() => {
    setDataSource(options);
    setDataSourceTemp(options);
  }, [options]);

  useEffect(() => {
    if (value) {
      setDataValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (dataValue && dataSource && dataSource.length > 0) {
      const dataItem = dataSource.find(e => e.id === dataValue);
      setSelectedOption(dataItem);
    }
  }, [dataSource, dataValue]);

  function _onItemSelect(item) {
    onChange(item.id);
    REF_MODAL.current.close();
  }

  const _onChangeSearchBar = text => {
    const filter = text.toLowerCase();
    const filtered = !filter.length
      ? dataSourceTemp
      : dataSourceTemp.filter(
          ({text}) => text && text.toLowerCase().indexOf(filter) >= 0,
        );
    setDataSource(filtered);
  };

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => _onItemSelect(item)}>
        <Text style={styles.itemText}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  function _renderSearch() {
    return (
      <Search
        containerStyle={styles.searchContainer}
        onChange={text => _onChangeSearchBar(text)}
        onPressRemove={() => setDataSource(dataSourceTemp)}
      />
    );
  }

  function _onModalClosed() {
    if (!dataSourceType) {
      setDataSource(dataSourceTemp);
    }
    if (onCloseModal) {
      onCloseModal();
    }
  }

  function _renderModalList() {
    return (
      <ModalBox
        style={styles.flexOne}
        backdropColor={Colors.black}
        backdropPressToClose={false}
        ref={REF_MODAL}
        swipeToClose={true}
        coverScreen={true}
        transparent={true}
        position={'center'}
        entry={'bottom'}
        backdrop={true}
        onClosed={_onModalClosed}>
        <SafeAreaView style={styles.flexOne}>
          <View style={styles.content}>
            <Title style={styles.header} numberOfLines={1}>
              {title}
            </Title>
            <TouchableImage
              icon={require('../assets/images/cancel-gray-10.png')}
              color={Colors.white}
              size={moderateScale(14)}
              onPress={() => REF_MODAL.current.close()}
              style={{
                position: 'absolute',
                right: moderateScale(16),
              }}
            />
          </View>
          {showSearch && _renderSearch()}
          <FlatList data={dataSource} renderItem={_renderItem} />
        </SafeAreaView>
      </ModalBox>
    );
  }

  const disabledStyle = editable ? {} : styles.disabled;

  return (
    <View style={[styles.container, containerStyle]}>
      {title && selectedOption && <Text style={styles.textTitle}>{title}</Text>}
      <View style={[styles.pickerContainer, disabledStyle]}>
        {editable === false ? (
          <View style={styles.picker}>
            <Text
              style={[styles.itemText, {opacity: selectedOption ? 1 : 0.5}]}>
              {selectedOption ? selectedOption.text : nullLabel}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.picker}
            onPress={() => REF_MODAL.current.open()}>
            <Text
              style={[styles.itemText, {opacity: selectedOption ? 1 : 0.5}]}>
              {selectedOption ? selectedOption.text : nullLabel}
            </Text>
            <Image
              source={require('../assets/images/keyboard_arrow_right-dark-24.png')}
              style={{
                width: moderateScale(24),
                height: moderateScale(24),
                transform: [{rotate: '90deg'}],
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <TextError isError={isError} message={message} />
      {_renderModalList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: moderateScale(54),
  },
  textTitle: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    marginLeft: moderateScale(8),
    marginBottom: moderateScale(-6),
    backgroundColor: Colors.white,
    zIndex: 1,
    alignSelf: 'flex-start',
    color: Colors.primary,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.divider,
    paddingHorizontal: moderateScale(14),
    borderRadius: moderateScale(4),
  },
  picker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    color: Colors.white,
  },
  disabled: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    borderColor: Colors.white,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(19),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    padding: moderateScale(16),
  },
  searchContainer: {
    width: Metrics.screenWidth * 0.9,
    alignSelf: 'center',
    marginVertical: moderateScale(16),
    marginHorizontal: moderateScale(5),
  },
  content: {
    height: moderateScale(50),
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexOne: {flex: 1},
  itemText: {
    flex: 1,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(24),
  },
});
