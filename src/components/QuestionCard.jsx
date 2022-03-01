import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';

/**
 * @param {{
 *   image: string,
 *   onSubmit: () => void,
 *   question: string,
 *   options: string[],
 *   remainingTime: number,
 * }} props
 *
 * @returns {import('react').ReactElement}
 */
const QuestionCard = ({ image, onSubmit, question, options, remainingTime }) => {
  const [value, setValue] = useState('');

  const resetValue = () => setValue('');

  const handleSubmit = (event) => {
    onSubmit(event);
    resetValue();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ width: '100vh' }}>
        <CardMedia component="img" height="140" image={image} />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {question}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {remainingTime} remaining seconds
          </Typography>
          <FormControl variant="standard">
            <RadioGroup defaultValue="" value={value} onChange={(event) => setValue(event.target.value)} name="quiz">
              {options.map((option) => (
                <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button type="submit" color="inherit" size="small">
            Next
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default QuestionCard;
