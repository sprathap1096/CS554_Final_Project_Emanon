import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { IBaseListing } from "@App/lib/listings/types";
import { Close } from "@mui/icons-material";
import useAddListing from "@App/lib/listings/useAddListing";
import useAuthContext from "@App/lib/auth/AuthContext";

interface Props extends DialogProps {
  onClose: () => void;
}

const inputValidationSchema = yup
  .object({
    title: yup.string().max(255).required("Title is required"),
    description: yup.string().max(300).required("Description is required"),
    author: yup.string().max(300).required("Author is required"),
    price: yup.number().required("Price is required"),
  })
  .required();

export default function AddListingModal({ ...props }: Props) {
  const { currentUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formError },
  } = useForm<IBaseListing>({
    resolver: yupResolver(inputValidationSchema),
  });

  const { mutateAsync: addListing, isLoading: isAddingListing } =
    useAddListing();

  const handleAddListing: SubmitHandler<IBaseListing> = async (
    data: IBaseListing
  ) => {
    await addListing({
      ref: { userId: currentUser!.id },
      listingAttr: { ...data },
    });

    reset();

    props.onClose();
  };

  return (
    <Dialog {...props}>
      <form onSubmit={handleSubmit(handleAddListing)}>
        <DialogTitle>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3">Add Listing</Typography>
            <IconButton onClick={props.onClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={isAddingListing}>
            {isAddingListing ? <CircularProgress /> : "Add Listing"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
