import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
import { uuid } from "uuidv4";
import FirebaseService from "@App/lib/firebase/FirebaseService";

export enum EStorageFolders {
  profilePic = "profilePic",
}

class StorageService extends FirebaseService {
  private storage: FirebaseStorage;

  constructor() {
    super();
    this.storage = getStorage(this.app);
  }

  async upload(file: File, folder: EStorageFolders, filename: string = uuid()) {
    const fileRef = ref(this.storage, `${folder}/${filename}`);

    await uploadBytes(fileRef, file, { contentType: file.type });

    return getDownloadURL(fileRef);
  }

  async uploadAnswerVideo(file: File|Blob|ArrayBuffer, interviewId: string){
    const storage = getStorage();
    const interviewAnswersRef = ref(storage, `interview-responses/${interviewId}.mp4`);
    return uploadBytes(interviewAnswersRef, file, {contentType:"video/mp4"});
  }
  async getDownloadUrlFromVideoUrlRef(videoUrl: string | StorageReference){
    const storage = getStorage();
    if(typeof videoUrl === 'string' || videoUrl instanceof String){ 
      const videoUrlString = videoUrl as string;
      const interviewAnswersRef = ref(storage, videoUrlString);
      return getDownloadURL(interviewAnswersRef);
    }else {
      const videoUrlRef = videoUrl as StorageReference;
      return getDownloadURL(videoUrlRef);
    }
  }
}

export default new StorageService();
