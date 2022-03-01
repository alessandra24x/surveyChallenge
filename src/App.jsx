import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Web3 from 'web3';

import MainBox from './components/styled/MainBox';
import Home from './routes/Home';
import Survey from './routes/Survey';
import theme from './theme';

function getLibrary(provider) {
  return new Web3(provider);
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container fixed>
          <MainBox>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="survey" element={<Survey />} />
              </Routes>
            </BrowserRouter>
          </MainBox>
        </Container>
      </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default App;
