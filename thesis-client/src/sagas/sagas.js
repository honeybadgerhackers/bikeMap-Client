import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//worker saga - calls API and returns response

const getTripsAsync = function* () {
  try {
    console.log('Attempting to get trips from API');
    const tripsRequest = yield call(axios.get, 'https://18.216.220.101:8091/route');
    console.log(tripsRequest);
    yield put({ type: 'GET_TRIPS_SUCCEEDED', response: tripsRequest });
  } catch (error) {
    console.log(error);
  }
};
//watcher saga - listen for actions to be dispatched, will call worker

const watchGetTrips = function* () {
  console.log('redux saga is running the getTrips action');
  yield takeEvery('GET_TRIPS', getTripsAsync);
};

//combine watcher sagas to root saga

//entry point to start all sagas at once
const rootSaga = function* () {
  yield all([
    watchGetTrips(),
  ]);
};

export { rootSaga, watchGetTrips };
