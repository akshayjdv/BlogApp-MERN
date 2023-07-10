import mongoose from "mongoose"


const Connection = async () =>{
    
    // connection ma error avi sake etle try catch ma use krvanu
    
    try{
       // process.env.DATABASE_URL;//database nu connection url pass kryu "mongodb://127.0.0.1:27017/database-nu-naam"
      // connect ma url nava database na nam sathe and useNewUrlParser true and akhu try catch ma j use krvanu
      await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
      console.log('connection with database successfull....')
    }catch(error){
        console.log(`errors caught : ${error}`)
    }
    

}

export default Connection;