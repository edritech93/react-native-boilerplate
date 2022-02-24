import React, {useEffect, useRef} from 'react';
import {FlatList as DefaultFlatList} from 'react-native';

export default function FlatList(props) {
  const {children, style, onLimitUp, onLimitDown, ...restProps} = props;

  const flatListRef = useRef('FLAT_LIST');

  useEffect(() => {
    if (props.flatListRef) {
      props.flatListRef(flatListRef.current);
    }
  }, []);

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
      style={[
        {
          flex: 1,
        },
        style,
      ]}
      ref={flatListRef}
      keyExtractor={(item, index) => index.toString()}
      onScroll={_handleScroll}
      scrollEventThrottle={500}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...restProps}>
      {children}
    </DefaultFlatList>
  );
}
