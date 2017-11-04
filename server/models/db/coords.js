const db = require('./');

const test = () => {
  // db.any('SELECT * FROM coords WHERE active = $1', [true])
  //   .then((data) => {
  //     // success;
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     // error;
  //     console.log(error);
  //   });

  db.tx(t =>
    // this.ctx = transaction config + state context;
    t.batch([
      t.none('CREATE TABLE test(id SERIAL NOT NULL)')
    ]))
    .then((data) => {
      // success;
      console.log('DATA:', data);
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
};

module.exports = test;
