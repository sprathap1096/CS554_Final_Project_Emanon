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
import { IUserAttributes } from "./types";

class UserService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }

  getDocRef(userId: string) {
    return doc(
      this.firestore,
      "users",
      userId
    ) as DocumentReference<IUserAttributes>;
  }

  async add(userId: string, user: IUserAttributes) {
    const userDocRef = this.getDocRef(userId);

    return setDoc(userDocRef, user);
  }

  async createNewUser(user: FirebaseUser) {
    const userDocRef = this.getDocRef(user.uid);

    const userDoc = {
      email: user.email || "",
      name: "",
      avatarUrl: "",
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
