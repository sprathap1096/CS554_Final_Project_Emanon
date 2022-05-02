import AuthGuard from "@App/lib/auth/AuthGuard";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <AuthGuard>
      <div>Home page</div>
    </AuthGuard>
  );
};

export default Home;
