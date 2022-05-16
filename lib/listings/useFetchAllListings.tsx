import { useQuery } from "react-query";
import UserService from "../user/UserService";
import ListingService from "./ListingService";

export default function useFetchAllListing() {
  
  const fetchAllListing = async () => {
    const listings = await ListingService.fetchAllListings();

    const listingsUsers = await Promise.all(
      listings.docs.map((doc) =>
        UserService.getUser({ userId: doc.ref.parent.id })
      )
    );

    return listings.docs.map((listing) => {
      const listingUser = listingsUsers.find(
        (user) => user.id === listing.ref.parent.id
      );

      return { listing, user: listingUser };
    });
  };

  return useQuery(["listings"], fetchAllListing, {});
}
