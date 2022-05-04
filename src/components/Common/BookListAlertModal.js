import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export const BookListAlertModal = (props) => {
  const [open, setOpen] = useState(props.isOpen);
  console.log(open);

  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.booklistAlertHandler();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle id="alert-dialog-title">{"BookList Alert!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Book is already inserted in the playlist.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "#832BE0" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
