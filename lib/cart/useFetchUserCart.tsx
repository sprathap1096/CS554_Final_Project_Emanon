import { useQuery } from "react-query";
import useAuthContext from "../auth/AuthContext";
import CartService from "./CartService";

export default function useFetchUserCart() {
  const { currentUser } = useAuthContext();

  return useQuery(
    ["cart", currentUser?.id],
    () => CartService.fetchUserCart(currentUser!.ref),
    {
      enabled: !!currentUser?.exists,
    }
  );
}
