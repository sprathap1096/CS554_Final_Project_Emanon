import { IOrderAttributes } from "@App/lib/orders/types";
import { Box, Paper } from "@mui/material";
import { QueryDocumentSnapshot } from "firebase/firestore";

interface Props {
  order: QueryDocumentSnapshot<IOrderAttributes>;
}
export default function OrderListItem({ order }: Props) {
  return (
    <Paper>
      <Box p={3}>Order</Box>
    </Paper>
  );
}
