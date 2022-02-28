import { useEffect } from 'react'
import './App.css'
import { useWeb3React } from '@web3-react/core'
import {CssBaseline, Container, Box, Button, Typography} from "@mui/material"
import MetaMask from "./MetaMask.svg"
import { InjectedConnector } from '@web3-react/injected-connector'
import {configureNetwork} from './utils'
import surveyMock from './survey.json'
import BasicCard from './components/card'
import { Link } from 'react-router-dom'


function App() {
  const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React()

  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  })

  const isRopstenNetwork = (account && chainId === 3);
  const isDisconnected = !account;
  const isAnotherNetwork = (account && chainId !== 3);

  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function switchNetwork() {
    try {
      await configureNetwork(library)
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [])

  return (
      <div className="App">
          <CssBaseline/>
          <Container fixed>
            <Box sx={{height: "100vh"}}>
              {isRopstenNetwork ? 
                <Typography variant="h2" gutterBottom>{surveyMock.title}</Typography> :
                <Typography variant="h2" gutterBottom>Welcome to DApp Survey</Typography>}
            {isDisconnected &&
            <>
              <Typography variant="subtitle1" gutterBottom>Please connect your wallet</Typography>
              <Button onClick={connect} variant="outlined" color="inherit" size="large">Metamask
                <img src={MetaMask} width="32px" alt="Metamask logo"/>
              </Button>
            </>
            }
            {isAnotherNetwork &&
            <>
              <Typography variant="subtitle1" gutterBottom>Please connect to the Ropsten Network</Typography>
              <Button onClick={switchNetwork} variant="outlined" color="inherit" size="large">
                Switch Network
              </Button> 
            </>
            }
            {isRopstenNetwork &&
              <>
                <BasicCard/>
                <img src={surveyMock.image} alt="Sample survey" style={{height: "120px", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                <Button component={Link} to="/survey" variant="outlined" color="inherit" size="large">
                  Start quiz
                </Button> 
              </>
            }
            </Box>
          </Container>

    </div>
        //Todo esto que retorna App puede ser un componente Home llevandose las func tmb
  )
}

export default App
