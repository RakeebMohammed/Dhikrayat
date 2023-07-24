import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Container, Grid, InputAdornment, Paper } from "@mui/material";
import * as api from "../../api/index";
import { useNavigate } from "react-router-dom";
import { pink,red } from "material-ui-colors";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function Auth() {
  const navigate = useNavigate();
  const [Error,setError]=useState(" ")
  const [ShowPassword, setShowPassword] = useState(false)
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
    if(  FormData.email=== ""||
    FormData.password=== "")
    return setError('Required all fields')
    if (isSignup) {
      const { data } = await api.signUp(FormData);
      if(data.message) setError(data.message)
    else{  localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    }} else {
      const  {data} = await api.signIn(FormData);
   if(data.message) setError(data.message)
    else { localStorage.setItem("user", JSON.stringify(data));
      navigate("/");}
    }
  };
  const switchMode = () => {
    console.log(FormData);
    setError('')
    setFormData({ firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",});
    console.log(FormData);
    setisSignup((prev) => !prev);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ color: pink[500] }}
        >
          {isSignup ? "SignUp" : "SignIn"}
        </Typography>

        <Grid container>
          {isSignup && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                value={FormData.firstname}
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
                 value={FormData.lastname}
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
           value={FormData.email}
            id=""
            sx={{ my: "4px" }}
            label="Email"
            name="email"
            onChange={handleChange}
            fullWidth
           
          />{" "}
          <TextField
           value={FormData.password}
            id=""
            sx={{ my: "4px" }}
            label="Password"
            name="password"
            onChange={handleChange}
            fullWidth
            type={ShowPassword?"text":"password"}
           
            InputProps={{
            
              endAdornment:(<InputAdornment  onClick={()=>setShowPassword(prev=>!prev)} position="end" >
                {ShowPassword?<VisibilityOffIcon/>:<VisibilityIcon/>}
              </InputAdornment>)
          }}
          />
          {isSignup && (
            <>
              <TextField
               value={FormData.confirmpassword}
                id=""
                sx={{ my: "4px" }}
                label="Confirm Password"
                name="confirmpassword"
                onChange={handleChange}
                fullWidth
                type="password"
              />
            </>
          )}
           {Error && <Typography  variant="body1" sx={{color:red[500]}}>{Error}</Typography>}
      
          <Button
            sx={{ my: "4px"}}
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
