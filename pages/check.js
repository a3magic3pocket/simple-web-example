import { useEffect } from "react";
import { getCandidateDomains, getCookiExpires, setCookie } from "../utils/cookie";

export default function Check() {

  useEffect(async () => {
    const expires = getCookiExpires(720);

    const domains = getCandidateDomains();
    for (const domain of domains) {
      const options = {
        path: "/",
        domain,
        expires: expires,
      };
      setCookie("login", "success", options);
    }

    localStorage.setItem("trigger", Math.random());

    window.close();
  }, []);

  return <></>;
}
