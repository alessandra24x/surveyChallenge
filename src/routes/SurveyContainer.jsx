import { Button } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponseList from '../components/ResponseList';
import Survey from '../components/Survey';
import { useContract } from '../context/contract';
import surveyMock from '../survey.json';

const SurveyContainer = () => {
  let navigate = useNavigate(); 
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const { account } = useWeb3React();
  const { contract } = useContract();
  
  const surveyId  = Math.floor(Math.random() * 10000);
  const surveyQuestion = surveyMock.questions[step];
  const showResponses = step === surveyMock.questions.length;
  const answersIdArray = responses.map((el) => el.answerId);

  const addResponse = (answerText, answerId) => {
    setResponses((responses) => [
      ...responses,
      {
        question: surveyQuestion.text,
        answerText,
        answerId,
      },
    ]);

    setStep((step) => step + 1);
  };

  const handleSubmit = () => {
    setLoading(true);
		submit()
			.then(() => {
        navigate('/');
			})
			.catch(e => {
				if (e.code === 4001) {
					window.alert('Denied transaction');
				}
        setLoading(false);
				window.alert('An error has occurred. Please try again');
			});
	};
			
  const submit = async() => {
    await contract.methods.submit(surveyId, answersIdArray).send({ from: account })
      .on('confirmation', confirmationNumber => {
        return confirmationNumber;
      })
      .on('error', (error) => {
        return error;
      });
  }
  
  if (showResponses) {
    return (
      <>
        <ResponseList responses={responses} />
        <Box m={2} pt={3}>
          {isLoading ? 
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box> : 
            <Button variant="outlined" color="inherit" size="large"
              onClick={handleSubmit}
            >
              Submit Survey
            </Button>
          }
        </Box>
      </>
    );
  }

  return (
    <>
      <Survey addResponse={addResponse} surveyQuestion={surveyQuestion} />
    </>
  );
};

export default SurveyContainer;
