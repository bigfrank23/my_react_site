import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import { Box, Button, Grid } from "@mui/material";

import dummyImg from '../placeholder.png'
import SectionTitle from "./SectionTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

import '../pages/blog/createPost.css'
import {myApi} from '../components/requestMethod'

const ellipse = {
  display: "-webkit-box !important",
  webkitLineClamp: "4 !important",
  webkitBoxOrient: "vertical !important",
  overflow: "hidden !important",
  textOverflow: "ellipsis !important",
};
const user = JSON.parse(localStorage.getItem("profile"));
export default function BlogIndex() {
   const [posts, setPosts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const slice = posts?.slice(0, 3);

   useEffect(() => {
     const fetchPosts = async () => {
       const res = await myApi.get("/posts/all");
       setPosts(res.data);
       setIsLoading(false);
      //  console.log(res.data)
     };
     fetchPosts();
   }, []);


  return (
    // <div className="container-fluid" style={{background: 'url("https://img.freepik.com/free-photo/white-brush-stroke-texture-background_53876-132775.jpg?t=st=1657194230~exp=1657194830~hmac=a96d7825071211996733ca07daf464c736e73d542cf4370475d8af6265bd95be&w=900")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
    <div className="container" style={{ marginBottom: "5rem" }}>
      <div className="mt-5">
        <SectionTitle subheading="Some Recent Blog" heading="Blog" />
      </div>
      {!posts.length ? (<h2 style={{color: "#fff", textAlign: 'center'}}>No Post Yet. Signin to Add Post!</h2>) : (
        <Grid container spacing={2}>
          {slice.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ maxWidth: 345, margin: {xs: 'auto', sm: 0} }} elevation={5}>
                <CardHeader
                  avatar={
                    // <Avatar sx={{ bgcolor: red[500] }} aria-label={item.label}>
                    //   E
                    // </Avatar>
                    <Avatar
                      sx={{ margin: "auto" }}
                      alt={user?.result?.familyName}
                      src={user?.result?.imageUrl || item?.profilePic}
                    >
                      {user?.result?.familyName?.charAt(0) ||
                        user?.result?.firstName?.charAt(0)}
                    </Avatar>
                  }
                  action={
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <VisibilityOutlinedIcon sx={{ color: "#555" }} />
                      <Typography textAlign="center" variant="caption">
                        {item?.views}
                      </Typography>
                    </Box>
                    // <IconButton aria-label="settings">
                    //   <MoreVertIcon />
                    // </IconButton>
                  }
                  title={item.title}
                  subheader={moment(item.createdAt).fromNow()}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={item.avatar || dummyImg}
                  alt={item.title}
                />
                <CardContent>
                  <Typography
                    component="p"
                    className="ellipse"
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.desc}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {/* <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton> */}
                  <Link
                    to={`/fullDetail/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined">Read more</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
    // </div>
  );
}
