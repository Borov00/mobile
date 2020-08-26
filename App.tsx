import React from 'react';
import { Button, ThemeProvider, FullTheme } from 'react-native-elements';
import Print from './src/components/print/Print';

const theme: Partial<FullTheme> = {
  colors: {
    primary: '#F2994A',
  }
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Print />
    </ThemeProvider>
  );
};

export default App;