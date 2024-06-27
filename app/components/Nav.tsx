import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/game">Game</Link></li>
        <li><Link href="/learn">Learn</Link></li>
        <li><Link href="/booking">Booking</Link></li>
        <li><Link href="/videos">Videos</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
