import useAuthContext from "@App/lib/auth/AuthContext";
import AuthGuard from "@App/lib/auth/AuthGuard";
import useAddCartItem from "@App/lib/cart/useAddCartItem";
import { IListingAttributes } from "@App/lib/listings/types";
import useFetchAllListing from "@App/lib/listings/useFetchAllListings";
import { Add, AddCircleRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { QueryDocumentSnapshot } from "firebase/firestore";
import type { NextPage } from "next";

interface Props {
  listing: QueryDocumentSnapshot<IListingAttributes>;
}
export default function BrowseListItem({ listing }: Props) {
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
