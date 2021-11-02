/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_IS_LOGGED = "login/IS_LOGGED";
const SET_USER_NAME = "login/USER_NAME";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setIsLogged = (isLogged) => ({ type: SET_IS_LOGGED, isLogged });
export const setUserName = (userName) => ({ type: SET_USER_NAME, userName });

/* 초기 상태 선언 */
const initialState = {
  isLogged: false,
  userName: null,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function login(state = initialState, action) {
  switch (action.type) {
    case SET_IS_LOGGED:
      return {
        ...state,
        isLogged: action.isLogged,
      };
    case SET_USER_NAME:
      return {
        ...state,
        userName: action.userName,
      };
    default:
      return state;
  }
}
