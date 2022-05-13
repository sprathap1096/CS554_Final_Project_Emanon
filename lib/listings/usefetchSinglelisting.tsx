import { StringFormat } from "firebase/storage";
import { useQuery } from "react-query";
import ListingService from "./ListingService";
import {
    IBaseListing,
    IListingAttributes,
    TListingCollectionReference,
    TListingDocumentReference,
  } from "./types"

export default function usefetchSinglelisting(ref: TListingDocumentReference) {
  const { data, status } = useQuery("book", () => ListingService.fetchdoc(ref));
  if(status=='success')
  {
    console.log(status,"print status");
    return data;
  }
  console.log(status,"print status");
  console.log(data);
  return null;
}
