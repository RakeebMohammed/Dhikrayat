import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import moment from "moment";
import {
  Card,
  Grid,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
} from "@mui/material";
import { deletePost, updatePost } from "../../redux/redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { red } from "material-ui-colors";
import * as api from "../../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Post({ setId }) {
  const { posts, isLoading } = useSelector((state) => state);
  const [Likes, setLikes] = useState([])
  
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likeOne = async (id) => {
    let { data } = await api.likePost(id);
   setLikes(data)
    dispatch(updatePost(data));
  };
  const deleteOne = async (id) => {
    await api.deletePost(id);

    dispatch(deletePost(id));
  };
  const previewDetails = async (id) => {
    navigate(`/posts/${id}`);
  };
  if (isLoading) return <CircularProgress />;
const Like=()=>{

}
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
          <Card
            raised
            sx={{
              cursor: "pointer",
              position: "relative",
              borderRadius: "15px",
            }}
          >
            <CardMedia
              onClick={() => previewDetails(post._id)}
              title={post.title}
              component="img"
              image={post.selectedfile}
              sx={{
                height: "150px",
                filter: "brightness(55%)",
                "&:hover": { filter: "none",transform:'scale(0.95)', transitionDuration: "0.9s" },
              }}
            />
            <div style={{ paddingLeft: "15px" }}>
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  top: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
                color="white"
              >
                {post.name}
              </Typography>
              <Typography
                variant="body-2"
                color="white"
                sx={{ position: "absolute", top: "40px" }}
              >
                {moment(post.createdAt).fromNow()}
              </Typography>
            </div>
            {user?.result?._id === post.creator && (
              <Button
                sx={{ position: "absolute", top: "10px", right: "0px" }}
                size="small"
                onClick={() => {
                  setId(post._id);
                }}
              >
                <MoreHorizIcon />
              </Button>
            )}

            <Typography
              variant="body2"
              color="initial"
              sx={{ marginTop: "10px", marginLeft: "17px" }}
            >
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>

            <CardContent
              sx={{ padding: "0px", paddingTop: "10px", paddingLeft: "17px" }}
            >
              <Typography variant="h4" color="initial">
                {post.title}
              </Typography>
              <Typography variant="body2" color="GrayText">
                {post.message}
              </Typography>
            </CardContent>

            <CardActions
              sx={{ disply: "flex", justifyContent: "space-between" }}
            >
             
              <Button
              disabled={!user?.result?._id}

                title="Like"
                size="small"
                onClick={() => likeOne(post._id)}
              >
               
                {post._id===Likes?._id && Likes?.likes.includes(user?.result?._id)?<><ThumbUpAltIcon fontSize="small"/> {Likes?.likes.length}</>:
                 post?.likes?.length>0 ?<>{post?.likes?.includes(user?.result?._id)?<><ThumbUpAltIcon fontSize="small"/> {post.likes.length}</>:<><ThumbUpOffAltIcon sx={{"&:hover":{color:'blue'}}} fontSize="small" />{post.likes.length}</>}</>:
                <><ThumbUpOffAltIcon sx={{"&:hover":{color:'blue'}}} fontSize="small" />Like </> }
              </Button>
              {user?.result?._id === post.creator && (
                <Button
                  title="Delete"
                  size="small"
                  onClick={() => deleteOne(post._id)}
                >
                  <DeleteIcon fontSize="small" sx={{ color: red[700] ,"&:hover":{color:red[900]}} }/>
                </Button>
              )}
   
            </CardActions>
          </Card>
        </Grid>
      ))}

    </Grid>
  );
}

export default Post;
