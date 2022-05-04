import { Box, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imageDiv: {
    width: "80%",
    height: "80%",
  },

  imageLogo: {
    width: "100%",
    marginTop: "10px",
    padding: "20px",
  },

  bannerTitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: "3.5rem",
    margin: "0",
  },
}));

export const LoginBanner = () => {
  const classes = useStyles();

  return (
    <Box
      className={classes.imageDiv}
      sx={{
        display: { md: "flex", xs: "none" },
        p: 2,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="sm">
        <h2 className={classes.bannerTitle}>
          What's your next <br /> read ?
        </h2>
      </Container>

      <img className={classes.imageLogo} alt="" src="/assets/readLogo.png" />
    </Box>
  );
};
