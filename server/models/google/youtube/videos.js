const Promise = require('bluebird');

module.exports = (youtube) => {
  const get = ytId =>
    Promise.promisify(youtube.videos.list)({
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

  return {
    get
  };
};
