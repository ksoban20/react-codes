export interface ITheme {
  font: Font;
  color: Color;
}
export interface Font {
  name: string;
  bold: number;
  semiBold: number;
  heavy: number;
  xBold: number;
}

export interface Color {
  gray: string;
  lightGray: string;
  yellowish: string;
  lightYellow: string;
  fair: string;
  danger: string;
  darkPurple: string;
  primary: {
    dark: string;
    light: string;
    lighter: string;
  };
  note: {
    red: string;
    orange: string;
    yellow: string;
    green: string;
    teal: string;
    blue: string;
    darkBlue: string;
    purple: string;
    pink: string;
    brown: string;
    gray: string;
  };
}
export const color = {
  gray: '#b7b7b7',
  lightGray: '#e7e7e7',
  yellowish: '#f0EA00',
  lightYellow: 'rgba(240,234,0,.6)',
  fair: '#f7f7ff',
  danger: '#ff101f',
  darkPurple: '#1D2D44',
  primary: { dark: '#5b2fb6', light: ' #723BE4', lighter: ' #884fff' },
  note: {
    red: '#F28B82',
    orange: '#FBBC05',
    yellow: '#FFF475',
    green: '#CCFF90',
    teal: '#A7FFEB',
    blue: '#CBF0F8',
    darkBlue: '#AECBFA',
    purple: '#D7AEFB',
    pink: '#FDCFE8',
    brown: '#E6C9A8',
    gray: '#E8EAED',
  },
};
export const theme: ITheme = {
  font: {
    name: 'Montserrat',
    bold: 600,
    semiBold: 500,
    heavy: 800,
    xBold: 700,
  },
  color,
};

export default theme;
