import { Button, styled } from '@mui/material';
import { useState } from 'react';

import ResponseList from '../components/ResponseList';
import Survey from '../components/Survey';
import surveyMock from '../survey.json';

const Layout = styled('div')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const SurveyContainer = () => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState([]);

  const surveyQuestion = surveyMock.questions[step];
  const showResponses = step === surveyMock.questions.length;

  const addResponse = (value) => {
    setResponses((responses) => [
      ...responses,
      {
        question: surveyQuestion.text,
        value,
      },
    ]);

    setStep((step) => step + 1);
  };

  if (showResponses) {
    return (
      <Layout>
        <ResponseList responses={responses} />
        <Button
          onClick={() => {
            console.log('enviar respuestitas');
          }}
        >
          Enviar respuestas
        </Button>
      </Layout>
    );
  }

  return (
    <Layout>
      <Survey addResponse={addResponse} surveyQuestion={surveyQuestion} />
    </Layout>
  );
};

export default SurveyContainer;
