import OrderListItem from "@App/components/orders/OrderListItem";
import AuthGuard from "@App/lib/auth/AuthGuard";
import useFetchUserOrders from "@App/lib/orders/useFetchUserOrders";
import { Box, LinearProgress, Typography } from "@mui/material";

function OrdersPageContent() {
  const { data: orders, isLoading, isFetching } = useFetchUserOrders();

  return (
    <Box>
      <Typography variant="h2">Past Orders</Typography>
      {isLoading || isFetching || (!orders && <LinearProgress />)}

      {orders && orders.empty && <Typography>No past orders found</Typography>}

      {orders &&
        orders.docs.map((order) => (
          <OrderListItem key={order.id} order={order} />
        ))}
    </Box>
  );
}

export default function OrdersPage() {
  return (
    <AuthGuard>
      <OrdersPageContent />
    </AuthGuard>
  );
}
