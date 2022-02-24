import {StyleSheet} from 'react-native';
import {moderateScale} from '../libs/scaling';
import Colors from './Colors';

const UI = StyleSheet.create({
  tabBar: {
    height: moderateScale(48),
    backgroundColor: Colors.white,
    elevation: 1,
    shadowColor: 'rgba(0,0,0, 0.3)',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  indicator: {
    backgroundColor: Colors.blueHard,
  },
});

export default UI;
