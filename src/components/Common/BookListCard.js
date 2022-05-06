import {
  Card,
  CardMedia,
  Box,
  Typography,
  Rating,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useContext } from "react";
import UserContext from "../../store/User-Context";

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
    // position:"relative",
    aspectRatio: "4/6",
    width: "100%",
  },

  cardContent: {
    flexGrow: 1,
    textAlign: "center",
  },

  cardBox: {
    position: "relative !important",
    justifyContent: "center",
    // border: "solid 2px red",
  },

  bookTitleBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordWrap: "break-word",
    overflow: "hidden",
  },

  deleteIcon: {
    color: "#270537 !important",
    zIndex: "2",
    background: "#E95DAD !important",
    position: "absolute !important",
    display: "flex",
    top: "-12px",
    right: "-12px",
    cursor: "pointer",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.5)",
    "&.MuiIconButton-root": {
      transition: "0.2s",
      "&:hover": { background: "#E95DAD", transform: "scale(1.25)" },
    },
  },

  deleteIconText: {
    fontSize: "22px !important",
    [theme.breakpoints.down("xs")]: {
      fontSize: "32px !important",
    },
  },
}));

export const BookListCard = (props) => {
  const userCtx = useContext(UserContext);
  const book = props.book;
  const classes = useStyles();

  const navigate = useNavigate();

  const goToDetailsPage = () => {
    navigate(`/bookdata/${book.book_id}`);
  };

  const onBookDelete = () => {
    props.deleteBookHandler(book.book_id, props.booklistId);
  };

  return (
    <Box className={classes.cardBox}>
      {userCtx.deleteBookMode.booklistId === props.booklistId &&
        userCtx.deleteBookMode.isDelete && (
          <IconButton
            className={classes.deleteIcon}
            size="small"
            onClick={onBookDelete}
          >
            <ClearOutlinedIcon className={classes.deleteIconText} />
          </IconButton>
        )}

      <Box sx={{ px: { xs: 5, md: 0 } }}>
        <Card className={classes.card} elevation={4} onClick={goToDetailsPage}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            image={book.book_image}
          />
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
