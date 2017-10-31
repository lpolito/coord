const youtube = require('./../');

const get = () => {
  youtube.videos.list({
    id: 'BMTM0eTDYK8',
    part: 'snippet,contentDetails,statistics'
  }, (err, response) => {
    if (err) {
      console.log(`The API returned an error: ${err}`);
      return;
    }
    const videos = response.items;
    if (videos.length === 0) {
      console.log('No channel found.');
    } else {
      console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
        'it has %s views.', videos[0].id, videos[0].snippet.title, videos[0].statistics.viewCount);
    }
  });
};

module.exports.get = get;
