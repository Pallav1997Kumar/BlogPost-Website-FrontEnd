import { configureStore } from "@reduxjs/toolkit";
import  userDetailFunction  from "./userDetailSlice.js";
import blogPostDetail  from "./allBlogPostSlice.js";
import blogCategoryDetail  from "./allBlogCategorySlice.js";

const userReducer = {
  userSlice: userDetailFunction,
  blogPostsSliceName: blogPostDetail,
  blogCategorySliceName: blogCategoryDetail
};

export const store = configureStore({
  reducer: userReducer,
});
