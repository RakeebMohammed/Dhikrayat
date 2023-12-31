import { createSlice } from "@reduxjs/toolkit";
let post = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isLoading: true,
  },
  reducers: {
    startLoading(state,action){
    
      return{...state,isLoading:true}
    },
    endLoading(state,action){

     
      return{...state,isLoading:false}
    }  ,
    getPosts(state, action) {
    
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPage: action.payload.totalPage,
        // isLoading:false
      };
    },searchPosts(state,action){
      return{
        ...state,posts:action.payload
      }
    },

    previewPost(state, action) {
    
      return { ...state, post: action.payload  ,
        // isLoading:false
      };
    },
    createPost(state, action) {
      return { ...state, posts: [action.payload, ...state.posts] ,};
    },
    updatePost(state, action) {
      const posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      return { ...state, posts: posts, };
    },
    deletePost(state, action) {
      const posts = state.posts.filter((post) => post._id !== action.payload);
      return { ...state, posts: posts };
    },
    //  commentPosts(state, action) {
    //   const post = state.posts.map((post) =>
    //     post._id === action.payload._id 
    //   );
    //   return { ...state, posts: post };
    // }
  },
});
export const { startLoading,endLoading,getPosts,searchPosts, createPost, updatePost, deletePost, previewPost ,commentPosts} =
  post.actions;
export default post.reducer;
