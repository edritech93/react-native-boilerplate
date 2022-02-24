import {moderateScale} from '../libs/scaling';
import {Colors, Fonts} from '../themes';

// SMALL SIZE
export const small = {
  color: Colors.black,
  fontSize: moderateScale(12),
  lineHeight: moderateScale(18),
  fontFamily: Fonts.type.regular,
};

export const smallSemiBold = {
  ...small,
  fontFamily: Fonts.type.regular,
};

export const smallMedium = {
  ...small,
  fontFamily: Fonts.type.medium,
};

export const smallLight = {
  ...small,
  fontFamily: Fonts.type.light,
};

// NORMAL SIZE
export const normal = {
  color: Colors.black,
  fontSize: moderateScale(14),
  lineHeight: moderateScale(21),
  fontFamily: Fonts.type.regular,
};

export const normalPrimary = {
  ...normal,
  color: Colors.primary,
};

export const normalLight = {
  ...normal,
  fontFamily: Fonts.type.light,
};

export const normalMedium = {
  ...normal,
  fontFamily: Fonts.type.medium,
};

export const normalSemiBold = {
  ...normal,
  fontFamily: Fonts.type.semiBold,
};

export const normalBold = {
  ...normal,
  fontFamily: Fonts.type.bold,
};

// LARGE SIZE
export const large = {
  color: Colors.black,
  fontSize: moderateScale(16),
  lineHeight: moderateScale(25),
  fontFamily: Fonts.type.regular,
};

export const largeBold = {
  ...large,
  fontFamily: Fonts.type.bold,
};

export const largeSemiBold = {
  ...large,
  fontFamily: Fonts.type.semiBold,
};

export const largeMedium = {
  ...large,
  fontFamily: Fonts.type.medium,
};

export const largeLight = {
  ...large,
  fontFamily: Fonts.type.light,
};

// XLARGE SIZE
export const xLarge = {
  color: Colors.black,
  fontSize: moderateScale(24),
  lineHeight: moderateScale(35),
  fontFamily: Fonts.type.regular,
};

export const xLargeSemiBold = {
  color: Colors.black,
  fontSize: moderateScale(24),
  lineHeight: moderateScale(35),
  fontFamily: Fonts.type.semiBold,
};

export const title = {
  color: Colors.black,
  fontFamily: Fonts.type.light,
  fontSize: moderateScale(24),
  lineHeight: moderateScale(35),
};

export const modalTitle = {
  alignSelf: 'center',
  fontFamily: Fonts.type.medium,
  fontSize: moderateScale(14),
  lineHeight: moderateScale(21),
  marginBottom: moderateScale(16),
  color: Colors.black,
  marginTop: moderateScale(10),
};

export const colorPrimary = {
  color: Colors.primary,
};

export const navBarTitle = {
  ...large,
  lineHeight: moderateScale(25),
  fontFamily: Fonts.type.semiBold,
};

export const button = {
  ...normal,
  textAlign: 'center',
  color: Colors.white,
  fontFamily: Fonts.type.medium,
};

export const buttonPrimary = {
  ...normal,
  textAlign: 'center',
  color: Colors.primary,
  fontFamily: Fonts.type.medium,
};
