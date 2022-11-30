import React, {useRef, useEffect} from 'react';
import {ScrollView as DefaultScrollView, StyleSheet} from 'react-native';

export default function ScrollView(props) {
  const {children, style, onLimitUp, onLimitDown, scrollRef, ...restProps} =
    props;

  const SCROLL_REF = useRef();

  useEffect(() => {
    if (scrollRef) {
      scrollRef(SCROLL_REF.current);
    }
  }, [scrollRef]);

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
    <DefaultScrollView
      style={[styles.container, style]}
      ref={SCROLL_REF}
      onScroll={_handleScroll}
      scrollEventThrottle={500}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...restProps}>
      {children}
    </DefaultScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
