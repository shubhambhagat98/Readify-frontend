import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Button,
  TextField,
  Alert,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import UserContext from "../../store/User-Context";
import { useContext, useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { baseUrl } from "../../baseUrl";

const useStyles = makeStyles((theme) => ({
  inpuText: {
    "& label.Mui-focused": {
      color: "#D843DB",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#D843DB",
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

  tabs: {
    display: "flex",
    justifyContent: "space-between",

    "& .MuiTabs-indicator": {
      backgroundColor: "#D843DB",
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#D843DB",
    },
  },

  selectBox: {
    display: "flex",
    flex: "1",
    borderRadius: "15px !important",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px !important",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px !important",
    },
  },

  selectRoot: {
    "& .MuiSelect-select": {
      background: "none !important",
    },
  },
}));

export const AddToBookListModal = (props) => {
  const classes = useStyles();
  const userCtx = useContext(UserContext);
  const [openModal, setOpenModal] = useState(props.isOpen);
  const [nameError, setNameError] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const [responseError2, setResponseError2] = useState(false);
  const [allBooklists, setBookLists] = useState([]);
  const [selectedBooklistId, setSelectedBooklistId] = useState("default");
  const [selectError, setSelectError] = useState(false);

  const [value, setValue] = useState("1");
  const booklistName = useRef();

  useEffect(() => {
    getAllBookListsHandler();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelect = (event) => {
    setSelectedBooklistId(event.target.value);
  };

  const handleClose = () => {
    setOpenModal(false);
    props.closeAddToBooklistModalHandler();
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

  const createBookListHandler = async (event) => {
    event.preventDefault();
    const isError = isInputError();
    if (!isError) {
      const inputPayload = {
        userId: userCtx.userData.user_id,
        booklistName: booklistName.current.value,
        bookId: props.bookId,
      };

      try {
        const response = await fetch(
          baseUrl+"/createbooklistwithbook",
          {
            method: "POST",
            body: JSON.stringify(inputPayload),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          props.responseHandler();
          handleClose();
        } else if (response.status === 401) {
          setResponseError(true);
        }
      } catch (error) {
        console.log(error);
        setResponseError(true);
      }
    }
  };

  const selectErrorHandler = () => {
    let isError = false;

    if (selectedBooklistId === "default") {
      setSelectError(true);
      isError = true;
    }

    return isError;
  };

  const addToBooklistHandler = async (event) => {
    event.preventDefault();
    console.log(selectedBooklistId);
    console.log(userCtx.userData.user_id);
    console.log(props.bookId);

    const isError = selectErrorHandler();
    if (!isError) {
      const inputPayload = {
        bookId: props.bookId,
        booklistId: selectedBooklistId,
        userId: userCtx.userData.user_id,
      };

      try {
        const response = await fetch(baseUrl+"/inserttobooklist", {
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
          props.booklistAlertHandler();
          handleClose();
        }
      } catch (error) {
        console.log(error);
        setResponseError(true);
      }
    } else {
      console.log(selectedBooklistId);
    }
  };

  const getAllBookListsHandler = async () => {
    try {
      const response = await fetch(
        baseUrl+`/mybooklist?id=${userCtx.userData.user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setBookLists(data.booklist);
      }
    } catch (error) {
      console.log(error);
      setResponseError2(true);
    }
  };

  return (
    <Dialog open={openModal} onClose={handleClose} maxWidth="sm" fullWidth>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            className={classes.tabs}
          >
            <Tab
              label="Select Booklist"
              value="1"
              sx={{ display: "flex", flex: "1" }}
            />
            <Tab
              label="Create Booklist"
              value="2"
              sx={{ display: "flex", flex: "1" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          {selectError && (
            <Alert severity="error">Please select a booklist!</Alert>
          )}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={addToBooklistHandler}
          >
            <DialogContent>
              {responseError2 && (
                <Alert severity="error">There was some error. Try again!</Alert>
              )}

              {!responseError2 && allBooklists.length === 0 ? (
                <Alert severity="warning">
                  No booklists found. Please create a booklist first!
                </Alert>
              ) : (
                <>
                  <DialogContentText>
                    Select the name of your booklist.
                  </DialogContentText>
                  <Box className={classes.selectBox} mt={1}>
                    <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
                      <Select
                        value={selectedBooklistId}
                        onChange={handleSelect}
                        className={classes.selectRoot}
                        sx={{
                          ":after": { borderBottomColor: "#D843DB" },
                        }}
                      >
                        <MenuItem value="default" disabled hidden>
                          Default
                        </MenuItem>
                        {allBooklists.map((booklist, idx) => (
                          <MenuItem
                            value={booklist.booklist_id}
                            key={"booklist" + idx}
                          >
                            {booklist.booklist_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: "inherit" }}>
                Close
              </Button>
              {!responseError2 && allBooklists.length !== 0 && (
                <Button type="submit" sx={{ color: "#D843DB" }}>
                  Submit
                </Button>
              )}
            </DialogActions>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={createBookListHandler}
          >
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
              <Button type="submit" sx={{ color: "#D843DB" }}>
                Submit
              </Button>
            </DialogActions>
          </Box>
        </TabPanel>
      </TabContext>
    </Dialog>
  );
};
