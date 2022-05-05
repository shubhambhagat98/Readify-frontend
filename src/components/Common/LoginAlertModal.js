import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export const LoginAlertModal = (props) => {
  const [open, setOpen] = useState(props.isOpen);


  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.closeAlertHandler();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle id="alert-dialog-title">{"Login Alert!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please login first. You can navigate to the login page by clicking on
          the "Login" menu on the top right of the nav bar.
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
