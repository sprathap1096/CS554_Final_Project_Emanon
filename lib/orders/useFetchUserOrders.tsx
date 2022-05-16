import { useQuery } from "react-query";
import useAuthContext from "../auth/AuthContext";
import OrdersService from "./OrdersService";

export default function useFetchUserOrder() {
  const { currentUser } = useAuthContext();

  return useQuery(
    ["orders", currentUser?.id],
    () => OrdersService.fetchUserOrders(currentUser!.ref),
    {
      enabled: !!currentUser?.exists(),
    }
  );
}
