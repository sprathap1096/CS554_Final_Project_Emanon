import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import AuthService from "./AuthService";
import { AuthContext } from "./AuthContext";
import { DocumentSnapshot } from "firebase/firestore";
import { IUserAttributes } from "../user/types";
import UserService from "../user/UserService";

export function AuthContextProvider({ children }: PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] =
    useState<DocumentSnapshot<IUserAttributes> | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    AuthService.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocSnapshot = await UserService.getUser({
          userId: user?.uid,
        });

        setCurrentUser(userDocSnapshot);
      }
    });
  }, []);

  const providerValue = useMemo(() => {
    const login = async (email: string, password: string) => {
      try {
        const { user } = await AuthService.login({ email, password });
        const userDocSnapshot = await UserService.getUser({ userId: user.uid });

        setCurrentUser(userDocSnapshot);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const logout = async () => {
      setCurrentUser(null);

      await AuthService.logout();
    };

    const signup = async (email: string, password: string) => {
      try {
        const { user } = await AuthService.signup({ email, password });

        await UserService.createNewUser(user);

        const userDocSnapshot = await UserService.getUser({ userId: user.uid });

        setCurrentUser(userDocSnapshot);
      } catch (error: any) {
        setError(error.message);
      }
    };

    return {
      error,
      login,
      logout,
      signup,
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
