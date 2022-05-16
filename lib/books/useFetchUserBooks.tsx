import { useQuery } from "react-query";
import useAuthContext from "../auth/AuthContext";
import BookService from "./BookService";

export default function useFetchUserBooks() {
  const { currentUser } = useAuthContext();

  return useQuery(
    ["books", currentUser?.id],
    () => BookService.fetchUserBooks(currentUser!.ref),
    {
      enabled: currentUser?.exists(),
    }
  );
}
