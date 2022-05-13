import { useQuery } from "react-query";
import useAuthContext from "../auth/AuthContext";
import ListingService from "./ListingService";

export default function useFetchListing(listingId: string) {
  const { currentUser } = useAuthContext();

  return useQuery(
    ["listing", currentUser?.id, listingId],
    () => ListingService.fetchListing({ userId: currentUser?.id!, listingId }),
    {
      enabled: !!currentUser && !!listingId,
    }
  );
}
