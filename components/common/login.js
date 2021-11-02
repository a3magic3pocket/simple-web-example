import { useLogout } from "../../hookes/auth";
import { DefaultButton } from "./button";

export function LoginButton({ className, children }) {
  // Reference by : https://stackoverflow.com/questions/10380015/set-window-popup-coordinates
  const handleLogin = () => {
    const width = 320;
    const height = 400;
    const top = parseInt(screen.availHeight / 2 - height / 2);
    const left = parseInt(screen.availWidth / 2 - width / 2);

    window.open(
      "//localhost:8080/login?redirect-url=localhost:3000/check",
      "SIMPLE-LOCKER login",
      `scrollbars=no,width=${width},height=${height},menubar=false,resizable=yes,top=${top},left=${left}`
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
