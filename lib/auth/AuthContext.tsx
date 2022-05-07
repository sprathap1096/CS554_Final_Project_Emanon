import { createContext, Dispatch, SetStateAction, useContext } from "react";

import { DocumentSnapshot } from "firebase/firestore";
import { IUserAttributes } from "../user/types";

interface AuthContextState {
  setCurrentUser: Dispatch<SetStateAction<DocumentSnapshot<IUserAttributes> | null>>;
  currentUser: DocumentSnapshot<IUserAttributes> | null;
}

export const AuthContext = createContext<AuthContextState | null>(null);

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw Error("AuthContext must be provided");
  return context;
}
