import AuthGuard from "@App/lib/auth/AuthGuard";
import { IBaseListing } from "@App/lib/listings/types";
import useFetchListing from "@App/lib/listings/useFetchListing";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { list } from "firebase/storage";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import useUpdateListing from "@App/lib/listings/useUpdateListing";

const inputValidationSchema = yup
  .object({
    title: yup.string().max(255).required("Title is required"),
    description: yup.string().max(300).required("Description is required"),
    author: yup.string().max(300).required("Author is required"),
    price: yup.number().required("Price is required"),
  })
  .required();

function EditListingPageContent() {
  const router = useRouter();
  const { listingId } = router.query;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: formError },
  } = useForm<IBaseListing>({
    mode: "onSubmit",
    resolver: yupResolver(inputValidationSchema),
  });
  const { data: listing, isLoading } = useFetchListing(listingId as string);
  const { mutateAsync: updateListing, isLoading: isUpdating } =
    useUpdateListing();

  useEffect(() => {
    if (listing && listing?.exists) {
      setValue("title", listing.data()!.title);
      setValue("description", listing.data()!.description);
      setValue("author", listing.data()!.author);
      setValue("price", listing.data()!.price);
    }
  }, [listing, setValue]);

  const onSaveChanges: SubmitHandler<IBaseListing> = async (
    data: IBaseListing
  ) => {
    await updateListing({ ref: listing!.ref, listingAttr: data });

    router.push("/listings");
  };

  if (!listing || isLoading) return <LinearProgress />;

  return (
    <Box>
      <Typography variant="h2">Edit Listings Page</Typography>

      <form onSubmit={handleSubmit(onSaveChanges)}>
        <Box>
          <TextField
            required
            fullWidth
            margin="normal"
            placeholder="Title"
            {...register("title")}
          />
          {formError.title && (
            <Typography>{formError.title.message}</Typography>
          )}

          <TextField
            required
            fullWidth
            margin="normal"
            placeholder="Author"
            {...register("author")}
          />
          {formError.author && (
            <Typography>{formError.author.message}</Typography>
          )}

          <TextField
            required
            fullWidth
            margin="normal"
            placeholder="Description"
            {...register("description")}
          />
          {formError.description && (
            <Typography>{formError.description.message}</Typography>
          )}

          <TextField
            required
            fullWidth
            margin="normal"
            type="number"
            placeholder="Price"
            {...register("price")}
          />
          {formError.price && (
            <Typography>{formError.price.message}</Typography>
          )}
        </Box>

        <Box>
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? <CircularProgress /> : "Save Changes"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default function EditListingsPage() {
  return (
    <AuthGuard>
      <EditListingPageContent />
    </AuthGuard>
  );
}
