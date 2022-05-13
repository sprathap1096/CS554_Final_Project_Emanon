import AuthGuard from "@App/lib/auth/AuthGuard";
import useFetchAllListing from "@App/lib/listings/useFetchAllListings";
import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data: listings, isLoading } = useFetchAllListing();

  if (isLoading || !listings) return <LinearProgress />;

  if (listings.empty) return <Typography>No listings found</Typography>;

  return (
    <AuthGuard>
      <Typography variant="h2">Browse</Typography>

      {listings.docs.map((listing) => (
        <Box key={listing.id} paddingY={2}>
          <Paper>{listing.data().title}</Paper>
        </Box>
      ))}
    </AuthGuard>
  );
};

export default Home;