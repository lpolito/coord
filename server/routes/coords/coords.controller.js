const _ = require('lodash');
const ytVideos = require('./../../apis/google/youtube').videos;
const Coord = require('./../../models/coord');
const Angle = require('./../../models/angle');
const Coordinate = require('./../../models/coordinate');
const timeUtils = require('./../../utils').time;

const get = (req, res) => {
  Coord
    .query()
    .findById(req.params.id)
    .eager('angles.coordinates')
    .omit(Angle, ['coordId', 'createdAt', 'updatedAt'])
    .omit(Coordinate, ['angleId', 'createdAt', 'updatedAt'])
    .then((coord) => {
      const ytVideoPromises = [];
      _.forEach(coord.angles, (angle) => {
        _.forEach(angle.coordinates, (coordinate) => {
          // populate youtube data from ytId
          ytVideoPromises.push(ytVideos.get(coordinate.ytId)
            .then((ytVideo) => {
              // parse yt duration to seconds
              coordinate.ytLength = timeUtils.ytDurationToSeconds(ytVideo.contentDetails.duration);
            }));
        });
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
