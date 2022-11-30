import {Appearance} from 'react-native';
import {
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from 'react-native-paper';
import {
  DefaultTheme as DefaultThemeNav,
  DarkTheme as DarkThemeNav,
} from '@react-navigation/native';
import {Colors} from '.';

export const THEME_ID = {
  SYSTEM: 0,
  LIGHT: 1,
  DARK: 2,
};

export const DATA_THEME = [
  {
    label: 'System',
    value: THEME_ID.SYSTEM,
  },
  {
    label: 'Light',
    value: THEME_ID.LIGHT,
  },
  {
    label: 'Dark',
    value: THEME_ID.DARK,
  },
];

const themeLight = {
  ...DefaultThemePaper,
  colors: {
    ...DefaultThemePaper.colors,
    primary: Colors.primary,
    accent: Colors.accent,
  },
};

const themeDark = {
  ...DarkThemePaper,
  colors: {
    ...DarkThemePaper.colors,
    primary: Colors.primary,
    accent: Colors.accent,
  },
};

export function getThemeApp(id = 0) {
  const isDarkMode = Appearance.getColorScheme() === 'dark';
  switch (id) {
    case THEME_ID.SYSTEM:
      return {
        isDark: isDarkMode,
        theme_paper: isDarkMode ? themeDark : themeLight,
        theme_nav: isDarkMode ? DarkThemeNav : DefaultThemeNav,
      };

    case THEME_ID.LIGHT:
      return {
        isDark: false,
        theme_paper: themeLight,
        theme_nav: DefaultThemeNav,
      };

    case THEME_ID.DARK:
      return {
        isDark: true,
        theme_paper: themeDark,
        theme_nav: DarkThemeNav,
      };

    default:
      return {
        isDark: isDarkMode,
        theme_paper: isDarkMode ? themeDark : themeLight,
        theme_nav: isDarkMode ? DarkThemeNav : DefaultThemeNav,
      };
  }
}
