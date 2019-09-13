export const colors = {
  PRIMARY_COLOR: '#006caf',
  PLACEHOLDER_TEXT_COLOR: '#a6b1c2',
  INPUT_BORDER: '#babec4',
  INPUT_FOCUS_BORDER: '#0962f1',
  DISABLED_BACKGROUND_COLOR: '#f1f2f4',
  DISABLED_TEXT_COLOR: '#6a707c',
  DISABLED_BORDER_COLOR: '#babec4',
  SPINNER_BACKGROUND: '#c0c1c3',
  SPINNER_TILE: '#2f3237',
  EMPTY_TABLE: '#f1f2f4',
  DANGER_COLOR: '#d0021b',
  MAIN_TEXT_COLOR: '#4a4a4a',
  ACCEPTED_PENDING_COLOR: '#1aaa55',
  EXPIRED_CANCELLED_COLOR: '#d50935',
  CANCEL_ICON_COLOR: '#d50935',
  RESEND_ICON_COLOR: '#0962f1',
  DISABLED_ICON_COLOR: '#e3e5e8',
  DIVIDER_COLOR: '#e3e5e8',
};

export const darkColors = {
  SPINNER_BACKGROUND: '#676a70',
  SPINNER_TILE: '#e3e5e8',
};

export const THEME_TYPES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

export const THEME = [
  {
    mode: THEME_TYPES.LIGHT,
    theme: {
      primary: '#006CAF',
      secondary: '#006CAF',
      danger: '#D50935',
      submit: '#006CAF',
      grey: '#E3E5E8',
      white: '#fff',
      blue: '#1066F2',
      darkgrey: '#9197A1',
      green: '#1aaa55',
      lightgrey: '#E6E6E6',
      basegrey: '#F7F8F8',
      orange: '#f58b3a',
      dark: '#17191C',
      darkaccent: '#25272A',
    },
  },
  {
    mode: THEME_TYPES.DARK,
    theme: {
      primary: '#006CAF',
      secondary: '#33b1ff',
      danger: '#f74a6f',
      submit: '#006CAF',
      grey: '#464B53',
      white: '#fff',
      blue: '#1066F2',
      darkgrey: '#868C97',
      green: '#0ebb56',
      lightgrey: '#E6E6E6',
      basegrey: '#F1F2F3',
      orange: '#f58b3a',
      dark: '#17191C',
      darkaccent: '#25272A',
    },
  },
];

export default colors;
