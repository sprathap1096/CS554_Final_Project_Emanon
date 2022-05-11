import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function BookList() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/images/images.jpeg"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" >
          Harry Potter and the Cursed Child
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" pb={14} component="div">
          Author: J. K. Rowling, Jack Thorne, and John Tiffany
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Rating: 5
          </Typography>

        </CardContent>
        
      </Box>

      <Box sx={{ display: 'absolute', alignItems: 'right', pl: 150, pb: 1 }}>
      <Stack spacing={2} direction="row">
          <Button variant="outlined" aria-label="Add to cart">
            Add to cart
          </Button>
          <Button variant="outlined" aria-label="View">
            View
          </Button>
        </Stack>
        </Box>
      
    </Card>
  );
}
