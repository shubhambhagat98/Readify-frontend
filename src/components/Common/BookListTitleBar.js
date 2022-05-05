import {
  Button,
  TextField,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Card,
  MenuItem,
  Menu,
} from "@mui/material";
import { useState, useContext, useRef } from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import UserContext from "../../store/User-Context";
import { makeStyles } from "@material-ui/core/styles";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { DeleteBooklistModal } from "./DeleteBooklistModal";

const useStyles = makeStyles((theme) => ({
  inpuText: {
    "& label.Mui-focused": {
      color: "#D843DB",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: "solid 1px #D843DB",
      },
    },
  },
}));

export const BookListTitleBar = (props) => {
  const classes = useStyles();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [changeTitle, setChangeTitle] = useState(false);
  const userCtx = useContext(UserContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const booklistName = useRef();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const changeTitleHandler = () => {
    setChangeTitle((prev) => !prev);
  };

  const openDeleteModalHandler = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const confirmEditHandler = (event) => {
    props.editBookListNameHandler(props.booklistId, booklistName.current.value);
    changeTitleHandler();
  };

  return (
    <>
      <Card
        sx={{
          //   border: "solid 2px red",
          mt: 1.5,
          display: "flex",
          py: 1,
          px: 1.5,
          boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 3px 0px",
          alignItems: "center",
        }}
      >
        <Box sx={{ disply: "flex", flex: "1" }}>
          {!changeTitle ? (
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ fontSize: { xs: "20px", sm: "28px", md: "30px" } }}
            >
              {props.booklistTitle}
            </Typography>
          ) : (
            <TextField
              defaultValue={props.booklistTitle}
              margin="none"
              fullWidth
              size="small"
              inputRef={booklistName}
              className={classes.inpuText}
              InputProps={{
                endAdornment: (
                  <>
                    <IconButton
                      edge="end"
                      sx={{ color: "#72B52F" }}
                      onClick={confirmEditHandler}
                    >
                      <DoneOutlinedIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      sx={{ ml: 1, color: "#E43E48" }}
                      onClick={changeTitleHandler}
                    >
                      <ClearOutlinedIcon />
                    </IconButton>
                  </>
                ),
              }}
            />
          )}
        </Box>

        {userCtx.deleteBookMode.booklistId === props.booklistId &&
          userCtx.deleteBookMode.isDelete && (
            <Button
              sx={{
                border: "solid 1px #72B52F",
                borderRadius: "5px",
                color: "#72B52F",
                background: "none",
                py: 0.5,
                px: 1,
              }}
              key="Done-books"
              onClick={() => {
                props.setDeleteModeHandler(props.booklistId, false);
              }}
            >
              <Typography textAlign="center" fontWeight="bold">
                Done
              </Typography>
            </Button>
          )}

        <Box>
          <Tooltip arrow title="click to view options">
            <IconButton onClick={handleOpenUserMenu}>
              <MoreVertOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClick={handleCloseUserMenu}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="edit-title" onClick={changeTitleHandler}>
              <Typography textAlign="center">Edit Title</Typography>
            </MenuItem>
            <MenuItem key="delete-list" onClick={openDeleteModalHandler}>
              <Typography textAlign="center">Delete Booklist</Typography>
            </MenuItem>

            {!userCtx.deleteBookMode.isDelete && (
              <MenuItem
                key="delete-books"
                onClick={() => {
                  props.setDeleteModeHandler(props.booklistId, true);
                }}
              >
                <Typography textAlign="center">Delete Books</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Card>

      {openDeleteModal && (
        <DeleteBooklistModal
          openDeleteModalHandler={openDeleteModalHandler}
          booklistId={props.booklistId}
          deleteBooklistHandler={props.deleteBooklistHandler}
          isOpen={true}
        />
      )}
    </>
  );
};
