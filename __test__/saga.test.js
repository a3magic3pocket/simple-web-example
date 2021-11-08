import requests, {
  getActionTypes,
  requestSagas,
} from "../modules/common/request";
import { apiMeta } from "../lib/api/common";
import createRequestSaga from "../lib/createRequestSaga";
import { call, put } from "redux-saga/effects";
import { finishLoading, startLoading } from "../modules/common/loading";
import { createAction } from "redux-actions";

test("inital request saga test", () => {
  expect(requestSagas.length).toBe(Object.keys(apiMeta).length);

  if (requestSagas.length > 0) {
    expect(typeof requestSagas[0]).toBe("function");
  }
});

test("request reducer test", () => {
  const apiActionTypes = getActionTypes();
  const [baseTypes, successTypes, failureTypes, initTypes] = apiActionTypes;
  const requestsReducer = requests;

  for (const key in apiMeta) {
    const SUCCESS = `${key}_SUCCESS`;
    const FAILURE = `${key}_FAILURE`;
    const INIT = `${key}_INIT`;

    expect(baseTypes.includes(key)).toBe(true);
    expect(successTypes.includes(SUCCESS)).toBe(true);
    expect(failureTypes.includes(FAILURE)).toBe(true);
    expect(initTypes.includes(INIT)).toBe(true);

    const reducerKey = apiMeta[key]["reducerKey"];
    expect(requestsReducer[reducerKey]).not.toBeUndefined();
  }
});

test("saga test success 200", async () => {
  const mockRequest = async ({ actionType = "", axiosConfig }) => {
    return await Promise.resolve().then(() => {
      return { data: [1, 2, 3] };
    });
  };

  const testType = "TEST_TYPE";
  const axiosConfig = {
    reducerKey: "apiLockerList",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
      url: "/lockers",
      withCredentials: true,
      method: "GET",
    },
    debounce: false,
  };

  const testAction = createAction(testType, (axiosConfig) => ({
    actionType: testType,
    axiosConfig,
  }));

  const generator = createRequestSaga(testType, mockRequest);

  const gen = generator(testAction(axiosConfig));

  expect(gen.next().value).toStrictEqual(put(startLoading(testType)));

  expect(gen.next().value).toStrictEqual(
    call(mockRequest, testAction(axiosConfig).payload)
  );

  expect(gen.next({ data: [1, 2, 3] }).value).toStrictEqual(
    put({
      type: "TEST_TYPE_SUCCESS",
      payload: [1, 2, 3],
      meta: { data: [1, 2, 3] },
    })
  );

  expect(gen.next().value).toStrictEqual(put(finishLoading(testType)));
});
