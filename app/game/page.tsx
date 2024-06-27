import React from 'react';
import GameComponent from '../components/GameComponent';
import FractionGame from '../components/FractionGame';
import styles from '../../styles/GamePage.module.css';

const GamePage = () => {
  return (
    <div className={styles.page}>
      <h1>Online Game</h1>
      <GameComponent />
      <FractionGame />
    </div>
  
  );
};

export default GamePage;