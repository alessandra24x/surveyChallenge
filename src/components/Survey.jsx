import { useEffect, useState } from 'react';

import { useInterval } from '../hooks/useInterval';
import Card from './QuestionCard';

/**
 * @param {{
 *   addResponse: (response: string) => void,
 *   surveyQuestion: {
 *     text: string,
 *     image: string,
 *     lifetimeSeconds: number,
 *     options: { text: string }[]
 *   }
 * }} props
 *
 * @returns {import('react').ReactElement}
 */
const Survey = ({ addResponse, surveyQuestion }) => {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    setRemainingTime(surveyQuestion.lifetimeSeconds);
  }, [surveyQuestion]);

  useInterval(() => {
    setRemainingTime((remainingTime) => remainingTime - 1);

    if (remainingTime === 1) {
      addResponse('');
    }
  }, 1000);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.elements.quiz.value;
    addResponse(value);
  };

  return (
    <Card
      image={surveyQuestion.image}
      onSubmit={handleSubmit}
      question={surveyQuestion.text}
      options={surveyQuestion.options.map((option) => option.text)}
      remainingTime={remainingTime}
    />
  );
};

export default Survey;
