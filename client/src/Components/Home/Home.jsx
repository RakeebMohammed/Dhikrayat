import React, { useEffect, useState } from "react";
import * as api from "../../api/index";

import { useDispatch } from "react-redux/es/exports";
import {
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Post from "../Posts/Post";
import { MuiChipsInput } from "mui-chips-input";
import CreatePost from "../CreatePost/CreatePost";
import { getPosts } from "../../redux/redux";
import Paginate from "../Pagination/Paginate";

import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get("page") || 1;

  const searchQuery = query.get("searchQuery");

  const [Id, setId] = useState(null);
  const navigate = useNavigate();
  const [Search, setSearch] = useState("");
  const [Tags, setTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPost();
  }, [Id, page]);
  const getAllPost = async () => {
    let { data } = await api.getPost(page);

    dispatch(getPosts(data));
  };
  const handleSubmit = async () => {
    let { data } = await api.searchPost(Search, Tags.join(","));
    console.log(data);
    dispatch(getPosts(data));
    navigate(`/posts/search?searchQuery=${Search}&Tags=${Tags.join(",")}`);
  };

  return (
    <Grow in>
      <Grid
        container
        justifyContent="space-between"
        sx={{ pr: 2, pl: 2 ,display:'flex',flexDirection:{xs:'column-reverse',sm:'row-reverse',md:'row'}}}
        alignItems="stretch"

      >
        <Grid item xs={12} sm={8} md={9} sx={{ px: "15px", mb: "15px" }} >
          <Post setId={setId} />
          {!searchQuery && !Tags.length && (
            <Paper sx={{ my: "15px" ,justifyContent:'center',display:'flex'}} >
              <Paginate page={page} />
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} sm={4} md={3 }>
          <Paper sx={{ padding: "15px", mb: 1 }}>
            <TextField
              sx={{ my: "4px" }}
              fullWidth
              label="Search memories"
              name="search"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <MuiChipsInput
              sx={{ my: "4px" }}
              fullWidth
              label="Search tags"
              hideClearAll
              value={Tags}
              onAddChip={(tag) => setTags([...Tags, tag])}
              onDeleteChip={(tag) => setTags(Tags.filter((t) => t !== tag))}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="small"
            >
              <Typography variant="h6" color="white">
                Search
              </Typography>
            </Button>
          </Paper>
          <CreatePost Id={Id} setId={setId} />
         
        </Grid>
       
      </Grid>
    
    </Grow>
  );
};

export default Home;
