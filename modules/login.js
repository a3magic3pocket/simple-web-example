import { createAction, handleActions } from "redux-actions";

const SET_IS_LOGGED = "login/IS_LOGGED";
const SET_USER_NAME = "login/USER_NAME";

export const setIsLogged = createAction(SET_IS_LOGGED, (isLogged) => isLogged);
export const setUserName = createAction(SET_USER_NAME, (userName) => userName);

const initialState = {
  isLogged: false,
  userName: null,
};

const login = handleActions(
  {
    [SET_IS_LOGGED]: (state, action) => ({
      ...state,
      isLogged: action.payload,
    }),
    [SET_USER_NAME]: (state, action) => ({
      ...state,
      userName: action.payload,
    }),
  },
  initialState
);

export default login;
