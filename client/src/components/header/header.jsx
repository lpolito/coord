import React from 'react';
import PropTypes from 'prop-types';
import styles from './header.css';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <button className={`${styles.burger} fa fa-bars`} onClick={this.props.toggleNav} />
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

Header.propTypes = {
  toggleNav: PropTypes.func.isRequired
};

export default Header;
