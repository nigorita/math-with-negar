import Link from 'next/link';
import styles from '../styles/HomePage.module.css';
import React from 'react';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Welcome to Math with Negar</h1>
        <p>Explore our interactive games, learning materials, booking calendar, and videos to enhance your learning experience.</p>
      </header>
      <div className={styles.cards}>
        <div className={styles.card}>
          <img src="/images/game.jpg" alt="Game" />
          <h2>Online Game</h2>
          <p>Engage with our fun and educational math games.</p>
          <Link href="/game" className={styles.cardLink}>Play Now</Link>
        </div>
        <div className={styles.card}>
          <img src="/images/learn.jpg" alt="Learn" />
          <h2>Learn Materials</h2>
          <p>Access a variety of learning resources and materials.</p>
          <Link href="/learn" className={styles.cardLink}>Start Learning</Link>
        </div>
        <div className={styles.card}>
          <img src="/images/booking.jpg" alt="Booking" />
          <h2>Booking Calendar</h2>
          <p>Schedule sessions and plan your study time effectively.</p>
          <Link href="/booking" className={styles.cardLink}>Book Now</Link>
        </div>
        <div className={styles.card}>
          <img src="/images/videos.jpg" alt="Videos" />
          <h2>Videos</h2>
          <p>Watch instructional videos to aid your understanding.</p>
          <Link href="/videos" className={styles.cardLink}>Watch Videos</Link>
        </div>
      </div>
    </div>
  );
}
