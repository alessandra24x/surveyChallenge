import { Typography, Button } from "@mui/material";
import MetaMask from '../assets/MetaMask.svg';
import { SWITCH } from "../utils/constants";


const Home = ({textTitle, textInfo, textButton, handleClick}) => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
          {textTitle}
      </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {textInfo}
        </Typography>
      <Button onClick={handleClick} variant="outlined" color="inherit" size="large">
          {textButton}
          {textButton === SWITCH ? null : 
          <img src={MetaMask} width="32px" alt="Metamask logo" />}
      </Button>
    </>
  );
};

export default Home;
