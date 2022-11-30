import React, {useEffect, useRef} from 'react';
import {FlatList as DefaultFlatList, StyleSheet} from 'react-native';

export default function FlatList(props) {
  const {children, style, onLimitUp, onLimitDown, flatListRef, ...restProps} =
    props;

  const REF_LIST = useRef();

  useEffect(() => {
    if (flatListRef) {
      flatListRef(REF_LIST.current);
    }
  }, [flatListRef]);

  const _handleScroll = event => {
    try {
      const limit = event.nativeEvent.contentOffset.y;
      if (limit > 30) {
        if (onLimitUp) {
          onLimitUp();
        }
      } else {
        if (onLimitDown) {
          onLimitDown();
        }
      }
    } catch (error) {
      console.log('_handleScroll => ', error);
    }
  };

  return (
    <DefaultFlatList
      style={[styles.container, style]}
      ref={REF_LIST}
      keyExtractor={(_, index) => index.toString()}
      onScroll={_handleScroll}
      scrollEventThrottle={500}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...restProps}>
      {children}
    </DefaultFlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
