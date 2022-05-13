import { useQuery } from "react-query";
import ListingService from "./ListingService";
import { TListingCollectionReference } from "./types";

export default function useFetchUserListings(
  userId: TListingCollectionReference
) {
  return useQuery(["listings", userId.userId], () =>
    ListingService.fetchUserListings(userId)
  );
}
