import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainBox from './styles/MainBox';

import ContractProvider from './hooks/contract';
import Home from './routes/HomeContainer';
import SurveyContainer from './routes/SurveyContainer';
import {theme} from './styles/theme';
import { getLibrary } from './utils/connectors';

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
        <ContractProvider>
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <Container>
              <MainBox>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="survey" element={<SurveyContainer />} />
                  </Routes>
                </BrowserRouter>
                </MainBox>
            </Container>
          </ThemeProvider>
        </ContractProvider>
      </Web3ReactProvider>
  );
};

export default App;
