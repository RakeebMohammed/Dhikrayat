import { createSlice } from "@reduxjs/toolkit";
let post = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isLoading: true,
  },
  reducers: {
    getPosts(state, action) {
      console.log(action.payload);
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPage: action.payload.totalPage,
        isLoading: false,
      };
    },
    previewPost(state, action) {
    
      return { ...state, post: action.payload };
    },
    createPost(state, action) {
      return { ...state, posts: [action.payload, ...state.posts] };
    },
    updatePost(state, action) {
      const posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      return { ...state, posts: posts };
    },
    deletePost(state, action) {
      const posts = state.posts.filter((post) => post._id !== action.payload);
      return { ...state, posts: posts };
    },
     commentPost(state, action) {
      const post = state.posts.map((post) =>
        post._id === action.payload._id 
      );
      return { ...state, posts: post };
    }
  },
});
export const { getPosts, createPost, updatePost, deletePost, previewPost ,commentPost} =
  post.actions;
export default post.reducer;
