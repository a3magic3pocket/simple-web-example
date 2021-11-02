import { all, fork } from "redux-saga/effects";
import { combineReducers } from "redux";
import requests, { requestSagas } from "./common/request";
import loading from "./common/loading";
import unauthorized from "./common/unauthorized";
import login from "./login";

const rootReducer = combineReducers({
  loading,
  unauthorized,
  login,
  ...requests,
});

export function* rootSaga() {
  yield all([...requestSagas.map((f) => fork(f))]);
}

export default rootReducer;
