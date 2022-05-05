import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/User-Context";
import { useContext, useState } from "react";
import { CreateBookList } from "../Common/CreateBookList";
import { SuccessModal } from "../Common/SuccessModal";

const pages = [
  { Title: "HOME", Link: "/" },
  { Title: "BOOKS", Link: "/books" },
];

const sections = [
  { Title: "SERVICES", Link: "/#services" },
  { Title: "ABOUT US", Link: "/#aboutus" },
];

const settings = [
  { Title: "Profile", Link: "/profile" },
  { Title: "My Booklist", Link: "/mybooklist" },
  { Title: "Recommendations", Link: "/recommendations" },
];

const Message =
  "Booklist created successfully! Now you can add books to this booklist and bookmark some interesting books.";

export const MainNavigation = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openBooklistModal, setOpenBooklistModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  var firstLetter;
  var first_name;
  var last_name;
  if (userCtx.userData) {
    first_name = userCtx.userData.first_name;
    last_name = userCtx.userData.last_name;
    firstLetter = first_name[0].toUpperCase();
  }

  const logoutHandler = () => {

    localStorage.removeItem("readifyUser");
    localStorage.removeItem("token");
    userCtx.setUserData();
    navigate("/", { replace: true });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (link) => {
    handleCloseNavMenu();
    navigate(link);
  };

  const scrollToTarget = (id) => {
    const selector = id.split("#")[1];
    var element = document.getElementById(selector);
    var headerOffset = 95;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
      block: "start",
    });
  };

  const createPlaylistHandler = () => {
    setOpenBooklistModal(true);
  };

  const closeBooklistModalHandler = () => {
    setOpenBooklistModal(false);
  };

  const responseHandler = () => {
    setSuccessModal((prev) => !prev);
  };

  return (
    <>
      <AppBar position="fixed" style={{ background: "#270537" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ padding: "0px !important" }}>
            <Box
              sx={{
                flex: 1,
                cursor: "pointer",
                mr: 2,
                ml: 4,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
              onClick={() => navigate("/")}
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

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClick={handleCloseNavMenu}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, idx) => (
                  <MenuItem
                    key={idx + 10}
                    onClick={() => navigateTo(page.Link)}
                  >
                    <Typography textAlign="center">{page.Title}</Typography>
                  </MenuItem>
                ))}

                {sections.map((section, idx) => (
                  <MenuItem
                    key={idx + 25}
                    component={HashLink}
                    to={section.Link}
                    scroll={() => scrollToTarget(section.Link)}
                  >
                    <Typography textAlign="center">{section.Title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                cursor: "pointer",
                display: { xs: "flex", md: "none" },
              }}
              onClick={() => navigate("/")}
            >
              READIFY
            </Typography>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {pages.map((page, idx) => (
                <MenuItem key={idx + 35} onClick={() => navigateTo(page.Link)}>
                  <Typography textAlign="center" sx={{ my: 2, color: "white" }}>
                    {page.Title}
                  </Typography>
                </MenuItem>
              ))}

              {sections.map((section, idx) => (
                <MenuItem
                  component={HashLink}
                  to={section.Link}
                  key={idx + 90}
                  style={{ textDecoration: "none" }}
                  scroll={() => scrollToTarget(section.Link)}
                >
                  <Typography textAlign="center" sx={{ my: 2, color: "white" }}>
                    {section.Title}
                  </Typography>
                </MenuItem>
              ))}
            </Box>

            {userCtx.userData ? (
              <Box sx={{ flexGrow: 0, ml: 2 }}>
                <Tooltip
                  arrow
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <span style={{ fontSize: "12px" }}>
                        {first_name + " " + last_name + " (You)"}
                      </span>
                      <span>Click to view options</span>
                    </Box>
                  }
                >
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="A"
                      sx={{ background: "#E244A3", fontWeight: "bold" }}
                    >
                      {firstLetter}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClick={handleCloseUserMenu}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, idx) => (
                    <MenuItem
                      key={idx + 17}
                      onClick={() => navigateTo(setting.Link)}
                    >
                      <Typography textAlign="center">
                        {setting.Title}
                      </Typography>
                    </MenuItem>
                  ))}

                  <MenuItem key="create-list" onClick={createPlaylistHandler}>
                    <Typography textAlign="center">Create Booklist</Typography>
                  </MenuItem>
                  <MenuItem key="logoutbutton" onClick={logoutHandler}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0, ml: 0 }}>
                <MenuItem onClick={() => navigate("/login")} key="loginbutton">
                  <Typography
                    textAlign="center"
                    sx={{ my: 2, mx: 1, color: "white" }}
                  >
                    LOGIN
                  </Typography>
                </MenuItem>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {openBooklistModal && (
        <CreateBookList
          closeBooklistModalHandler={closeBooklistModalHandler}
          responseHandler={responseHandler}
          isOpen={true}
        />
      )}

      {successModal && (
        <SuccessModal
          responseHandler={responseHandler}
          isOpen={true}
          message={Message}
        />
      )}
    </>
  );
};
