import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  Rating,
  Chip,
  Button,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Progress } from "./Progress";
import UserContext from "../../store/User-Context";
import { LoginAlertModal } from "./LoginAlertModal";
import { BookListAlertModal } from "./BookListAlertModal";
import { AddToBookListModal } from "./AddToBookListModal";
import { SuccessModal } from "./SuccessModal";
import { BookList } from "../Books/BookList";
import { baseUrl } from "../../baseUrl";
import { CardSkeleton } from "./CardSkeleton";

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "pointer",
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    "&.MuiCard-root": {
      background: "none !important",
      padding: "2px",
    },
  },
  cardMedia: {
    aspectRatio: "4/6",
    width: "100%",
    borderRadius: "15px !important",
    boxShadow: "0px 2px 3px rgba(0,0,0,0.2)",
  },

  textBox: {
    display: "flex",
    flexDirection: "row",
  },

  bookText: {
    [theme.breakpoints.up("sm")]: {
      paddingRight: "4.5%",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "10%",
    },
  },

  addBookButton: {
    borderRadius: "28px !important",
    paddingLeft: "30px !important",
    paddingRight: "30px !important",
    fontSize: "18px !important",
    backgroundColor: "#D843DB !important",
  },
}));

const Message = "Book added to the booklist successfuly!";

export const BookDetails = (props) => {
  const [book, setBook] = useState(props.book);
  const classes = useStyles();
  const userCtx = useContext(UserContext);
  const [openLoginAlert, setOpenLoginAlert] = useState(false);
  const [openBooklistAlertModal, setOpenBooklistAlert] = useState(false);
  const [openAddToBooklistModal, setOpenAddToBooklistModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    setBook(props.book);
  }, []);

  useEffect(() => {
    getRecommenations();
  }, [book]);

  const addToBooklistHandler = () => {
    if (userCtx.userData) {
      setOpenAddToBooklistModal(true);
    } else {
      setOpenLoginAlert(true);
    }
  };

  const closeAddToBooklistModalHandler = () => {
    setOpenAddToBooklistModal(false);
  };

  const closeAlertHandler = () => {
    setOpenLoginAlert(false);
  };

  const booklistAlertHandler = () => {
    setOpenBooklistAlert((prev) => !prev);
  };

  const responseHandler = () => {
    setSuccessModal((prev) => !prev);
  };

  const getRecommenations = async () => {
    try {
      const response = await fetch(
        baseUrl + `/bookdatarecommendations?id=${book.book_id}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setRecommendations(data.book_recommendations);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container pt={{ sm: 10, xs: 5 }}>
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card className={classes.card} elevation={0}>
            <CardMedia className={classes.cardMedia} component="img" image={book.book_image} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={7} className={classes.bookText}>
          <Typography variant="h4">{book.book_title}</Typography>
          <Rating
            precision={0.5}
            value={book.book_rating}
            sx={{ p: 0.9, pl: 0 }}
            readOnly
          />
          <Box className={classes.textBox} sx={{ pt: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Author:
            </Typography>
            <Typography variant="h5" sx={{ pl: 3.7 }}>
              {book.book_author}
            </Typography>
          </Box>
          <Box className={classes.textBox} sx={{ pt: 2 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
              Genres:
            </Typography>
            <Box sx={{ pl: 2 }}>
              {book.book_genre.split(", ").map((genre, idx) => {
                return (
                  <Chip
                    key={"chip" + idx}
                    label={genre}
                    sx={{
                      mt: 0.7,
                      ml: 1,
                      fontSize: "inherit",
                    }}
                  />
                );
              })}
            </Box>
          </Box>
          <Box
            className={classes.textBox}
            sx={{
              pt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
              Like <br />
              Percent:
            </Typography>
            <Box sx={{ pl: 2, width: "100%" }}>
              <Progress done={book.book_like_percent} />
            </Box>
          </Box>
          <Box sx={{ mt: 6 }}>
            <Button
              variant="contained"
              className={classes.addBookButton}
              onClick={addToBooklistHandler}
            >
              Add to BookList
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          px: { lg: 10, md: 5 },
          mt: 6,
          textAlign: "justify",
          textJustify: "inner-word",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mt: 1, color: "#D843DB" }}
        >
          Description
        </Typography>
        <Typography fontWeight="normal" sx={{ mt: 3, fontSize: "20px" }}>
          {book.book_description}
        </Typography>
      </Box>
      <Box
        sx={{
          px: { lg: 10, md: 5 },
          mt: 6,
          textAlign: "justify",
          textJustify: "inner-word",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mt: 1, color: "#D843DB" }}
        >
          Recommendations
        </Typography>

        
        {recommendations.length === 0 ? (
          <CardSkeleton />
        ) : (
          <BookList parentNode={"books"} books={recommendations} />
        )}
      </Box>

      {openLoginAlert && (
        <LoginAlertModal closeAlertHandler={closeAlertHandler} isOpen={true} />
      )}

      {openAddToBooklistModal && (
        <AddToBookListModal
          closeAddToBooklistModalHandler={closeAddToBooklistModalHandler}
          responseHandler={responseHandler}
          booklistAlertHandler={booklistAlertHandler}
          isOpen={true}
          bookId={book.book_id}
        />
      )}

      {openBooklistAlertModal && (
        <BookListAlertModal
          isOpen={true}
          booklistAlertHandler={booklistAlertHandler}
        />
      )}

      {successModal && (
        <SuccessModal
          responseHandler={responseHandler}
          isOpen={true}
          message={Message}
        />
      )}
    </>
  );
};
