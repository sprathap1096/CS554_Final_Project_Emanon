import { User as FirebaseUser } from "firebase/auth";
import {
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import FirebaseService from "../firebase/FirebaseService";
import { ECollections } from "../firebase/types";
import { IUserAttributes, IUserDocumentReference } from "./types";

class UserService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  getDocRef(ref: IUserDocumentReference) {
    if (ref instanceof DocumentReference) return ref;

    return doc(
      this.firestore,
      ECollections.Users,
      ref.userId
    ) as DocumentReference<IUserAttributes>;
  }

  async add(ref: IUserDocumentReference, user: IUserAttributes) {
    const userDocRef = this.getDocRef(ref);

    return setDoc(userDocRef, user);
  }

  async createNewUser(user: FirebaseUser) {
    const userDocRef = this.getDocRef({ userId: user.uid });

    const userDoc = {
      email: user.email || "",
      name: "",
      avatarUrl: "",
      createdAt: Timestamp.now(),
    };

    return setDoc(userDocRef, userDoc);
  }

  async getUser(ref: IUserDocumentReference) {
    const userDocRef = this.getDocRef(ref);

    try {
      return await getDoc(userDocRef);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
