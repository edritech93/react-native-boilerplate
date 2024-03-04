import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ItemPoType} from './ItemPoType';

export type RootStackParamList = {
  Home: undefined;
  Today: {userId: string};
  Profile: {sort: 'latest' | 'top'} | undefined;
  Counting: {itemPo: ItemPoType};
};

export type HomeNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type TodayNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Today'
>;

export type CountingNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Counting'
>;
