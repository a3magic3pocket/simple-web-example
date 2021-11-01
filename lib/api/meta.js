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
  "api/LOGIN": {
    ...commonMeta,
    reducerKey: "apiLogin",
    config: {
      ...commonAxiosConfig,
      url: "login",
      withCredentials: false,
    },
    debounce: false,
  },
};
