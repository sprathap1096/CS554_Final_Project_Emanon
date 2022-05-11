import { useQuery } from "react-query";
import ListingService from "./ListingService";
import {
    IBaseListing,
    IListingAttributes,
    TListingCollectionReference,
    TListingDocumentReference,
  } from "./types"

export default function useFetchCurrentUserListing(uid: any) {
  return useQuery(["listings"], () => ListingService.fetchcurrentuserListings(uid));
}
