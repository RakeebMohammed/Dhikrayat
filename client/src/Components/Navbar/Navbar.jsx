import React, { useEffect, useState } from "react";
import { Typography, Button, Toolbar, Avatar, AppBar } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { red, teal } from "@mui/material/colors";
const Navbar = () => {
  const location = useLocation();

  const [User, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user?.result);
    }
  }, [location]);
  const logOut = () => {
    localStorage.clear();
   setUser(null)
  };
  return (
    <AppBar  position="static" sx={{ backgroundColor: "#f7f8fc", my: 3 }}>
      <Toolbar sx={{
          display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "10px", }}
      >
        <Link to="/" style={{textDecoration:'none'}}>
         
          <Typography variant="h2" color="primary" >
           Memories
          </Typography>
        </Link>
        {User ? (
          <div 
            style={{
              width: "500px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            
            <Avatar src={User?.imageUrl} alt="no image"  sx={{display:{lg:'none'}}}>
              {User?.name?.charAt(0)}
            </Avatar>
            <Typography variant="h5" color="initial">
              {User.name}
            </Typography>
            <Button
              style={{ backgroundColor: red[500] }}
              variant="contained"
              size="small"
              onClick={logOut}
            >
              <Typography variant="h6" color="white">
                Logout
              </Typography>
            </Button>
          </div>
        ) : (
        
          <Button
            style={{ backgroundColor: teal[600] }}
            variant="contained"
            size="small"
          >
            <Typography
              variant="h6"
              color="white"
              component={Link}
              to={"/auth"}
              style={{textDecoration:'none'}}
            >
              SignIn
            </Typography>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
