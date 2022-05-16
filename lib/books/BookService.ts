import {
  addDoc,
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

  getCollectionRef(ref: IUserDocumentReference) {
    if (ref instanceof DocumentReference)
      return collection(
        ref,
        ECollections.Books
      ) as CollectionReference<IBookAttributes>;

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

  async fetchUserBooks(ref: IUserDocumentReference) {
    const collectionRef = this.getCollectionRef(ref);

    return getDocs(collectionRef);
  }
}

export default new BookService();
