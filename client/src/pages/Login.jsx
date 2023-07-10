import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // to get email and password from form and set its values and store it
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // if any error occurs - save those errors to alert
  const [error,setError] = useState('');

  // navigate to other pages as required
  const navigate = useNavigate();

  // for toast notifications
  


  // user login che to user farithi login page pr na javo joiye - ene login page k login no option j na dekhavo joiye
  useEffect( ()=>{
    // checks user is login or not
    const auth = localStorage.getItem('user');

    if(auth)
    {
      // if user is logged in - login page this will navigate to main home page
      navigate('/');
    }
  },[]);








  // to handle all the passed inputs from login form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginUser = { email , password };

    const response = await fetch("http://localhost:8000/api/user/login" ,{
        method : 'POST',
        body : JSON.stringify(loginUser),
        headers : {
            'Content-Type' : 'application/json',
        },
    });

    const result = await response.json();

    // if we got any errors while login existing user
    if(!result.success)
    {
        console.log(result.message);
        console.log(error);
        setError(result.error)
        alert('error while login user')

        setEmail('');
        setPassword('');
    }

    // if all went good - login successfull
    if(result.success)
    {
        console.log(result);

        setError('')
        setEmail('')
        setPassword('')

        alert('login successfull');

        navigate('/');


        // after successfull login we,store data to localstorage of browser for login logout functionality
        // user nam na object ma store thase email and password 
        // akho user store kravva krta khali user ni id store kraviye to?
        localStorage.setItem('user',JSON.stringify(result));
    }
  }

  return (
    <>
      <div className="register-form">
        <div className="heading">
          <h3>Login page</h3>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-box"
            placeholder="Enter Email"
            value={email}
            onChange={(event) => {
              // console.log(event.target.value);
              setEmail(event.target.value);
            }}
          />
          <input
            type="text"
            className="input-box"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => {
              // console.log(event.target.value);
              setPassword(event.target.value);
            }}
          />

          <button
            type="submit"
            className="register-button"
          >
            Login
          </button>
          <button
            type="submit"
            className=""
            style={{ border: "none", margin: "5px" }}
            onClick={() => {navigate("/register")}}
          >
            Dont have an account? Create One
          </button>
        </form>
      </div>

    </>
  );
}

export default Login
