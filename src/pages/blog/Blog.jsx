import React, {useState, useEffect} from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Button, cardClasses, IconButton, Pagination, Typography } from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import PlaceholderImg from '../../../src/placeholder.png'
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Link } from 'react-router-dom';
import axios from "axios";
import Spinner from './../../components/Spinner';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import moment from "moment";

const user = JSON.parse(localStorage.getItem("profile"));
export default function Blog() {
  //  const cards = [1, 2, 3, 4, 5, 6]
  //  const [posts, setPosts] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   const [loadMore, setLoadMore] = useState(false)

  //  const slice = posts?.slice(0, noOfElement);

   const [items, setItems] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   
   
   useEffect(() => {
     async function getItems() {
       const res = await axios.get(
         `http://localhost:5000/api/posts?page=${currentPage}`
       );
       setIsLoading(false)
       setLoadMore(false)
       setItems(items.concat(res.data.items));
       setTotalPages(res.data.totalPages);
     }
     getItems();
     findUser()
   }, [currentPage]);

   function handleLoadMore() {
     setCurrentPage(currentPage + 1);
     setLoadMore(true)
   }

   const findUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/" + JSON.parse(localStorage.getItem("profile"))?.result._id
      );
      // localStorage.setItem("profilePic", res.data.profilePic);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Box component="main" sx={{ marginTop: { xs: "3rem", sm: "7rem" } }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="container">
            <section className="text-center">
              <Typography
                variant="h2"
                component="h2"
                className="pt-5 text-white"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2rem",
                  fontSize: { xs: "1.3rem", sm: "2rem" },
                }}
              >
                <strong>
                  {!items.length ? "No post yet" : "Latest posts"}
                </strong>
                <Box component={Link} to="/createPost">
                  <IconButton
                    sx={{
                      color: "#fff",
                      fontSize: { xs: "1.3rem", sm: "2rem" },
                    }}
                  >
                    Create
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Typography>

              <div className="row">
                {items?.map((post) => (
                  <div className="col-lg-4 col-md-12 mb-4">
                    <div className="card">
                      <div
                        className="bg-image hover-overlay ripple"
                        data-mdb-ripple-color="light"
                      >
                        <img src={post?.avatar} className="img-fluid" alt="" />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </a>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{post?.title}</h5>
                        <div className="d-flex justify-content-between">
                          <div
                            className="reactions d-flex my-1"
                            style={{ gap: "1rem" }}
                          >
                            <div
                              className="reactTime d-flex"
                              style={{ gap: "5px" }}
                            >
                              <i className="fa fa-clock-o" aria-hidden="true" />
                              <span style={{ fontSize: "13px" }}>
                                {moment(post?.createdAt).fromNow()}
                              </span>
                            </div>
                            {!post?.comments?.length ? (
                              <CommentIcon />
                            ) : (
                              <div
                                className="reactComment d-flex"
                                style={{ gap: "5px" }}
                              >
                                <CommentIcon />
                                <span style={{ fontSize: "13px" }}>
                                  {post?.comments?.length}
                                </span>
                              </div>
                            )}
                            {!post?.likes?.length ? (
                              <ThumbUpIcon />
                            ) : (
                              <div
                                className="reactComment d-flex"
                                style={{ gap: "5px" }}
                              >
                                <ThumbUpIcon />
                                <span style={{ fontSize: "13px" }}>
                                  {post?.likes?.length > 2 &&
                                  post?.likes?.includes(user?.result?._id)
                                    ? `You and ${
                                        post?.likes?.length - 1
                                      } others`
                                    : `${post.likes?.length} like${
                                        post.likes?.length > 1 ? "s" : ""
                                      }`}
                                </span>
                              </div>
                            )}
                          </div>
                          {!post?.views ? (
                            <VisibilityOffIcon />
                          ) : (
                            <div className="view d-flex">
                              <VisibilityOutlinedIcon />
                              <span
                                style={{
                                  fontSize: "13px",
                                  alignSelf: "center",
                                  marginLeft: "2px",
                                }}
                              >
                                {post?.views}
                              </span>
                            </div>
                          )}
                        </div>
                        <p
                          className="card-text text-truncate"
                          style={{ maxWidth: "300px" }}
                        >
                          {post.desc}
                        </p>
                        <Link to={`/fullDetail/${post._id}`}>
                          <Button
                            variant="contained"
                            color="primary"
                            endIcon={<ArrowRightAltIcon />}
                          >
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <nav className="my-4" aria-label="...">
              {/* <div className="pagination justify-content-center">
                <Pagination
                  sx={{ background: "#fff", p: 1, borderRadius: "5px" }}
                  count={10}
                  variant="outlined"
                  shape="rounded"
                />
              </div> */}
              {/* {slice?.length > 6 && ( */}
              {currentPage < totalPages && (
                <div
                  className="text-center"
                  style={{ background: "#fff", p: 1, borderRadius: "5px" }}
                  onClick={handleLoadMore}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={loadMore ? <HourglassTopIcon/> : <KeyboardDoubleArrowDownIcon />}
                  >
                    {loadMore ? "Loading" : "Load More"}
                  </Button>
                </div>
              )}
              {/* )} */}
            </nav>
          </div>
        )}
      </Box>
    </>
  );
}
