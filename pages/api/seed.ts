import AuthService from "@App/lib/auth/AuthService";
import ListingService from "@App/lib/listings/ListingService";
import UserBuilder from "@App/lib/user/UserBuilder";
import UserService from "@App/lib/user/UserService";
import getRandomInt from "@App/util/getRandomInt";
import { NextApiRequest, NextApiResponse } from "next";
import { LoremIpsum } from "lorem-ipsum";
import BookService from "@App/lib/books/BookService";

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

    const userCollectionsMutation = userCredentials.map(async ({ user }) =>
      UserService.add(
        user.uid,
        new UserBuilder()
          .with({ email: user.email!, name: user.email?.split("@")[0] })
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
    res.status(500).json({ error });
  }
}
