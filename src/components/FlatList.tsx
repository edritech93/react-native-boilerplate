import React, {useEffect, useRef} from 'react';
import {
  FlatList as DefaultFlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
  FlatListProps,
} from 'react-native';

interface IFlatList extends FlatListProps<any> {
  style?: StyleProp<ViewStyle>;
  onGetRef?: (args: any) => void;
  onGoBottom?: (args: boolean) => void;
  [rest: string]: any;
}

export default function FlatList(props: IFlatList) {
  const {style, onGetRef, onGoBottom, ...restProps} = props;

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
    <DefaultFlatList
      ref={REF_LIST}
      scrollEventThrottle={500}
      keyExtractor={(_, index) => index.toString()}
      onScroll={_onScroll}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={[styles.container, style]}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
