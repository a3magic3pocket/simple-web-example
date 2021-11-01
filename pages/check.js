import { useEffect } from "react";

export default function Check() {
  useEffect(() => {
    localStorage.setItem("login", "success");
    window.close();
  });

  return <button>dd</button>;
}
