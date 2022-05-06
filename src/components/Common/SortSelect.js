import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../../store/User-Context";

const useStyles = makeStyles((theme) => ({
  selectBox: {
    display: "flex",
    flex: "1",
    borderRadius: "15px !important",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px !important",
    border: "solid 1px #EA5DEB !important",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px !important",
      
    },
    
  },

  selectRoot: {
    "& .MuiSelect-select": {
      background: "none !important",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px !important",
      },
    },
  },
}));

export const SortSelect = () => {
  const userCtx = useContext(UserContext);
  const [order, setOrder] = useState(userCtx.sortOrder);
  const classes = useStyles();


  useEffect(() => {
    setOrder(userCtx.sortOrder);
  }, []);

  useEffect(() => {
    userCtx.setSortOrder(order);
   
  }, [order]);

  const handleSelect = (event) => {
    setOrder(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 1 auto",
        justifyContent: "center",
        alignItems: "flex-end",
        width: "100%",
        py: 1,
        px: 1,
      }}
    >
      <Box className={classes.selectBox} py={0.5} sx={{ px: { md: 2, xs: 0.5 } }}>
        <Typography noWrap variant="inherit" style={{ fontWeight: "normal" }}>
          Rating |
        </Typography>
        <FormControl variant="standard" sx={{ pl: { md: 1, xs: 0.5 } }}>
          <Select
            value={userCtx.sortOrder}
            defaultValue="default"
            onChange={handleSelect}
            className={classes.selectRoot}
            disableUnderline
          >
            <MenuItem value="default" disabled hidden>Default</MenuItem>
            <MenuItem value="ascending">Ascending</MenuItem>
            <MenuItem value="descending">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
