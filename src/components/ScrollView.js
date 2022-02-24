import React, {useRef, useEffect} from 'react';
import {ScrollView as DefaultScrollView} from 'react-native';

export default function ScrollView(props) {
  const {children, style, onLimitUp, onLimitDown, scrollRef, ...restProps} =
    props;

  const SCROLL_REF = useRef('SCROLL_REF');

  useEffect(() => {
    if (scrollRef) {
      scrollRef(SCROLL_REF.current);
    }
  }, []);

  const handleScroll = event => {
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
      console.log('handleScroll => ', error);
    }
  };

  return (
    <DefaultScrollView
      style={[
        {
          flex: 1,
        },
        style,
      ]}
      ref={SCROLL_REF}
      onScroll={handleScroll}
      scrollEventThrottle={500}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...restProps}>
      {children}
    </DefaultScrollView>
  );
}
