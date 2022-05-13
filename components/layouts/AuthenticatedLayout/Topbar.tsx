import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import CartButton from "./CartButton";

export default function Topbar() {
  return (
    <AppBar>
      <Toolbar>
        <Box display="flex" paddingLeft={22} width="100%" paddingRight={2}>
          <Box display="flex" justifyContent="end" flexGrow={1}>
            <CartButton />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
