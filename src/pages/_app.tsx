import type {AppProps} from "next/app";
import "@styles/global.css";
import SnackbarProvider from "react-simple-snackbar";

export default function App({Component, pageProps}: AppProps) {
  return (
    <SnackbarProvider>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}
