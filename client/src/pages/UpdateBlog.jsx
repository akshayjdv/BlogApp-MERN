import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// pela id thi single blog get krsu
// eno badho data store krsu preveous data
// e data hve form ma displacy krsu
// e form submit thase to updated data jaase backend ma

const UpdateBlog = () => {
  // to store old and new values of title
  const [title, setTitle] = useState("");

  // to store old and new values of description
  const [description, setDescription] = useState("");

  // set and store errors if any
  const [error, setError] = useState("");

  // get id of blog from url to update the blog based on id - but we are not recieving any req or sending response - so we use useParams() hook to get id directly from url
  const {id } = useParams(); //mine correct - anu yt vala nu wrong - way to fetch id from url 

  // alert(id);
  // console.log(id);

  // to navigate to all-blpogs page after editing
  const navigate = useNavigate();

  // a function to get preveous value of a particular blog
  const getSingleBlogById = async () => {
    const response = await fetch(
      `http://localhost:8000/api/blog/get-blog/${id}`
    );

    const result = await response.json();

    // if any errors
    if (!result?.success) {
      setError(result.message);
      console.log(result.message);
      console.log(error);
    }

    // if everything is perfectly fine without any error
    if (result?.success) {
      setError("");
      // alert("preveous values" + result);

      setTitle(result.singleBlogById.title);
      setDescription(result.singleBlogById.description);
    }
  };

  // now we have fetched all preveous values of a blog and we send updated data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // updated blog data from input form
    const updatedBlogData = { title, description };

    // now send this updated data to backend by api call fetch call
    const response = await fetch(
      `http://localhost:8000/api/blog/update-blog/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedBlogData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // now collect response in json form
    const result = await response.json();

    // if any errors occurs
    if (!result?.success) {
      setError(result?.message);
      console.log(error);
    }

    // if everything is perfect without any errors
    if (result?.success) {
      setError("");
      setTitle("");
      setDescription("");

      alert("blog updated successfully");

      navigate("/blogs");
    }
  };

  // to get single blog details it in use effct
  useEffect(() => {
    getSingleBlogById();
  }, [id]);

  return (
    <>
      <h1>update a blog</h1>

      <form onSubmit={handleSubmit}>
        <div
          className="card"
          style={{
            width: "70%",
            margin: "auto",
            height: "80%",
            padding: "55px",
            boxShadow: "1px 1px 20px 3px rgba(0,0,0,0.5)",
            marginTop: "20px",
            marginBottom: "20px",
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
              onChange={(events) => {
                setTitle(events.target.value);
              }}
            />
          </div>
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: "100px", margin: "10px", padding: "20px" }}
              value={description}
              onChange={(events) => {
                setDescription(events.target.value);
              }}
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
}

export default UpdateBlog
