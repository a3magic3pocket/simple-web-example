import { setIsLogged, setUserName } from "../modules/login";
import { occured401, init401 } from "../modules/common/unauthorized";
import { finishLoading, startLoading } from "../modules/common/loading";


test("login reducer test", () => {
  expect(setIsLogged(true)).toEqual({
    type: "login/IS_LOGGED",
    payload: true,
  });
  expect(setUserName("test")).toEqual({
    type: "login/USER_NAME",
    payload: "test",
  });
});

test("unauthoized reducer test", () => {
  expect(occured401("testRequestFunction")).toEqual({
    type: "unauthorized/OCCURED",
    payload: "testRequestFunction",
  });
  expect(init401()).toEqual({
    type: "unauthorized/INIT",
  });
});

test("loading reducer test", () => {
  expect(startLoading("testRequestFunction")).toEqual({
    type: "loading/START_LOADING",
    payload: "testRequestFunction",
  });
  expect(finishLoading("testRequestFunction")).toEqual({
    type: "loading/FINISH_LOADING",
    payload: "testRequestFunction",
  });
});
