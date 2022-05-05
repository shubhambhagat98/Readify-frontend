import { Box, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

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

  return (
    <Box pr={3}>
      <TextField
        className={classes.inpuText}
        id="standard-basic"
        placeholder="Search by title, author or genre"
        variant="standard"
        margin="normal"
        fullWidth
        onChange={(event) => {
          props.keywordHandler(event.target.value);
        }}
        InputProps={{
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
