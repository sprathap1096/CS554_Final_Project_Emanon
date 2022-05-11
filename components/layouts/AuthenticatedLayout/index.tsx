import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";

export default function AuthenticatedLayout({
  children,
}: PropsWithChildren<{}>) {
  return (
    <Box>
      <Sidebar />
      <Box paddingLeft={22}>{children}</Box>
    </Box>
  );
}
