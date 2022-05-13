import { StringFormat } from "firebase/storage";
import { useQuery } from "react-query";
import ListingService from "./ListingService";
import {
    IBaseListing,
    IListingAttributes,
    TListingCollectionReference,
    TListingDocumentReference,
  } from "./types"

export default function useFetchUserListings(userId: TListingCollectionReference) {
  return useQuery(["listings"], () => ListingService.fetchUserListings(userId));
}
