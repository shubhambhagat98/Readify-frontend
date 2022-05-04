import { Alert, Container, Grid, Box, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import UserContext from "../store/User-Context";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { makeStyles } from "@material-ui/core/styles";
import { BookList } from "../components/Books/BookList";
import { baseUrl } from "../baseUrl";


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
  const [value, setValue] = useState("0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    getAllBookLists();
  }, []);

  const getAllBookLists = async () => {
    try {
      const response = await fetch(
        baseUrl+`/mybooklistwithdata?id=${userCtx.userData.user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setAllBooklists(data);
      }
    } catch (error) {
      console.log(error);
      setResponseError(true);
    }
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
            <TabContext value={value}>
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
                      console.log(idx);
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
                    {allBooklists.map((booklist,idx)=>{
                      return  <TabPanel value={`${idx}`}>
                            {booklist.books.length === 0 ? (
                                <h1>No books found in this booklist</h1>
                            ): (
                                <BookList books={booklist.books} />
                            )}
                        </TabPanel>
                    })}

                </div>

              </Grid>
            </TabContext>
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flex: "1",
              height: "90vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Alert sx={{ fontSize: "30px" }} severity="error">
              No BookList Found!
            </Alert>
          </Box>
        )}
      </div>
    </>
  );
};
