import 'regenerator-runtime/runtime';

import { ThemeProvider } from 'styled-components';

import '../assets/App.css';

import theme from '../assets/theme';
import DefaultComponent from './default';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <DefaultComponent />
      </div>
    </ThemeProvider>
  );
};

export default App;
