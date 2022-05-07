import { DocumentReference } from "firebase/firestore";

export type TBookDocumentReference =
  | DocumentReference<IBookAttributes>
  | { userId: string; bookId: string };

export type TBookCollectionReference = { userId: string };

export interface IBookAttributes {
  title: string;
  author: string;
  description: string;
}
