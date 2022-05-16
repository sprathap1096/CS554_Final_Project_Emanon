import { DocumentReference } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import CartService from "./CartService";
import { TCartItemDocumentReference } from "./types";

export default function useDeleteCartItem() {
  const queryClient = useQueryClient();

  const deleteCartItem = async (ref: TCartItemDocumentReference) => {
    return await CartService.deleteCartItem(ref);
  };
  return useMutation<void, unknown, TCartItemDocumentReference>(
    deleteCartItem,
    {
      onSettled: (_data, _error, variables, _context) => {
        const userId =
          variables instanceof DocumentReference
            ? variables.parent.parent?.id
            : variables.userId;

        console.log(userId);

        queryClient.invalidateQueries(["cart", userId]);
      },
    }
  );
}
