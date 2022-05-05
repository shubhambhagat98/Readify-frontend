import { Alert,  Grid, Box, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import UserContext from "../store/User-Context";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { makeStyles } from "@material-ui/core/styles";
import { BookList } from "../components/Books/BookList";
import { baseUrl } from "../baseUrl";
import { SuccessModal } from "../components/Common/SuccessModal";
import { BookListTitleBar } from "../components/Common/BookListTitleBar";

const Message = "Deletion Successful!";

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
}));

export const Playlist = () => {
  const classes = useStyles();
  const [allBooklists, setAllBooklists] = useState([]);
  const userCtx = useContext(UserContext);
  const [responseError, setResponseError] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [deleteBook, setDeleteBook] = useState(userCtx.deleteBookMode);
  const [checkBooklist, setCheckBooklist ] = useState(false);

  const handleChange = (event, newValue) => {
    setDeleteModeHandler(0, false);
    userCtx.setLastVisitedList(newValue);
  };
  useEffect(() => {
    getAllBookLists();
    
  }, []);

  useEffect(() => {
    userCtx.setDeleteBookMode(deleteBook);
  }, [deleteBook]);

  const getAllBookLists = async () => {
    try {
      const response = await fetch(
        baseUrl + `/mybooklistwithdata?id=${userCtx.userData.user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();

        setAllBooklists(data);
      }else{
        setAllBooklists([]);
      }
    } catch (error) {
      console.log(error);
      setResponseError(true);
    }

    setCheckBooklist(true);

  };

  const deleteBookHandler = async (bookId, booklistId) => {
    //do Something

    // alert("bookid is:"+ bookId+"\nbooklist id :"+booklistId);

    const inputPayload = {
      userId: userCtx.userData.user_id,
      booklistId: booklistId,
      bookId: bookId,
    };

    try {
      const response = await fetch(baseUrl + "/deletefrombooklist", {
        method: "POST",
        body: JSON.stringify(inputPayload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        responseHandler();
        getAllBookLists();
      } else if (response.status === 403) {
        console.log(response.json().message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBooklistHandler = async(booklistId) => {
    // do something
    const inputPayload = {
      userId: userCtx.userData.user_id,
      booklistId: booklistId,
    };

    try {
      const response = await fetch(baseUrl + "/deletebooklist", {
        method: "POST",
        body: JSON.stringify(inputPayload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        responseHandler();
        getAllBookLists();
        userCtx.setLastVisitedList("0");
      } else if (response.status === 403) {
        console.log(response.json().message);
      }
    } catch (error) {
      console.log(error);
    }

    
    
  };

  const editBookListNameHandler = async(booklistId, booklistName) => {
   
    const inputPayload = {
      userId: userCtx.userData.user_id,
      booklistId: booklistId,
      booklistName: booklistName
    };

    try {
      const response = await fetch(baseUrl + "/updatebooklistname", {
        method: "PUT",
        body: JSON.stringify(inputPayload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        getAllBookLists();
      } else if (response.status === 403) {
        console.log(response.json().message);
      }
    } catch (error) {
      console.log(error);
    }


  };

  const responseHandler = () => {
    setSuccessModal((prev) => !prev);
  };

  const setDeleteModeHandler = (booklist_Id, flag) => {
    const deleteBook = {
      booklistId: booklist_Id,
      isDelete: flag,
    };
    setDeleteBook(deleteBook);
  };

  return (
    <>
      <div>
        {responseError && <Alert severity="error">There was some error!</Alert>}
        {!responseError && allBooklists.length !== 0 ? (
          <Grid
            container
            sx={{
              minHeight: "95vh",
              marginTop: "67px",
            }}
          >
            
            <TabContext value={userCtx.lastVisitedList}>
              <Grid
                item
                md={3}
                lg={2}
                sx={{
                  display: { md: "flex", xs: "none" },
                  flexDirection: "column",
                  flex: "1",
                  borderRight: 1,
                  borderColor: "divider",
                }}
              >
                <Box pt={4}>
                  <TabList
                    orientation="vertical"
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    className={classes.tabs}
                  >
                    {allBooklists.map((booklist, idx) => {
                      return (
                        <Tab
                          label={
                            <Typography sx={{ textAlign: "left" }}>
                              {booklist.booklist_name}
                            </Typography>
                          }
                          value={`${idx}`}
                          sx={{
                            display: "flex",
                            flex: "1",
                            alignItems: "flex-start",
                          }}
                          key={"tabkey1" + idx}
                        />
                      );
                    })}
                  </TabList>
                </Box>
              </Grid>
              <Grid item xs={12} md={9} lg={10}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    display: {
                      md: "none",
                      xs: "flex",
                    },
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    className={classes.tabs}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                  >
                    {allBooklists.map((booklist, idx) => {
                      return (
                        <Tab
                          label={booklist.booklist_name}
                          value={`${idx}`}
                          sx={{
                            display: "flex",
                            flexGrow: "1",
                          }}
                          key={"tabkey2" + idx}
                        />
                      );
                    })}
                  </TabList>
                </Box>

                <div>
                  {allBooklists.map((booklist, idx) => {
                    return (
                      <TabPanel value={`${idx}`} key={"booklistTabpanel" + idx}>
                        <BookListTitleBar
                          booklistId={booklist.booklist_id}
                          booklistTitle={booklist.booklist_name}
                          setDeleteModeHandler={setDeleteModeHandler}
                          deleteBooklistHandler={deleteBooklistHandler}
                          editBookListNameHandler={editBookListNameHandler}
                          booklistLength={booklist.books.length}
                        />

                        {booklist.books.length === 0 ? (
                          <h2 style={{marginLeft:"10px"}}>No books found in this booklist</h2>
                        ) : (
                          <BookList
                            books={booklist.books}
                            parentNode={"mybooklist"}
                            deleteBookHandler={deleteBookHandler}
                            booklistId={booklist.booklist_id}
                          />
                        )}
                      </TabPanel>
                    );
                  })}
                </div>
              </Grid>
            </TabContext>
          </Grid>
        ) : (
          allBooklists.length === 0 && checkBooklist && <Box
          sx={{
            display: "flex",
            flex: "1",
            height: "90vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Alert sx={{ fontSize: "30px", display:"flex", alignItems: "center", }} severity="error">
            No BookList Found!
          </Alert>
        </Box>
        )}
      </div>

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
