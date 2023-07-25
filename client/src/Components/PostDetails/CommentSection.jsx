import React from "react";
import { Typography, TextField, Button, Divider, Grid } from "@mui/material";
import { useState } from "react";
import * as api from "../../api";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/redux";
import { useRef } from "react";

const CommentSection = ({ post }) => {
  const dispatch=useDispatch()
  const view = useRef()
const [Comment, setComment] = useState("");
  const [Comments, setComments] = useState(post?.comments);
   console.log(Comments);
console.log(post?.comments);
  const user = JSON.parse(localStorage.getItem("user"));
  const commentPost = async () => {
    const final = `${user?.result?.name} : ${Comment}`;
    let { data } = await api.commentPost(final, post._id);
 dispatch(updatePost(data))
 view.current.scrollIntoView({behviour:'smooth'})
 setComment((''))
setComments(data?.comments)
  };
  return (
    <Grid container  spacing={2}>
      <Grid item sm={6} sx={{height:'200px',overflow:'auto'}}>
      
       
        {post?.comments.map((c, i) => (
          <Typography variant="h6" key={i} color="initial">
            <strong>{c.split(":")[0]}</strong>:{c.split(":")[1]}
         
          </Typography>
        ))}
            <div ref={view}/>
      </Grid>
     

      {user?.result?.name && (
        <Grid item sm={6} justifyContent="space-between">
          <Typography variant="h6" gutterBottom color="initial">
            Write a comment
          </Typography>
          <TextField
            multiline
            rows={3}
            label="Comment..."
            value={Comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            sx={{ py: 1 }}
          />
          <Button variant="contained" disabled={!Comment} onClick={commentPost} fullWidth>
            Comment
          </Button>
        </Grid>
      )}
      <Divider sx={{ m: 2 }} />
    </Grid>
  );
};

export default CommentSection;
