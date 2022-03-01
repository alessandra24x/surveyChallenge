import { createTheme } from '@mui/material';

const blues = {
  900: '#001e3c',
  800: '#002e54',
  700: '#033760',
  600: '#0e406b',
  500: '#174772',
  400: '#406083',
  300: '#627a97',
  200: '#8d9fb4',
  100: '#b9c4d3',
  50: '#e4e8ec',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: blues[900],
      paper: blues[900],
    },
    primary: blues,
  },
});

export default theme;
