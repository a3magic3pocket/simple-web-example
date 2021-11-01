import { all, fork } from "redux-saga/effects";
import { combineReducers } from "redux";
import requests, { requestSagas } from "./common/request";
import loading from "./common/loading";

const rootReducer = combineReducers({
  loading,
  ...requests,
});

export function* rootSaga() {
  yield all([...requestSagas.map((f) => fork(f))]);
}

export default rootReducer;
