import {
  addDoc,
  collection,
  collectionGroup,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  getDocs,
  getFirestore,
  query,
  Query,
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

  getCollectionGroupRef() {
    return collectionGroup(
      this.firestore,
      ECollections.Listings
    ) as Query<IListingAttributes>;
  }

  async addListing(
    ref: TListingCollectionReference,
    listingAttr: IBaseListing
  ) {
    const collectionRef = this.getCollectionRef(ref);

    const listing: IListingAttributes = {
      ...listingAttr,
      createdAt: Timestamp.now(),
    };

    return addDoc(collectionRef, listing);
  }

  async fetchAllListings() {
    const groupQuery = query(this.getCollectionGroupRef());
    return getDocs(groupQuery);
  }
}

export default new ListingService();
