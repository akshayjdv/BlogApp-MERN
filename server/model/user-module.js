// j user login mate avse - k register mate avse enu schema enu model bnaviye - inshort enu table (collection)

import mongoose from "mongoose";

// this is schma of what validations and values we require in our users collection (table)
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true //[true,'username is required']
    },
    email : {
        type : String,
        require : true //[true,'email is required']
        
    },
    password : {
        // type : Number,
        type : String,
        require : true //[true,'password is required']

    },

    // now we also get blogs - user na bnavela blogs
    // array of objects che
    blogs : [
        {
            type:mongoose.Types.ObjectId,
            ref : 'Blog'
            // require ny lakhyu bcz jaruri nthi k user blogs ape j , but blog bnyu to user hovo jruri che

        },
    ],
    
},{ timestamps:true});

// model - means collection(table) nu nam che User j atyare singular che pn database ma avse Users plural why dont know
const User = mongoose.model('User',userSchema);

export default User;//ana thi aa userModel ma create func na call thi entries krsu apde database na collection (table ) ma jnu nam che User - api ni help thi data insert thase - link apsu e link ma data pass thase