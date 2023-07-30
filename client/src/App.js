import { Container } from "@mui/material";
import Home from "./Components/Home/Home";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Navbar from "./Components/Navbar/Navbar";
import PostDetails from "./Components/PostDetails/PostDetails";
function App() {
  const User = JSON.parse(localStorage.getItem("user"))?.result;
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact Component={() => <Navigate to={"/posts"} />} />
          <Route path="/posts" exact Component={Home} />
          <Route path="/posts/search" exact Component={Home} />
          <Route path="/posts/:id" exact Component={PostDetails} />
          <Route 
            path="/auth" Component={User ? () => <Navigate to={"/posts"} /> : <Auth/>}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
