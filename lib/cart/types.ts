import { Timestamp } from "firebase/firestore";
import { IBookAttributes } from "../books/types";
import { IBaseListing } from "../listings/types";

export type TCartCollectionReferenceAttribute = { userId: string };

export interface ICartItemAttributes extends IBaseListing {
  addedAt: Timestamp;
}

export interface IAddToCartParams {
  ref: TCartCollectionReferenceAttribute;
  cartItemAttributes: IBaseListing;
}
