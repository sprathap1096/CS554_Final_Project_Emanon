import { useQuery } from "react-query";


import UserService from "../user/UserService";
import ListingService from "./ListingService";

export default function useFetchAllListing() {
  const fetchAllListing = async () => {
    const listings = await ListingService.fetchAllListings();

    const listingsUsers = await Promise.all(
      listings.docs.map((doc) =>
        UserService.getUser({ userId: doc.ref.parent.parent!.id })
      )
    );

    const response = listings.docs.map((listing) => {
      const listingUser = listingsUsers.find(
        (user) => user.id === listing.ref.parent.parent!.id
      );

      return { listing, user: listingUser };
    });

    return response;
  };

  return useQuery(["listings"], fetchAllListing, {});
}
