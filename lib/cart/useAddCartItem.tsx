import { DocumentReference } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";

import CartService from "./CartService";
import { IAddToCartParams } from "./types";

export default function useAddCartItem() {
  const queryClient = useQueryClient();

  const addToCart = async (params: IAddToCartParams) => {
    return await CartService.addToCart(params);
  };

  return useMutation<unknown, unknown, IAddToCartParams>(addToCart, {
    onSuccess: (_data, variables, _context) => {
      const { ref } = variables;

      const userId = ref instanceof DocumentReference ? ref.id : ref.userId;

      queryClient.invalidateQueries(["cart", userId]);
    },
  });
}
