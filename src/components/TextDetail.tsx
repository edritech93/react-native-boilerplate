import React from 'react';
import {StyleProp, View, ViewProps, ViewStyle} from 'react-native';
import {Text} from './Text';
import TitleInput from './TitleInput';

interface ITextDetail extends ViewProps {
  title: string;
  subTitle: string | number | undefined | null;
  style?: StyleProp<ViewStyle>;
  numberOfLines?: number;
}

export default function TextDetail(props: ITextDetail) {
  const {title, subTitle, style, numberOfLines, ...restProps} = props;
  return (
    <View testID={'viewTextDetailId'} style={style} {...restProps}>
      <TitleInput testID={'textTitleId'} title={title} isRequired={false} />
      <Text testID={'textSubTitleId'} numberOfLines={numberOfLines}>
        {subTitle ? subTitle : '-'}
      </Text>
    </View>
  );
}
