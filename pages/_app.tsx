import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createFirebaseApp } from "../lib/firebase/firebase.config";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthContextProvider } from "../lib/auth/AuthContextProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  createFirebaseApp();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
