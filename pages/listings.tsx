import AuthGuard from "@App/lib/auth/AuthGuard";
import useAuthContext from "@App/lib/auth/AuthContext";
import useFetchUserListings from "@App/lib/listings/useFetchUserListing";
import UseDeletListings from "@App/lib/listings/useDeleteListings";
import { Card, CardMedia, Stack, CardContent, Box, LinearProgress, Paper, Typography, Button } from "@mui/material";
import { updateCurrentUser } from "firebase/auth";
import type { NextPage } from "next";
import {TListingCollectionReference,TListingDocumentReference} from "@App/lib/listings/types"
import { useRouter } from "next/router";

const ListingsPage: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext()
  let obj:TListingCollectionReference;
  obj={userId: currentUser?.id!}
  const { data: listings, isLoading } = useFetchUserListings(obj);
  
  const handleClickDelete = (listingId: string, userId: string) => {
    console.log(listingId,userId)
    let deleteobj:TListingDocumentReference;
    deleteobj={userId: userId, listingId: listingId} 
    const{data: deleted}=UseDeletListings(deleteobj);
    //if(listings)
      //listings.docs = listings?.docs.filter(i => i.id !== listingId);
  };
  const handleClickEdit = (title: string, author: string, price : number, description : string, listingId : string, userId : string) => {
    console.log(listingId,userId)
    router.push({
      pathname: '/editListings',
      query: { title: title, author: author, price : price, description : description, listingId: listingId, userId: userId}
  })
    
  };


  if (isLoading || !listings) return <LinearProgress />;
  if (listings.empty) return <Typography>No listings found</Typography>;
  return (
    <AuthGuard>
      <Typography variant="h2">My Listings</Typography>
      <Button type="link" size="large" variant="contained" href="/addListings">Add</Button>
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
                <Typography variant="subtitle1" color="text.secondary" pb={2} mr='70%' minWidth='70%' component="div">
                  Desciption: {listing.data().description}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" pb={2} component="div">
                  Price:${listing.data().price}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Rating: Nan
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex-box', float:'right', pl: 1, pb: 1, pt: 0,}}>
              <Stack spacing={2}  alignItems="right" direction="row">
                <Button variant="outlined" onClick={() => handleClickDelete(listing.id,currentUser?.id!)}>
                  Delete
                </Button>
                <Button variant="outlined" onClick={() => handleClickEdit(listing.data().title, listing.data().author, listing.data().price, 
                  listing.data().description, listing.id, currentUser?.id!)}>
                  Edit
                </Button>
              </Stack>
            </Box>
            </Box>

            

          </Card>
        </Box>
      )
        )
      }
    </AuthGuard>
  );
};

export default ListingsPage;