import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';

import surveyMock from '../survey.json';

const Survey = () => {
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState(null);
  const [value, setValue] = useState('');

  const length = surveyMock.questions.length;
  const lifetimeSeconds = surveyMock.questions[step].lifeTimeSeconds * 1000;

  //setQuestion(Quiz.questions[step]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container fixed>
      <Box sx={{ height: '100vh' }}>
        <Card sx={{ width: '100vh', height: '50vh' }}>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 3 }} variant="standard">
              <FormLabel id="demo-error-radios">{surveyMock.questions[0].text}</FormLabel>
              <RadioGroup name="quiz" value={value} onChange={handleRadioChange}>
                {surveyMock.questions[0].options.map((value) => {
                  <FormControlLabel value={value} control={<Radio />} label={value} />;
                })}
              </RadioGroup>
              <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                Next
              </Button>
            </FormControl>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default Survey;
