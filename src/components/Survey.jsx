import { useEffect, useState } from 'react';

import { useInterval } from '../hooks/useInterval';
import Card from './QuestionCard';

const Survey = ({ addResponse, surveyQuestion }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const NO_ANSWERED = 'No answered';

  useEffect(() => {
    setRemainingTime(surveyQuestion.lifetimeSeconds);
  }, [surveyQuestion]);

  useInterval(() => {
    setRemainingTime((remainingTime) => remainingTime - 1);

    if (remainingTime === 1) {
      addResponse(NO_ANSWERED, 0);
    }
  }, 1000);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.elements.quiz.value.split(',');
    const answerText = value[1]
    const answerId = parseInt(value[0])
    addResponse(answerText, answerId);
  };

  return (
    <Card
      image={surveyQuestion.image}
      onSubmit={handleSubmit}
      question={surveyQuestion.text}
      options={surveyQuestion.options.map((option) => option)}
      remainingTime={remainingTime}
    />
  );
};

export default Survey;
