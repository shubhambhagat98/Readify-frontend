import { Card, CardMedia, Box, Typography, Rating } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
    borderRadius: "15px !important",
  
    cursor: "pointer",
    width: "100%",
    "&.MuiCard-root": {
      background: "none !important",
      transition: "0.2s",
      "&:hover": { transform: "scale(1.05)" },
    },
  },
  cardMedia: {
    aspectRatio: "4/6",
    width: "100%",
  },

  cardContent: {
    flexGrow: 1,
    textAlign: "center",
  },

  cardBox: {
    justifyContent: "center",
    // padding:"20px"
  },

  bookTitleBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordWrap: "break-word",
    overflow: "hidden",
  },

 
}));

export const BookCard = (props) => {


  const classes = useStyles();

  const navigate = useNavigate();
  const book = props.book;
  

  const goToDetailsPage = () => {
    navigate(`/bookdata/${book.book_id}`);
  };

  return (
    <Box className={classes.cardBox}>
      <Box sx={{px: {xs:5, md:0}}}>
      <Card className={classes.card} elevation={4} onClick={goToDetailsPage}>
        <CardMedia className={classes.cardMedia} component="img" image={book.book_image} />
      </Card>
      </Box>
      <Box
        sx={{
          display: "block",
          textAlign: "center",
          pt: "2",
        }}
      >
        <Rating
          precision={0.5}
          value={book.book_rating}
          sx={{ fontSize: "18px", p: 0.7 }}
          readOnly
        />
        <Box className={classes.bookTitleBox}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "normal", cursor: "pointer" }}
            onClick={goToDetailsPage}
          >
            {book.book_title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
