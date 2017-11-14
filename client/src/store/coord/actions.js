import * as types from './actionTypes';

function url() {
  return '/api/coords/4';
}

export function deserializeCoord(coord) {
  return {
    type: types.DESERIALIZE_COORD,
    coord
  };
}

export function fetchCoord() {
  return dispatch =>
    fetch(url(), {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        // 'x-api-key': apiKey,
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(deserializeCoord(json)));
}