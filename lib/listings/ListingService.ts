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
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import FirebaseService from "../firebase/FirebaseService";
import { ECollections } from "../firebase/types";
import {
  IAddListingParams,
  IListingAttributes,
  IUpdateListingParams,
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

  async addListing({ ref, listingAttr }: IAddListingParams) {
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

  async fetchUserListings(ref: TListingCollectionReference) {
    const collectionRef = this.getCollectionRef(ref);

    return await getDocs(collectionRef);
  }

  async deleteListing(ref: TListingDocumentReference) {
    const docRef = this.getDocRef(ref);

    return await deleteDoc(docRef);
  }

  async fetchListing(ref: TListingDocumentReference) {
    const docRef = this.getDocRef(ref);

    return getDoc(docRef);
  }

  async updateListing({ ref, listingAttr }: IUpdateListingParams) {
    const docRef = this.getDocRef(ref);

    return updateDoc(docRef, listingAttr);
  }
}

export default new ListingService();
