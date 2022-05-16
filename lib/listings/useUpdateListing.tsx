import { DocumentReference } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import ListingService from "./ListingService";
import { IUpdateListingParams } from "./types";

export default function useUpdateListing() {
  const queryClient = useQueryClient();

  const updateListing = async (params: IUpdateListingParams) => {
    await ListingService.updateListing(params);
  };

  return useMutation<unknown, unknown, IUpdateListingParams>(updateListing, {
    onSuccess: (_data, variables, _context) => {
      const { ref } = variables;
      const userId = ref instanceof DocumentReference ? ref.id : ref.userId;

      queryClient.invalidateQueries(["listings", userId]);
    },
  });
}
