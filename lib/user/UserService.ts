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
import { IUser } from "./types";

class UserService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  private getDocRef(userId: string) {
    return doc(this.firestore, "users", userId) as DocumentReference<IUser>;
  }

  async add(userId: string, user: IUser) {
    const userDocRef = this.getDocRef(userId);

    return setDoc(userDocRef, user);
  }

  async createNewUser(user: FirebaseUser) {
    const userDocRef = this.getDocRef(user.uid);

    const userDoc = {
      id: user.uid,
      email: user.email || "",
      name: "",
      createdAt: Timestamp.now(),
    };

    return setDoc(userDocRef, userDoc);
  }

  async getUser(userId: string) {
    const userDocRef = this.getDocRef(userId);

    try {
      return await getDoc(userDocRef);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
