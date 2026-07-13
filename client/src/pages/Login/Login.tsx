import React, { useState } from "react";
import "./Login.css";


import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../../api/authApi";


const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();


  if (!email.trim() || !password.trim()) {
    toast.error("Please enter Email and Password");
    return;
  }


  try {

    const response = await loginUser({
      email: email.trim(),
      password: password.trim()
    });


    // clear old session
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    const userData = {
      userId: response.userId,
      name: response.name,
      email: response.email,
      role: response.role
    };

    if (rememberMe) {

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );
      localStorage.setItem(
        "token",
        response.token
      );
    } 
    else {

      sessionStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      sessionStorage.setItem(
        "token",
        response.token
      );
    }


    toast.success("Login Successful");


    navigate("/dashboard");
  } 
  catch(error:any) {

    if(error.response?.status === 401)
    {
      toast.error("Invalid Email or Password");
    }
    else if(error.response?.data)
    {
      toast.error(error.response.data);
    }
    else
    {
      toast.error("Something went wrong");
    }

  }

};

  const handleForgotPassword = () => {

  if (!forgotEmail.trim()) {
    toast.error("Please enter your email");
    return;
  }


  toast.info(
    "Password reset feature will be available after backend integration."
  );


  setForgotEmail("");
  setOpenForgotPassword(false);
};

  return (
    <div className="login-container">

      {/* LEFT SECTION */}

      <div className="login-left">

        {/* Uncomment when logo is available */}

        {/* <img
          src="/logo.png"
          alt="Logo"
          className="logo"
        /> */}

        <h1>Please log in to continue.</h1>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <TextField
            label="Email ID"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <div className="login-options">

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />
              }
              label="Remember Me"
            />

            <Link
              component="button"
              underline="none"
              onClick={() =>
                setOpenForgotPassword(true)
              }
            >
              Forgot password?
            </Link>

          </div>

          <Button
            type="submit"
            variant="contained"
            className="login-button"
            fullWidth
          >
            Sign In
          </Button>

        </form>

      </div>

      {/* RIGHT SECTION */}

      <div className="login-right">

        {/* Uncomment when image is available */}

        {/* <img
          src="/leave-management.png"
          alt="Leave Management"
        /> */}

        <h2>Welcome Back</h2>

        <p>
          Manage leave requests, approvals and employee
          attendance efficiently from one place.
        </p>

      </div>

      {/* FORGOT PASSWORD DIALOG */}

      <Dialog
        open={openForgotPassword}
        onClose={() =>
          setOpenForgotPassword(false)
        }
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Forgot Password?

          <IconButton
            onClick={() =>
              setOpenForgotPassword(false)
            }
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

        </DialogTitle>

        <DialogContent>

          <TextField
            label="Enter Email"
            fullWidth
            margin="normal"
            value={forgotEmail}
            onChange={(e) =>
              setForgotEmail(e.target.value)
            }
          />

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "gray",
            }}
          >
            This feature is currently available only after
            backend integration.
          </Typography>

        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 3,
          }}
        >

          <Button
            variant="outlined"
            onClick={() =>
              setOpenForgotPassword(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleForgotPassword}
          >
            Submit
          </Button>

        </DialogActions>

      </Dialog>

    </div>
  );
}

export default Login;