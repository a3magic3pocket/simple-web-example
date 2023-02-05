import { useDispatch, useSelector } from "react-redux";
import { request, requestInit } from "../modules/common/request";
import { apiMeta } from "../lib/api/common";
import { useEffect } from "react";
import { setIsLogged, setUserName } from "../modules/login";
import { useRouter } from "next/router";
import { deleteCookie, getDomain, getCookie, getCookiExpires, setCookie } from "../utils/cookie";

export function updateLogin() {
  const { isLogged } = useSelector((state) => ({
    isLogged: state["login"].isLogged,
  }));

  const dispatch = useDispatch();
  const userAPIActionType = "api/GET_USER";
  const userReducerKey = apiMeta[userAPIActionType]["reducerKey"];
  const { userResult } = useSelector((state) => ({
    userResult: state[userReducerKey].result,
  }));

  // 로그인 성공 시, isLogged 갱신
  // (다른 window에서 localStorage 조작했을 때에만 발동)
  useEffect(() => {
    window.addEventListener(
      "storage",
      function (e) {
        if (e.key !== "trigger") {
          return;
        }
        const loginLS = getCookie('front-login');
        if (loginLS === "success" && !isLogged) {
          dispatch(setIsLogged(true));
        }
      },
      false
    );
  }, []);

  // 사용자가 브라우저 종료 후 재접속한 경우, 로그인 처리
  useEffect(() => {
    const loginLS = getCookie('front-login');
    const userNameLS = getCookie('username');
    if (loginLS !== "success") {
      return;
    }

    dispatch(setIsLogged(true));
    if (userNameLS) {
      dispatch(setUserName(userNameLS));
    } else {
      request(dispatch, userAPIActionType, {});
    }
  }, [isLogged]);

  // 유저 정보 조회로 username을 획득한 경우, 쿠키에 username 저장
  useEffect(() => {
    if (
      userResult !== null &&
      typeof userResult !== "undefined" &&
      typeof userResult.data !== "undefined" &&
      typeof userResult.data.UserName !== "undefined"
    ) {
      dispatch(setUserName(userResult.data.UserName));

      const expires = getCookiExpires(720);
      const options = {
        path: "/",
        expires: expires,
      };
      setCookie("username", userResult.data.UserName, options);

      requestInit(dispatch, userAPIActionType);
    }
  }, [userResult]);
}

export function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutAPIActionType = "api/LOGOUT";
  const logoutReducerKey = apiMeta[logoutAPIActionType]["reducerKey"];
  const { logoutResult, logoutError } = useSelector((state) => ({
    logoutResult: state[logoutReducerKey].result,
    logoutError: state[logoutReducerKey].error,
  }));

  // 로그아웃
  const handleLogout = () => {
    request(dispatch, logoutAPIActionType, {});
  };

  useEffect(() => {
    if (logoutError !== null && typeof logoutError.Error !== "undefined") {
      alert("로그아웃 실패");
    }
  }, logoutError);

  useEffect(() => {
    if (logoutResult !== null && typeof logoutResult.data !== "undefined") {
      deleteCookie("front-login", {
        path: "/",
        domain: getDomain(),
      });
      deleteCookie("username");

      dispatch(setIsLogged(false));
      dispatch(setUserName(""));
      requestInit(dispatch, logoutAPIActionType);
      router.push("/");
    }
  }, [logoutResult]);

  return {
    handleLogout,
  };
}
