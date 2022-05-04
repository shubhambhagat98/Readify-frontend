import { Container, Grid, Typography, Box, Avatar, Stack } from "@mui/material";

export const Footer = () => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #47184E 0%, #300B45 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ marginTop: "35px" }}>
        <Grid container spacing={4} style={{ paddingBottom: "70px" }}>
          <Grid item key="footer-1" xs={6} sm={3} md={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <Avatar sx={{ mr: 2 }} alt="A" src="/assets/navbrand.png" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                textAlign="center"
              >
                READIFY
              </Typography>
            </Box>
            <Stack
              direction="row"
              spacing={2}
              sx={{ marginTop: "30px", marginLeft: "10px" }}
            >
              <Avatar
                alt="A"
                src="/assets/instagram.png"
                variant="square"
                sx={{ width: 24, height: 24 }}
              />
              <Avatar
                alt="A"
                src="/assets/twitter.png"
                variant="square"
                sx={{ width: 24, height: 24 }}
              />
              <Avatar
                alt="A"
                src="/assets/facebook.png"
                variant="square"
                sx={{ width: 24, height: 24 }}
              />
            </Stack>
          </Grid>
          <Grid
            item
            key="footer-2"
            xs={6}
            sm={3}
            md={3}
            sx={{ justifyContent: "center" }}
          >
            <Box
              sx={{
                color: "#fff",
              }}
            >
              <Typography variant="h6">Company</Typography>
              <Stack spacing={2} sx={{ marginTop: "30px" }}>
                <Typography>About</Typography>
                <Typography>Jobs</Typography>
                <Typography>For The Record</Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid
            item
            key="footer-3"
            xs={6}
            sm={3}
            md={3}
            sx={{ justifyContent: "center" }}
          >
            <Box
              sx={{
                color: "#fff",
              }}
            >
              <Typography variant="h6">Communities</Typography>
              <Stack spacing={2} sx={{ marginTop: "30px" }}>
                <Typography>For Authors</Typography>
                <Typography>Developers</Typography>
                <Typography>Advertising</Typography>
                <Typography>Investors</Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid
            item
            key="footer-4"
            xs={6}
            sm={3}
            md={3}
            sx={{ justifyContent: "center" }}
          >
            <Box
              sx={{
                color: "#fff",
              }}
            >
              <Typography variant="h6">Useful Links</Typography>
              <Stack spacing={2} sx={{ marginTop: "30px" }}>
                <Typography>Support</Typography>
                <Typography>Web Reader</Typography>
                <Typography>Contact Us</Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
