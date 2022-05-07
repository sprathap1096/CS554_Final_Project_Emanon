import { DocumentReference, Timestamp } from "firebase/firestore";

export type IUserDocumentReference =
  | DocumentReference<IUserAttributes>
  | { userId: string };
export interface IUserAttributes {
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: Timestamp;
}
