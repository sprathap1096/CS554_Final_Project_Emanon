import { useMutation } from "react-query";
import useAuthContext from "../auth/AuthContext";
import ListingService from "./ListingService";
import { TListingDocumentReference } from "./types";

export default function UseDeleteListing() {
  const {} = useAuthContext();

  return useMutation<unknown, unknown, TListingDocumentReference>(
    ListingService.deleteListings,
    {
      onSuccess: () => {},
      onMutate: () => { },
      
    }
  );
}
