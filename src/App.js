import './App.css';
import { ThemeProvider, createTheme } from '@material-ui/core';
import ContainerComponent from './components/ContainerComponent';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0c3b2e",
      light: "#6d9773",
      contrastText: "#ffba00"
    },
    secondary: {
      main: "#b46617",
      light: "#ffba00",
      contrastText: "#0c3b2e"
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContainerComponent />
    </ThemeProvider>
  );
}

export default App;
