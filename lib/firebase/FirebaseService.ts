import { FirebaseApp, getApp } from "firebase/app";

export default class FirebaseService {
  app: FirebaseApp;

  constructor() {
    this.app = getApp();
  }
}
