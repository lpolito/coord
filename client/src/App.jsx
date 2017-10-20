import React from 'react';
import styles from './App.css';
import Header from './components/header';
import Timeline from './components/timeline';

class App extends React.Component {
  render() {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.app}>
          <nav className={styles.nav}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam vitae neque posuere, rutrum est sed, vulputate magna.
            Integer tempus lorem non ultrices accumsan. Ut ut viverra massa.
             Cras tempor commodo lectus sed pellentesque. Fusce sit amet magna
             nec sapien varius feugiat eget quis nisl. In vehicula vulputate
             libero, a laoreet augue egestas vel. Proin non elementum quam. Nunc
             rat elit eu consequat accumsan. Proin ullamcorper convallis massa, a
             c sollicitudin eros bibendum vitae. Pellentesque tempus eleifend ero
             s, a lobortis nisl molestie vitae. Maecenas pharetra lacinia est vitae
             vestibulum. Cras eu magna at lorem lacinia lobortis. Morbi non feugiat e
             rat, ut consequat odio. Aliquam fermentum tincidunt porttitor. Sed pret
             ium at lectus at porttitor.
            Vivamus velit tellus, vestibulum et maximus eget, feugiat in metus. Nu
            llam interdum vel leo nec ultricies. Sed orci sapien, tempor at diam eu,
             laoreet accumsan turpis. Phasellus ullamcorper nisi vitae risus mattis c
             ongue. Cras et accumsan tortor. Curabitur maximus, tortor posuere congue
              cursus, metus ligula fermentum mauris, sed laoreet orci dui imperdiet en
              im. Nunc interdum lectus ut velit porta, nec ultrices lacus feugiat. Qui
              sque urna leo, convallis sed dictum id, sodales vel dui.
            Praesent sagittis velit at viverra tempus. Suspendisse ultricies ante s
            ed pretium tempor. Nullam gravida mi eu lectus viverra congue pharetra e
            u urna. Donec nec orci vel arcu eleifend laoreet quis eu nunc. Sed posue
            re elit a turpis mattis consequat. Ut vitae lacus justo. Donec enim ligu
            la, varius nec mattis et, accumsan vitae velit. Sed euismod ex et augue b
            ibendum euismod. Suspendisse porttitor eleifend ipsum, ut pharetra mauris l
            eet eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Etiam iaculis quis risus eget auctor. Morbi tincidun
            t feugiat nisi. Sed pulvinar tortor quam, in luctus arcu fermentum at.
             In efficitur purus vel enim consequat, vitae vulputate enim digniss
             im. Phasellus pellentesque leo sit amet arcu volutpat, id convallis
             risus interdum.
          </nav>
          <div className={styles.content}>
            <Timeline />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
