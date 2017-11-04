const promise = require('bluebird');
const google = require('googleapis');

const youtube = google.youtube('v3');

const get = ytId =>
  promise.promisify(youtube.videos.list)({
    id: ytId,
    part: 'snippet,contentDetails'
  })
    .then((response) => {
      if (response && response.items.length > 0) {
        // take the first result
        return response.items[0];
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
    });


module.exports = {
  get
};
