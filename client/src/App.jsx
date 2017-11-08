import React from 'react';
import styles from './App.css';
import Header from './components/header/header';
import Nav from './components/nav/nav';
import CoordPlayerContainer from './containers/coord-player.container';

class App extends React.Component {
  render() {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.app}>
          <Nav />
          <div className={styles.content}>
            <div className={styles.center}>
              <CoordPlayerContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
