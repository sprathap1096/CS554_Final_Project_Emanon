import Head from "next/head";
import styles from "./layout.module.scss";
import { PropsWithChildren } from "react";

import useAuthContext from "@App/lib/auth/AuthContext";

export const siteTitle = "Digital Coach";

export default function CoreLayout({ children }: PropsWithChildren<{}>) {
  const auth = useAuthContext();

  return (
    <>
      <Head>
        <title>Digital Coach</title>
        <meta name="description" content="Senior Design" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page_container}>
        <div className={styles.container}>
          <Head>
            <title>{siteTitle}</title>
          </Head>

          <main className={styles.mainContainer}>{children}</main>
        </div>
      </div>
    </>
  );
}
