const google = require('./../google');
const videos = require('./videos');

const youtube = google.youtube('v3');

module.exports = {
  videos: videos(youtube)
};
