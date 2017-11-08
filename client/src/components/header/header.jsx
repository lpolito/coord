import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toggleNav from './../../store/nav/actions';

import styles from './header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav(e) {
    e.preventDefault();
    this.props.toggleNav();
  }

  render() {
    return (
      <header className={styles.header}>
        <button className={`${styles.burger} fa fa-bars`} onClick={this.toggleNav} />
        <h1 className={styles.h1}>Coord</h1>
      </header>
    );
  }
}

Header.propTypes = {
  toggleNav: PropTypes.func
};

Header.defaultProps = {
  toggleNav: {}
};

function mapDispatchToProps(dispatch) {
  return {
    toggleNav: bindActionCreators(toggleNav, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Header);
