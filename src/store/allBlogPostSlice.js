import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backendBaseURL from "../backendBaseURL.js";

const initialState = {
    blogPosts: [],
    loading: false,
    error: null
  }

export const getAllBlogPost = createAsyncThunk("blogPostsSliceName", async function(args,{rejectWithValue}){
    try {
        const response = await axios.get(`${backendBaseURL}/api/blogPost/allPost`);
        return response.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const allBlogPostSlice = createSlice({
    name: "blogPostsSliceName",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllBlogPost.pending]: function(state){
            state.loading = true;
        },
        [getAllBlogPost.rejected]: function(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        [getAllBlogPost.fulfilled]: function(state, action){
            state.loading = false;
            state.blogPosts = action.payload;
        }
    }
});

export default allBlogPostSlice.reducer;