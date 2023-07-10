import express from 'express';//express import kryu
import dotenv from 'dotenv';//env file thi secure port number lidhu
import Connection from './database/dbconnection.js';//to call connection function here and make connection with database
import User from './model/user-module.js';//used in routes folder
import bcrypt from 'bcrypt';//to encrypt passwords - used here pela but due to routing used in routes folder
import userRouter from './routes/userRouter.js';
import blogRouter from './routes/blogRouter.js';
import cors from 'cors';//to fix the issue of cors - front end thi backend ma req send krvanu issue


dotenv.config();// configure env file


const app = express();//express initialise kryu

const PORT = process.env.PORT || 8000;//env file ma j port che e port number aya fetch kryu - jo env file work no kre to alternate ma apde apyu port number


// use body parser as the sended request cannot be read by our func - undefined error will come so use body parser
app.use(express.json());

// to fix issue of cors - import cors after installing cors and than use cors
app.use(cors());


//to perform all api routing - we can even make api routing smaller by passing a function name instead of call back func corresponding to it and that func will be defined in some other file in some other folder - but ill not follow that approach bcz it'll make me confuse - ne aa j agal path apyo che te har request ma follow krvo pdse like http://localhost:8000/api/use/{end point of our request} - get mate che '/all-users' ; create new user mate '/register' and login mate '/login'
// myRouter is for userRoutes - rename it
app.use('/api/user',userRouter);
app.use('/api/blog',blogRouter);




// -----------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------
// pela we used to define get,post,put,patch request here - j backend handle kre che ne jma data postman thi jai che - now we make a router and a router folder jma app.method ni jgya e router.method ne callback func ma akhu body with validation alkhyu che, aa to for referance - yad rakhva mate aya examples rakhya che method na
// -----------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------



// app.get('/',(req,res)=>{
//     res.send('get api from backend..............')
// })


// me chodu post ni jgya e get lakhyu tu to error j ave ne - without validation - just add thai che data
// app.post('/cc', async(req,res)=>{
//     const {username,email,password} = req.body;

//     try{
//         const userAdded = await User.create({
//             username : username,
//             email : email,
//             password : password
//         });

//         res.status(201).json(userAdded);
//     }
//     catch(error){
//         console.log(error);
//         res.status(400).json({error:error.message});
//     }
// })


// -----------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------






// to make connection of server with database - call connection func
Connection();

// server started 
app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
});