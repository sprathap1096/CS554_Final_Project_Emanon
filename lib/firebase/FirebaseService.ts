import { FirebaseApp, getApp } from "firebase/app";
import "./firebase.config";
export default class FirebaseService {
  app: FirebaseApp;

  constructor() {
    this.app = getApp();
  }
}
