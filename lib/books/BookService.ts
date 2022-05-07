import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  getFirestore,
} from "firebase/firestore";
import FirebaseService from "../firebase/FirebaseService";
import { ECollections } from "../firebase/types";
import {
  IBookAttributes,
  TBookCollectionReference,
  TBookDocumentReference,
} from "./types";

class BookService extends FirebaseService {
  firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  getDocRef(ref: TBookDocumentReference) {
    if (ref instanceof DocumentReference) return ref;

    return doc(
      this.firestore,
      ECollections.Users,
      ref.userId,
      ECollections.Listings,
      ref.bookId
    ) as DocumentReference<IBookAttributes>;
  }

  getCollectionRef(ref: TBookCollectionReference) {
    return collection(
      this.firestore,
      ECollections.Users,
      ref.userId,
      ECollections.Books
    ) as CollectionReference<IBookAttributes>;
  }

  async addBook(ref: TBookCollectionReference, bookAttr: IBookAttributes) {
    const collectionRef = this.getCollectionRef(ref);

    return addDoc(collectionRef, bookAttr);
  }
}

export default new BookService();
