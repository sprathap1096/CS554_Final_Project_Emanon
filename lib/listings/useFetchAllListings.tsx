import { useQuery } from "react-query";
import ListingService from "./ListingService";

export default function useFetchAllListing() {
  return useQuery(["listings"], () => ListingService.fetchAllListings());
}
