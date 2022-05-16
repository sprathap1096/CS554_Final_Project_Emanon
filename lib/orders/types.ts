import { DocumentReference, Timestamp } from "firebase/firestore";

import { IBaseListing } from "../listings/types";

export type TOrderDocumentReference =
  | DocumentReference<IOrderAttributes>
  | { userId: string; orderId: string };

export interface IBaseOrder {
  order: IBaseListing[];
}
export interface IOrderAttributes extends IBaseOrder {
  createdAt: Timestamp;
}
