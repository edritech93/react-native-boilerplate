import LocalizedStrings from 'react-native-localization';
import en from './language/en';
import id from './language/id';

export const LANGUAGE_ID = {
  ENGLISH: 'en',
  INDONESIA: 'id',
};

export const DATA_LANGUAGE = [
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
