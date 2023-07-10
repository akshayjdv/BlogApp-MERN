import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        require : [true, "title is required"]
    },
    description : {
        type : String,
        require : [true, "description is required"]

    },
    // image pn lidhi che ane yt vala e 


    // to maintain relationship between user and blog - type ma object id ne referance ma blog model nu nam - blog vala collection nu nam
    // blog pass thase to user pn pass thase ne user ne get kriye chhiye mongoose ni help thi
    user : {
        type :mongoose.Types.ObjectId,
        ref:'User',
        require : [true,'user id is required']
    },
}, {timestamps:true});

// schema is ready - referance k y k apde su follow krsu e ready che
// now actual model bnaviye - means collection bnaviye (in short actual table bnaviye to store data) 

const Blog = mongoose.model('Blog',blogSchema);//Blog nam che table (collection) bnyu enu ne blogSchema follow kri ne bnayu che aa collection (table)


export default Blog;