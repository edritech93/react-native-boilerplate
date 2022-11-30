import React, {useState, useEffect, createRef} from 'react';
import {StyleSheet} from 'react-native';
import {PrimaryButton} from './Buttons';
import {Title} from './Text';
import {moderateScale} from '../libs/scaling';
import {strings} from '../constants/localize';
import {Metrics} from '../themes';
import ModalContent from './ModalContent';
import ItemList from './ItemList';

export default function ModalRadioButton(props) {
  const {
    isOpen = false,
    title,
    dataSource = [],
    selected,
    onSave,
    onClose,
    containerStyle,
  } = props;

  const [itemSelect, setItemSelect] = useState([selected]);

  const REF_MODAL = createRef();

  useEffect(() => {
    setItemSelect([selected]);
  }, [selected]);

  const _handleSubmit = _ => {
    if (itemSelect.length > 0) {
      onSave(itemSelect[0]);
      REF_MODAL.current.close();
    }
  };

  return (
    <ModalContent
      style={[styles.container, containerStyle]}
      ref={REF_MODAL}
      swipeToClose={true}
      backdrop={true}
      coverScreen={true}
      backdropPressToClose={true}
      transparent={true}
      position={'bottom'}
      entry={'bottom'}
      backdropColor={'black'}
      swipeArea={50}
      isOpen={isOpen}
      onClosed={() => onClose()}>
      <Title style={styles.textTitle}>{title}</Title>
      <ItemList
        data={dataSource}
        selected={itemSelect}
        onPress={item => setItemSelect([item])}
        style={styles.wrapItemList}
      />
      <PrimaryButton
        title={strings.SAVE}
        onPress={_handleSubmit}
        style={styles.btnSave}
      />
    </ModalContent>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Metrics.screenHeight * 0.95,
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
  textTitle: {
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateScale(16),
  },
  wrapItemList: {
    flex: 1,
    marginBottom: moderateScale(8),
  },
  btnSave: {
    alignSelf: 'flex-end',
    marginRight: moderateScale(16),
    marginBottom: moderateScale(16),
  },
});
