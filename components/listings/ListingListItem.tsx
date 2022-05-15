import {
  Card,
  CardMedia,
  Stack,
  CardContent,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

import { IListingAttributes } from "@App/lib/listings/types";
import { QueryDocumentSnapshot } from "firebase/firestore";
import useDeleteListing from "@App/lib/listings/useDeleteListing";
import { useRouter } from "next/router";

interface Props {
  listing: QueryDocumentSnapshot<IListingAttributes>;
}

export default function ListingListItem({ listing }: Props) {
  const router = useRouter();

  const { mutate: deleteListing, isLoading: isDeleting } = useDeleteListing();

  const handleClickDelete = () => deleteListing(listing.ref);

  const handleClickEdit = () => router.push(`/listings/edit/${listing.id}`);

  return (
    <Box key={listing.id} paddingY={2}>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="/images/images.jpeg"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {listing.data().title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              pb={2}
              component="div"
            >
              Author: {listing.data().author}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              pb={2}
              mr="70%"
              minWidth="70%"
              component="div"
            >
              Description: {listing.data().description}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              pb={2}
              component="div"
            >
              Price:${listing.data().price}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex-box",
              float: "right",
              pl: 1,
              pb: 1,
              pt: 0,
            }}
          >
            <Stack spacing={2} alignItems="right" direction="row">
              <Button variant="outlined" onClick={handleClickDelete}>
                {isDeleting ? <CircularProgress /> : "Delete"}
              </Button>
              <Button variant="outlined" onClick={handleClickEdit}>
                Edit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
