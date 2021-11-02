import { createAction, handleActions } from "redux-actions";

const OCCURED = "unauthorized/OCCURED";
const INIT = "unauthorized/INIT";

/*
 요청을 위한 액션 타입을 payload로 설정합니다 (예: "sample/GET_POST")
*/
export const occured401 = createAction(OCCURED, (requestType) => requestType);
export const init401 = createAction(INIT, (requestType) => requestType);

const initialState = {
  unauthorized: false,
  errorRequestType: null,
};

const unauthorized = handleActions(
  {
    [OCCURED]: (state, action) => ({
      ...state,
      unauthorized: true,
      errorRequestType: [action.payload],
    }),
    [INIT]: (state) => initialState,
  },
  initialState
);

export default unauthorized;
