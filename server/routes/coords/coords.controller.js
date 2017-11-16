const _ = require('lodash');
const ytVideos = require('./../../apis/google/youtube').videos;
const Coord = require('./../../models/coord');
const Coordinate = require('./../../models/coordinate');
const Jump = require('./../../models/jump');
const timeUtils = require('./../../utils').time;

const get = (req, res) => {
  Coord
    .query()
    .findById(req.params.id)
    .eager('coordinates.jumps')
    .omit(Coordinate, ['coordId', 'createdAt', 'updatedAt'])
    .omit(Jump, ['createdAt', 'updatedAt'])
    .then((coord) => {
      const ytVideoPromises = [];
      _.forEach(coord.coordinates, (coordinate) => {
        // populate youtube data from ytId
        ytVideoPromises.push(ytVideos.get(coordinate.ytId)
          .then((ytVideo) => {
            // parse yt duration to seconds
            coordinate.ytLength = timeUtils.ytDurationToSeconds(ytVideo.contentDetails.duration);
          }));
      });

      Promise.all(ytVideoPromises)
        .then(() => {
          res.send(coord);
        });
    });
};

const getAll = (req, res) => {
  Coord
    .query()
    .then(coords => res.send(coords));
};

module.exports = {
  get,
  getAll
};
