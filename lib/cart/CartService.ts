import {
  addDoc,
  collection,
  CollectionReference,
  Firestore,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { IBookAttributes } from "../books/types";
import FirebaseService from "../firebase/FirebaseService";
import { ECollections } from "../firebase/types";
import { IBaseListing } from "../listings/types";
import {
  IAddToCartParams,
  ICartItemAttributes,
  TCartCollectionReferenceAttribute,
} from "./types";

class CartService extends FirebaseService {
  firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  getCollectionRef(ref: TCartCollectionReferenceAttribute) {
    return collection(
      this.firestore,
      ECollections.Users,
      ref.userId,
      ECollections.Cart
    ) as CollectionReference<ICartItemAttributes>;
  }

  async addToCart({ ref, cartItemAttributes }: IAddToCartParams) {
    const collectionRef = this.getCollectionRef(ref);

    const cartItem: ICartItemAttributes = {
      ...cartItemAttributes,
      addedAt: Timestamp.now(),
    };

    return await addDoc(collectionRef, cartItem);
  }
}

export default new CartService();
