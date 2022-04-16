import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createFirebaseApp } from "../lib/firebase/firebase.config";

function MyApp({ Component, pageProps }: AppProps) {
  createFirebaseApp();

  return <Component {...pageProps} />;
}

export default MyApp;
