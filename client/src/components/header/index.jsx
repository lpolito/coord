import React from 'react';
import styles from './header.css';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <h1 className={styles.h1}>Coord</h1>
        <select className={styles.select}>
          <option>One</option>
          <option>Two</option>
          <option>Three</option>
        </select>
      </header>
    );
  }
}

export default Header;
