import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/common/loading";
import { occured401 } from "../modules/common/unauthorized";

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  const INIT = `${type}_INIT`;
  return [type, SUCCESS, FAILURE, INIT];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });

      // Unauthorized 401 error 발생 
      if (e.response.status === 401) {
        yield put(occured401(type));
      }
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
