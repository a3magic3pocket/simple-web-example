import client from "./client";

// api에서 지정된 actionType을 사용하였는지 확인
export const isActionTypeCorrect = (actionType) => {
  return Object.keys(apiMeta).includes(actionType) ? true : false;
};

// api call
export const request = ({ actionType = "", axiosConfig }) => {
  let baseConfig = {};
  if (actionType !== "") {
    baseConfig = apiMeta[actionType]["config"];
  }

  return client({
    ...baseConfig,
    ...axiosConfig,
  });
};

// 공통 api 메타 정보
const commonMeta = {
  debounce: false,
};

// 공통 axiosConfig
const commonAxiosConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

// api 메타 정보
export const apiMeta = {
  "api/SIGNUP": {
    ...commonMeta,
    reducerKey: "apiSignup",
    config: {
      ...commonAxiosConfig,
      url: "/user",
      withCredentials: false,
      method: "POST",
    },
    debounce: false,
  },
  "api/GET_USER": {
    ...commonMeta,
    reducerKey: "apiGetUser",
    config: {
      ...commonAxiosConfig,
      url: "/user",
      withCredentials: true,
      method: "GET",
    },
    debounce: false,
  },
  "api/LOGOUT": {
    ...commonMeta,
    reducerKey: "apiLogout",
    config: {
      ...commonAxiosConfig,
      url: "/logout",
      withCredentials: true,
      method: "POST",
    },
    debounce: false,
  },
  "api/LOCKER_LIST": {
    ...commonMeta,
    reducerKey: "apiLockerList",
    config: {
      ...commonAxiosConfig,
      url: "/lockers",
      withCredentials: true,
      method: "GET",
    },
    debounce: false,
  },
  "api/CREATE_LOCKERS": {
    ...commonMeta,
    reducerKey: "apiCreateLockers",
    config: {
      ...commonAxiosConfig,
      url: "/lockers",
      withCredentials: true,
      method: "POST",
    },
    debounce: false,
  },
  "api/DELETE_LOCKERS": {
    ...commonMeta,
    reducerKey: "apiDeleteLockers",
    config: {
      ...commonAxiosConfig,
      url: "/lockers",
      withCredentials: true,
      method: "DELETE",
    },
    debounce: false,
  },
  "api/UPDATE_LOCKERS": {
    ...commonMeta,
    reducerKey: "apiUpdateLockers",
    config: {
      ...commonAxiosConfig,
      url: "/lockers",
      withCredentials: true,
      method: "PATCH",
    },
    debounce: false,
  },
};
