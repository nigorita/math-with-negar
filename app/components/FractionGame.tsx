'use client';

import React, { useState, useEffect } from 'react';
import styles from '../../styles/GamePage.module.css';
import DigitImage from './DigitImage';
import Feedback from './Feedback';

interface Fraction {
  numerator: number | string;
  denominator: number | string;
}

interface UserInput {
  numerator: string;
  denominator: string;
  operator: string;
}

const FractionGame = () => {
  const [fraction1, setFraction1] = useState<Fraction>({ numerator: '', denominator: '' });
  const [fraction2, setFraction2] = useState<Fraction>({ numerator: '', denominator: '' });
  const [operator, setOperator] = useState('');
  const [resultFraction, setResultFraction] = useState<Fraction>({ numerator: '', denominator: '' });
  const [missingPart, setMissingPart] = useState('');
  const [userInput, setUserInput] = useState<UserInput>({ numerator: '', denominator: '', operator: '' });
  const [feedback, setFeedback] = useState<string | number>('');

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const op = generateRandomOperator();
    const frac1 = generateRandomFraction();
    const frac2 = generateRandomFraction();
    setOperator(op);
    setFraction1(frac1);
    setFraction2(frac2);
    setResultFraction(calculateResultFraction(frac1, frac2, op));
    setMissingPart(generateRandomMissingPart());
    setUserInput({ numerator: '', denominator: '', operator: '' });
    setFeedback('');
  };

  function generateRandomFraction(): Fraction {
    const numerator = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const denominator = Math.floor(Math.random() * 9) + 1; // 1 to 9
    return { numerator, denominator };
  }

  function generateRandomOperator() {
    const operators = ['+', '-', '*', '/'];
    return operators[Math.floor(Math.random() * operators.length)];
  }

  function generateRandomMissingPart() {
    const parts = ['fraction1Numerator', 'fraction1Denominator', 'fraction2Numerator', 'fraction2Denominator', 'operator', 'resultNumerator', 'resultDenominator'];
    return parts[Math.floor(Math.random() * parts.length)];
  }

  function calculateResultFraction(fraction1: Fraction, fraction2: Fraction, operator: string): Fraction {
    const { numerator: n1, denominator: d1 } = fraction1;
    const { numerator: n2, denominator: d2 } = fraction2;
    let resultNumerator;
    let resultDenominator;

    switch (operator) {
      case '+':
        resultNumerator = (parseFloat(n1 as string) * parseFloat(d2 as string)) + (parseFloat(n2 as string) * parseFloat(d1 as string));
        resultDenominator = parseFloat(d1 as string) * parseFloat(d2 as string);
        break;
      case '-':
        resultNumerator = (parseFloat(n1 as string) * parseFloat(d2 as string)) - (parseFloat(n2 as string) * parseFloat(d1 as string));
        resultDenominator = parseFloat(d1 as string) * parseFloat(d2 as string);
        break;
      case '*':
        resultNumerator = parseFloat(n1 as string) * parseFloat(n2 as string);
        resultDenominator = parseFloat(d1 as string) * parseFloat(d2 as string);
        break;
      case '/':
        resultNumerator = parseFloat(n1 as string) * parseFloat(d2 as string);
        resultDenominator = parseFloat(d1 as string) * parseFloat(n2 as string);
        break;
      default:
        resultNumerator = 0;
        resultDenominator = 1;
    }

    return { numerator: resultNumerator.toString(), denominator: resultDenominator.toString() };
  }
  function handleSubmit() {
    let correct = false;
    let feedbackMessage = 'Incorrect. Please try again.';

    if (missingPart.startsWith('fraction1') || missingPart.startsWith('fraction2')) {
      const correctValue = missingPart.includes('Numerator')
        ? parseFloat(missingPart.includes('fraction1') ? fraction1.numerator as string : fraction2.numerator as string)
        : parseFloat(missingPart.includes('fraction1') ? fraction1.denominator as string : fraction2.denominator as string);
      const userValue = parseFloat(missingPart.includes('Numerator') ? userInput.numerator : userInput.denominator);

      if (correctValue === userValue) {
        correct = true;
        feedbackMessage = 'Correct!';
      }
    } else if (missingPart === 'operator') {
      if (operator === userInput.operator) {
        correct = true;
        feedbackMessage = 'Correct!';
      }
    } else if (missingPart.startsWith('result')) {
      const correctValue = missingPart.includes('Numerator') ? parseFloat(resultFraction.numerator as string) : parseFloat(resultFraction.denominator as string);
      const userValue = parseFloat(missingPart.includes('Numerator') ? userInput.numerator : userInput.denominator);

      if (correctValue === userValue) {
        correct = true;
        feedbackMessage = 'Correct!';
      }
    }

    setFeedback(feedbackMessage);

    console.log('Missing Part:', missingPart);
    console.log('Correct Answer:', correct ? 'Correct!' : 'Incorrect. Please try again.');
  }




  const renderNumberOrInput = (value: number | string, part: string) => {
    if (missingPart === part) {
      return <input className={styles.input} type="text" onChange={(e) => setUserInput({ ...userInput, [part.includes('Numerator') ? 'numerator' : 'denominator']: e.target.value })} />;
    } else {
      return <DigitImage number={value} />;
    }
  };

  const renderResultNumberOrInput = (value: number | string, part: string) => {
    if (missingPart === part) {
      return <input className={styles.input} type="text" onChange={(e) => setResultFraction({ ...resultFraction, [part.includes('Numerator') ? 'numerator' : 'denominator']: e.target.value })} />;
    } else {
      return <DigitImage number={value} />;
    }
  };

  const renderOperatorOrInput = () => {
    if (missingPart === 'operator') {
      return (
        <select className={styles.input} onChange={(e) => setUserInput({ ...userInput, operator: e.target.value })} defaultValue="?">
          <option value="?" disabled hidden>?</option>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
      );
    } else {
      const operatorMap: { [key: string]: string } = {
        '+': 'plus',
        '-': 'minus',
        '*': 'multiply',
        '/': 'divide',
      };
      return <img src={`/images/${operatorMap[operator]}.png`} alt={operator} className={styles.image} />;
    }
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.page}>Fraction Operations Game</h2>
      <div className={styles.fractionContainer}>
        <div className={styles.fraction}>
          {renderNumberOrInput(fraction1.numerator, 'fraction1Numerator')}
          <div className={styles.line}></div>
          {renderNumberOrInput(fraction1.denominator, 'fraction1Denominator')}
        </div>
        <div className={styles.operator}>
          {renderOperatorOrInput()}
        </div>
        <div className={styles.fraction}>
          {renderNumberOrInput(fraction2.numerator, 'fraction2Numerator')}
          <div className={styles.line}></div>
          {renderNumberOrInput(fraction2.denominator, 'fraction2Denominator')}
        </div>
        <div className={styles.equals}>=</div>
        <div className={styles.fraction}>
          {renderResultNumberOrInput(resultFraction.numerator, 'resultNumerator')}
          <div className={styles.line}></div>
          {renderResultNumberOrInput(resultFraction.denominator, 'resultDenominator')}
        </div>
      </div>
      <button className={styles.page} onClick={handleSubmit}>Submit</button><br /><br />
      {feedback && <Feedback message={feedback as string} />}<br /><br />
      <button className={styles.page} onClick={generateNewProblem}>Next Problem</button>
    </div>
  );
};

export default FractionGame;
