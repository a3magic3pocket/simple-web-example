import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { getCandidateDomains, getCookiExpires } from "../utils/cookie";

export default function Check() {
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
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

    window.close();
  });

  return <></>;
}
