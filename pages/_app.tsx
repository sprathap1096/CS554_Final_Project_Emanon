import "../styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthContextProvider } from "../lib/auth/AuthContextProvider";
import "../lib/firebase/firebase.config";
import CoreLayout from "@App/components/layouts/CoreLayout";

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CoreLayout>
          <Component {...pageProps} />
        </CoreLayout>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
