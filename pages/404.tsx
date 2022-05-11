import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();

  const onClickHome = () => router.push("/");

  return (
    <Box>
      <Typography variant="h1">404</Typography>
      <Typography variant="subtitle1">Page not found</Typography>
      <Button onClick={onClickHome}>Return to home</Button>
    </Box>
  );
}
