import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export const DeleteBooklistModal = (props) => {
  const [open, setOpen] = useState(props.isOpen);

  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.openDeleteModalHandler();
  };

  const confirmDelete = () => {
    props.deleteBooklistHandler(props.booklistId);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle id="alert-dialog-title">{"BookList Alert!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure that you want to delete this booklist?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "inherit" }}>
          No
        </Button>
        <Button onClick={confirmDelete} sx={{ color: "#832BE0" }}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
