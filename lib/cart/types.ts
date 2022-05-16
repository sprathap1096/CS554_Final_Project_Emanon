import { DocumentReference, Timestamp } from "firebase/firestore";

import { IBaseListing, TListingDocumentReference } from "../listings/types";
import { IUserDocumentReference } from "../user/types";

export type TCartItemDocumentReference =
  | DocumentReference<ICartItemAttributes>
  | { userId: string; cartItemId: string };

export interface IBaseCartItem extends IBaseListing {
  listingRef: TListingDocumentReference;
}

export interface ICartItemAttributes extends IBaseListing {
  addedAt: Timestamp;
}

export interface IAddToCartParams {
  ref: IUserDocumentReference;
  cartItemAttributes: IBaseCartItem;
}
