
import { CircularProgress, Divider, Paper, Typography, Grid, Box,Stack} from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  //useNavigate,
  useParams,
} from "react-router-dom";
import * as api from "../../api";

import { previewPost } from "../../redux/redux";
import CommentSection from "./CommentSection";
const PostDetails = () => {
  const dispatch=useDispatch()
  const {post,isLoading}=useSelector(state=>state)
 
  const {id} = useParams();
  useEffect(() => {
   preview()
  },[id])
  const preview=async()=>{
    let { data } = await api.previewPost(id);
   
    dispatch(previewPost(data))
  }
  if (isLoading) return<Stack sx={{alignItems:'center'}}><CircularProgress  size="5rem"/></Stack> 

  return (
    <Paper  elevation={8} style={{margin:'25px 0',padding:'25px 25px'}} >
     <Grid container spacing={3}>
      <Grid item  xs={12} md={6} sx={{paddingLeft:'25px'}} justifyContent='space-between' alignItems='center'> <Typography variant="h2" color=""  >{post?.title}</Typography>
      <Typography variant="body2" color="seagreen" sx={{py:2}} >{post?.tags?.map(tag=>`#${tag}`)}</Typography>
      <Typography variant="body1" color=""  sx={{py:1}} >{post?.message
}</Typography>
  <Typography variant="body1" color=""  sx={{py:1}} >Created by :{post?.name}</Typography>
      <Typography variant="body2" color=""  >{moment(post?.createdAt).fromNow()}</Typography>
    <Divider sx={{m:4}}/>
    <CommentSection post={post}/>
     

        
      </Grid>    <Grid  item  xs={12}  md={6} textAlign='center'>
      <Box  component="img"  src={post?.selectedfile} sx={{width:{sm:'300px',xs:'240px',md:'400px',lg:'500px'},objectFit:'fill',borderRadius:'25px'}}/>
        </Grid>  
</Grid>

    </Paper>
  );
};

export default PostDetails;
