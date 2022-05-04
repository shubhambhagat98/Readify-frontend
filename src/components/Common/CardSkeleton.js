import {
  Card,
  Grid,
  Skeleton,
  Box,
  CardMedia,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",

    flexDirection: "column",
    marginBottom: "10px",
    borderRadius: "15px !important",

    width: "100%",
    "&.MuiCard-root": {
      background: "none !important",
      elavation: "0 !important",
      transition: "0.2s",
      "&:hover": { transform: "scale(1.05)" },
    },
  },
  cardMedia: {
    aspectRatio: "4/6",
    height: "100%",
    width: "100%",
  },

  cardContent: {
    flexGrow: 1,
    textAlign: "center",
  },

  cardBox: {
    justifyContent: "center",
  },
}));

export const CardSkeleton = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={4} style={{ paddingTop: "40px" }}>
      {Array(18)
        .fill(0)
        .map((temp, idx) => (
          <Grid item key={"cardskeleton" + idx} xs={12} sm={4} md={3} lg={2}>
            <Box className={classes.cardBox}>
              <Card className={classes.card} elevation={0}>
                <CardMedia className={classes.cardMedia}>
                  <Skeleton variant="rectangular" width="100%">
                    <div style={{ aspectRatio: "4/6" }} />
                  </Skeleton>
                </CardMedia>
              </Card>
              <Box
                sx={{
                  display: "block",
                  textAlign: "center",
                  pt: "2",
                }}
              >
                <Skeleton variant="rectangular" width="65%" sx={{ mx: "auto" }}>
                  <div style={{ width: "80%", height: "18px" }} />
                </Skeleton>
                <Typography variant="h6">
                  <Skeleton width="100%" />
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
    </Grid>
  );
};
