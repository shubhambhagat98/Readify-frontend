import { Grid } from "@mui/material";
import { BookCard } from '../Common/BookCard'


export const BookList = (props) => {


  
  return (
    <div >
      <Grid container spacing={4} style={{paddingTop:"40px"}}>
        {props.books.map((book)=>(
            <Grid item key={book.book_id+"card"} xs={12} sm={4} md={3} lg={2}>
              <BookCard book={book} key={book.book_id + "book1"}/>
            </Grid>
        ))}
      </Grid>
      
      
    </div>
  );
};
