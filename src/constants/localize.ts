import LocalizedStrings from 'react-native-localization';
import {LabelValueType} from '../types/LabelValueType';
import en from './language/en.json';
import id from './language/id.json';

export const LANGUAGE_ID = {
  ENGLISH: 'en',
  INDONESIA: 'id',
};

export const DATA_LANGUAGE: LabelValueType[] = [
  {
    label: 'English',
    value: LANGUAGE_ID.ENGLISH,
  },
  {
    label: 'Bahasa Indonesia',
    value: LANGUAGE_ID.INDONESIA,
  },
];

export const strings = new LocalizedStrings({
  'en-US': en,
  en: en,
  id: id,
});
