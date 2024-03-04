import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Provider as PaperProvider, useTheme} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import Modal, {ModalProps} from 'react-native-modalbox';

interface IModalContent extends ModalProps {
  style: StyleProp<ViewStyle>;
  children: any;
  haveLine?: boolean;
}

const ModalContent = React.forwardRef((props: IModalContent, ref: any) => {
  const {style, children, haveLine = true, ...restProps} = props;

  const {colors} = useTheme();

  return (
    <Modal
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
        style,
      ]}
      ref={ref}
      position={'bottom'}
      entry={'bottom'}
      backdrop={true}
      coverScreen={true}
      backdropColor={colors.backdrop}
      swipeArea={50}
      {...restProps}>
      <PaperProvider theme={useTheme()}>
        {haveLine && (
          <View style={[styles.line, {backgroundColor: colors.onBackground}]} />
        )}
        {children}
      </PaperProvider>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    height: undefined,
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
  },
  line: {
    alignSelf: 'center',
    width: moderateScale(30),
    height: moderateScale(4),
    borderRadius: moderateScale(8),
    marginTop: moderateScale(8),
    marginBottom: moderateScale(16),
  },
});

export default ModalContent;
