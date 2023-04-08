import type {AppProps} from "next/app";
import "@styles/global.css";
import "@styles/custom.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../public/fonts/font.css";

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
