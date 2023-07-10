import React from "react";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  // to store all blogs of particular user
  const [blogs, setBlogs] = useState([]);

  // if any errors - store them
  const [error, setError] = useState("");

  // get users blogs
  const getUserBlogs = async () => {
    let loggedUser = localStorage.getItem("user");

    //   fetching _id of user from localstorage is difficult as its object and we need to parse it to get our userd id
    const userId = JSON.parse(loggedUser).validUser._id;
    // console.log(userId);

    // post meethod che to fetch ,ma alag thi badhu lakhvani jrur nthi - j localstorage ma stored user che eni id thi blogs fetch krvana
    const response = await fetch(
      `http://localhost:8000/api/blog/user-blog/${userId}`
    ); //${userId}

    const result = await response.json();

    // for any errors
    if (!result?.success) {
      console.log(result.message);
      alert(result.message);
      setError(result.message);
      console.log(error);
    }

    // if no errors
    if (result?.success) {
      setError("");
      setBlogs(result?.userBlog.blogs);
    }
  };

  // jyare jyare page refresh thai tyare tyarea  aa chalse ne users blogs display thai jase with updated values
  useEffect(() => {
    getUserBlogs();
  }, [ ]);

  // show blogs based on condition - length of blogs or say no of blogs


  // user id fetching of logged user
  let loggedUser = localStorage.getItem("user");
  const userId = JSON.parse(loggedUser).validUser._id;
  // console.log(userId);

  
    /* current blog.id krey to kya user e post kryu che eni id avse user ni id blog ni ny */
  
  
    /* console.log(currentBlog.user), */
  

  return (
    <>
      <h1>user blogs made by particular login user</h1>

      {
        blogs && (blogs.length > 0) ? (
        blogs.map((currentBlog, index, arrayName) => {
          
          return (
            
            (
              <BlogCard
                title={currentBlog.title}
                description={currentBlog.description}
                createdAt={currentBlog.createdAt}
                username={currentBlog.user.username}
                // currentBlog._id ma apan ne current blog ni id male che and currentBlog.user ni andar currentBlog kya user e create kryo eni id male che
                blogId={currentBlog._id}
                // we check k blog kaya user e bnavyu che e ni id and j user login che eni id same che k ny
                // user ni id ne j blog bnavyu che ena user ni id - blog kya user e bnavyu eni id same hoi to j edit delete nu option btavo
                isUser={userId === currentBlog.user}
              />
            )
          );
        })
      ) : (
        <h1>you haven't created any blogs yet</h1>
          )
      }
    </>
  );
};

export default UserBlogs;
