import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";
import useAddCartItem from "@App/lib/cart/useAddCartItem";
import { IListingAttributes } from "@App/lib/listings/types";
import useFetchAllListing from "@App/lib/listings/useFetchAllListings";
import { IUserAttributes } from "@App/lib/user/types";
import { Add, AddCircleRounded } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";

interface Props {
  listing: QueryDocumentSnapshot<IListingAttributes>;
  user: DocumentSnapshot<IUserAttributes>;
}
export default function BrowseListItem({ listing, user }: Props) {
  const { currentUser } = useAuthContext();
  const { mutate: addCartItem, isLoading: isAdding } = useAddCartItem();

  const handleAddCart = () => {
    const { createdAt, ...listingAttr } = listing.data();

    addCartItem({
      ref: { userId: currentUser!.id },
      cartItemAttributes: { listingRef: listing.ref, ...listingAttr },
    });
  };

  return (
    <Box key={listing.id} paddingY={2}>
      <Paper>
        <Box display="flex" justifyContent={"space-between"} padding={2}>
          <Box>
            <Typography>{"Title: " + listing.data().title}</Typography>
            <Typography>{"Author: " + listing.data().author}</Typography>
            <Typography>
              {"Description: " + listing.data().description}
            </Typography>
            <Typography>{"Price: " + listing.data().price}</Typography>
          </Box>

          <IconButton
            onClick={handleAddCart}
            size="large"
            color="primary"
            disabled={isAdding}
          >
            {isAdding ? <CircularProgress /> : <AddCircleRounded />}
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
