import { Box, LinearProgress, Paper, Typography, Button } from "@mui/material";

import AuthGuard from "@App/lib/auth/AuthGuard";
import useAuthContext from "@App/lib/auth/AuthContext";
import useFetchUserListings from "@App/lib/listings/useFetchUserListings";
import ListingListItem from "@App/components/listings/ListingListItem";
import AddListingModal from "@App/components/listings/AddListingModal";
import useModalState from "@App/hooks/useModalState";

const ListingsPageContent = () => {
  const { currentUser } = useAuthContext();
  const {
    data: listings,
    isLoading,
    isFetching,
  } = useFetchUserListings({
    userId: currentUser?.id!,
  });
  const addListingModal = useModalState();

  return (
    <>
      <Box display="flex" width={"100%"} justifyContent="space-between">
        <Typography variant="h2">My Listings</Typography>

        <Button variant="contained" onClick={addListingModal.onOpen}>
          Add Listing
        </Button>
      </Box>

      {isLoading || isFetching || (!listings && <LinearProgress />)}

      {listings && listings.empty && <Typography>No listings found</Typography>}

      {listings &&
        listings.docs.map((listing) => (
          <ListingListItem key={listing.id} listing={listing} />
        ))}

      <AddListingModal
        open={addListingModal.isOpen}
        onClose={addListingModal.onClose}
      />
    </>
  );
};

export default function ListingsPage() {
  return (
    <AuthGuard>
      <ListingsPageContent />
    </AuthGuard>
  );
}
