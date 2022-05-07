import AuthService from "@App/lib/auth/AuthService";
import ListingService from "@App/lib/listings/ListingService";
import UserBuilder from "@App/lib/user/UserBuilder";
import UserService from "@App/lib/user/UserService";
import getRandomInt from "@App/util/getRandomInt";
import { NextApiRequest, NextApiResponse } from "next";
import { LoremIpsum } from "lorem-ipsum";
import BookService from "@App/lib/books/BookService";
import fs from "fs/promises";
import StorageService from "@App/lib/storage/StorageService";
import { EStorageFolders } from "@App/lib/storage/types";
import { uuid } from "uuidv4";
import { UploadResult } from "firebase/storage";

export default async function seed(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const start = Date.now();
  const users = [
    { email: "ming@test.com", password: "password" },
    { email: "jainam@test.com", password: "password" },
    { email: "nisil@test.com", password: "password" },
    { email: "suraj@test.com", password: "password" },
    { email: "yun@test.com", password: "password" },
  ];

  try {
    const lorem = new LoremIpsum();

    const signUpUserMutation = users.map((user) => AuthService.signup(user));
    const userCredentials = await Promise.all(signUpUserMutation);

    const avatarFilePath = [
      "assets/avatars/avatar01.jpg",
      "assets/avatars/avatar02.jpg",
      "assets/avatars/avatar03.jpg",
      "assets/avatars/avatar04.jpg",
      "assets/avatars/avatar05.jpg",
    ];
    const avatarImageQuery = avatarFilePath.map((filePath) =>
      fs.readFile(filePath)
    );
    const avatars = await Promise.all(avatarImageQuery);

    const avatarOneRef = await StorageService.upload(
        avatars[0],
        EStorageFolders.profilePic,
        `avatar0`,
        "image/jpeg"
      ),
      avatarTwoRef = await StorageService.upload(
        avatars[1],
        EStorageFolders.profilePic,
        `avatar1`,
        "image/jpeg"
      ),
      avatarThreeRef = await StorageService.upload(
        avatars[2],
        EStorageFolders.profilePic,
        `avatar2`,
        "image/jpeg"
      ),
      avatarFourRef = await StorageService.upload(
        avatars[3],
        EStorageFolders.profilePic,
        `avatar3`,
        "image/jpeg"
      ),
      avatarFiveRef = await StorageService.upload(
        avatars[4],
        EStorageFolders.profilePic,
        `avatar4`,
        "image/jpeg"
      );

    const avatarRefs = [
      avatarOneRef,
      avatarTwoRef,
      avatarThreeRef,
      avatarFourRef,
      avatarFiveRef,
    ];

    const userCollectionsMutation = userCredentials.map(async ({ user }, idx) =>
      UserService.add(
        user.uid,
        new UserBuilder()
          .with({
            email: user.email!,
            name: user.email?.split("@")[0],
            avatarUrl: avatarRefs[idx].ref.toString(),
          })
          .build()
      )
    );
    await Promise.all(userCollectionsMutation);

    const addUserListingMutation = userCredentials
      .map((user) => {
        const numListing = getRandomInt(5);
        return new Array(numListing).fill(null).map(() =>
          ListingService.addListing(
            { userId: user.user.uid },
            {
              price: 100,
              title: lorem.generateWords(4),
              author: lorem.generateWords(2),
              description: lorem.generateSentences(5),
            }
          )
        );
      })
      .flat();

    const addUserBooksMutation = userCredentials.map((user) => {
      const numListing = getRandomInt(5);
      return new Array(numListing).fill(null).map(() =>
        BookService.addBook(
          { userId: user.user.uid },
          {
            title: lorem.generateWords(4),
            author: lorem.generateWords(2),
            description: lorem.generateSentences(5),
          }
        )
      );
    });

    await Promise.all([...addUserListingMutation, ...addUserBooksMutation]);

    res.status(200).json({
      message: `Finished seeding in ${Date.now() - start}ms`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
