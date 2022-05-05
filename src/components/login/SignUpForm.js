import {
  Avatar,
  Box,
  Container,
  Stack,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
} from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inpuText: {
    "& label.Mui-focused": {
      color: "#832BE0",
    },

    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#832BE0",
    },
  },

  errorText: {
    "& label.Mui-focused": {
      color: "red",
    },

    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "red",
    },
  },

  signupButton: {
    borderRadius: "28px !important",
    paddingLeft: "30px !important",
    paddingRight: "30px !important",
    fontSize: "18px !important",
    backgroundColor: "#832BE0 !important",
  },
}));

export const SignUpForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstNameError, setFistNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [genre1Error, setGenre1Error] = useState(false);
  const [genre2Error, setGenre2Error] = useState(false);
  const [genre3Error, setGenre3Error] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const genre1Ref = useRef();
  const genre2Ref = useRef();
  const genre3Ref = useRef();

  useEffect(() => {
    setShowPassword(false);
    setFistNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setGenre1Error(false);
    setGenre2Error(false);
    setGenre3Error(false);
  }, []);

  const isInputError = () => {
    let errorFlag = false;
    const fname = fNameRef.current.value;
    const lname = lNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const genre1 = genre1Ref.current.value;
    const genre2 = genre2Ref.current.value;
    const genre3 = genre3Ref.current.value;

    setShowPassword(false);
    setFistNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setGenre1Error(false);
    setGenre2Error(false);
    setGenre3Error(false);

    if (fname === "") {
      errorFlag = true;
      setFistNameError(true);
    }

    if (lname === "") {
      errorFlag = true;
      setLastNameError(true);
    }

    if (email === "") {
      errorFlag = true;
      setEmailError(true);
    } else if (
      (email.match(/@/g) || []).length !== 1 ||
      (email.match(/\./g) || []).length < 1
    ) {
      errorFlag = true;
      setEmailError(true);
    } else if (
      email.indexOf(".") === 0 ||
      email.indexOf("@") === 0 ||
      email.indexOf("-") === 0 ||
      email.indexOf("_") === 0
    ) {
      errorFlag = true;
      setEmailError(true);
    } else if (/[^a-zA-Z0-9.@_-]/.test(email)) {
      errorFlag = true;
      setEmailError(true);
    }

    if (password === "") {
      errorFlag = true;
      setPasswordError(true);
    } else if (
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      errorFlag = true;
      setPasswordError(true);
    }

    if (genre1 === "") {
      errorFlag = true;
      setGenre1Error(true);
    }
    if (genre2 === "") {
      errorFlag = true;
      setGenre2Error(true);
    }
    if (genre3 === "") {
      errorFlag = true;
      setGenre3Error(true);
    }

    return errorFlag;
  };

  const submitHandler = (event) => {
    
    event.preventDefault();

    const isError = isInputError();

    if (!isError) {
      const userData = {
        firstName: fNameRef.current.value,
        lastName: lNameRef.current.value,
        emailId: emailRef.current.value,
        password: passwordRef.current.value,
        genre1: genre1Ref.current.value,
        genre2: genre2Ref.current.value,
        genre3: genre3Ref.current.value,
      };

      setShowPassword(false);
      setFistNameError(false);
      setLastNameError(false);
      setEmailError(false);
      setPasswordError(false);
      setGenre1Error(false);
      setGenre2Error(false);
      setGenre3Error(false);

      props.onSignUpSubmit(userData);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Avatar
        alt="R"
        src="/assets/Readify.png"
        sx={{ width: 60, height: 60 }}
      />
      <h1>Register</h1>
      {props.responseError && <Alert   severity="error">There was some error. Try again!</Alert>}
      <Container maxWidth="sm">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
          mt={2}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <TextField
              className={firstNameError ? classes.errorText : classes.inpuText}
              required
              id="outlined-required1"
              label="First Name"
              fullWidth
              variant="filled"
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              error={firstNameError}
              helperText={firstNameError && "Incorrect Entry."}
              inputRef={fNameRef}
            />
            <TextField
              className={lastNameError ? classes.errorText : classes.inpuText}
              required
              id="outlined-required2"
              label="Last Name"
              fullWidth
              variant="filled"
              InputProps={{
                autoComplete: "new-password",
                form: {
                  autCcomplete: "off",
                },
              }}
              error={lastNameError}
              helperText={lastNameError && "Incorrect Entry."}
              inputRef={lNameRef}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            mt={2}
          >
            <TextField
              className={emailError ? classes.errorText : classes.inpuText}
              required
              id="outlined-required3"
              label="Email Id"
              fullWidth
              variant="filled"
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              error={emailError}
              helperText={emailError && "Incorrect Entry."}
              inputRef={emailRef}
            />
            <TextField
              className={passwordError ? classes.errorText : classes.inpuText}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              label="Password *"
              variant="filled"
              fullWidth
              InputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={passwordError}
              helperText={passwordError && "Must Contain (a-z, A-z, 0-9)"}
              inputRef={passwordRef}
            />
          </Stack>
          <Stack spacing={2} mt={2}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <TextField
                className={genre1Error ? classes.errorText : classes.inpuText}
                required
                id="outlined-required4"
                label="Genre 1"
                fullWidth
                variant="filled"
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                error={genre1Error}
                helperText={genre1Error && "Incorrect Entry."}
                inputRef={genre1Ref}
              />
              <TextField
                className={genre2Error ? classes.errorText : classes.inpuText}
                required
                id="outlined-required5"
                label="Genre 2"
                fullWidth
                variant="filled"
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                error={genre2Error}
                helperText={genre2Error && "Incorrect Entry."}
                inputRef={genre2Ref}
              />
              <TextField
                className={genre3Error ? classes.errorText : classes.inpuText}
                required
                id="outlined-required6"
                label="Genre 3"
                fullWidth
                variant="filled"
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                error={genre3Error}
                helperText={genre3Error && "Incorrect Entry."}
                inputRef={genre3Ref}
              />
            </Stack>
          </Stack>
          <Box
            mt={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              className={classes.signupButton}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>

      <Stack direction="row" spacing={1} mt={4}>
        <Typography variant="h6" sx={{ fontWeight: "regular" }}>
          Already have an account?
        </Typography>
        <Typography
          onClick={() => navigate("/login")}
          variant="h6"
          sx={{ fontWeight: "bold", color: "#EA5DEB", cursor: "pointer" }}
        >
          Login
        </Typography>
      </Stack>
    </Box>
  );
};
