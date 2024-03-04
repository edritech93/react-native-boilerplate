import React, {useEffect, useRef} from 'react';
import {
  ScrollView as DefaultScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';

interface IScrollView extends ScrollViewProps {
  style?: StyleProp<ViewStyle>;
  onGetRef?: (args: any) => void;
  onGoBottom?: (args: boolean) => void;
  [rest: string]: any;
}

export default function ScrollView(props: IScrollView) {
  const {children, style, onGetRef, onGoBottom, ...restProps} = props;

  const REF_LIST = useRef<any>();

  useEffect(() => {
    if (onGetRef) {
      onGetRef(REF_LIST);
    }
  }, [onGetRef]);

  const _onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {nativeEvent} = e;
    const {contentOffset} = nativeEvent;
    const {y} = contentOffset;
    try {
      if (onGoBottom) {
        if (y > 30) {
          onGoBottom(true);
        } else {
          onGoBottom(false);
        }
      }
    } catch (error) {}
  };

  return (
    <DefaultScrollView
      ref={REF_LIST}
      onScroll={_onScroll}
      scrollEventThrottle={500}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={[styles.container, style]}
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
