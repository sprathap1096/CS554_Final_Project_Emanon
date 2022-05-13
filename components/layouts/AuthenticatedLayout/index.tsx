import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AuthenticatedLayout({
  children,
}: PropsWithChildren<{}>) {
  return (
    <Box>
      <Topbar />
      <Sidebar />

      <Box paddingLeft={22} paddingTop={5}>
        {children}
      </Box>
    </Box>
  );
}
