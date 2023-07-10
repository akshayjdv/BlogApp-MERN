import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from "@mui/material";
import {useLocation, useNavigate} from 'react-router-dom';
import { useEffect } from "react";


const  BlogCard = ({title,description,createdAt,username,blogId,isUser}) => {

  // to use navigation functionality
  const navigate = useNavigate();

  // to fetch url path so that if we are deleting blog from allblogs page - we can make it refresh and if we are deleting it from myblogs page itll navigate to allblogs page
  const location = useLocation();
  // console.log(location.pathname);

  const handleEdit = () =>{
    // navigate to update - edit page - with help of particular id
    navigate(`/update-blog/${blogId}`)
  }

  // delete blog by blog id - blogs created by user - who is logged in can be deleted by him
  // onclick on delete icon, a blog by logged in user will be deleted
  // no need to pass blogId here in function
  const handleDelete = async() =>{
    
    // call api to delete blog with particular id to delete blog - with help of fetch method
    const response = await fetch(`http://localhost:8000/api/blog/delete-blog/${blogId}`,{
      method : 'DELETE'
    }) ;

    const result = await response.json();

    // if any errors caught
    if(!result?.success)
    {
      console.log(result?.message)
      alert(result?.message)
      // console.log(blogId)
    }

    // if everything fine and blog gets deleted
    if(result?.success)
    {
      alert('Blog Deleted Successfylly....');

      navigate('/blogs');

      // wait from 2 seconds and navigate it to all blogs page
      // if myblogs thi delete kriye to all blogs ma navigation perfect thai che but all blogs thi delete kriye to refresh nthi thatu page var lage etle 
      // apde location check krsu - jo all-blogs page thi delete kryu hoi to forcefully page reload krsu ne myblogs thi delete kryu hase to navigate krsu all blogs page pr
      setTimeout( ()=>{
          
        {(location.pathname === '/blogs') ? window.location.reload() :   navigate('/blogs')}

      },200)
    }
  }

  



  return (
    <Card
      sx={{
        width: "25%",
        mt: 2,
        padding: 2,
        boxShadow: "1px 1px 10px 1px rgba(0,0,0,0.3)",
        margin: "auto",
        marginBottom: "20px",
        ":hover": { boxShadow: "2px 2px 30px 3px rgba(0,0,0,0.4)" },
      }}
    >
    {/* isUser true hoi to j - isUser ma che k blog j user e bnavyu che eni id ne j user login che eni id same hovi joiye to j edit delete btavo*/}
    {
      isUser && (
        <Box display={'flex'}>
          <IconButton onClick={handleEdit } sx={{marginLeft:'auto'}}><ModeEditIcon/></IconButton>
          <IconButton onClick={handleDelete}><DeleteIcon/></IconButton>
        </Box>
      )
    }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        
        title={title}
        subheader={createdAt}
      />
      <CardMedia
        component="img"
        // height="194"
        image="https://i.pinimg.com/564x/57/53/74/575374bf227f9845685a2950dd976f88.jpg"
        alt="Paella dish"
        // width='10px'
        height = 'auto'
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}


export default  BlogCard;