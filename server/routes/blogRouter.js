import express from 'express';

// create router object
const blogRouter = express.Router();

// as we wanted to perform find - update - delete - create operation in database inside a collection so we require object of that collection that is here Blog
import Blog from '../model/blog-model.js';
import User from '../model/user-module.js';
import mongoose from 'mongoose';

// --------------------------------------------api requests with router-----------------------------------------
// ---------------------------- we are sending request through postman and not fetch all -----------------------


// blog ni andar user ni id pass krsu etle khbr pde k kaya user e blog bnavyu che
// user ni andar blog ni array of object pass krsu jna thi khbr pdse k particular user e ketla blog create krya che


// create a blog api - method POST
blogRouter.post('/create-blog',async(req,res)=>{

    // j values add krvani che te request.body ma thi malse ene destructure krvanu
    const {title,description, user} = req.body;//bodyparser mtlb  express.json() no use krelo che app.use thi etle error ny ave - we also require a user on whose account this blog is posted - to maintain relationship

    try{
        // validation - if title k description be mathi kai pn no lakhyu hoi to error avse - user pn jose user vagar blog post ny thai
        if(!title || !description || !user)
        {
            return res.status(400).json({
                success:false,
                message:'title and description both required, please provide all fields'
            });
        }

        // aya sudhi pochyu mtlb badhu fill krelu che


        // to check user is there or not - login performed or not
        const existingUser = await User.findById({_id:user});//as user ni andar id avti hase - j mongoose.type.object id thi pass thai hase


        // if not existing user
        if(!existingUser)
        {
            return res.status(400).json({
              success: false,
              message: "unable to find user",
            });
        }



        // now create new blog - blogAdded is new document (row entry) - new ni jgya e await hoi to save method ni jrur no pde - await nu new krvanu che
        const blogAdded = await Blog.create({
            title:title,
            description:description,
            user:user
        });


        // -------------------------------------------------------------------------------------------------
        // what we are doing here is we are creating a blog with create method
        // then we make a session
        // then we start the session
        // then we save the newly created blog in database with session without user id specified in create method
        // then we push that created blog in existing login user inside users blog array
        // then we save this existing login user and created blog is save inside login user with session
        // then we will end session
        // -------------------------------------------------------------------------------------------------

        // make session and based on that session save blog
        const session = await mongoose.startSession();//session created

        session.startTransaction();//to update

        await blogAdded.save(session);//blog save based on session
        // existing user mlyo by id - j blog create krsu to ema pass thase j login thi mlse - e id thi apde user find kryu(document) - e document ni andar ek blogs nam nu array che jni andar j navo blog create kryo by that user e push kryo array ma by push method

        existingUser.blogs.push(blogAdded);//user na collection ma blog add kryo, user nu collection che - ema id wise user ne get kryu - e user na table(collection ma ek user mate ek blog) ni row che ema e user na badha blogs save thase

        await existingUser.save(session);// j blog pass kryo e pn save krvu pdse e save kryu by session

        await session.commitTransaction();//session end kryu

        // await blogAdded.save();//to save all values of newly created blog


        // blog created , send successfull response
        return res.status(201).json({
          success: true,
          message: "blog created successfully",
          blogAdded,
        });

    }
    catch(error){
        console.log(error);
        return res.status(400).json({
          success: false,
          message: "error while creating a blog",
          error,
        });
    }
});




// get all blogs api - method GET
blogRouter.get('/all-blogs', async(req,res)=>{
    try{
        // find method on collection to get all blogs - all documents
        const allBlogs = await Blog.find().populate('user');

        // if you dont find any blogs
        if(!allBlogs)
        {
            return res.status(200).json({
              success: false,
              message: "OOPs, No Blogs Found...",
            });
        }

        // if reach here - means blogs have been found, display them in response

        return res.status(200).json({
          success: true,
          blogCount: allBlogs.length,
          message: "All Blogs List ",
          allBlogs,
        });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
          success: false,
          message: "Error While Fetching Blogs",
          error,
        });
    }
});


// get a single blog based on id - method GET
blogRouter.get('/get-blog/:id',async(req,res)=>{

    // req.params fetches id from url pattern of req
    const {id} = req.params;

    try{
        // fing blog by id from blog collection(table)
        const singleBlogById = await Blog.findById({_id:id}); 

        // if not found
        if(!singleBlogById)
        {
            return res.status(400).json({
              success: false,
              message: "blog not found with this id",
            });
        }

        // aya pochya mtlb blog present to chhe

        return res.status(200).json({
          success: true,
          message: "fetched single blog by id",
          singleBlogById,
        });


    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({
          success: false,
          message: "error while fetching single blog by id",
          error,
        });
    }
});



// update a blog by particular id - method PATCH
blogRouter.patch('/update-blog/:id',async(req,res)=>{

    // we will be updating blog based on its id so we will require id from url - done by params hook
    const {id} = req.params;

    // user will provide in requqest what to updte like title and description

    const {title,description} = req.body;


    try{
        // _id e valu id hase j collection ma che ne id j apde req ma pass kryu, match thase to ema update
        // operation perform thase, req.body pass kryu - ani jgya e name:name,email:email aam pn kri sakai
        // new true thi newly updated value response ma malse

        const updatedBlog = await Blog.findByIdAndUpdate({_id:id},req.body,{new:true});

        return res.status(200).json({
          success: true,
          message: "blog updated successfully",
          updatedBlog,
        });
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({
          success: false,
          message: "Error while updating the blog",
          error,
        });
    }
});


// delete a blog by particular id - method DELETE
blogRouter.delete('/delete-blog/:id',async(req,res)=>{

    // get id with help of params
    const {id} = req.params;


    try{
        // akho blog to delete thai gyo pn e blog ma user ma j id che e pn delete krvu pdse
        // populate thi koi pn particular vastu hide krai ya batavai - user ne  - populate is like join - referance key ni jm - join with user nu collection thase by populate then nextline ma deletesingleuser che ema user hase {by id } ena thi bija collection sathe join thaya - ema blogs array che user ma ema thi aa deletesingleuser pull kryo - delete kryo bcz blog ni andar blogs j create krya e user e eni id hase e id remove krsu apde as a akho blog j delete kriye chhiye apde
        const deleteSingleBlogById = await Blog.findByIdAndDelete(req.params.id).populate('user')

        // user ne get kryu (as populate thi 2 collection join krya) j delete thyu ema thi - pull method thi array thi delete krai sakai - populate thi user referance collection ne join kryu
        await deleteSingleBlogById.user.blogs.pull(deleteSingleBlogById);

        await deleteSingleBlogById.user.save();

        return res.status(200).json({
          success: true,
          message: "blog deleted successfully..",
          deleteSingleBlogById,
        });
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
          success: false,
          message: "Error while deleting blog by id",
          error,
        });
    }
});


// get blog details of a user - method get - get users blog
blogRouter.get('/user-blog/:id',async(req,res)=>{

    const {id} = req.params;

    try{
        // join ni jm blogs thi bija collection ma find krse e user na blogs - populate blogs kryu che etle jya blogs ni array che , eni andar akho blog ave che by its id of blog - populate na lakhyu hot to khali id jova malte blog ni
        const userBlog = await User.findById({_id:id}).populate('blogs');

        // user blog na hoi to
        if(!userBlog)
        {
            return res.status(400).json({
              success: false,
              message: "blogs not found with this user id",
            });
        }

        return res.status(200).json({
          success: true,
          message: "user blogs",
          userBlog,
        });
    }
    catch(error)
    {
        console.log(error)
        return res.status(400).json({
          success: false,
          message: "error in user blog",
          error,
        });
    }
})


export default blogRouter;




 
