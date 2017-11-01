const _ = require('lodash');
const ytVideos = require('./../../models/google/youtube/videos');

const get = (req, res) => {
  let coord;
  new Promise((resolve) => {
    // fake data from db
    coord = {
      title: 'First attempt at coordinations',
      angles: [
        {
          id: 1,
          author: 'YouTube Star 1', // replace with ytAuthorId
          coordinates: [{
            id: 1,
            ytId: 'BMTM0eTDYK8', // video id
            ytLength: null, // length of yt video in seconds
            // ytStart: 0, // place to start yt video
            xCoord: 0, // x position on timeline
            selected: true // whether or not it's going to play
          }]
        }
      ]
    };

    const videoPromises = [];
    _.forEach(coord.angles, (angle) => {
      _.forEach(angle.coordinates, (coordinate) => {
        // populate youtube data from ytId
        videoPromises.push(ytVideos.get(coordinate.ytId)
          .then((video) => {
            // TODO: parse what duration actually means (eg PT4M12S)
            coordinate.ytLength = video.contentDetails.duration;
          }));
      });
    });

    resolve(Promise.all(videoPromises));
  })
    .then(() => {
      res.send(coord);
    });
};

module.exports.get = get;
