import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import FirebaseService from "../firebase/FirebaseService";
import { IEmailAuthVariables } from "./types";

class AuthService extends FirebaseService {
  auth: Auth;

  constructor() {
    super();

    this.auth = getAuth(this.app);
  }

  async login({
    email,
    password,
  }: IEmailAuthVariables): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signup({
    email,
    password,
  }: IEmailAuthVariables): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  async logout(): Promise<void> {
    signOut(this.auth);
  }

  isSignedIn() {
    return !!this.auth.currentUser?.uid;
  }

  onAuthStateChanged(callback: (user: User | null) => void) {
    firebaseOnAuthStateChanged(this.auth, callback);
  }
}

export default new AuthService();