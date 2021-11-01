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
