import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Container, Grid, Paper } from "@mui/material";
import * as api from "../../api/index";
import { useNavigate } from "react-router-dom";
import { lightBlue } from "material-ui-colors";

function Auth() {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [isSignup, setisSignup] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      const { data } = await api.signUp(FormData);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } else {
      const { data } = await api.signIn(FormData);
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    }
  };
  const switchMode = () => {
    console.log(FormData);
    setFormData({ ...FormData, email: "" });
    console.log(FormData);
    setisSignup((prev) => !prev);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ color: lightBlue[300] }}
        >
          {isSignup ? "SignUp" : "SignIn"}
        </Typography>

        <Grid container>
          {isSignup && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  id=""
                  sx={{ my: "4px" }}
                  label="First Name"
                  name="firstname"
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id=""
                  sx={{ my: "4px" }}
                  label="Last Name"
                  name="lastname"
                  onChange={handleChange}
                  fullWidth
                />{" "}
              </Grid>
            </>
          )}
          <TextField
            id=""
            sx={{ my: "4px" }}
            label="Email"
            name="email"
            onChange={handleChange}
            fullWidth
          />{" "}
          <TextField
            id=""
            sx={{ my: "4px" }}
            label="Password"
            name="password"
            onChange={handleChange}
            fullWidth
          />
          {isSignup && (
            <>
              <TextField
                id=""
                sx={{ my: "4px" }}
                label="Confirm Password"
                name="confirmpassword"
                onChange={handleChange}
                fullWidth
              />
            </>
          )}
          <Button
            sx={{ my: "4px" }}
            variant="contained"
            onClick={handleSubmit}
            fullWidth
          >
            {isSignup ? `SignUp` : "SignIn"}
          </Button>
          <Button variant="body" color="initial" onClick={switchMode}>
            {isSignup
              ? "Already have an account ? SignIn"
              : "Dont have an Account ? SignUp"}
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Auth;
