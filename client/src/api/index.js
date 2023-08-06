import axios from "axios";
const API = axios.create({ baseURL:
  // "http://localhost:3001"
   "https://memories-lp8k.onrender.com/"
   });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`; }
return req;
});
export const getPost = (page) => API.get("/post?page=" + page);
export const searchPost = (Search, Tags) =>
  API.patch(`/post/search?query=${Search || "none"}&tags=${Tags}`);
export const createPost = (post) => API.post(`post/createPost/`, post);
export const singlePost = (id, Post) => API.patch(`/post/${id}`, Post);
export const previewPost = (id) => API.get("/post/" + id);
export const likePost = (id) => API.put(`/post/${id}`);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const commentPost = (comment, id) =>
  API.post(`/post/${id}/comment`, { comment });
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
