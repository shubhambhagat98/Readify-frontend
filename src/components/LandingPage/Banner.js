import { Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import Slide from "@mui/material/Slide";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  banner: {
    display: "flex",
    padding: "0",
    width: "100%",
    height: "600px",
    textShadow: "2px 2px 2px rgba(0,0,0,0.36)",
    backgroundImage: "url(/assets/banner.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-around",
    },
  },

  bannerTitleDiv: {
    textAlign: "center",
  },

  bannerTitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: "4.5rem",
    [theme.breakpoints.up("md")]: {
      marginRight: "150px",
    },
    lineHeight: "6rem",
    justifyContent: "center",
  },

  bannerButton: {
    [theme.breakpoints.up("md")]: {
      marginRight: "150px !important",
    },
    borderRadius: "28px !important",
    paddingLeft: "30px !important",
    paddingRight: "30px !important",
    fontSize: "22px !important",
    transition: "0.2s !important",
    backgroundColor: "#36104D !important",
    "&:hover": {
      backgroundColor: "#36104D !important",
      transform: "scale(1.15) !important",
    },
  },

  colorText: {
    color: "#270537",
  },

  macImageDiv: {
    width: "40%",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },

    alignItems: "flex-end",
    padding: "0px",
  },

  macImage: {
    width: "100%",
    marginLeft: "50px",
  },
}));

export const Banner = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.banner} ref={containerRef}>
      <Slide
        direction="right"
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        container={containerRef.current}
      >
        <div className={classes.macImageDiv}>
          <img
            className={classes.macImage}
            alt="macimage"
            src="/assets/mac.png"
          />
        </div>
      </Slide>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedSize={50}
      >
        <div className={classes.bannerTitleDiv}>
          <h1 className={classes.bannerTitle}>
            Welcome to <br />
            <span>Readify</span>
          </h1>
          <Button
            component={Link}
            to="/books"
            variant="contained"
            className={classes.bannerButton}
          >
            Explore Books
          </Button>
        </div>
      </Collapse>
    </div>
  );
};
