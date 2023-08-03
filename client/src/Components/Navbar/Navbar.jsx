import React, { useEffect, useState } from "react";
import { Typography, Button, Toolbar, Avatar, AppBar, Box} from "@mui/material";
import { Link, useLocation} from "react-router-dom";
import { red, teal } from "@mui/material/colors";
import Logo from '../../Images/dhikrayat.png'
import AOS from 'aos'
const Navbar = () => {
  const location = useLocation();

  const [User, setUser] = useState(null);
  useEffect(() => {
    AOS.init()
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
    
    <AppBar position="static" sx={{ backgroundColor: "#f7f8fc", my: 3 }} >
   
      <Toolbar  data-aos="fade-down" data-aos-duration="2000" sx={{
          display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "10px", }}
      >
        <Link to="/" style={{textDecoration:'none'}}>
                  <img src={Logo} alt=""  style={{height:'3.6rem'}} />
              

        </Link>
        {User ? (
          <Box 
          sx={{ width: "480px",
          display: "flex",
          justifyContent:{md:"space-between",xs:"flex-end",sm:'flex-end'},
          alignItems: "center"}}
           
          >
            
            <Avatar src={User?.imageUrl} alt="no image"  sx={{display:{xs:'none',sm:'none',md:'flex'}}}>
              {User?.name?.charAt(0)}
            </Avatar>
            <Typography variant="h5" color="initial" sx={{display:{xs:'none',sm:'none',md:'flex'}}}>
              {User.name}
            </Typography>
            <Button 
              sx={{ backgroundColor: red[500] ,px:{xs:.5,md:1}}}
              variant="contained"
              size="small"
              onClick={logOut}
            >
              <Typography variant=""  color="white" sx={{typography:{
            sm:'body1',xs:'button',md:'h6'
          }}}>
                Logout
              </Typography>
            </Button>
          </Box>
        ) : (
        
          <Button
            style={{ backgroundColor: teal[600] }}
            variant="contained"
            size="small"
          >
            <Typography
              
              color="white"
              component={Link}
              to={"/auth"}
              sx={{typography:{
                sm:'body1',xs:'body1',md:'h6',textDecoration:'none'
              }}}
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
