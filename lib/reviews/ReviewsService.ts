import { Firestore, getFirestore } from "firebase/firestore";
import FirebaseService from "../firebase/FirebaseService";

class ReviewsService extends FirebaseService {
  private firestore: Firestore;

  constructor() {
    super();

    this.firestore = getFirestore(this.app);
  }
}

export default new ReviewsService();
