import { Container, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  aboutUs: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "linear-gradient(180deg, #B041E5 0%, #701CC6 100%)",
    textAlign: "justify !important",
  },
}));

export const About = () => {
  const classes = useStyles();
  return (
    <div id="aboutus" className={classes.aboutUs}>
      <Container
        sx={{ paddingTop: "70px", marginBottom: "70px" }}
        maxWidth="md"
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ color: "#fff", marginBottom: "40px" }}
        >
          About Us
        </Typography>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#fff", fontSize: "28px", textAlign: "justify",
          textJustify: "inner-word", }}
          paragraph
        >
          Readify is one of the best things for avid readers, as the name
          suggests. Users can browse and add favorite books to their accounts,
          as well as create booklists. This is an excellent starting point for
          anyone who wants to begin reading but is unsure where to begin. We
          provide you with detailed information on over 20,000 best-selling
          books, as well as opportunities to learn more about them. Simply sign
          up for an account on any of your devices and explore Readify's
          features. Readify is a one-stop portal that will recommend the finest
          reading options for you!
        </Typography>
      </Container>
    </div>
  );
};
