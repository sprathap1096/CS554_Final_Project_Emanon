import { QuerySnapshot } from "firebase/firestore";
import { useQuery } from "react-query";
import useAuthContext from "../auth/AuthContext";
import CartService from "./CartService";
import { ICartItemAttributes } from "./types";

export default function useFetchUserCart() {
  const { currentUser } = useAuthContext();

  return useQuery<QuerySnapshot<ICartItemAttributes>>(
    ["cart", currentUser?.id],
    () => CartService.fetchUserCart(currentUser!.ref),
    {
      enabled: !!currentUser?.exists,
    }
  );
}
