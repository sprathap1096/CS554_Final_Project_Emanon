import React, { PropsWithChildren, useEffect } from "react";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import useAuthContext from "./AuthContext";
import AuthService from "./AuthService";

function AuthGuard({ children, router }: PropsWithChildren<WithRouterProps>) {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    AuthService.onAuthStateChanged(async () => {
      const isSignedIn = AuthService.isSignedIn();

      if (!isSignedIn) router.push("/auth/login");
    });
  }, [currentUser, router]);

  if (!currentUser) return <></>;

  return <>{children}</>;
}

export default withRouter(AuthGuard);
