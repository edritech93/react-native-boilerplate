import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {PrimaryButton} from './Buttons';
import {Title} from './Text';
import {LabelValueType} from '../types/LabelValueType';
import {moderateScale} from '../libs/scaling';
import {strings} from '../constants/localize';
import {Metrics} from '../themes';
import ModalContent from './ModalContent';
import Modal from 'react-native-modalbox';
import ItemList from './ItemList';

interface ModalRadioButtonProps {
  title: string;
  dataSource: LabelValueType[];
  selected: LabelValueType | null | undefined;
  isOpen: boolean;
  onSave: (args: any) => void;
  onClose: () => void;
  containerStyle: StyleProp<ViewStyle>;
}

const ModalRadioButton = (props: ModalRadioButtonProps) => {
  const {
    title,
    dataSource = [],
    selected = null,
    isOpen = false,
    onSave,
    onClose,
    containerStyle,
  } = props;

  const [itemSelect, setItemSelect] = useState<LabelValueType[]>([]);

  const REF_MODAL = useRef<Modal>();

  useEffect(() => {
    if (selected) {
      const arrayUpdate: LabelValueType[] = [];
      arrayUpdate.push(selected);
      setItemSelect(arrayUpdate);
    }
  }, [selected]);

  const _handleSubmit = () => {
    if (itemSelect.length > 0) {
      onSave(itemSelect[0]);
      if (REF_MODAL?.current) {
        REF_MODAL.current.close();
      }
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
        onPress={(item: LabelValueType) => setItemSelect([item])}
        style={styles.wrapItemList}
      />
      <PrimaryButton
        title={strings.SAVE}
        onPress={_handleSubmit}
        style={styles.btnSave}
      />
    </ModalContent>
  );
};

export default ModalRadioButton;

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
