import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import AuthService from "./AuthService";

function UnAuthGuard({ children, router }: PropsWithChildren<WithRouterProps>) {
  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      if (!!user) router.push("/");
    });
  }, [router]);

  return <>{children}</>;
}

export default withRouter(UnAuthGuard);
