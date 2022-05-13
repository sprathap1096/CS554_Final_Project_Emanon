import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthGuard from "@App/lib/auth/AuthGuard";
import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import useAuthContext from "@App/lib/auth/AuthContext";
import ListingService from "@App/lib/listings/ListingService";
import {
  IBaseListing,
  TListingDocumentReference,
} from "@App/lib/listings/types";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const inputValidationSchema = yup
  .object({
    title: yup.string().max(255).required("Title is required"),
    description: yup.string().max(300).required("Description is required"),
    author: yup.string().max(300).required("Author is required"),
    price: yup.number().required("Price is required"),
  })
  .required();

const EditListings: NextPage = () => {
  const router = useRouter();
  let title = router.query.title as string;
  let author = router.query.author as string;
  let price = router.query.price as unknown as number;
  let description = router.query.description as string;
  let listingId = router.query.listingId as string;
  let userId = router.query.userId as string;
  let nweobj = {
    title: title,
    author: author,
    description: description,
    price: price,
  };

  const { currentUser } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<IBaseListing>({
    defaultValues: nweobj,
    mode: "onSubmit",
    resolver: yupResolver(inputValidationSchema),
  });

  const onSubmit: SubmitHandler<IBaseListing> = (data) => {
    ListingService.updateListing(
      { userId: currentUser?.id!, listingId: listingId },
      {
        title: data.title,
        description: data.description,
        author: data.author,
        price: data.price,
      }
    );
    router.push("/listings");
  };

  const theme = createTheme();
  return (
    <AuthGuard>
      <Typography variant="h2">Edit Your List</Typography>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <MenuBookRoundedIcon />
            </Avatar>
            <Typography variant="h5">Edit Book</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Button variant="contained" color="secondary" component="label">
                Upload Cover Page
                <input type="file" name="cover" />
              </Button>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Book Title"
                {...register("title")}
                autoFocus
              />
              {formError.title && <p>{formError.title.message}</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Description"
                id="description"
                {...register("description")}
              />
              {formError.description && <p>{formError.description.message}</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Author Name"
                id="author"
                {...register("author")}
              />
              {formError.author && <p>{formError.author.message}</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                label="$Price"
                type="number"
                id="price"
                {...register("price")}
              />
              {formError.price && <p>{formError.price.message}</p>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit Book
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </AuthGuard>
  );
};

export default EditListings;
