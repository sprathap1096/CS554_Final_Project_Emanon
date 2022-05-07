import { Timestamp } from "firebase/firestore";
import getRandomInt from "@App/util/getRandomInt";
import BaseBuilder from "@App/lib/builder/BaseBuilder";
import { IUserAttributes } from "@App/lib/user/types";

export default class UserBuilder extends BaseBuilder<IUserAttributes> {
  private name = "Jon Bellion";
  private email = "jonny@test.com";
  private avatarUrl = "";
  private createdAt = Timestamp.now();

  build() {
    return {
      name: this.name,
      email: this.email,
      avatarUrl: this.avatarUrl,
      createdAt: this.createdAt,
    };
  }
}
