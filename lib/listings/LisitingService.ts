import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import FirebaseService from "../firebase/FirebaseService";
import { ECollections } from "../firebase/types";
import {
  IBaseListing,
  IListingAttributes,
  TListingCollectionReference,
  TListingDocumentReference,
} from "./types";

class ListingService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  getDocRef(ref: TListingDocumentReference) {
    if (ref instanceof DocumentReference) return ref;

    return doc(
      this.firestore,
      ECollections.Users,
      ref.userId,
      ECollections.Listings,
      ref.listingId
    ) as DocumentReference<IListingAttributes>;
  }

  getCollectionRef(ref: TListingCollectionReference) {
    return collection(
      this.firestore,
      ECollections.Users,
      ref.userId,
      ECollections.Listings
    ) as CollectionReference<IListingAttributes>;
  }

  addListing(ref: TListingCollectionReference, listingAttr: IBaseListing) {
    const collectionRef = this.getCollectionRef(ref);

    const listing: IListingAttributes = {
      ...listingAttr,
      createdAt: Timestamp.now(),
    };

    addDoc(collectionRef, listing);
  }
}

export default new ListingService();
