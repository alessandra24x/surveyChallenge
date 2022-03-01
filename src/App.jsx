import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Web3 from 'web3';

import Home from './routes/Home';
import Survey from './routes/Survey';

function getLibrary(provider) {
  return new Web3(provider);
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="survey" element={<Survey />} />
        </Routes>
      </BrowserRouter>
      ,
    </Web3ReactProvider>
  );
};

export default App;
