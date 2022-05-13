import { CardTravel, ShoppingCart } from "@mui/icons-material";
import { Badge, Box, IconButton, Popover, Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function CartButton() {
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const onClickIcon = () => setIsOpen(true);

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
          <Typography color="textPrimary">Shopping Cart</Typography>
        </Box>
      </Popover>
    </>
  );
}
