import type { NextPage } from "next";
import AuthGuard from "@App/lib/auth/AuthGuard";
import StorageService from "@App/lib/storage/StorageService";
import { Card, CardMedia, Stack, CardContent, Box, LinearProgress, Paper, Typography, Button } from "@mui/material";
import useAuthContext from "@App/lib/auth/AuthContext";

const ProfilePage: NextPage = () => {
  const { currentUser } = useAuthContext();
  const userData = currentUser?.data();
  if(userData == null) return <Typography>No Profile Found</Typography>
  let imageUrl;
  
  StorageService.getDownloadUrlFromVideoUrlRef(userData.avatarUrl).then(res => {
    console.log(res);
    imageUrl = res;
  })
  console.log(imageUrl)

  return (
    <AuthGuard>
      <Typography>Profile</Typography>
      <Card sx={{ display: 'flex' }}>
        {userData != null ? <CardMedia
              sx={{ width: 151 }}
              image= {imageUrl}
            /> : 
            <CardMedia
              sx={{ width: 151 }}
              image="gs://emanon-3d39e.appspot.com/profilePic/avatar2"
            />}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="subtitle1" color="text.secondary" pb={2} component="div">
              Name: {userData != null ? userData?.name : 'error'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" pb={2} component="div">
              Email: {userData != null ? userData?.email : 'error'}
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ display: 'flex-box', alignItems: 'right', pl: 100, pr: 10, pb: 1, pt: 5 }}>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" >
              Edit
            </Button>
          </Stack>
        </Box>
      </Card>
    </AuthGuard>
  );
}


export default ProfilePage;
