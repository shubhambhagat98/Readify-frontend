import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Fade,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";

const serviceList = [
  "Unlimited Recommendations",
  "Complete Responsive Layout",
  "Bookmark your favorite!",
  "You explore! we explore too",
];

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  cardMedia: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "20%",
      paddingRight: "20%",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "30%",
      paddingRight: "30%",
    },
  },
}));

export const Services = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div id="services">
      <Container maxWidth="sm" sx={{ marginTop: "70px", marginBottom: "30px" }}>
        <Typography
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Services
        </Typography>
      </Container>
      <Container
        maxWidth="lg"
        sx={{ padding: "20px 10px", marginBottom: "60px" }}
      >
        <Grid container spacing={4}>
          {serviceList.map((service, idx) => (
            <Grid item key={"service" + idx} xs={12} sm={6} md={3}>
              <Fade in={checked} {...(checked ? { timeout: 1000 } : {})}>
                <Card className={classes.card} elevation={0}>
                  <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    image="/assets/servicelogo.png"
                    title="service image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" align="center">
                      {service}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
