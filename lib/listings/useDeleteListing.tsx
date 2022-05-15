import { DocumentReference } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";

import ListingService from "./ListingService";
import { TListingDocumentReference } from "./types";

export default function UseDeleteListing() {
  const queryClient = useQueryClient();

  const deleteListing = async (params: TListingDocumentReference) => {
    await ListingService.deleteListing(params);
  };

  return useMutation<unknown, unknown, TListingDocumentReference>(
    deleteListing,
    {
      onSuccess: (_data, variables, _context) => {
        const userId =
          variables instanceof DocumentReference
            ? variables.id
            : variables.userId;

        queryClient.invalidateQueries(["listings", userId]);
      },
      onMutate: () => {},
    }
  );
}
