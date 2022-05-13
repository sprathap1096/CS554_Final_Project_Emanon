import { DocumentReference } from "firebase/firestore";
import { useMutation } from "react-query";
import CartService from "./CartService";
import { IAddToCartParams, ICartItemAttributes } from "./types";

export default function useAddCartItem() {
  return useMutation<
    DocumentReference<ICartItemAttributes>,
    unknown,
    IAddToCartParams
  >(CartService.addToCart, {});
}
