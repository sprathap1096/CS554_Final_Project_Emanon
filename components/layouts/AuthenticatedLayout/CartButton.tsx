import useAddBooks from "@App/lib/books/useAddBooks";
import useFetchUserCart from "@App/lib/cart/useFetchUserCart";
import { ShoppingCart } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Popover,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import CartListItem from "./CartListItem";

export default function CartButton() {
  const ref = useRef(null);

  const { data: cart, isLoading } = useFetchUserCart();
  const { mutate: addBook, isLoading: isAddingBook } = useAddBooks();

  const [isOpen, setIsOpen] = useState(false);

  const onClickIcon = () => setIsOpen(true);

  const handleAddBooks = () => {
    if (!cart) return null;

    addBook({ cart });
  };

  const renderBody = () => {
    if (!cart) return null;

    if (cart.empty)
      return <Typography variant="subtitle1">No items in cart</Typography>;

    return (
      <>
        {cart.docs.map((item) => (
          <Box key={item.id} paddingY={2}>
            <CartListItem cartItem={item} />
          </Box>
        ))}

        {!cart.empty && (
          <Button
            disabled={isAddingBook}
            variant="contained"
            onClick={handleAddBooks}
          >
            {isAddingBook ? <CircularProgress /> : "Add Books"}
          </Button>
        )}
      </>
    );
  };

  return (
    <>
      <Badge>
        <IconButton ref={ref} onClick={onClickIcon}>
          <ShoppingCart />
        </IconButton>
      </Badge>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        open={isOpen}
      >
        <Box p={2}>
          <Typography color="textPrimary" variant="h5">
            Shopping Cart
          </Typography>

          {isLoading && <LinearProgress />}

          {renderBody()}
        </Box>
      </Popover>
    </>
  );
}
