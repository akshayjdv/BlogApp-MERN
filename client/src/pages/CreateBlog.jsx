import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  // to store the inputs of form
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');

   // to navigate to all blogs page after submitting blog
   const navigate = useNavigate();

  // to handle the inputs from create blog form
  const handleSubmit = async(e) => {
    e.preventDefault();

    // in order to pass the user who is logged in we have to get user id from local storage
    const loggedUser = localStorage.getItem('user');
    const userId = JSON.parse(loggedUser).validUser._id;
    // alert(userId);


    // variable object to store blog data
    const newBlog = {title,description,user:userId};


    // create a new blog by sending req to api by fetch method
    const response = await fetch("http://localhost:8000/api/blog/create-blog", {
      method: "POST",
      body: JSON.stringify(newBlog),
      headers: {
        "Content-Type": "application/json",
      },
    });


    // store result
    const result = await response.json();


    // if any errors
    if(!result?.success)
    {
        console.log(result?.message);
        alert(result?.message);

        setDescription('')
        setTitle('')
    }
    
    // for no erros
    if(result?.success)
    {
        setDescription('')
        setTitle('')

        console.log(result)

        alert(result.message)

        // navigate to all blogs page after submiting
        navigate('/blogs')
    }

  };




  return (
    <>
      <h1>create a new blog</h1>

      <form onSubmit={handleSubmit}>
        <div
          className="card"
          style={{
            width: "70%",
            margin: "auto",
            height: "80%",
            padding: "55px",
            boxShadow:'1px 1px 20px 3px rgba(0,0,0,0.5)',
            marginTop:'20px',
            marginBottom:'20px'
          }}
        >
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              title
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ margin: "10px", padding: "20px" }}
              
              value={title}
              onChange={(events) => {setTitle(events.target.value)}}
            />
          </div>
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: "100px", margin: "10px", padding: "20px" }}
              
              value={description}
              onChange={(events) => {setDescription(events.target.value)}}
            ></textarea>
            <label for="floatingTextarea2">write blog here...</label>
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            style={{ margin: "10px", padding: "20px" }}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateBlog;
