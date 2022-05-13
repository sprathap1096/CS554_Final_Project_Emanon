import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Layers as LayersIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material/";
import { ReactNode } from "react";
import Dashboard from "@mui/icons-material/Dashboard";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  return (
    <Drawer anchor="left" open variant="persistent">
      <Box p={2}>
        <Typography variant="h5">Emanon</Typography>

        <List>
          <ListItemButton onClick={() => router.push("/")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Browse"} />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/orders")}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary={"Orders"} />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/books")}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary={"Books"} />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/listings")}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary={"Listings"} />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/profile")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
