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

export function changeCoordinate(coordinate, ytStart) {
  return {
    type: types.CHANGE_COORDINATE,
    coordinate,
    ytStart
  };
}

export function updatePlayerState(state) {
  return {
    type: types.CHANGE_PLAYER_STATE,
    state
  };
}

export function updatePlayerTime(playerTime) {
  return {
    type: types.CHANGE_PLAYER_TIME,
    playerTime
  };
}
