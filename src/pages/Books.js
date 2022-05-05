import { BookList } from "../components/Books/BookList";
import { SideFilterPanel } from "../components/Common/SideFilterPanel";
import { SearchBar } from "../components/Common/SearchBar";
import { Grid, Container, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { Footer } from "../components/LandingPage/Footer";
import { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../store/User-Context";
import { SortSelect } from "../components/Common/SortSelect";
import { FilterModal } from "../components/Common/FilterModal";
import { CardSkeleton } from "../components/Common/CardSkeleton";
import { baseUrl } from "../baseUrl";

const useStyles = makeStyles((theme) => ({
  moreBooksButton: {
    borderRadius: "28px !important",
    paddingLeft: "30px !important",
    paddingRight: "30px !important",
    fontSize: "18px !important",
    backgroundColor: "#832BE0 !important",
  },
}));

export const Books = () => {
  const userCtx = useContext(UserContext);
  const classes = useStyles();
  const rating = userCtx.rating;
  const likePercent = userCtx.likePercent;
  const sortOrder = userCtx.sortOrder;
  const [keyword, setKeyword] = useState("");
  const [bookList, setBookList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [count, setCount] = useState(30);

  const moreBooksHandler = () => {
    setCount((prevCount) => prevCount + 30);
  };

  const keywordHandler = (keyword) => {
    setKeyword(keyword);
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    bookFilterHandler(rating, keyword, likePercent);
  }, [rating, keyword, likePercent]);

  useEffect(() => {
    let f1 = structuredClone(filteredList);
    setFilteredList(() => {
      return f1.sort(sortList(sortOrder));
    });
  }, [sortOrder]);

  const sortList = (order) => (a, b) => {
    if (order === "ascending") {
      return a.book_rating < b.book_rating ? -1 : 1;
    } else if (order === "descending") {
      return a.book_rating < b.book_rating ? 1 : -1;
    }
    return 0;
  };

  const bookFilterHandler = (rating, keyword, likePercent) => {
    userCtx.setSortOrder("default");
    setFilteredList(
      bookList.filter((book) => {
        return (
          book.book_rating >= rating &&
          book.book_like_percent >= likePercent[0] &&
          book.book_like_percent <= likePercent[1] &&
          (book.book_genre.toLowerCase().includes(keyword.toLowerCase()) ||
            book.book_author.toLowerCase().includes(keyword.toLowerCase()) ||
            book.book_title.toLowerCase().includes(keyword.toLowerCase()))
        );
      })
    );
  };

  const getBooks = async () => {
    try {
      const response = await fetch(baseUrl+"/books");
      if (response.status === 200) {
        const data = await response.json();
        setBookList(data.books);
        setFilteredList(data.books);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid
            item
            md={2.8}
            lg={2}
            sx={{ display: { md: "block", xs: "none" } }}
          >
            <SideFilterPanel />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            lg={10}
            sx={{
              borderLeft: "linear 2px #CFCBCF",
              boxShadow: "inset 4px 0 12px -9px rgba(0,0,0,0.36)",
              paddingBottom: "50px",
            }}
          >
            <Container maxWidth="xl">
              <Grid container>
                <Grid
                  item
                  xs={1}
                  sm={1}
                  sx={{
                    display: {
                      md: "none",
                      xs: "flex",
                    },
                    alignItems: "flex-end",
                    pb: 0.5,
                  }}
                >
                  <FilterModal />
                </Grid>
                <Grid
                  item
                  xs={7.5}
                  sm={7.5}
                  md={9}
                  lg={9.5}
                  sx={{ pt: 1.5, pl: { xs: 2, sm: 1, md: 0 } }}
                >
                  <SearchBar keywordHandler={keywordHandler} />
                </Grid>
                <Grid
                  item
                  xs={3.5}
                  sm={3.5}
                  md={3}
                  lg={2.5}
                  sx={{ display: "flex", pt: 1.5 }}
                >
                  <SortSelect />
                </Grid>
              </Grid>

              {filteredList.length === 0 ? (
                <CardSkeleton />
              ) : (
                <BookList books={filteredList.slice(0, count)} parentNode = {"books"} />
              )}

              <Box
                mt={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={moreBooksHandler}
                  variant="contained"
                  className={classes.moreBooksButton}
                >
                  Load more Books
                </Button>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
};
