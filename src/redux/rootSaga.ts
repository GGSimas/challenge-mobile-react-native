import {all} from 'redux-saga/effects';
import hero from './Heroes/sagas';

export default function* rootSaga() {
  yield all([hero]);
}
