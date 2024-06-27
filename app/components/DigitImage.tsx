import React from 'react';
import styles from '../../styles/DigitImage.module.css';

interface DigitImageProps {
  number: string | number;
}

const DigitImage: React.FC<DigitImageProps> = ({ number }) => {
  const digits = number.toString().split('');
  const isNegative = number.toString().startsWith('-');

  return (
    <div className={styles.digitContainer}>
      {isNegative && <img src="/images/minus.png" alt="-" className={styles.digitImage} />}
      {digits.map((digit, index) => (
        digit !== '-' && <img key={index} src={`/images/${digit}.png`} alt={digit} className={styles.digitImage} />
      ))}
    </div>
  );
};

export default DigitImage;
