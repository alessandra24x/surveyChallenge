import { Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

import ResponseList from '../components/ResponseList';
import Survey from '../components/Survey';
import { useContract } from '../hooks/contract';
import surveyMock from '../survey.json';

const SurveyContainer = () => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const { account } = useWeb3React();

  const { contract } = useContract();

  const surveyQuestion = surveyMock.questions[step];
  const showResponses = step === surveyMock.questions.length;
  const { surveyId } = surveyMock;

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

  const submitQuiz = async () => {
    const answersIdArray = responses.map((el) => el.answerId);

    await contract.methods
      .submit(surveyId, answersIdArray)
      .send({ from: account })
      .on('transactionHash', (hash) => {
        return hash;
      })
      .on('error', (error) => {
        return error;
      });
  };

  if (showResponses) {
    return (
      <>
        <ResponseList responses={responses} />
        <Button
          onClick={() => {
            submitQuiz()
              .then((result) => {
                console.log('result', result);
              })
              .catch((e) => {
                if (e.code === 4001) {
                  window.alert('denied transaction');
                }
                console.log('error', e);
              });
          }}
        >
          Enviar respuestas
        </Button>
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
