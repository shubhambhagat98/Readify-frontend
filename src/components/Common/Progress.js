import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  progress: {
    backgroundColor: "#d8d8d8",
    borderRadius: "20px",
    height: "22px",
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },

  progressDone: {
    background: "linear-gradient(to left, #832BE0, #EA5DEB)",
    borderRadius: "20px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "0",
    opacity: "0",
    transition: "1s ease 0.3s",
    fontSize: "18px",
  },
}));

export const Progress = ({ done }) => {
  const [style, setStyle] = useState({});
  const classes = useStyles();

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`,
    };

    setStyle(newStyle);
  }, 5);

  return (
    <div className={classes.progress}>
      <div className={classes.progressDone} style={style}>
        {done}%
      </div>
    </div>
  );
};
