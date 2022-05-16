import BookListItem from "@App/components/books/BookListItem";
import useFetchUserBooks from "@App/lib/books/useFetchUserBooks";
import { Box, LinearProgress, Typography } from "@mui/material";

export default function BooksPage() {
  const { data: books, isLoading, isFetching } = useFetchUserBooks();

  const renderContent = () => {
    if (!books) return null;

    if (books.empty)
      return <Typography variant="subtitle1">No books found</Typography>;

    return (
      <>
        {books.docs.map((book) => (
          <Box key={book.id} paddingY={2}>
            <BookListItem book={book} />
          </Box>
        ))}
      </>
    );
  };

  return (
    <Box>
      <Typography variant="h3">Books</Typography>

      {(isLoading || isFetching || !books) && <LinearProgress />}

      {renderContent()}
    </Box>
  );
}
