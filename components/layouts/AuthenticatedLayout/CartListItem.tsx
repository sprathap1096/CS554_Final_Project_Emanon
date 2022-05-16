import { ICartItemAttributes } from "@App/lib/cart/types";
import useDeleteCartItem from "@App/lib/cart/useDeleteCartItem";
import { Delete } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { QueryDocumentSnapshot } from "firebase/firestore";

interface Props {
  cartItem: QueryDocumentSnapshot<ICartItemAttributes>;
}

export default function CartListItem({ cartItem }: Props) {
  const { mutate: deleteCartItem, isLoading } = useDeleteCartItem();

  const handleDeleteItem = () => deleteCartItem(cartItem.ref);

  return (
    <Paper>
      <Box
        padding={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>{"Title: " + cartItem.data().title}</Typography>
        <IconButton onClick={handleDeleteItem} disabled={isLoading}>
          {isLoading ? <CircularProgress /> : <Delete />}
        </IconButton>
      </Box>
    </Paper>
  );
}
