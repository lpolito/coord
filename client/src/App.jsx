import React from 'react';
import styles from './App.css';
import Header from './components/header/header';
import Nav from './components/nav/nav';
import CoordPlayer from './views/coord-player/coord-player';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav(e) {
    e.preventDefault();
    this.setState({ navOpen: !this.state.navOpen });
  }

  render() {
    return (
      <div className={styles.page}>
        <Header toggleNav={this.toggleNav} />
        <div className={styles.app}>
          <Nav navOpen={this.state.navOpen} />
          <div className={styles.content}>
            <div className={styles.center}>
              <CoordPlayer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
