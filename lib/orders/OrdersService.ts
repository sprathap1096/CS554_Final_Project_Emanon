import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import FirebaseService from "../firebase/FirebaseService";
import { ECollections } from "../firebase/types";
import { IUserDocumentReference } from "../user/types";
import { IOrderAttributes, TOrderDocumentReference } from "./types";

type NewType = IUserDocumentReference;

class OrdersService extends FirebaseService {
  firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  getCollectionRef(ref: IUserDocumentReference) {
    if (ref instanceof DocumentReference)
      return collection(
        ref,
        ECollections.Orders
      ) as CollectionReference<IOrderAttributes>;

    return collection(
      this.firestore,
      ECollections.Users,
      ref.userId,
      ECollections.Orders
    ) as CollectionReference<IOrderAttributes>;
  }

  getDocRef(ref: TOrderDocumentReference) {
    if (ref instanceof DocumentReference) return ref;

    return doc(
      this.firestore,
      ECollections.Users,
      ref.userId,
      ECollections.Orders,
      ref.orderId
    ) as DocumentReference<IOrderAttributes>;
  }

  async fetchUserOrders(ref: IUserDocumentReference) {
    const collectionRef = this.getCollectionRef(ref);

    return await getDocs(collectionRef);
  }
}

export default new OrdersService();
