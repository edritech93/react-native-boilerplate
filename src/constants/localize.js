import LocalizedStrings from 'react-native-localization';
import en from './language/en';
import id from './language/id';

let strings = new LocalizedStrings({
  'en-US': en,
  en: en,
  id: id,
});

export default strings;
