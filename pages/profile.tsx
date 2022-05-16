import type { NextPage } from "next";
import AuthGuard from "@App/lib/auth/AuthGuard";
import { Card, CardMedia, Stack, CardContent, Box, LinearProgress, Paper, Typography, Button } from "@mui/material";
import useAuthContext from "@App/lib/auth/AuthContext";

const ProfilePage: NextPage = () => {
  const { currentUser } = useAuthContext();
  const userData = currentUser?.data();
  if(userData == null) return <Typography>No Profile Found</Typography>

  return (
    <AuthGuard>
      <Typography>Profile</Typography>
      <Card sx={{ display: 'flex' }}>
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
      </Card>
    </AuthGuard>
  );
}


export default ProfilePage;
