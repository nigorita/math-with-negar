import React from 'react';
import styles from '../../styles/Feedback.module.css';
import DigitImage from './DigitImage';

interface FeedbackProps {
  message: string;
}

const Feedback: React.FC<FeedbackProps> = ({ message }) => {
  const isCorrect = message === 'Correct!';

  const renderMessage = () => {
    return message.split('').map((char, index) => {
      if (!isNaN(parseInt(char))) {
        return <DigitImage key={index} number={parseInt(char)} />;
      } else if (['+', '-', '*', '/'].includes(char)) {
        const operatorMap: { [key: string]: string } = {
          '+': 'plus',
          '-': 'minus',
          '*': 'multiply',
          '/': 'divide',
        };
        return <img key={index} src={`/images/${operatorMap[char]}.png`} alt={char} className={styles.image} />;
      } else {
        return <span key={index}>{char}</span>;
      }
    });
  };

  return (
    <div className={isCorrect ? styles.correct : styles.incorrect}>
      {renderMessage()}
    </div>
  );
};

export default Feedback;
