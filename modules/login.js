/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const login = "login/LOGIN";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const update = (key, newValue) => ({ type: UPDATE, key, newValue });
export const append = (key, newValue) => ({ type: APPEND, key, newValue });
export const updateObject1D = (key, objectKey, newValue) => ({
  type: UPDATE_OBJECT_1D,
  key,
  objectKey,
  newValue,
});
export const appendObject1D = (key, objectKey, newValue) => ({
  type: APPEND_OBJECT_1D,
  key,
  objectKey,
  newValue,
});
export const updateArray1D = (key, arrayIndex, newValue) => ({
  type: UPDATE_ARRAY_1D,
  key,
  arrayIndex,
  newValue,
});
export const appendArray1D = (key, arrayIndex, newValue) => ({
  type: APPEND_ARRAY_1D,
  key,
  arrayIndex,
  newValue,
});

/*
//imageProductTagsMapLists 구조
[
  [
    {
      "product": currentProduct,
      "tags": currentTags,
    }, ...
  ],
]
*/

/* 초기 상태 선언 */
const initialState = {
  images: [],
  originImages: [],
  canvasDataList: [],
  cropBoxDataList: [],
  selectedIndex: 0,
  isSelected: false,
  productSearchKeyword: "",
  currentProduct: {},
  currentTags: [],
  imageProductTagsMapLists: [],
  contentMeta: {},
  showMetaModal: false,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function contentsRegistration(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        [action.key]: action.newValue,
      };
    case APPEND:
      return {
        ...state,
        [action.key]: [
          ...(typeof state[action.key] === "undefined"
            ? []
            : state[action.key]),
          action.newValue,
        ],
      };
    case UPDATE_ARRAY_1D:
      return {
        ...state,
        [action.key]: state[action.key].map((value, index) =>
          index === action.arrayIndex ? action.newValue : value
        ),
      };
    case APPEND_ARRAY_1D:
      return {
        ...state,
        [action.key]: state[action.key].map((value, index) =>
          index === action.arrayIndex
            ? [...state[action.key][action.arrayIndex], action.newValue]
            : value
        ),
      };
    case UPDATE_OBJECT_1D:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          [action.objectKey]: action.newValue,
        },
      };
    case APPEND_OBJECT_1D:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          [action.objectKey]: [
            ...(typeof state[action.key][action.objectKey] === "undefined"
              ? []
              : state[action.key][action.objectKey]),
            action.newValue,
          ],
        },
      };
    default:
      return state;
  }
}
