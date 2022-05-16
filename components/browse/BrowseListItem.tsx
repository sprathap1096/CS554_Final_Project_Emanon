import useAuthContext from "@App/lib/auth/AuthContext";
import { ICartItemAttributes } from "@App/lib/cart/types";

import useAddCartItem from "@App/lib/cart/useAddCartItem";
import { IListingAttributes } from "@App/lib/listings/types";

import StorageService from "@App/lib/storage/StorageService";
import { IUserAttributes } from "@App/lib/user/types";
import { Add, AddCircleRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";

interface Props {
  listing: QueryDocumentSnapshot<IListingAttributes>;
  user: DocumentSnapshot<IUserAttributes>;
  cart: QuerySnapshot<ICartItemAttributes>;
}

export default function BrowseListItem({ listing, user, cart }: Props) {
  const { currentUser } = useAuthContext();
  const queryClient = useQueryClient();
  const { mutate: addCartItem, isLoading: isAdding } = useAddCartItem();

  const cartData = queryClient.getQueryData(["cart", currentUser!.id]);

  const [avatar, setAvatar] = useState<string>();

  const handleAddCart = () => {
    const { createdAt, ...listingAttr } = listing.data();

    addCartItem({
      ref: { userId: currentUser!.id },
      cartItemAttributes: { listingRef: listing.ref, ...listingAttr },
    });
  };

  const fetchAvatar = useCallback(() => {
    StorageService.getDownloadUrlFromVideoUrlRef(user.data()!.avatarUrl).then(
      (url) => setAvatar(url)
    );
  }, []);

  useEffect(() => {
    fetchAvatar();
  }, [fetchAvatar]);

  if (
    !!cart.docs.find((doc) => doc.data().listingRef.path === listing.ref.path)
  )
    return null;

  return (
    <Box key={listing.id} paddingY={2}>
      <Paper>
        <Box display="flex" justifyContent={"space-between"} padding={2}>
          <Box>
            <Box mb={2} display="flex" gap={2} alignItems="center">
              {avatar && <Avatar src={avatar} />}
              <Typography>{user.data()?.name}</Typography>
            </Box>

            <Divider />

            <Box mt={2}>
              <Typography>{"Title: " + listing.data().title}</Typography>
              <Typography>{"Author: " + listing.data().author}</Typography>
              <Typography>
                {"Description: " + listing.data().description}
              </Typography>
              <Typography>{"Price: " + listing.data().price}</Typography>
            </Box>
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
