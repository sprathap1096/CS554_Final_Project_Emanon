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
  IBaseListing,
  IListingAttributes,
  TListingCollectionReference,
  TListingDocumentReference,
} from "./types";
import fs from "fs/promises";
import StorageService from "@App/lib/storage/StorageService";
import { EStorageFolders } from "@App/lib/storage/types";

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

  async fetchUserListings(
    ref: TListingCollectionReference,
  ) {
    const collectionRef = this.getCollectionRef(ref);
    return getDocs(collectionRef);
  }

  async deleteListings(ref: TListingDocumentReference)
  {
  const docRef = this.getDocRef(ref);
   deleteDoc(docRef);
  }

  async fetchdoc(ref: TListingDocumentReference)
  {
    const docRef = this.getDocRef(ref);
    return getDoc(docRef);
  }

  async updateListing(
    ref: TListingDocumentReference,
    listingAttr: IBaseListing
  ) {
    const docRef = this.getDocRef(ref);
    const listing: IListingAttributes = {
      ...listingAttr,
      createdAt: Timestamp.now(),
    };

    return updateDoc(docRef, listing);

  }
}

export default new ListingService();
