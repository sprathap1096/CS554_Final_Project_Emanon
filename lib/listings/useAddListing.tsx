import { useMutation, useQueryClient } from "react-query";
import ListingService from "./ListingService";
import { IAddListingParams } from "./types";

export default function useAddListing() {
  const queryClient = useQueryClient();

  const addListing = async (params: IAddListingParams) => {
    await ListingService.addListing(params);
  };

  return useMutation<unknown, unknown, IAddListingParams>(addListing, {
    onSuccess: (_data, variables, _context) => {
      queryClient.invalidateQueries(["listings", variables.ref.userId]);
    },
  });
}
