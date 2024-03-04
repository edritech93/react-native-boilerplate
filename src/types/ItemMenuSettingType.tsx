import {ImageSourcePropType} from 'react-native';

export type ItemMenuSettingType = {
  id: number;
  name: string;
  image: ImageSourcePropType | null;
  onPress: () => void;
};
