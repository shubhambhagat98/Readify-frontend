import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField, Alert } from "@mui/material";
import UserContext from "../../store/User-Context";
import { useContext, useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { baseUrl } from "../../baseUrl";

const useStyles = makeStyles((theme) => ({
  inpuText: {
    "& label.Mui-focused": {
      color: "#832BE0",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#832BE0",
    },
  },

  errorText: {
    "& label.Mui-focused": {
      color: "red",
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "red",
    },
  },
}));

export const CreateBookList = (props) => {
  const classes = useStyles();
  const userCtx = useContext(UserContext);
  const [openModal, setOpenModal] = useState(props.isOpen);
  const [nameError, setNameError] = useState(false);
  const [responseError, setResponseError] = useState(false);

  const booklistName = useRef();

  useEffect(() => {
    handleClickOpen();
    setNameError(false);
  }, []);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    props.closeBooklistModalHandler();
  };

  const isInputError = () => {
    let errorFlag = false;

    const name = booklistName.current.value;

    setNameError(false);

    if (name === "" || name.length <= 3) {
      errorFlag = true;
      setNameError(true);
    }

    return errorFlag;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const isError = isInputError();

    if (!isError) {
      const inputPayload = {
        userId: userCtx.userData.user_id,
        booklistName: booklistName.current.value,
      };
      try {
        const response = await fetch(baseUrl+"/createbooklist", {
          method: "POST",
          body: JSON.stringify(inputPayload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          props.responseHandler();
          handleClose();
        } else if (response.status === 403) {
          setResponseError(true);
        }
      } catch (error) {
        console.log(error);
        setResponseError(true);
      }
    }
  };

  return (
    <Dialog
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
      px={6}
      open={openModal}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {"Create your booklist"}
      </DialogTitle>
      <DialogContent>
        {responseError && (
          <Alert severity="error">There was some error. Try again!</Alert>
        )}
        <DialogContentText id="booklist-dialog-description">
          Enter the name of your choice for this booklist.
        </DialogContentText>
        <TextField
          className={nameError ? classes.errorText : classes.inpuText}
          required
          id="outlined-required33"
          label="Booklist Name"
          fullWidth
          variant="standard"
          inputProps={{
            autoComplete: "new-booklist",
            form: {
              autoComplete: "off",
            },
          }}
          error={nameError}
          helperText={
            nameError &&
            "Incorrect Entry. Name should be atleast 4 letters long"
          }
          inputRef={booklistName}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "inherit" }}>
          Close
        </Button>
        <Button type="submit" sx={{ color: "#832BE0" }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
