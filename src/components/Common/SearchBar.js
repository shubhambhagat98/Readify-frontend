import { Box, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import UserContext from "../../store/User-Context";
import { useContext, useEffect, useState } from "react";
const useStyles = makeStyles((theme) => ({
  radioLabel: {
    display: "flex",
    alignItems: "center",
  },

  radioColor: {
    "&.Mui-checked": {
      color: "#832BE0 !important",
    },
  },

  inpuText: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#832BE0",
    },
  },
}));

export const SearchBar = (props) => {
  const classes = useStyles();
  const userCtx = useContext(UserContext);
  const [key, setKey] = useState(userCtx.keyword);

  useEffect(()=>{
    setKey(userCtx.keyword);
  },[]);

  useEffect(()=>{
   userCtx.setKeyword(key);
  },[key]);

  return (
    <Box pr={3}>
      <TextField
        className={classes.inpuText}
        id="standard-basic"
        placeholder="Search by title, author or genre"
        variant="standard"
        margin="normal"
        value={userCtx.keyword}
        fullWidth
        onChange={(event) => {
          // userCtx.setKeyword(event.target.value);
          // props.keywordHandler(event.target.value);
          setKey(event.target.value);
        }}
        autoComplete = "false"
        InputProps={{
          autoComplete: "new-password",
                  form: {
                    autCcomplete: "off",
                  },
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
