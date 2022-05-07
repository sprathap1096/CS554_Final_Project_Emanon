import AuthService from "@App/lib/auth/AuthService";
import UserBuilder from "@App/lib/user/UserBuilder";
import UserService from "@App/lib/user/UserService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function seed(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  console.log("Starting seed");
  const start = Date.now();
  const users = [
    { email: "ming@test.com", password: "password" },
    { email: "jainam@test.com", password: "password" },
    { email: "nisil@test.com", password: "password" },
    { email: "suraj@test.com", password: "password" },
    { email: "yun@test.com", password: "password" },
  ];

  try {
    const userCredentials = await Promise.all(
      users.map((user) => AuthService.signup(user))
    );

    const userCollections = await Promise.all(
      userCredentials.map(async ({ user }) =>
        UserService.add(
          user.uid,
          new UserBuilder()
            .with({ email: user.email!, name: user.email?.split("@")[0] })
            .build()
        )
      )
    );

    res.status(200).json({
      message: `Finished seeding in ${Date.now() - start}ms`,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}
