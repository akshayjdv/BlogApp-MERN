import express  from "express";
import User from "../model/user-module.js";//to perform create - find - delete - update operation and js file nu extension is must in backend else throws error

const app = express();//initializing express

// making our router
const userRouter = express.Router();

import bcrypt from 'bcrypt';//to encrypt passwords




// ----------------------------------------- apis ------------------------------------------------------


// create user api - method POST - url pattern /register - with validation at backend - need to do validation at front end also
userRouter.post('/register', async(req,res)=>{

    // j request krsu, ema register krva mate apde username, email and password moklsu
    // e badhu request ni body ma avse
    // e badhu apde array destructuring ni help thi email,username and password nam na variables ma store krai desu
    // destructuring nu name ne j send thai eni value - e nam same hovu joi - model ma username,email&password che j ave che
    const {username,email,password} = req.body;

    try{
        // we will do validation here  - if any fields empty - !empty = true and with || overall true and we get error of please fill details, no empty fields accepted
        if(!username || !email || !password)
        {
            return res.status(400).json({
                success : false,
                message : "username,email and password are required, please fill all fields"
            });
        }

        // if existing user try to register based on email - find from collection - as userModel is collection
        const existingUser = await User.findOne({email:email});

        if(existingUser)
        {
            return res.status(401).json({
                success:false,
                message:'you cannot register with this email, user already exist'
            });
        }


        // at this point we have checked all fields have values entered and user is new - dosent exist
        // now we encrypt password and send encrypted password
        const hashedPassword = await bcrypt.hash(password, 10);//10 round of hashing
        // password = hashedPassword;//replacing the password we are sending with hashed password


        // save new user if all fields are filled and its new user - await na lidhe save na lakhvu pde
        const userAdded = await User.create({
            // lilu valu che e apde database ma store kriye ne blue valu frontend thi ave che req ma ave che
            username:username,
            email:email,
            // password:password
            password:hashedPassword
        });

        // save new document inside our collection
        // await userModel.save();

        // newly added user is send to response - false - errors
        // res.status(201).send({
        //     success:true,
        //     message:'new user created - registered successfully..'
        // },userAdded);

        // basic response
        return res.status(201).json({success:true,message:'new user created - registered successfully.. ',userAdded});

    }catch(error){

        // jo error ave to response ma error send kro
        console.log(error);
        return res.status(400).json({ error: error.message });
    }

});






// --------------------------------------- api to get data of all users -----------------------------------

// method get and url pattern che /all-users
userRouter.get('/all-users',async(req,res)=>{

    try{
        const allUsers = await User.find();//collection ma find method lagavvathi badho data - badha documents(row ) allUsers nam na variable ma avi jase

        return res.status(200).json({
          userCount: allUsers.length,
          success: true,
          message: "all users data fetched successfully...",
          allUsers,
        });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
           success: false,
           message: "error while fetching all users data",
           error,
         });
    }

});


// ------------------------------------- login api with post method ------------------------------

// login api - post method - url pattern /login
userRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;//as 2 j vastu hase login ma
    try{
        if(!email || !password)
        {
            return res.status(401).json({
              success: false,
              message:
                "email(username) and password both are necessary,please fill all deatails",
            });
        }

        // to check user is registered or not - User is collection(table) name, find from collection
        const validUser = await User.findOne({email:email});

        // if not valid user - user not registered
        if(!validUser)
        {
            return res.status(200).json({
              success: false,
              message: "email is not registered, innalid user",
            });
        }

        // password matching or not - check here - j password che e password sent by us through req che - and j validuser.paasword che e email through collection ma check krelu che k aa email present che k ny - jo e email present che to ena corresponding kyo password apelo che e validuser.password ma che
        const isPasswordMatch = await bcrypt.compare(password,validUser.password);

        // if password dont match
        if(!isPasswordMatch)
        {
            return res.status(401).json({
              success: false,
              message: "Invalid Username or Password",
            });
        }


        // if all above criteria is checked - means valid user is there
        return res.status(200).json({
          success: true,
          message: "login successful",
          validUser,
        });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
          success: false,
          message: "error in login callback",
          error,
        });
    }
})




export default userRouter;//to start it in index.js file