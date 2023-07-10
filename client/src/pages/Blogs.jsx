import React from 'react'
import { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard';

const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [error, setError] = useState("");

  // get all blogs
  const getAllBlogs = async () => {
    // by default get method j hoi etle no need to specify it explicitly
    const response = await fetch("http://localhost:8000/api/blog/all-blogs");

    // now j response male ene json ma feravyu
    const result = await response.json();

    // now check k kai error to nthi ne - result?.success no mtlb thai (result && result.success) mtlb result male to j agal ni condition chekc thai
    if (!result?.success) {
      alert(result.message);
      setError(result.message);
      console.log(error);
    }

    if (result?.success) {
      console.log(result);
      setAllBlogs(result?.allBlogs);
    }
  };

  // jyare jyare page refresh thase tyare aa run thase ne getAllBlogs func call thase jna thi badha blogs malse
  useEffect(() => {
    getAllBlogs();
  }, []);

  // user id fetching of logged user
  let loggedUser = localStorage.getItem("user");
  const userId = JSON.parse(loggedUser).validUser._id;
  // console.log(userId);

  return (
    <>
      <h1>blogs page</h1>
      {/* response ma allBlogs malyu apan ne array of objects - ema map method lagavi ne blogs ma time ne badhu pass kryu props through ne display kravyu and id ma blog ni id malse*/}
          {/* console.log(currentBlog.user._id,userId) */}
      {allBlogs &&
        allBlogs.map((currentBlog, index, arrayName) => {
          return (
            <BlogCard
              title={currentBlog.title}
              description={currentBlog.description}
              createdAt={currentBlog.createdAt}
              username={currentBlog.user.username}
              blogId={currentBlog._id}
              // user ni id ne j blog bnavyu che ena user ni id - blog kya user e bnavyu eni id same hoi to j edit delete nu option btavo
              isUser={userId === currentBlog.user._id}
            />
          );
        })}
    </>
  );
}

export default Blogs
