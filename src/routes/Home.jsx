import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import MetaMask from '../assets/MetaMask.svg';
import BasicCard from '../components/Card';
import surveyMock from '../survey.json';
import { configureNetwork } from '../utils';

const MyStyledBox = (props) => {
  return <Box sx={{ height: '100vh' }}>{props.children}</Box>;
};

const isWalletConnected = () => localStorage.getItem('isWalletConnected') === 'true';

function App() {
  const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React();

  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  const isRopstenNetwork = account && chainId === 3;
  const isAnotherNetwork = account && !isRopstenNetwork;

  const isDisconnected = !account;

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function switchNetwork() {
    try {
      await configureNetwork(library);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (isWalletConnected()) {
        try {
          await activate(injected);
          localStorage.setItem('isWalletConnected', true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <div className="Home">
      <CssBaseline />
      <Container fixed>
        <MyStyledBox>
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
              <BasicCard />
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
        </MyStyledBox>
      </Container>
    </div>
    //Todo esto que retorna App puede ser un componente Home llevandose las func tmb
  );
}

export default App;