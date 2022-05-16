import { DocumentReference, Timestamp } from "firebase/firestore";

import {
  IBaseListing,
  IListingAttributes,
  TListingDocumentReference,
} from "../listings/types";
import { IUserDocumentReference } from "../user/types";

export type TCartItemDocumentReference =
  | DocumentReference<ICartItemAttributes>
  | { userId: string; cartItemId: string };

export interface IBaseCartItem extends IBaseListing {
  listingRef: DocumentReference<IListingAttributes>;
}

export interface ICartItemAttributes extends IBaseCartItem {
  addedAt: Timestamp;
}

export interface IAddToCartParams {
  ref: IUserDocumentReference;
  cartItemAttributes: IBaseCartItem;
}
