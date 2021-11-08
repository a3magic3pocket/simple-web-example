import { useLogout } from "../../hookes/auth";
import { DefaultButton } from "./button";

export function LoginButton({ className, children }) {
  // Reference by : https://stackoverflow.com/questions/10380015/set-window-popup-coordinates
  //                https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
  const handleLogin = () => {
    const w = 320;
    const h = 400;
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;

    window.open(
      `//${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/login?redirect-url=${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/check`,
      "SIMPLE-LOCKER login",
      `scrollbars=no,width=${w},height=${h},menubar=false,resizable=yes,top=${top},left=${left}`
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
