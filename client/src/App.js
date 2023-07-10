import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {Routes,Route} from 'react-router-dom'

import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateComponent from "./components/PrivateComponent";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import Error404 from "./pages/Error404";
// jetla components ne private bnavvu hoi etla ne private component ma rakhvana baki na ny 

const App = () =>{

  

  return (
    <>
      <Navbar />

      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<h1 >Home page component</h1>} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/my-blogs" element={<UserBlogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/update-blog/:id" element={<UpdateBlog />} /> {/* update blogs based on particular id - route ma rakhvu pde as apde redirect to thaiye chhiye pn navbar thi kadhi nakhyu*/}
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;