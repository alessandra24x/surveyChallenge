import { useEffect, useState } from "react";
import { Button, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { Link } from 'react-router-dom';
import { injected } from '../utils/connectors';
import { configureNetwork } from '../utils';

import AccountCard from '../components/AccountCard';
import Home from '../components/Home';
import surveyMock from '../survey.json';
import { WELCOME, CONNECT_WALLET, SWITCH_NETWORK, METAMASK, SWITCH} from "../utils/constants";

function HomeContainer() {
  const [error, setError] = useState(null);
  const { account, library, activate, chainId } = useWeb3React();
  
  const isWalletConnected = () => localStorage.getItem('isWalletConnected') === 'true';

  const isRopstenNetwork = account && chainId === 3;
  const isAnotherNetwork = account && !isRopstenNetwork;

  const isDisconnected = !account;

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

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', true);
    } catch (ex) {
      setError("Can't connect to wallet, verify that you have selected the Ropsten network on MetaMask");
    }
  }

  async function switchNetwork() {
    try {
      await configureNetwork(library);
    } catch (ex) {
      setError("Can't switch network. Please try again");
    }
  }

  return (
    <>
      {error && <div>{error}</div>}
      {isRopstenNetwork && (
        <>
          <Typography variant="h2" gutterBottom>
              {surveyMock.title}
          </Typography>
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
      {isDisconnected && (
        <>
          <Home textTitle={WELCOME} 
                textInfo={CONNECT_WALLET}
                textButton={METAMASK}
                handleClick={connect}
          />
        </>
      )}
      {isAnotherNetwork && (
        <>
          <Home textTitle={WELCOME} 
                textInfo={SWITCH_NETWORK}
                textButton={SWITCH}
                handleClick={switchNetwork}
          />
        </>
      )}
    </>
  );
}

export default HomeContainer;
