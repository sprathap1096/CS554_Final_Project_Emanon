import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";

import FirebaseService from "@App/lib/firebase/FirebaseService";
import { EStorageFolders } from "./types";

class StorageService extends FirebaseService {
  private storage: FirebaseStorage;

  constructor() {
    super();
    this.storage = getStorage(this.app);
  }

  async upload(
    file: File | Blob | ArrayBuffer,
    folder: EStorageFolders,
    filename: string,
    contentType: string = "image/jpg"
  ) {
    const fileRef = ref(this.storage, `${folder}/${filename}`);

    return uploadBytes(fileRef, file, { contentType });
  }

  async getDownloadUrlFromVideoUrlRef(videoUrl: string | StorageReference) {
    const storage = getStorage();
    if (typeof videoUrl === "string" || videoUrl instanceof String) {
      const videoUrlString = videoUrl as string;
      const interviewAnswersRef = ref(storage, videoUrlString);
      return getDownloadURL(interviewAnswersRef);
    } else {
      const videoUrlRef = videoUrl as StorageReference;
      return getDownloadURL(videoUrlRef);
    }
  }
}

export default new StorageService();
