import { createAction, handleActions } from "redux-actions";
import { takeLatest, debounce } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as api from "../../lib/api/meta";

// 액션 타입 번들 생성
const getActionTypes = () => {
  const baseTypes = [];
  const successTypes = [];
  const failureTypes = [];
  const initTypes = [];
  for (const actionType of Object.keys(api.apiMeta)) {
    const [REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, REQUEST_INIT] =
      createRequestActionTypes(actionType);
    baseTypes.push(REQUEST);
    successTypes.push(REQUEST_SUCCESS);
    failureTypes.push(REQUEST_FAILURE);
    initTypes.push(REQUEST_INIT);
  }

  return [baseTypes, successTypes, failureTypes, initTypes];
};
const actionTypes = getActionTypes();

// 액션 생성 함수
export function request(dispatch, apiActionType, axiosConfig) {
  if (!api.isActionTypeCorrect(apiActionType)) {
    throw new Error(
      `apiActionType is not allowed, apiActionType :${apiActionType}`
    );
  }

  const requestActionCreator = createAction(apiActionType, (axiosConfig) => ({
    actionType: apiActionType,
    axiosConfig,
  }));

  dispatch(requestActionCreator(axiosConfig));
}

// 초기화 액션 생성 함수
export function requestInit(dispatch, apiActionType) {
  var INIT_TYPE = `${apiActionType}_INIT`;
  dispatch({ type: INIT_TYPE });
}

// 사가 생성
// Generator 함수 실행 결과를 모은 array를 rootSaga에 삽입
function makeRequestSagas() {
  const result = [];
  const [baseTypes, ..._] = actionTypes;
  for (const baseType of baseTypes) {
    function* requestSaga() {
      if (api.apiMeta[baseType]["debounce"]) {
        yield debounce(300, baseType, createRequestSaga(baseType, api.request));
      } else {
        yield takeLatest(baseType, createRequestSaga(baseType, api.request));
      }
    }
    result.push(requestSaga);
  }

  return result;
}
export const requestSagas = makeRequestSagas();

// 리듀서 번들 생성(handleActions)
// {reducerKey: handleActions}로 구성된 Object를 생성한 후
// combineReducers에 구조 분해 할당
// 각 액션타입의 reducerKey는 api.apiMeta에서 추출
const initialState = {
  result: null,
  error: null,
};

const getRequests = () => {
  const reducers = {};
  const [baseTypes, successTypes, failureTypes, initTypes] = actionTypes;
  for (const [i, successType] of successTypes.entries()) {
    const baseType = baseTypes[i];
    const failureType = failureTypes[i];
    const initType = initTypes[i];
    const reducer = {
      [successType]: (state, { payload: result }) => ({
        ...state,
        result,
        error: null,
      }),
      [failureType]: (state, { payload: error }) => ({
        ...state,
        error,
        result: null,
      }),
      [initType]: (state) => initialState,
    };
    const reducerKey = api.apiMeta[baseType]["reducerKey"];
    reducers[reducerKey] = handleActions(reducer, initialState);
  }

  return reducers;
};

const requests = getRequests();

export default requests;
