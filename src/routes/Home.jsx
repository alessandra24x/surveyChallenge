import { Button, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import MetaMask from '../assets/MetaMask.svg';
import AccountCard from '../components/AccountCard';
import surveyMock from '../survey.json';
import { configureNetwork } from '../utils';

const isWalletConnected = () => localStorage.getItem('isWalletConnected') === 'true';

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

function App() {
  const { account, library, activate, chainId } = useWeb3React();
  const [error, setError] = useState(null);

  const isRopstenNetwork = account && chainId === 3;
  const isAnotherNetwork = account && !isRopstenNetwork;

  const isDisconnected = !account;

  async function switchNetwork() {
    try {
      await configureNetwork(library);
    } catch (ex) {
      setError("Can't switch network");
    }
  }

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', true);
    } catch (ex) {
      setError("Can't connect to wallet, verify that you have selected the Ropsten network on MetaMask");
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (isWalletConnected()) {
        try {
          await activate(injected);
          localStorage.setItem('isWalletConnected', true);
        } catch (ex) {
          setError("Can't connect to wallet, verify that you have selected the Ropsten network on MetaMask");
        }
      }
    };
    connectWalletOnPageLoad();
  }, [activate]);

  return (
    <div className="Home">
      {error && <div>{error}</div>}
      {isRopstenNetwork ? (
        <Typography variant="h2" gutterBottom>
          {surveyMock.title}
        </Typography>
      ) : (
        <Typography variant="h2" gutterBottom>
          Welcome to DApp Survey
        </Typography>
      )}
      {isDisconnected && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Please connect your wallet
          </Typography>
          <Button onClick={connect} variant="outlined" color="inherit" size="large">
            Metamask
            <img src={MetaMask} width="32px" alt="Metamask logo" />
          </Button>
        </>
      )}
      {isAnotherNetwork && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Please connect to the Ropsten Network
          </Typography>
          <Button onClick={switchNetwork} variant="outlined" color="inherit" size="large">
            Switch Network
          </Button>
        </>
      )}
      {isRopstenNetwork && (
        <>
          <AccountCard />
          <img
            src={surveyMock.image}
            alt="Sample survey"
            style={{
              height: '120px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <Button component={Link} to="/survey" variant="outlined" color="inherit" size="large">
            Start quiz
          </Button>
        </>
      )}
    </div>
    //Todo esto que retorna App puede ser un componente Home llevandose las func tmb
  );
}

export default App;
