import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore";

import FirebaseService from "../firebase/FirebaseService";
import { ECollections } from "../firebase/types";
import { IUserDocumentReference } from "../user/types";
import {
  IAddToCartParams,
  ICartItemAttributes,
  TCartItemDocumentReference,
} from "./types";

class CartService extends FirebaseService {
  firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  getCollectionRef(ref: IUserDocumentReference) {
    if (ref instanceof DocumentReference)
      return collection(
        ref,
        ECollections.Cart
      ) as CollectionReference<ICartItemAttributes>;

    return collection(
      this.firestore,
      ECollections.Users,
      ref.userId,
      ECollections.Cart
    ) as CollectionReference<ICartItemAttributes>;
  }

  getDocRef(ref: TCartItemDocumentReference) {
    if (ref instanceof DocumentReference) return ref;

    return doc(
      this.firestore,
      ECollections.Users,
      ref.userId,
      ECollections.Cart,
      ref.cartItemId
    ) as DocumentReference<ICartItemAttributes>;
  }

  async addToCart({ ref, cartItemAttributes }: IAddToCartParams) {
    const collectionRef = this.getCollectionRef(ref);

    const cartItem: ICartItemAttributes = {
      ...cartItemAttributes,
      addedAt: Timestamp.now(),
    };

    return await addDoc(collectionRef, cartItem);
  }

  async fetchUserCart(ref: IUserDocumentReference) {
    const collectionRef = this.getCollectionRef(ref);

    return await getDocs(collectionRef);
  }

  async deleteCartItem(ref: TCartItemDocumentReference) {
    const docRef = this.getDocRef(ref);

    return await deleteDoc(docRef);
  }
}

export default new CartService();
