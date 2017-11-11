import * as types from './actionTypes';

function url() {
  return '/api/coords/4';
}

export function receiveCoord(json) {
  return { type: types.RECEIVE_COORD, coord: json };
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
      .then(json => dispatch(receiveCoord(json)));
}
