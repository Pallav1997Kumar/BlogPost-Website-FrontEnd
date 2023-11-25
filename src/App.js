import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactUs from "./components/static component/ContactUs.js";
import HomePage from "./components/static component/HomePage.js";
import Login from "./components/authorization/Login.js";
import Register from "./components/authorization/Register.js";
import DeletedAccount from "./components/authorization/DeletedAccount.js";
import AllBlogs from "./components/all blogs/AllBlogs.js";
import NavBar from "./components/fixed component/NavBar.js";
import Logout from "./components/authorization/Logout.js";
import UpdatePost from "./components/update post/UpdatePost.js";
import Footer from "./components/fixed component/Footer.js";
import SinglePost from "./components/single post/SinglePost.js";
import Write from "./components/write post/Write.js";
import EditProfile from "./components/edit profile/EditProfile.js";
import AllBlogsHomePage from "./components/blog home/AllBlogsHomePage.js";
import WhatIsBlog from "./components/static component/WhatIsBlog.js";
import BlogSearch from "./components/blog search/BlogSearch.js";
import ScrollToTop from "./ScrollToTop.js";


/*const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/blogs",
    element: <AllBlogs />,
  }
]);*/

function App() {
  return (
    <div>
       <BrowserRouter>
          <ScrollToTop />
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/accountDeleted" element={<DeletedAccount />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/blogsHome" element={<AllBlogsHomePage />} />
            <Route path="/blogs/updatePost/postId/:postID" element={<UpdatePost />} />
            <Route path="/blogs/postId/:postID" element={<SinglePost />} />
            <Route path="/blogs/category/:categoryName" element={<AllBlogs />} />
            <Route path="/blogs/username/:username" element={<AllBlogs />} />
            <Route path="/write" element={<Write />} />
            <Route path="/blogSearch" element={<BlogSearch />} />
            <Route path="/edit_profile/:username" element={<EditProfile />} />
            <Route path ="/what_is_blog" element={<WhatIsBlog />} />
          </Routes>
          <Footer />
       </BrowserRouter>
    </div>
  );
}

export default App;
