import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './routes/Home';
import Survey from './routes/Survey';

import './App.css';

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
