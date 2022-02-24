import React, {useRef, useState, useEffect} from 'react';
import {View as DefaultView, StyleSheet} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {PrimaryButton} from './Buttons';
import {Colors} from '../themes';
import {Title} from './Text';
import strings from '../constants/localize';
import ModalContent from './ModalContent';
import Modal from 'react-native-modalbox';
import ItemList from './ItemList';

const styles = StyleSheet.create({
  container: {
    height: null,
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(4),
    borderTopRightRadius: moderateScale(4),
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(16),
  },
  wrapButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateScale(16),
  },
});

export default function ModalRadioButton(props) {
  const {
    isOpen = false,
    title,
    dataSource = [],
    selected,
    onSave,
    onCloseModal,
  } = props;
  const [itemSelect, setItemSelect] = useState([selected]);

  useEffect(() => {
    setItemSelect([selected]);
  }, [selected]);

  const REF_MODAL = useRef('MODAL_RADIO_BUTTON');

  const _handleSubmit = _ => {
    if (itemSelect.length > 0) {
      onSave(itemSelect[0]);
      REF_MODAL.current.close();
    }
  };

  return (
    <Modal
      style={styles.container}
      ref={REF_MODAL}
      backdropColor={Colors.black}
      backdropPressToClose={true}
      swipeToClose={true}
      coverScreen={true}
      transparent={true}
      position={'bottom'}
      entry={'bottom'}
      backdrop={true}
      isOpen={isOpen}
      onClosed={() => onCloseModal()}>
      <ModalContent
        containerStyle={{
          flex: 0,
        }}
      />

      <Title
        style={{
          paddingHorizontal: moderateScale(16),
          marginBottom: moderateScale(16),
        }}>
        {title}
      </Title>

      <ItemList
        style={{
          flex: 0,
          marginBottom: moderateScale(12),
        }}
        data={dataSource}
        selected={itemSelect}
        iconActive={require('../assets/images/radiobutton_active-24.png')}
        iconInactive={require('../assets/images/radiobutton_inactive_24.png')}
        onPress={item => setItemSelect([item])}
      />

      <DefaultView style={styles.wrapButton}>
        <PrimaryButton
          title={strings.SAVE}
          style={{width: '30%'}}
          onPress={_handleSubmit}
        />
      </DefaultView>
    </Modal>
  );
}
