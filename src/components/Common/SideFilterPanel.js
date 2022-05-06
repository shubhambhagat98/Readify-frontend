import { Typography, Box } from "@mui/material";
import { Filters } from "./Filters";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/User-Context";
import { useContext, useState } from "react";
import { LoginAlertModal } from "./LoginAlertModal";
import { CreateBookList } from "./CreateBookList";
import { SuccessModal } from "./SuccessModal";

const Message =
  "Booklist created successfully! Now you can add books to this booklist and bookmark some interesting books.";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: "75px",
    [theme.breakpoints.up("xl")]: {
      paddingLeft: "40px !important",
      paddingRight: "40px !important",
    },
  },

  sidePanelLink: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontSize: "18px",

    "&:hover": {
      backgroundColor: "#e8e5e5 !important",
    },
    textDecoration: "none",
  },
}));

export const SideFilterPanel = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [openLoginAlert, setOpenLoginAlert] = useState(false);
  const [openBooklistModal, setOpenBooklistModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const navigationHandler = (link) => {
    if (userCtx.userData) {
      navigate(link);
    } else {
      setOpenLoginAlert(true);
    }
  };

  const createPlaylistHandler = () => {
    if (userCtx.userData) {
      setOpenBooklistModal(true);
    } else {
      setOpenLoginAlert(true);
    }
  };

  const closeAlertHandler = () => {
    setOpenLoginAlert(false);
  };

  const closeBooklistModalHandler = () => {
    setOpenBooklistModal(false);
  };

  const responseHandler = () => {
    setSuccessModal((prev) => !prev);
  };

  const classes = useStyles();
  return (
    <>
      <Box className={classes.root} sx={{ p: 2 }}>
        <Box
          color="inherit"
          className={classes.sidePanelLink}
          py={0.7}
          mb={1}
          onClick={() => {
            navigationHandler("/mybooklist");
          }}
        >
          <CollectionsBookmarkRoundedIcon />
          <Typography variant="inherit" noWrap ml={1}>
            Your BookList
          </Typography>
        </Box>
        <Box
          color="inherit"
          className={classes.sidePanelLink}
          py={0.7}
          mb={1}
          onClick={createPlaylistHandler}
        >
          <LibraryAddRoundedIcon />
          <Typography variant="inherit" noWrap ml={1}>
            Create BookList
          </Typography>
        </Box>
        <Box
          color="inherit"
          className={classes.sidePanelLink}
          py={0.7}
          mb={3}
          onClick={() => {
            navigationHandler("/recommendations");
          }}
        >
          <LibraryBooksRoundedIcon />
          <Typography variant="inherit" noWrap ml={1}>
            Suggestions
          </Typography>
        </Box>
        <Filters />
      </Box>

      {openLoginAlert && (
        <LoginAlertModal closeAlertHandler={closeAlertHandler} isOpen={true} />
      )}

      {openBooklistModal && (
        <CreateBookList
          closeBooklistModalHandler={closeBooklistModalHandler}
          responseHandler={responseHandler}
          isOpen={true}
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
