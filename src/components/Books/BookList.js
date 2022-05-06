import { Grid, } from "@mui/material";
import { BookCard } from "../Common/BookCard";
import { BookListCard } from "../Common/BookListCard";

export const BookList = (props) => {
  return (
    <div>
      {props.parentNode === "books" ? (
        <Grid container spacing={4} style={{ paddingTop: "40px" }}>
          {props.books.map((book) => (
            <Grid item key={book.book_id + "card"} xs={12} sm={4} md={3} lg={2}>
              <BookCard
                book={book}
                key={book.book_id + "book1"}
                parentNode={props.parentNode}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        
        <Grid container spacing={4} style={{ paddingTop: "40px" }}>
          {props.books.map((book) => (
            <Grid item key={book.book_id + "card"} xs={12} sm={4} md={3} lg={2} >
              <BookListCard
                book={book}
                key={book.book_id + "book1"}
                parentNode={props.parentNode}
                deleteBookHandler={props.deleteBookHandler}
                booklistId={props.booklistId}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
