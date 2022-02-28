import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Web3 from 'web3';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Survey from './components/survey';

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="survey" element={<Survey />} />
        </Routes>
      </BrowserRouter>
      ,
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
