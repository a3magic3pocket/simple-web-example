import { useEffect } from "react";
import { getDomain, getCookiExpires, setCookie } from "../utils/cookie";

export default function Check() {

  useEffect(async () => {
    const expires = getCookiExpires(720);

    const options = {
      path: "/",
      domain: getDomain(),
      expires: expires,
    };
    setCookie("front-login", "success", options);

    localStorage.setItem("trigger", Math.random());

    window.close();
  }, []);

  return <></>;
}
