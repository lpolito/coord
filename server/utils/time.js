const ytDurationToSeconds = (duration) => {
  let a = duration.match(/\d+/g);

  if (duration.indexOf('M') >= 0 && duration.indexOf('H') === -1 && duration.indexOf('S') === -1) {
    a = [0, a[0], 0];
  }
  if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
    a = [a[0], 0, a[1]];
  }
  if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1 && duration.indexOf('S') === -1) {
    a = [a[0], 0, 0];
  }

  let newDuration = 0;
  if (a.length === 3) {
    newDuration += parseInt(a[0], 10) * 3600;
    newDuration += parseInt(a[1], 10) * 60;
    newDuration += parseInt(a[2], 10);
  }
  if (a.length === 2) {
    newDuration += parseInt(a[0], 10) * 60;
    newDuration += parseInt(a[1], 10);
  }
  if (a.length === 1) {
    newDuration += parseInt(a[0], 10);
  }
  return newDuration;
};

module.exports = {
  ytDurationToSeconds
};
