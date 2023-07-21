import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../redux/redux";
import * as api from "../../api";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button, Typography, Paper, TextField } from "@mui/material";
import FileBase from "react-file-base64";
import { red, teal } from "@mui/material/colors";
function CreatePost({ Id, setId }) {
  const post = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (Id) {
      const result = post.find((p) => p._id === Id);
      console.log(result);
      setPost(result);
      console.log(Post);
    }
  }, [Id]);

  const [Post, setPost] = useState({
    message: "",
    title: "",
    selectedfile: "",
    tags: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Id) {
      console.log(Post);
      let { data } = await api.singlePost(Id, {
        ...Post,
        name: user?.result?.name,
      });
      console.log(data);
      dispatch(updatePost(data));
      setId(null);
    } else {
      let { data } = await api.createPost({
        ...Post,
        name: user?.result?.name,
      });

      dispatch(createPost(data));
    }
    setPost({
      message: "",
      title: "",
      tags: "",
      selectedfile: "",
    });
  };
  const clear = () => {
    setPost({
      message: "",
      title: "",
      tags: "",
      selectedfile: "",
    });
    setId(null);
  };
  return (
    <>
    
      {user?.result?.name && (
        <Paper sx={{ padding: "10px" ,mb:2}} elevation={6}>
          <form autoComplete="off" noValidate>
            <Typography sx={{ py: "5px" }} align="center">
              {Id ? "Editing" : "Creating"} a Memory
            </Typography>

            <TextField
              sx={{ my: "4px" }}
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              value={Post.title}
              onChange={(e) => setPost({ ...Post, title: e.target.value })}
            ></TextField>
            <TextField
              rows={3}
              multiline={true}
              sx={{ my: "4px" }}
              label="Message"
              name="message"
              variant="outlined"
              fullWidth
              value={Post.message}
              onChange={(e) => setPost({ ...Post, message: e.target.value })}
            ></TextField>
            <TextField
              sx={{ my: "4px" }}
              label="Tags"
              name="tags"
              className="text-green-600"
              variant="outlined"
              fullWidth
              value={Post.tags}
              onChange={(e) =>
                setPost({ ...Post, tags: e.target.value.split(",") })
              }
            ></TextField>
            <div style={{ margin: "10px " }}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPost({ ...Post, selectedfile: base64 })
                }
              ></FileBase>
            </div>
          </form>
          <Button
            sx={{
              my: "4px",
              backgroundColor: teal[800],
              "&:hover": { backgroundColor: teal[900] },
            }}
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            onClick={handleSubmit}
          >
            Create
          </Button>
          <Button
            sx={{
              my: "4px",
              backgroundColor: red[800],
              "&:hover": { backgroundColor: red[900] },
            }}
            variant="contained"
            fullWidth
            size="small"
            onClick={clear}
          >
            Clear
          </Button>
        </Paper>
      )}
    </>
  );
}

export default CreatePost;
