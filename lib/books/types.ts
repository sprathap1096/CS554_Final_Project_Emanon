import { DocumentReference, QuerySnapshot } from "firebase/firestore";
import { ICartItemAttributes } from "../cart/types";

export type TBookDocumentReference =
  | DocumentReference<IBookAttributes>
  | { userId: string; bookId: string };

export interface IBookAttributes {
  title: string;
  author: string;
  description: string;
}

export interface IAddBooksParams {
  cart: QuerySnapshot<ICartItemAttributes>;
}
