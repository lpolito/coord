const _ = require('lodash');
const ytVideos = require('./../../apis/google/youtube').videos;
const Coord = require('./../../models/coord');
const timeUtils = require('./../../utils').time;

const get = (req, res) => {
  let coord;
  new Promise((resolve) => {
    // TODO if req.params.id there, get one, else get all

    Coord.query()
      .insertGraph({
        title: 'First attempt at coordinations',
        angles: [
          {
            author: 'YouTube Star 1',
            coordinates: [{
              ytId: 'BMTM0eTDYK8',
              xCoord: 0
            }]
          },
          {
            author: 'Some guy',
            coordinates: [{
              ytId: 'BMTM0eTDYK8',
              xCoord: 200
            }]
          }
        ]
      })
      .then((coords) => {
        // console log
        console.log(coords);
      })
      .catch(err => console.log(err));

    // fake data from db
    coord = {
      id: req.params.id,
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
            coordinate.ytLength = timeUtils.ytDurationToSeconds(video.contentDetails.duration);
          }));
      });
    });

    resolve(Promise.all(videoPromises));
  })
    .then(() => {
      res.send(coord);
    });
};

module.exports = {
  get
};
