import AuthGuard from "@App/lib/auth/AuthGuard";
import { IBaseListing } from "@App/lib/listings/types";
import useFetchListing from "@App/lib/listings/useFetchListing";
import { LinearProgress } from "@mui/material";
import { list } from "firebase/storage";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

  const { data: listing, isLoading } = useFetchListing(listingId as string);
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<IBaseListing>({
    defaultValues: listing?.data(),
    mode: "onSubmit",
    resolver: yupResolver(inputValidationSchema),
  });

  const onSaveChanges = () => {};

  if (!listing || isLoading) return <LinearProgress />;

  return (
    <div>
      <h1>Edit Listings Page</h1>
    </div>
  );
}

export default function EditListingsPage() {
  return (
    <AuthGuard>
      <EditListingPageContent />
    </AuthGuard>
  );
}
