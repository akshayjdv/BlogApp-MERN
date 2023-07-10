import React from 'react'
import { useState } from 'react';
import './register.css'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    // to get username,email and password from form and set its values and store it
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    // kai error avse to ene alert kravva mate error ne store krsu
    const [error,setError] = useState('');

    // register thai jase etle sidhu login page pr redirect kri desu
    const navigate = useNavigate();


    // to handle the input from form - integrate registration form with api so that data is directly stored in database
    const handleSubmit = async (e) =>{
        // submit thai tyare page refresh thai(default behaviour che from nu) e vastu thi prevent krva aa line
        e.preventDefault();

        // now register new user - all values from input form is stored in this variable to register new user
        const registerNewUser = { username, email, password };

        // now api part comes in play jya apde api no url fetch ma nakhsu and all data nakhsu so data sidho database ma store thai jase but cors no issue avse j backend thi solve krvano rese - jvi rite apde postman thi request ma badhu send krta ta avi j rite apde frontend thi send kriye chhe - ne ena mate kyak api no url to apvo padse j apde fetch ma apyo
        const response = await fetch("http://localhost:8000/api/user/register", {
            method : 'POST',
            body : JSON.stringify(registerNewUser),
            headers : {
                'Content-Type' : 'application/json',
            },
        });

        const result = await response.json();




        // if we got errors in result - data not send properly - apde result j avse ema json body ma success nam no ek variable store karelo jma apde har var true false add krelu now its working - it was not working with result.ok 
        if(!result.success)
        {
            console.log(result.message)
            setError(result.message)
            // alert('error while registering new user')
            alert(result.message)
        }

        // if data sent successfully without any errors - request gets accepted
        if(result.success)
        {
            console.log(result);
            alert(`user registered successfully`);
            setUsername('');//username field empty
            setEmail('');//email field empty
            setPassword('');//password field empty

            setEmail('');//accepted so no errors

            navigate('/login');//after registration page redirected to login page
        }

    }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="register-form">
        <div className="heading">
          <h3>Register page</h3>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="input-region">
            <input
              type="text"
              className="input-box"
              placeholder="Enter User Name"
              value={username}
              onChange={(event) => {
                // console.log(event.target.value);
                setUsername(event.target.value);
              }}
            />
            <input
              type="email"
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
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
          <button
            type="button"
            className=""
            style={{ border: "none", margin: "5px" }}
            onClick={() =>{navigate('/login')}}
          >
            Already have an account?
          </button>
        </form>
      </div>
    </>
  );
}

export default Register


// form submit thai ena mate form tag ma onSubmit ma j func che te lakhvanu
// button no type submit j rakhvanu , ema onSubmit na hoi, onClick chali jai - cors issue fix kro have
