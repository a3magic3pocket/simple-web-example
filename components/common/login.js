import { useLogout } from "../../hookes/auth";
import { DefaultButton } from "./button";

export function LoginButton({ className, children }) {
  const handleLogin = () => {
    window.open(
      "//localhost:8080/login?redirect-url=localhost:3000/check",
      "SIMPLE-LOCKER login",
      "scrollbars=no,width=320,height=400,menubar=false,resizable=yes"
    );
  };
  return (
    <DefaultButton className={className} onClick={handleLogin}>
      {children}
    </DefaultButton>
  );
}

export function LogoutButton({ className, children }) {
  const { handleLogout } = useLogout();

  return (
    <DefaultButton className={className} onClick={handleLogout}>
      {children}
    </DefaultButton>
  );
}
