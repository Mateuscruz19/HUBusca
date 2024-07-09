import { themePattern } from '../types/user.js';

export const lightTheme:themePattern = {
      background: '#fff',
      text: '#000',
      border: '#e5e5e5',
      inputBackground: '#fff',
      placeholder: 'rgba(10, 10, 10, 0.4)',
      closeIconBackground: 'rgba(10, 10, 10, 0.1)',
      neutral: (opacity: any) => `rgba(10, 10, 10, ${opacity})`,
      black:'#000',
      white: '#fff',
      grayBG: '#e5e5e5',
  };
  
export const darkTheme:themePattern= {
      background: '#000',
      text: '#fff',
      border: '#333',
      inputBackground: '#333',
      placeholder: 'rgba(255, 255, 255, 0.4)',
      closeIconBackground: 'rgba(255, 255, 255, 0.1)',
      neutral: (opacity: any) => `rgba(10, 10, 10, ${opacity})`,
      black:'#000',
      white: '#fff',
      grayBG: '#e5e5e5',
  };

export const FontTheme = {
    fontWeights: {
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    radius: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
    },
  };0