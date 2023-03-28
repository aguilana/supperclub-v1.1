import React, { useState } from "react";
import { Button, TextField, Typography, Snackbar, Alert, Checkbox } from "@mui/material";
import { authenticate } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import "./login.css";

const btnStyle = {
  "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
  backgroundColor: "#EB5757",
  color: "whitesmoke",
};

const SignIn = ({ handleOpen, setErrorState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);


  // adding more state for better login functionality
  const [formSubmitted, setFormSubmitted] = useState(false);
  // const [errorState, setErrorState] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // END
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => setShowPassword(event.target.checked);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setOpen(true);
    setFormSubmitted(true)
    try {
      if (email !== "" && password !== "") {
        await dispatch(authenticate({ email, password, method: "login" }));
      }
      if (error !== null) {
        setErrorState(error)
      }
    } catch (err) {
      console.log("err", err)
    }
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      setErrorState('')
      return;
    }
    setErrorState('')
    setOpen(false);
  };

  return (
    <div className="login-form-container">
      {/* {errorState && <Alert severity='error'>{errorState}</Alert>} */}
      {error && <Alert severity='warning'>{error} </Alert>}
      <form id="login-form" onSubmit={handleSubmit} noValidate={true}>
        <Typography id="login-form-title" variant="h5">
          Log In
        </Typography>

        <div className="login-email-and-password">
          <div className="login-email">
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              value={email}
              placeholder="Email"
              error={formSubmitted && !email}
              helperText={formSubmitted && !email && 'Email is required'}
            />
          </div>

          <div className="login-password">
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Password"
              error={formSubmitted && !password}
              helperText={formSubmitted && !password && 'Password is required'}
            />
            <div className='login-password-show'>
              <Checkbox checked={showPassword} onChange={handleCheckboxChange} /> <span> <small>Show Password</small> </span>
            </div>
          </div>

          <div id="login-button">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              sx={btnStyle}
            >
              Log in
            </Button>
          </div>
        </div>
        {isLoggedIn && <Snackbar
          open={open}
          autoHideDuration={30000}
          onClose={handleSnackClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            You logged in successfully!
          </Alert>
        </Snackbar>}
      </form>
      <p className="login-to-sign-question">
        Don't have an account?{" "}
        <Button
          onClick={() => handleOpen("signup")}
          sx={{
            "&:hover": { backgroundColor: "whitesmoke", color: "#EB5757" },
            color: "#EB5757",
            fontSize: "12px"
          }}
          variant="text"
        >
          Sign Up
        </Button>
      </p>
    </div>
  );
};

export default SignIn;
