import AuthGuard from "@App/lib/auth/AuthGuard";
import useFetchAllListing from "@App/lib/listings/useFetchAllListings";
import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";
import type { NextPage } from "next";

const HomePageContent = () => {
  const { data: listings, isLoading } = useFetchAllListing();

  if (isLoading || !listings) return <LinearProgress />;

  if (listings.empty) return <Typography>No listings found</Typography>;

  return (
    <Box>
      <Typography variant="h2">Browse</Typography>

      {listings.docs.map((listing) => (
        <Box key={listing.id} paddingY={2}>
          <Paper>
            <Typography>{listing.data().title}</Typography>
            <Button>Add to Cart</Button>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

const Home: NextPage = () => {
  return (
    <AuthGuard>
      <HomePageContent />
    </AuthGuard>
  );
};

export default Home;