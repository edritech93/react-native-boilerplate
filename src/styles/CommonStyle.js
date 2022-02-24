import {moderateScale} from '../libs/scaling';
import {Colors, Metrics} from '../themes';

export const container = {
  flex: 1,
  backgroundColor: Colors.white,
};

export const emptyStateContainer = {
  flex: 1,
  backgroundColor: Colors.white,
  justifyContent: 'center',
  alignItems: 'center',
};

export const horizontalMargin = {
  marginHorizontal: moderateScale(16),
};

export const horizontalSpacing = {
  paddingHorizontal: moderateScale(16),
};

export const paddedContainer = {
  ...container,
  ...horizontalSpacing,
};

export const modalContainer = {
  paddingBottom: moderateScale(20),
  backgroundColor: Colors.white,
  paddingTop: moderateScale(8),
  paddingHorizontal: moderateScale(16),
  height: null,
};

export const modalContainerFill = {
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  backgroundColor: Colors.white,
  height: Metrics.screenHeight - moderateScale(60),
  paddingTop: moderateScale(8),
  paddingBottom: moderateScale(20),
  paddingHorizontal: moderateScale(16),
};

export const checkBox = {
  width: moderateScale(16),
  height: moderateScale(16),
  marginTop: moderateScale(2),
};

export const icon = {
  height: moderateScale(30),
  width: moderateScale(30),
};

export const smallIcon = {
  height: moderateScale(24),
  width: moderateScale(24),
};

export const flatListTitle = {
  marginTop: moderateScale(24),
  marginHorizontal: moderateScale(16),
};

export const filterContainer = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginHorizontal: 16,
  marginBottom: 10,
};

export const flatListWFloatingBtn = {paddingBottom: moderateScale(60)};
export const flexDirectionCol = {flex: 1, flexDirection: 'column'};
export const flexDirectionRow = {flex: 1, flexDirection: 'row'};
export const loaderTopMargin = {marginTop: moderateScale(20)};
export const flexOne = {flex: 1};
