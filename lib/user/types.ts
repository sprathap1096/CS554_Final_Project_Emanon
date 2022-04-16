import { Timestamp } from "firebase/firestore";

export interface IUser {
  name: string;
  email: string;
  createdAt: Timestamp;
}
