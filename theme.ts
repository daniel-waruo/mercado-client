import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#9b7ddf',
      light: '#f5f6fa'
    },
    secondary: {
      main: '#19857b',
      light:'#ffffff'
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
