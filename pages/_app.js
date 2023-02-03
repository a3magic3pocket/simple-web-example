import wrapper from "../store/configureStore";
import "../styles/globals.css";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default wrapper.withRedux(MyApp);
