import { IBookAttributes } from "@App/lib/books/types";
import { Box, Paper, Typography } from "@mui/material";
import { QueryDocumentSnapshot } from "firebase/firestore";

interface Props {
  book: QueryDocumentSnapshot<IBookAttributes>;
}

export default function BookListItem({ book }: Props) {
  return (
    <Paper>
      <Box p={3}>
        <Typography>{book.data().title}</Typography>
        <Typography>{book.data().author}</Typography>
        <Typography>{book.data().description}</Typography>
      </Box>
    </Paper>
  );
}
