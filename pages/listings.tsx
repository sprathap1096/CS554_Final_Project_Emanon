import AuthGuard from "@App/lib/auth/AuthGuard";
import useAuthContext from "@App/lib/auth/AuthContext";
import fetchcurrentuserListings from "@App/lib/listings/useFetchCurrentUserListing";
import { Card, CardMedia, Stack, CardContent, Box, LinearProgress, Paper, Typography, Button } from "@mui/material";
import { updateCurrentUser } from "firebase/auth";
import type { NextPage } from "next";
import {
  IBaseListing,
  IListingAttributes,
  TListingCollectionReference,
  TListingDocumentReference,
} from "@App/lib/listings/types"

const ListingsPage: NextPage = () => {
 
  const {currentUser} = useAuthContext()
  const { data: listings, isLoading } = fetchcurrentuserListings(  { userId: currentUser?.id }  );
  if (isLoading || !listings) return <LinearProgress />;

  if (listings.empty) return <Typography>No listings found</Typography>;

  return (
    <AuthGuard>
      <Typography variant="h2">My Books</Typography>

      {listings.docs.map((listing) => (
        <Box key={listing.id} paddingY={2}>
          <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/images/images.jpeg"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" >
          {listing.data().title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" pb={2} component="div">
          Author: {listing.data().author}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" pb={2}  component="div">
          Desciption: {listing.data().description}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary"  component="div">
          Rating: Nan
          </Typography>
        </CardContent>
        
      </Box>

      <Box sx={{ display: 'absolute', alignItems: 'right', pl: 100, pr: 10, pb: 1 ,pt: 5}}>
      <Stack spacing={2} direction="row">
          <Button variant="outlined" aria-label="Add to cart">
            Delete
          </Button>
          <Button variant="outlined" aria-label="View">
            Edit
          </Button>
        </Stack>
        </Box>
      
    </Card>
        </Box>
      ))}
    </AuthGuard>
  );
};

export default ListingsPage;