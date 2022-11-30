import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import {useTheme} from 'react-native-paper';
import Modal from 'react-native-modalbox';

const ModalContent = React.forwardRef((props, ref) => {
  const {colors} = useTheme();
  const {getRef, style, children, haveLine = true, ...restProps} = props;

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
      transparent={true}
      position={'bottom'}
      entry={'bottom'}
      backdropColor={'black'}
      swipeArea={50}
      {...restProps}>
      <PaperProvider theme={useTheme()}>
        {haveLine && (
          <View style={[styles.linePanel, {backgroundColor: colors.text}]} />
        )}
        {children}
      </PaperProvider>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    height: null,
  },
  linePanel: {
    alignSelf: 'center',
    width: moderateScale(30),
    height: moderateScale(4),
    borderRadius: moderateScale(8),
    marginTop: moderateScale(8),
    marginBottom: moderateScale(16),
  },
});

export default ModalContent;
