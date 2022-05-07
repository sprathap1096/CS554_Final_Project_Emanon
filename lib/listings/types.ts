import { DocumentReference, Timestamp } from "firebase/firestore";

export type TListingDocumentReference =
  | DocumentReference<IListingAttributes>
  | { userId: string; listingId: string };

export type TListingCollectionReference = { userId: string };

export interface IBaseListing {
  title: string;
  author: string;
  description: string;
  price: number;
}

export interface IListingAttributes extends IBaseListing {
  createdAt: Timestamp;
}
