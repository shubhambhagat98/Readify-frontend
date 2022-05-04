import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { SignUpForm } from "../components/login/SignUpForm";
import { LoginBanner } from "../components/login/LoginBanner";
import UserContext from "../store/User-Context";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../baseUrl";

const useStyles = makeStyles((theme) => ({
  loginBanner: {
    background: "linear-gradient(180deg, #EA5DEB 0%, #832BE0 100%)",
    textShadow: "2px 2px 2px rgba(0,0,0,0.26)",
  },

  loginForm: {
    display: "flex",
    padding: "0",
    width: "100%",
    height: "calc(100vh - 66px)",
  },
}));

export const SignUp = () => {
  const classes = useStyles();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState(false);

  useEffect(() => {
    setResponseError(false);
  }, []);

  const signupFormHandler = async (userData) => {
    try {
      const response = await fetch(baseUrl+"/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("readifyUser", JSON.stringify(data.response));
        localStorage.setItem("token", data.token);

        userCtx.setUserData(data.response);
        // const data1 = JSON.parse(localStorage.getItem("readifyUser"));
        navigate("/", { replace: true });
      } else if (response.status === 401) {
        setResponseError(true);
      }
    } catch (error) {
      console.log(error);
      setResponseError(true);
    }
  };

  return (
    <div>
      <Grid container>
        <Grid
          item
          key="login-image"
          md={6}
          className={classes.loginBanner}
          sx={{
            display: { md: "flex", xs: "none" },
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <LoginBanner />
        </Grid>
        <Grid
          item
          key="login-form"
          md={6}
          className={classes.loginForm}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <SignUpForm
            onSignUpSubmit={signupFormHandler}
            responseError={responseError}
          />
        </Grid>
      </Grid>
    </div>
  );
};
