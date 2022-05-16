import BrowseListItem from "@App/components/browse/BrowseListItem";
import AuthGuard from "@App/lib/auth/AuthGuard";
import useFetchAllListing from "@App/lib/listings/useFetchAllListings";
import { Add, AddCircleRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";

const HomePageContent = () => {
  const { data: listings, isLoading } = useFetchAllListing();

  if (isLoading || !listings) return <LinearProgress />;

  if (listings.length === 0) return <Typography>No listings found</Typography>;

  return (
    <Box>
      <Typography variant="h2">Browse</Typography>

      {listings.map(({ listing, user }) => (
        <BrowseListItem key={listing.id} listing={listing} user={user!} />
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
