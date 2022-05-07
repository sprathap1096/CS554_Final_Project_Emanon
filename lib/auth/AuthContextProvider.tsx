import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import AuthService from "./AuthService";
import { AuthContext } from "./AuthContext";

import { DocumentSnapshot } from "firebase/firestore";
import { IUserAttributes } from "../user/types";
import UserService from "../user/UserService";

export function AuthContextProvider({ children }: PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] =
    useState<DocumentSnapshot<IUserAttributes> | null>(null);

  useEffect(() => {
    AuthService.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocSnapshot = await UserService.getUser(user?.uid);

        setCurrentUser(userDocSnapshot);
      }
    });
  }, []);

  const providerValue = useMemo(() => {
    return {
      currentUser,
      setCurrentUser,
    };
  }, [currentUser, setCurrentUser]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
