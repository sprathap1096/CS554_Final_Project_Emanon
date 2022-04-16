import { createContext, Dispatch, SetStateAction, useContext } from "react";

import { DocumentSnapshot } from "firebase/firestore";
import { IUser } from "../user/types";

interface AuthContextState {
  setCurrentUser: Dispatch<SetStateAction<DocumentSnapshot<IUser> | null>>;
  currentUser: DocumentSnapshot<IUser> | null;
}

export const AuthContext = createContext<AuthContextState | null>(null);

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw Error("AuthContext must be provided");
  return context;
}
