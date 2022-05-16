import { useMutation, useQueryClient } from "react-query";
import useAuthContext from "../auth/AuthContext";
import CartService from "../cart/CartService";
import ListingService from "../listings/ListingService";
import OrdersService from "../orders/OrdersService";
import BookService from "./BookService";
import { IAddBooksParams } from "./types";

export default function useAddBooks() {
  const { currentUser } = useAuthContext();
  const queryClient = useQueryClient();

  const addBook = async ({ cart }: IAddBooksParams) => {
    const addBookMutation = cart.docs.map((item) => {
      const { listingRef, addedAt, ...bookData } = item.data();
      return BookService.addBook(currentUser!.ref, { ...bookData });
    });

    const addOrderMutation = OrdersService.addOrder(currentUser!.ref, {
      order: cart.docs.map((item) => {
        const { listingRef, addedAt, ...bookData } = item.data();
        return bookData;
      }),
    });

    await Promise.all([...addBookMutation, addOrderMutation]);

    const deleteCartItemMutation = cart.docs.map((item) =>
      CartService.deleteCartItem(item.ref)
    );

    const deleteListingMutation = cart.docs.map((item) =>
      ListingService.deleteListing(item.data().listingRef)
    );

    await Promise.all([...deleteCartItemMutation, ...deleteListingMutation]);
  };
  return useMutation<void, unknown, IAddBooksParams>(addBook, {
    onSuccess: async (_data, _variables, _context) => {
      queryClient.invalidateQueries(["cart", currentUser!.id]);
      queryClient.invalidateQueries(["orders", currentUser!.id]);
      queryClient.invalidateQueries(["listings", currentUser!.id]);
    },
  });
}
