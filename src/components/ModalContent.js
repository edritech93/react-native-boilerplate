import React from 'react';
import {
  View as DefaultView,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Colors} from '../themes';

const styles = StyleSheet.create({
  boxPanel: {
    height: moderateScale(20),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: moderateScale(10),
  },
  linePanel: {
    width: moderateScale(30),
    height: moderateScale(4),
    borderRadius: moderateScale(8),
    backgroundColor: Colors.black,
  },
});

const ModalContent = props => {
  const {style, children, ...restProps} = props;
  return (
    <DefaultView style={style} {...restProps}>
      {Platform.OS === 'android' ? (
        <StatusBar backgroundColor="#00000080" barStyle="light-content" />
      ) : null}

      <DefaultView style={styles.boxPanel}>
        <DefaultView style={styles.linePanel} />
      </DefaultView>
      {children}
    </DefaultView>
  );
};

export default ModalContent;
