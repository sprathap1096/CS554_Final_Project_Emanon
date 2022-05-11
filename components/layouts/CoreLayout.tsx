import Head from "next/head";
import styles from "./layout.module.scss";
import { PropsWithChildren } from "react";

import useAuthContext from "@App/lib/auth/AuthContext";
import AuthenticatedLayout from "./AuthenticatedLayout";

export const siteTitle = "Digital Coach";

export default function CoreLayout({ children }: PropsWithChildren<{}>) {
  const auth = useAuthContext();

  const renderLayout = () => {
    if (auth.currentUser)
      return <AuthenticatedLayout>{children}</AuthenticatedLayout>;

    return children;
  };

  return (
    <>
      <Head>
        <title>Emanon</title>
        <meta name="description" content="Senior Design" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page_container}>
        <div className={styles.container}>
          <Head>
            <title>{siteTitle}</title>
          </Head>

          <main className={styles.mainContainer}>{renderLayout()} </main>
        </div>
      </div>
    </>
  );
}
